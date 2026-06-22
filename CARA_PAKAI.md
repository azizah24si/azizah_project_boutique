# 📖 Cara Menggunakan Aplikasi Jijah Boutique

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Development Server
```bash
npm run dev
```

### 3. Buka Browser
```
http://localhost:5173
```

---

## 🔐 Login & Register

### Mode Development (Tanpa Supabase)
Aplikasi secara otomatis menggunakan **Mock API dengan LocalStorage** jika Supabase belum dikonfigurasi.

#### Default Admin Account:
- **Email:** `admin@jijahboutique.com`
- **Password:** `admin123`

#### Register User Baru:
1. Buka `/register`
2. Isi form dengan data:
   - Name: Nama lengkap
   - Email: Email valid
   - Password: Password minimal 6 karakter
3. Klik "SIGN UP"
4. Setelah berhasil, redirect ke `/login`
5. Login dengan email dan password yang baru dibuat

### Mode Production (Dengan Supabase)
Untuk menggunakan database Supabase real:

1. **Buka file `.env`** di root project
2. **Edit konfigurasi:**
   ```env
   VITE_SUPABASE_URL=https://fwngivshgcslmzkmtnsf.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJxxxxx... (API key yang benar)
   ```
3. **Dapatkan API key dari:**
   - Login ke https://supabase.com
   - Pilih project kamu
   - Settings → API
   - Copy "anon" / "public" key (yang panjang mulai dengan "eyJ...")

4. **Restart development server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

---

## 🌐 Halaman Guest (Public Website)

Akses tanpa login:

### Homepage
```
http://localhost:5173/
atau
http://localhost:5173/guest
```

### Halaman-halaman Guest:
| URL | Deskripsi |
|-----|-----------|
| `/guest` | Homepage dengan hero & featured products |
| `/guest/products` | Katalog produk lengkap |
| `/guest/products/1` | Detail produk (ganti 1 dengan ID) |
| `/guest/reservation` | Form reservasi/pemesanan |
| `/guest/contact` | Info kontak boutique |
| `/guest/about` | Tentang kami & tim |
| `/guest/gallery` | Galeri foto produk |

### Fitur Guest:
- ✅ Lihat produk tanpa login
- ✅ Form reservasi
- ✅ Info lengkap boutique (CRM)
- ✅ Kontak: Telepon, WhatsApp, Email, Alamat
- ✅ Social media links
- ✅ Jam operasional
- ✅ Testimoni customer
- ✅ Statistik perusahaan

---

## 🔐 Halaman Admin (Dashboard)

Harus login terlebih dahulu!

### Login
```
http://localhost:5173/login
```

Gunakan:
- Email: `admin@jijahboutique.com`
- Password: `admin123`

### Halaman-halaman Admin:
| URL | Deskripsi |
|-----|-----------|
| `/admin` | Dashboard utama |
| `/admin/product` | Kelola produk (CRUD) |
| `/admin/product/PRD-1` | Detail produk |
| `/admin/orders` | Kelola penjualan |
| `/admin/orders/ORD-1` | Detail order |
| `/admin/customers` | Kelola pelanggan |

### Fitur Admin:
- ✅ Dashboard dengan statistik
- ✅ CRUD Produk (Create, Read, Update, Delete)
- ✅ Kelola Orders/Penjualan
- ✅ Kelola Data Pelanggan
- ✅ Search & Filter data
- ✅ Pagination
- ✅ Toast notifications
- ✅ Modal & Dialog konfirmasi

---

## 📱 Struktur Folder

```
src/
├── guest/              ← 🌐 GUEST AREA (Public)
│   ├── layouts/
│   ├── pages/
│   └── components/
│
├── pages/              ← 🔐 ADMIN PAGES
│   ├── Dashboard.jsx
│   ├── Product.jsx
│   ├── Orders.jsx
│   ├── Customers.jsx
│   └── auth/
│       ├── Login.jsx
│       ├── Register.jsx
│       └── Forgot.jsx
│
├── layouts/            ← Layouts
│   ├── MainLayout.jsx    (Admin)
│   └── AuthLayout.jsx    (Login/Register)
│
├── components/         ← Reusable components
├── services/           ← API services
└── lib/                ← Utilities
```

