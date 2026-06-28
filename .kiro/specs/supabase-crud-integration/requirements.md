# Requirements Document

## Introduction

Dokumen ini mendefinisikan requirement untuk integrasi backend Supabase pada fitur CRUD Produk, Pelanggan, dan Penjualan di Boutique Management System Azizah. Sistem ini akan mengganti dummy data dengan koneksi real-time ke Supabase database, mengikuti pola arsitektur yang sudah diterapkan pada CRUD Users.

## Glossary

- **System**: Boutique Management System yang mencakup Admin UI dan Service Layer
- **Supabase_Client**: Client library @supabase/supabase-js untuk koneksi ke backend
- **Product_Service**: Service layer untuk operasi CRUD produk (productsAPI.js)
- **Customer_Service**: Service layer untuk operasi CRUD pelanggan (customersAPI.js)
- **Order_Service**: Service layer untuk operasi CRUD penjualan (ordersAPI.js)
- **Admin_User**: User dengan role 'admin' yang memiliki akses penuh ke CRUD operations
- **Database**: Supabase PostgreSQL database dengan schema yang sudah terdefinisi
- **REST_API**: Supabase REST API endpoint untuk operasi database
- **Dummy_Data**: Data statis yang disimpan di file JavaScript (harus dihapus)
- **UI_Component**: React component untuk halaman Product, Customers, dan Orders
- **Toast_Notification**: Notifikasi feedback ke user setelah operasi CRUD

## Requirements

### Requirement 1: Integrasi CRUD Produk dengan Supabase

**User Story:** Sebagai Admin, saya ingin mengelola data produk (Create, Read, Update, Delete) yang tersimpan di Supabase, sehingga perubahan data produk dapat tersinkronisasi secara real-time dan persisten di database.

#### Acceptance Criteria

1. THE Product_Service SHALL menyediakan fungsi fetchProducts() untuk mengambil semua data produk dari tabel public.products
2. WHEN Admin menambahkan produk baru, THE Product_Service SHALL menyimpan data ke public.products dengan field: id (uuid), name (varchar), description (text), price (numeric), stock (integer), image_url (text), created_at (timestamptz)
3. WHEN Admin mengupdate data produk, THE Product_Service SHALL mengirim perubahan ke public.products berdasarkan product id
4. WHEN Admin menghapus produk, THE Product_Service SHALL menghapus record dari public.products berdasarkan product id
5. THE Product_Service SHALL mengikuti pola arsitektur yang sama dengan usersAPI.js (axios, headers configuration, error handling)
6. WHEN operasi CRUD berhasil, THE UI_Component SHALL menampilkan Toast_Notification dengan status sukses
7. WHEN operasi CRUD gagal, THE Product_Service SHALL mengembalikan error message yang deskriptif
8. THE System SHALL menghapus semua dummy data produk dari file JavaScript setelah integrasi selesai

### Requirement 2: Integrasi CRUD Pelanggan dengan Supabase

**User Story:** Sebagai Admin, saya ingin mengelola data pelanggan (Create, Read, Update, Delete) yang tersimpan di Supabase, sehingga informasi pelanggan dapat dikelola secara terpusat dan terintegrasi dengan sistem penjualan.

#### Acceptance Criteria

1. THE Customer_Service SHALL menyediakan fungsi fetchCustomers() untuk mengambil semua data pelanggan dari tabel public.customers
2. WHEN Admin menambahkan pelanggan baru, THE Customer_Service SHALL menyimpan data ke public.customers dengan field: id (uuid), full_name (varchar), email (varchar), phone (varchar), user_id (uuid nullable), created_at (timestamptz)
3. WHEN Admin mengupdate data pelanggan, THE Customer_Service SHALL mengirim perubahan ke public.customers berdasarkan customer id
4. WHEN Admin menghapus pelanggan, THE Customer_Service SHALL menghapus record dari public.customers berdasarkan customer id
5. THE Customer_Service SHALL mengikuti pola arsitektur yang sama dengan usersAPI.js (axios, headers configuration, error handling)
6. THE Customer_Service SHALL memvalidasi format email sebelum menyimpan ke database
7. WHEN operasi CRUD berhasil, THE UI_Component SHALL menampilkan Toast_Notification dengan status sukses
8. THE System SHALL menghapus semua dummy data pelanggan dari file customersData.js setelah integrasi selesai

### Requirement 3: Integrasi CRUD Penjualan dengan Supabase

**User Story:** Sebagai Admin, saya ingin mengelola data penjualan (Create, Read, Update, Delete) yang tersimpan di Supabase, sehingga transaksi penjualan dapat direkam secara permanen dan terintegrasi dengan data produk dan pelanggan.

