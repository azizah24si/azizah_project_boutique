-- ============================================================
-- E-Commerce & Reservation System - Supabase Migration Script
-- Execute this in Supabase SQL Editor before running the app
-- ============================================================

-- ============================================================
-- 1. TABLES
-- ============================================================

-- profiles: extends auth.users with role, member_level, loyalty_points
CREATE TABLE IF NOT EXISTS public.profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   varchar NOT NULL,
  role        varchar NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  member_level varchar NOT NULL DEFAULT 'Bronze' CHECK (member_level IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
  loyalty_points integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- products: public catalog
CREATE TABLE IF NOT EXISTS public.products (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        varchar NOT NULL,
  description text,
  price       numeric NOT NULL DEFAULT 0,
  stock       integer NOT NULL DEFAULT 0,
  image_url   text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- customers: non-auth customer records (guests or linked members)
CREATE TABLE IF NOT EXISTS public.customers (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   varchar NOT NULL,
  email       varchar NOT NULL UNIQUE,
  phone       varchar,
  user_id     uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- sales_orders: handles both sales and reservations via order_type
CREATE TABLE IF NOT EXISTS public.sales_orders (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id      uuid NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
  total_amount     numeric NOT NULL DEFAULT 0,
  discount_applied numeric NOT NULL DEFAULT 0,
  net_amount       numeric NOT NULL DEFAULT 0,
  status           varchar NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  order_type       varchar NOT NULL DEFAULT 'sales' CHECK (order_type IN ('sales', 'reservation')),
  reservation_date timestamptz,
  notes            text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- order_items: individual products within a sales_order
CREATE TABLE IF NOT EXISTS public.order_items (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      uuid NOT NULL REFERENCES public.sales_orders(id) ON DELETE CASCADE,
  product_id    uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name  varchar NOT NULL,
  quantity      integer NOT NULL DEFAULT 1,
  price_per_unit numeric NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. TRIGGER: Auto-create profile on auth.users insert
-- ============================================================
-- Uses full_name from sign-up metadata (options.data)

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'member'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 3. STORAGE BUCKET for product images
-- ============================================================
-- Create the bucket (safe if already exists)

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items   ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------
-- profiles: users can read/update their own; admins read all
-- -------------------------------------------------------
CREATE POLICY "profiles_select_own_or_admin"
  ON public.profiles FOR SELECT
  USING (
    auth.uid() = id
    OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- -------------------------------------------------------
-- products: public read; admin-only write
-- -------------------------------------------------------
CREATE POLICY "products_select_public"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "products_insert_admin"
  ON public.products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "products_update_admin"
  ON public.products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "products_delete_admin"
  ON public.products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- -------------------------------------------------------
-- customers: admin full access; anyone can insert (guest checkout)
-- -------------------------------------------------------
CREATE POLICY "customers_select_admin_or_own"
  ON public.customers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
    OR user_id = auth.uid()
  );

CREATE POLICY "customers_insert_anyone"
  ON public.customers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "customers_update_admin"
  ON public.customers FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "customers_delete_admin"
  ON public.customers FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- -------------------------------------------------------
-- sales_orders: admin full; anyone insert; member reads own
-- -------------------------------------------------------
CREATE POLICY "sales_orders_select_admin_or_own"
  ON public.sales_orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
    OR customer_id IN (
      SELECT id FROM public.customers WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "sales_orders_insert_anyone"
  ON public.sales_orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "sales_orders_update_admin"
  ON public.sales_orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "sales_orders_delete_admin"
  ON public.sales_orders FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- -------------------------------------------------------
-- order_items: same access pattern as sales_orders
-- -------------------------------------------------------
CREATE POLICY "order_items_select_admin_or_own"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
    OR order_id IN (
      SELECT so.id FROM public.sales_orders so
      JOIN public.customers c ON c.id = so.customer_id
      WHERE c.user_id = auth.uid()
    )
  );

CREATE POLICY "order_items_insert_anyone"
  ON public.order_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "order_items_update_admin"
  ON public.order_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "order_items_delete_admin"
  ON public.order_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- -------------------------------------------------------
-- Storage policies for product-images bucket
-- -------------------------------------------------------
CREATE POLICY "product_images_read_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "product_images_upload_admin"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "product_images_update_admin"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "product_images_delete_admin"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- 5. OPTIONAL: Set first admin user
-- ============================================================
-- After registering your first user, run this to make them admin:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
-- Or by id:
-- UPDATE public.profiles SET role = 'admin' WHERE id = 'user-uuid-here';