---

## 🐛 Troubleshooting

### ❌ Error: "Network Error" saat Register
**Penyebab:** Supabase API key belum dikonfigurasi atau salah

**Solusi:**
1. Aplikasi otomatis pakai Mock API (LocalStorage)
2. Data tersimpan di browser, bukan database
3. Untuk pakai database real, configure `.env` dengan API key yang benar

### ❌ Error: "Cannot GET /admin" di production
**Penyebab:** Server tidak redirect semua route ke `index.html`

**Solusi:**
- Vercel: Buat `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/" }]
  }
  ```
- Netlify: Buat `_redirects` di folder `public/`:
  ```
  /*    /index.html   200
  ```

### ❌ Login tidak berfungsi
**Cek:**
1. Apakah email & password benar?
   - Default: `admin@jijahboutique.com` / `admin123`
2. Apakah sudah register user?
3. Cek console browser (F12) untuk error
4. Cek localStorage: Application → Local Storage → `mock_users`

### ❌ Data hilang setelah refresh
**Penyebab:** Pakai Mock API (LocalStorage) dan cache browser di-clear

**Solusi:**
- Data mock tersimpan di browser
- Jangan clear cache/localStorage
- Atau pakai Supabase untuk database persistent

### ❌ "Module not found" error
**Solusi:**
```bash
npm install
```

### ❌ Port sudah dipakai
**Solusi:**
```bash
# Matikan proses yang pakai port 5173
# Atau Vite otomatis pakai port lain (5174, 5175, dll)
```

---

## 🎨 Customization

### Ganti Warna Tema
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...},
    }
  }
}
```

### Ganti Info Kontak (CRM)
Edit file-file berikut:
- `src/guest/components/Navbar.jsx` (Top bar)
- `src/guest/pages/Contact.jsx` (Halaman kontak)
- `src/guest/components/Footer.jsx` (Footer)

Ganti:
- Nomor telepon: `+62 812-3456-7890`
- Email: `info@jijahboutique.com`
- Alamat: `Jl. Fashion Boulevard No. 123, Jakarta Selatan`
- Social media: Instagram, Facebook, TikTok, WhatsApp

### Ganti Logo
Letakkan file logo di `public/img/logojijah.png`

---

## 📊 Data Storage

### Development Mode (Mock API):
- **Storage:** Browser LocalStorage
- **Location:** `localStorage.getItem('mock_users')`
- **Persistence:** Sampai browser cache di-clear
- **Share:** Tidak bisa, hanya di browser lokal

### Production Mode (Supabase):
- **Storage:** Database PostgreSQL (Supabase)
- **Location:** Cloud server
- **Persistence:** Permanent
- **Share:** Bisa diakses dari mana saja

---

## 🚀 Build & Deploy

### Build Production
```bash
npm run build
```
File hasil ada di folder `dist/`

### Preview Production Build
```bash
npm run preview
```

### Deploy ke Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy ke Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build & deploy
npm run build
netlify deploy --prod --dir=dist
```

---

## 📝 Tips Development

1. **Gunakan Mock API dulu** untuk development cepat
2. **Configure Supabase** saat mau production
3. **Test di berbagai browser** (Chrome, Firefox, Safari)
4. **Test responsive** di berbagai ukuran layar
5. **Clear cache** jika ada masalah loading
6. **Cek console** (F12) untuk error messages

---

## 🆘 Butuh Bantuan?

### Console Messages
Saat app running, cek console browser (F12):
- `🔧 Mode: DEVELOPMENT` → Pakai Mock API
- `✅ Mode: PRODUCTION` → Pakai Supabase API
- `📝 Default admin: ...` → Info login default

### Log Mock Users
Di browser console:
```javascript
// Lihat semua users
JSON.parse(localStorage.getItem('mock_users'))

// Hapus semua users (reset)
localStorage.removeItem('mock_users')

// Refresh page untuk re-initialize default admin
location.reload()
```

---

## 📞 Contact Support

- **Email:** info@jijahboutique.com
- **WhatsApp:** +62 812-3456-7890

---

**Happy Coding! 🎉**