#### Acceptance Criteria

1. THE Order_Service SHALL menyediakan fungsi fetchOrders() untuk mengambil semua data penjualan dari tabel public.sales_orders dengan JOIN ke public.customers untuk mendapatkan customer name
2. WHEN Admin menambahkan penjualan baru, THE Order_Service SHALL menyimpan data ke public.sales_orders dengan field: id (uuid), customer_id (uuid), total_amount (numeric), discount_applied (numeric), net_amount (numeric), status (varchar), order_type (varchar), notes (text), created_at (timestamptz)
3. WHEN Admin mengupdate status penjualan, THE Order_Service SHALL mengirim perubahan status ke public.sales_orders (pending, completed, cancelled)
4. WHEN Admin menghapus penjualan, THE Order_Service SHALL menghapus record dari public.sales_orders berdasarkan order id
5. THE Order_Service SHALL mengikuti pola arsitektur yang sama dengan usersAPI.js (axios, headers configuration, error handling)
6. THE Order_Service SHALL memvalidasi bahwa customer_id yang direferensikan ada di tabel public.customers sebelum menyimpan order
7. WHEN operasi CRUD berhasil, THE UI_Component SHALL menampilkan Toast_Notification dengan status sukses
8. THE System SHALL menghapus semua dummy data penjualan dari Orders.jsx setelah integrasi selesai

### Requirement 4: Konsistensi Service Layer Architecture

**User Story:** Sebagai Developer, saya ingin semua service layer mengikuti pola arsitektur yang konsisten dengan usersAPI.js, sehingga kode mudah dipahami, dimaintain, dan di-extend di masa depan.

#### Acceptance Criteria

1. THE Product_Service SHALL menggunakan axios untuk HTTP requests ke Supabase REST API
2. THE Customer_Service SHALL menggunakan axios untuk HTTP requests ke Supabase REST API
3. THE Order_Service SHALL menggunakan axios untuk HTTP requests ke Supabase REST API
4. THE System SHALL menggunakan environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) untuk konfigurasi API
5. THE System SHALL menggunakan headers yang sama: apikey, Authorization, Content-Type, dan Prefer untuk semua service
6. WHEN service melakukan POST/PATCH operation, THE System SHALL menambahkan header Prefer: return=representation untuk mendapatkan response data
7. THE System SHALL menggunakan Supabase query syntax untuk filtering (eq., ilike., gt., lt., dll)
8. THE System SHALL menghandle async/await pattern secara konsisten di semua service functions

### Requirement 5: Data Cleanup dan Migration

**User Story:** Sebagai Developer, saya ingin menghapus semua dummy data yang tidak digunakan lagi setelah integrasi Supabase selesai, sehingga codebase tetap clean dan tidak membingungkan.

#### Acceptance Criteria

1. THE System SHALL menghapus array ALL_PRODUCTS dari Product.jsx setelah Product_Service terintegrasi
2. THE System SHALL menghapus file src/data/customersData.js beserta semua fungsi helper-nya setelah Customer_Service terintegrasi
3. THE System SHALL menghapus array ALL_ORDERS dari Orders.jsx setelah Order_Service terintegrasi
4. THE System SHALL menghapus semua import statement yang mereferensikan dummy data
5. THE UI_Component SHALL menggunakan data dari service API calls, bukan dari dummy data
6. THE System SHALL memverifikasi bahwa tidak ada file unused dummy data yang tersisa setelah cleanup

### Requirement 6: Error Handling dan User Feedback

**User Story:** Sebagai Admin User, saya ingin mendapatkan feedback yang jelas ketika operasi CRUD berhasil atau gagal, sehingga saya tahu status dari aksi yang saya lakukan.

#### Acceptance Criteria

1. WHEN operasi fetchProducts() berhasil, THE Product_Service SHALL return array of product objects
2. WHEN operasi fetchProducts() gagal, THE Product_Service SHALL throw error dengan message yang deskriptif
3. WHEN operasi createProduct() berhasil, THE UI_Component SHALL menampilkan Toast_Notification success dan refresh data table
4. WHEN operasi createProduct() gagal karena validasi, THE System SHALL menampilkan error message spesifik (contoh: "Nama produk wajib diisi")
5. WHEN koneksi ke Supabase terputus, THE System SHALL menampilkan error message "Gagal terhubung ke server"
6. WHEN operasi deleteProduct() berhasil, THE UI_Component SHALL remove item dari table dan menampilkan Toast_Notification
7. THE System SHALL menggunakan try-catch block untuk menangani semua async operations
8. THE System SHALL log error ke console untuk debugging purposes

### Requirement 7: UI Integration dengan Service Layer

