# 📂 Struktur Project Jijah Boutique

Project ini memiliki **2 bagian utama** yang terpisah:

## 🌐 GUEST - Public Website
Website publik untuk pengunjung (tanpa perlu login)

### Lokasi: `src/guest/`

#### 📄 Pages (`src/guest/pages/`)
- **Home.jsx** - Landing page dengan hero, produk unggulan, testimonial
- **Products.jsx** - Katalog produk dengan filter & search
- **ProductDetail.jsx** - Detail produk dengan opsi pemesanan via WhatsApp
- **Reservation.jsx** - Form reservasi layanan (konsultasi, fitting, dll)
- **Contact.jsx** - Informasi kontak lengkap + map
- **About.jsx** - Tentang boutique, tim, values, milestone
- **Gallery.jsx** - Galeri foto produk dan event

#### 🧩 Components (`src/guest/components/`)
- **Navbar.jsx** - Navigation bar dengan info kontak
- **Footer.jsx** - Footer lengkap dengan sosial media
- **Hero.jsx** - Hero section untuk landing page
- **ProductCard.jsx** - Card komponen untuk display produk

#### 🎨 Layout (`src/guest/layouts/`)
- **GuestLayout.jsx** - Layout wrapper (Navbar + Content + Footer)

### 🔗 Routes Guest
```
/                    → Landing page (Home)
/guest               → Landing page (Home)
/guest/products      → Katalog produk
/guest/products/:id  → Detail produk
/guest/reservation   → Form reservasi
/guest/contact       → Kontak & info
/guest/about         → Tentang kami
/guest/gallery       → Galeri foto
```

---

## 🔐 ADMIN - Dashboard Panel
Dashboard admin untuk mengelola boutique (perlu login)

### Lokasi: `src/pages/` & `src/layouts/`

#### 📄 Pages (`src/pages/`)
- **Dashboard.jsx** - Dashboard utama dengan statistik
- **Product.jsx** - Manajemen produk
- **ProductDetail.jsx** - Detail & edit produk
- **Orders.jsx** - Manajemen pesanan
- **OrderDetail.jsx** - Detail pesanan
- **Customers.jsx** - Data pelanggan
- **ComponentDemo.jsx** - Demo komponen UI
- **ShadcnDemo.jsx** - Demo shadcn components

#### 🎨 Layout (`src/layouts/`)
- **MainLayout.jsx** - Layout admin (Sidebar + Header + Content)
- **AuthLayout.jsx** - Layout untuk halaman login/register

### 🔗 Routes Admin
```
/admin                → Dashboard
/admin/product        → Manajemen produk
/admin/product/:id    → Detail produk
/admin/orders         → Manajemen pesanan
/admin/orders/:id     → Detail pesanan
/admin/customers      → Data pelanggan
/admin/demo           → Demo komponen
/admin/shadcn         → Demo shadcn
```

---

## 🔑 AUTH - Authentication
### Lokasi: `src/pages/auth/`
```
/login    → Halaman login
/register → Halaman registrasi
/forgot   → Lupa password
```

---

## 🎨 Components Shared
Komponen UI yang digunakan bersama (admin & guest jika perlu)

### Lokasi: `src/components/`
- Alert, Avatar, Badge, Button, Card
- Dialog, Dropdown, Input, Modal
- Pagination, ProgressBar, Select
- Sidebar, Skeleton, Spinner, Table
- Tabs, Toast, Tooltip
- dan lainnya...

---

## 📱 Fitur Guest Website (CRM Elements)

### 1. **Informasi Boutique**
- Hero section dengan brand identity
- Stats (500+ produk, 2300+ customer, rating 4.9)
- Tentang kami (story, values, team, milestone)

### 2. **Kontak & Communication**
- Top bar dengan nomor telepon & WhatsApp
- Halaman kontak lengkap dengan:
  - Alamat toko
  - Nomor telepon
  - Email
  - WhatsApp Business
  - Jam operasional
  - Social media (Instagram, Facebook, TikTok)

### 3. **Reservasi Online**
- Form reservasi dengan fields:
  - Nama, Nomor WA, Email
  - Pilih layanan (Konsultasi, Custom Order, Fitting, dll)
  - Tanggal & waktu
  - Catatan tambahan
- Konfirmasi otomatis via WhatsApp

### 4. **Katalog Produk**
- Display produk dengan foto berkualitas
- Filter kategori (Dress, Blouse, Outer, Hijab)
- Search functionality
- Product detail lengkap
- Opsi pesan via WhatsApp langsung

### 5. **Customer Engagement**
- Testimonial section
- Gallery produk & event
- Social media integration
- Rating & reviews

### 6. **Layanan & Features**
- Gratis ongkir (min pembelian)
- Customer service 24/7
- Garansi kualitas
- Rating terbaik 4.9/5

---

## 🎨 Tema & Styling
- **Warna Utama**: Cyan-Teal gradient (konsisten guest & admin)
- **Accent**: Pink-Rose (untuk CTA & highlight)
- **Framework**: TailwindCSS
- **Icons**: React Icons (FA)
- **Font**: Poppins & Barlow

---

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Akses Website:
- **Guest (Public)**: http://localhost:5173/
- **Admin (Dashboard)**: http://localhost:5173/admin
- **Login**: http://localhost:5173/login

---

## 📝 Notes

1. **Guest dan Admin terpisah** - mudah maintenance
2. **Tema konsisten** - cyan-teal gradient di semua halaman
3. **CRM Ready** - ada kontak, reservasi, WhatsApp integration
4. **Responsive** - mobile friendly
5. **Modern UI** - gradient, shadow, hover effects

---

## 📞 Kontak Boutique (dalam website)
- **Telepon**: +62 812-3456-7890
- **WhatsApp**: +62 812-3456-7890
- **Email**: info@jijahboutique.com
- **Alamat**: Jl. Fashion Boulevard No. 123, Jakarta Selatan
- **Jam Operasional**: Senin-Minggu, 09:00 - 21:00 WIB

---

**🎉 Happy Coding! Jijah Boutique © 2025**
