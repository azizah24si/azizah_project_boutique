# � Struktur Project Jijah Boutique

## 🎯 Overview
Project ini adalah website boutique dengan 2 bagian utama:
1. **Guest Area** - Website publik untuk customer (tanpa login)
2. **Admin Area** - Dashboard untuk mengelola boutique (perlu login)

---

## 🌐 GUEST AREA (Public Website)

### 📂 Folder Structure
```
src/guest/
├── layouts/
│   └── GuestLayout.jsx          # Layout utama guest (Navbar + Footer)
├── pages/
│   ├── Home.jsx                 # Landing page dengan hero, featured products
│   ├── Products.jsx             # Halaman daftar produk
│   ├── ProductDetail.jsx        # Detail produk
│   ├── Reservation.jsx          # Form reservasi/pemesanan
│   ├── Contact.jsx              # Halaman kontak + info boutique
│   ├── About.jsx                # Tentang kami, cerita, tim
│   └── Gallery.jsx              # Galeri produk/foto
└── components/
    ├── Navbar.jsx               # Navigation bar dengan menu guest
    ├── Footer.jsx               # Footer dengan info lengkap
    ├── Hero.jsx                 # Hero section di homepage
    └── ProductCard.jsx          # Card produk reusable
```

### 🔗 Guest Routes
| Path | Page | Deskripsi |
|------|------|-----------|
| `/` atau `/guest` | Home | Landing page utama |
| `/guest/products` | Products | Katalog produk |
| `/guest/products/:id` | ProductDetail | Detail produk |
| `/guest/reservation` | Reservation | Form reservasi/pemesanan |
| `/guest/contact` | Contact | Kontak & info boutique |
| `/guest/about` | About | Tentang kami & tim |
| `/guest/gallery` | Gallery | Galeri foto produk |

### 📞 Info CRM di Guest Area
**Navbar Top Bar:**
- Telepon: +62 812-3456-7890
- WhatsApp Link
- Jam Operasional: 09.00 - 21.00 WIB

**Contact Page:**
- ☎️ Telepon
- 📱 WhatsApp (chat langsung)
- 📧 Email: info@jijahboutique.com
- 📍 Alamat: Jl. Fashion Boulevard No. 123, Jakarta Selatan
- 🕐 Jam Operasional Lengkap
- 🌐 Social Media (Instagram, Facebook, TikTok, WhatsApp Business)

**About Page:**
- Cerita boutique
- Nilai-nilai perusahaan
- Timeline perjalanan
- Profil tim
- Statistik (500+ produk, 2300+ customers, 4.9★ rating)

---

## 🔐 ADMIN AREA (Dashboard)

### 📂 Folder Structure
```
src/
├── layouts/
│   ├── MainLayout.jsx           # Layout admin (Sidebar + Header)
│   └── AuthLayout.jsx           # Layout untuk login/register
├── pages/
│   ├── Dashboard.jsx            # Dashboard utama
│   ├── Product.jsx              # Data produk
│   ├── ProductDetail.jsx        # Detail produk admin
│   ├── Orders.jsx               # Data penjualan
│   ├── OrderDetail.jsx          # Detail order
│   ├── Customers.jsx            # Data pelanggan
│   └── auth/
│       ├── Login.jsx            # Halaman login
│       ├── Register.jsx         # Halaman register
│       └── Forgot.jsx           # Forgot password
├── components/
│   ├── Sidebar.jsx              # Sidebar navigasi admin
│   ├── Header.jsx               # Header admin
│   └── [components lainnya]     # Button, Table, Modal, dll
└── services/
    └── usersAPI.js              # API untuk autentikasi
```

### 🔗 Admin Routes
| Path | Page | Deskripsi |
|------|------|-----------|
| `/admin` | Dashboard | Dashboard utama admin |
| `/admin/product` | Product | Data produk boutique |
| `/admin/product/:id` | ProductDetail | Detail produk |
| `/admin/orders` | Orders | Data penjualan |
| `/admin/orders/:id` | OrderDetail | Detail order |
| `/admin/customers` | Customers | Data pelanggan |
| `/login` | Login | Halaman login admin |
| `/register` | Register | Halaman register |

### 🔑 Autentikasi
- Login melalui `/login`
- Setelah login berhasil → redirect ke `/admin`
- Data user disimpan di `localStorage`
- Logout menghapus data dan redirect ke `/login`

---

## 🎨 Design System

### Warna Tema (Sama untuk Guest & Admin)
- **Primary:** Cyan/Teal (#06b6d4, #14b8a6)
- **Secondary:** Pink/Rose (#ec4899, #f43f5e)
- **Accent:** Purple, Orange, Yellow
- **Neutral:** Gray scale untuk teks dan background

### Typography
- Font: Default system font
- Heading: Bold, gradient text untuk highlight
- Body: Regular, gray untuk readability

### Komponen UI
Tersedia di `src/components/`:
- Button, Input, Select, Table
- Modal, Dialog, Toast, Alert
- Badge, Avatar, Skeleton
- Pagination, Tabs, Dropdown
- Dan banyak lagi...

---

## � Cara Menjalankan

### Development
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📦 Teknologi

- **Framework:** React 18 + Vite
- **Styling:** TailwindCSS
- **Routing:** React Router v6
- **Icons:** React Icons
- **HTTP Client:** Axios
- **Backend:** Supabase (untuk data users)

---

## 🔄 Flow User

### Guest Flow
1. User buka website → Landing di `/` (Guest Home)
2. Lihat produk → `/guest/products`
3. Klik produk → `/guest/products/:id`
4. Mau reservasi → `/guest/reservation`
5. Butuh info kontak → `/guest/contact`
6. Mau tahu lebih lanjut → `/guest/about`

### Admin Flow
1. Admin buka `/login`
2. Login dengan email & password
3. Redirect ke `/admin` (Dashboard)
4. Akses menu:
   - Produk: `/admin/product`
   - Penjualan: `/admin/orders`
   - Pelanggan: `/admin/customers`
5. Logout → kembali ke `/login`

---

## 📝 Notes

### Perbedaan Guest vs Admin
✅ **GUEST:**
- Tidak perlu login
- Akses terbatas (view only)
- Fokus: Lihat produk, reservasi, kontak
- UI: Lebih marketing-oriented, colorful, engaging
- Navbar horizontal + Footer lengkap

✅ **ADMIN:**
- Harus login terlebih dahulu
- Full access: CRUD produk, orders, customers
- Fokus: Mengelola data boutique
- UI: Dashboard professional dengan sidebar
- Sidebar vertical + Header admin

### File Penting
- **App.jsx** - Routing utama (Guest & Admin routes)
- **main.jsx** - Entry point aplikasi
- **index.css** - Global styles
- **.env** - Environment variables (API keys, dll)

---

## 🎯 Next Steps / Roadmap

### Guest Area
- [ ] Integrasi dengan backend untuk produk real
- [ ] Shopping cart functionality
- [ ] Payment gateway integration
- [ ] Order tracking untuk customer
- [ ] Customer reviews & ratings

### Admin Area
- [ ] Dashboard analytics (chart, stats)
- [ ] Image upload untuk produk
- [ ] Export data (Excel/PDF)
- [ ] Advanced filters & search
- [ ] Role management (Super Admin, Staff, dll)

### General
- [ ] SEO optimization
- [ ] PWA (Progressive Web App)
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode

---

**Last Updated:** June 2026  
**Developer:** Built with ❤️ for Jijah Boutique