**User Story:** Sebagai Developer, saya ingin mengintegrasikan UI components yang sudah ada dengan service layer baru, tanpa mengubah struktur UI dan styling yang sudah ada.

#### Acceptance Criteria

1. THE Product.jsx SHALL memanggil Product_Service.fetchProducts() saat component mount (useEffect)
2. THE Product.jsx SHALL memanggil Product_Service.createProduct() ketika form dialog submitted
3. THE Product.jsx SHALL memanggil Product_Service.updateProduct() ketika edit dialog submitted
4. THE Product.jsx SHALL memanggil Product_Service.deleteProduct() ketika delete confirmation dikonfirmasi
5. THE Customers.jsx SHALL mengikuti pola integrasi yang sama dengan Product.jsx untuk Customer_Service
6. THE Orders.jsx SHALL mengikuti pola integrasi yang sama dengan Product.jsx untuk Order_Service
7. THE System SHALL menggunakan loading state untuk menampilkan SkeletonTable saat fetching data
8. THE System SHALL menggunakan saving state untuk menampilkan loading indicator pada button submit

### Requirement 8: Database Schema Compliance

**User Story:** Sebagai Developer, saya ingin memastikan bahwa service layer mengikuti schema database Supabase yang sudah terdefinisi, sehingga tidak terjadi error foreign key atau type mismatch.

#### Acceptance Criteria

1. THE Product_Service SHALL mengirim data dengan tipe yang sesuai schema public.products (price: numeric, stock: integer)
2. THE Customer_Service SHALL mengirim data dengan tipe yang sesuai schema public.customers (email: varchar unique, phone: varchar nullable)
3. THE Order_Service SHALL mengirim data dengan tipe yang sesuai schema public.sales_orders
4. WHEN Order_Service membuat order baru, THE System SHALL memvalidasi bahwa customer_id exists di public.customers (foreign key constraint)
5. THE Order_Service SHALL menggunakan enum values yang valid untuk status field: 'pending', 'completed', 'cancelled'
6. THE Order_Service SHALL menggunakan enum values yang valid untuk order_type field: 'sales', 'reservation'
7. THE System SHALL menggunakan uuid format untuk semua id fields
8. THE System SHALL menggunakan ISO 8601 format untuk timestamp fields (created_at)

### Requirement 9: Testing dan Verification

**User Story:** Sebagai Developer, saya ingin memverifikasi bahwa integrasi CRUD berfungsi dengan benar sebelum deployment, sehingga user tidak mengalami error saat menggunakan fitur.

#### Acceptance Criteria

1. THE System SHALL dapat melakukan operasi Create untuk Products dan data muncul di Supabase dashboard
2. THE System SHALL dapat melakukan operasi Read untuk Products dan data ditampilkan di UI table
3. THE System SHALL dapat melakukan operasi Update untuk Products dan perubahan tersimpan di database
4. THE System SHALL dapat melakukan operasi Delete untuk Products dan data terhapus dari database dan UI
5. THE System SHALL dapat melakukan operasi CRUD yang sama untuk Customers dengan hasil yang konsisten
6. THE System SHALL dapat melakukan operasi CRUD yang sama untuk Orders dengan hasil yang konsisten
7. WHEN Admin refresh browser, THE System SHALL tetap menampilkan data terbaru dari Supabase (persistence check)
8. THE System SHALL menampilkan data yang konsisten antara Supabase dashboard dan UI application

## Database Design

### Tabel yang Digunakan

#### 1. public.products
```
- id (uuid, primary key, auto-generated)
- name (varchar, required)
- description (text, optional)
- price (numeric, required, default 0)
- stock (integer, required, default 0)
- image_url (text, optional)
- created_at (timestamptz, auto-generated)
```

#### 2. public.customers
```
- id (uuid, primary key, auto-generated)
- full_name (varchar, required)
- email (varchar, required, unique)
- phone (varchar, optional)
- user_id (uuid, optional, foreign key to profiles.id)
- created_at (timestamptz, auto-generated)
```

#### 3. public.sales_orders
```
- id (uuid, primary key, auto-generated)
- customer_id (uuid, required, foreign key to customers.id)
- total_amount (numeric, required, default 0)
- discount_applied (numeric, required, default 0)
- net_amount (numeric, required, default 0)
- status (varchar, required, enum: pending|completed|cancelled)
- order_type (varchar, required, enum: sales|reservation)
- reservation_date (timestamptz, optional)
- notes (text, optional)
- created_at (timestamptz, auto-generated)
```

#### 4. public.order_items (untuk future enhancement)
```
- id (uuid, primary key, auto-generated)
- order_id (uuid, required, foreign key to sales_orders.id)
- product_id (uuid, optional, foreign key to products.id)
- product_name (varchar, required)
- quantity (integer, required, default 1)
- price_per_unit (numeric, required, default 0)
- created_at (timestamptz, auto-generated)
```

### Relasi Tabel

```
customers (1) ----< (N) sales_orders
  |
  └─ (0..1) profiles (user_id foreign key, optional for guest customers)

sales_orders (1) ----< (N) order_items
  |
  └─ (N) >---- (1) products (melalui order_items)
```

## Service Layer Structure

### File Structure
```
src/
└── services/
    ├── usersAPI.js (✅ sudah ada - reference pattern)
    ├── productsAPI.js (🔨 harus dibuat)
    ├── customersAPI.js (🔨 harus dibuat)
    └── ordersAPI.js (🔨 harus dibuat)
```

### Pattern Template (Mengikuti usersAPI.js)

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`
  : "https://fwngivshgcslmzkmtnsf.supabase.co/rest/v1";

const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const [entity]API = {
  async fetch[Entities]() {
    const response = await axios.get(`${API_URL}/[table_name]`, { headers });
    return response.data;
  },

  async create[Entity](data) {
    const response = await axios.post(`${API_URL}/[table_name]`, data, { headers });
    return response.data;
  },

  async update[Entity](id, data) {
    const response = await axios.patch(
      `${API_URL}/[table_name]?id=eq.${id}`,
      data,
      { headers }
    );
    return response.data;
  },

  async delete[Entity](id) {
    const response = await axios.delete(`${API_URL}/[table_name]?id=eq.${id}`, {
      headers,
    });
    return response.data;
  }
};
```

## CRUD Flow

### Create Flow
```
1. User klik button "Tambah" → Dialog form muncul
2. User isi form → klik "Simpan"
3. UI Component set state saving = true
4. Call Service API: create[Entity](formData)
5. Service send POST request ke Supabase REST API
6. Supabase validate & insert ke database
7. Supabase return inserted data
8. UI Component:
   - Set saving = false
   - Close dialog
   - Show success toast
   - Refresh data table (call fetch[Entities]())
```

### Read Flow
```
1. Component mount (useEffect)
2. Set state loading = true
3. Call Service API: fetch[Entities]()
4. Service send GET request ke Supabase REST API
5. Supabase return array of data
6. UI Component:
   - Set loading = false
   - Update state dengan data dari API
   - Render table dengan data baru
```

### Update Flow
```
1. User klik button "Edit" pada row → Dialog form muncul dengan data existing
2. User ubah data → klik "Simpan"
3. UI Component set state saving = true
4. Call Service API: update[Entity](id, formData)
5. Service send PATCH request ke Supabase REST API
6. Supabase validate & update database
7. Supabase return updated data
8. UI Component:
   - Set saving = false
   - Close dialog
   - Show success toast
   - Refresh data table
```

### Delete Flow
```
1. User klik button "Hapus" pada row → Confirmation dialog muncul
2. User confirm delete
3. Call Service API: delete[Entity](id)
4. Service send DELETE request ke Supabase REST API
5. Supabase validate foreign key constraints & delete record
6. UI Component:
   - Show success toast
   - Refresh data table (item hilang dari UI)
```

## Out of Scope

Fitur-fitur berikut **TIDAK TERMASUK** dalam requirement versi ini dan akan diimplementasikan di iterasi selanjutnya:

1. **Membership System Integration**
   - Level membership (Bronze, Silver, Gold, Platinum)
   - Loyalty points calculation
   - Member upgrade logic

2. **Protected Routes dan Authorization**
   - Role-based access control (admin vs member)
   - Route guards untuk protect admin pages
   - Permission checking per operation

3. **Storage dan Image Upload**
   - Upload product images ke Supabase Storage
   - Image preview dan management
   - Product gallery

4. **Order Items Detail**
   - Implementasi tabel order_items
   - Multiple products per order
   - Quantity and price calculation per item

5. **Advanced Features**
   - Search dan filter dengan Supabase query
   - Pagination server-side
   - Real-time updates dengan Supabase subscriptions
   - Export data ke CSV/Excel
   - Data analytics dan reporting

6. **Reservation System**
   - Booking/reservation management
   - Calendar view untuk reservations
   - Reservation status workflow

7. **Guest Checkout**
   - Customer registration dari guest page
   - Public product catalog integration

8. **UI Refactoring**
   - Perubahan layout atau design system
   - Penambahan komponen UI baru
   - Responsiveness improvement

Fokus versi ini adalah: **Backend integration untuk CRUD operations saja**, mengikuti existing code style dan UI yang sudah ada.
