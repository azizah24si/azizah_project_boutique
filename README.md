# 🛍️ Jijah Boutique - Fashion Website & Admin Dashboard

Modern boutique website dengan admin dashboard untuk mengelola produk, penjualan, dan pelanggan.

## 🌟 Features

### 🌐 Guest Website (Public)
- ✨ Modern landing page dengan hero section
- 🛍️ Katalog produk dengan filter & search
- 📱 Responsive design (mobile-friendly)
- 📞 Complete CRM info (telepon, WhatsApp, email, alamat)
- 📅 Sistem reservasi/pemesanan
- 📸 Galeri produk
- 📖 About Us & Team profile
- 💬 Contact page dengan social media links
- ⭐ Customer testimonials
- 📊 Company statistics

### 🔐 Admin Dashboard
- 🔑 Secure authentication system
- 📊 Dashboard analytics
- 🛍️ Product management (CRUD)
- 📦 Orders/Sales management
- 👥 Customer management
- 🔍 Search & Filter data
- 📄 Pagination support
- 🎨 Modern UI with Tailwind CSS
- 🔔 Toast notifications
- ⚡ Fast performance with React + Vite

## 🚀 Tech Stack

- **Frontend Framework:** React 18.3
- **Build Tool:** Vite 6.0
- **Styling:** TailwindCSS 3.4
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Backend/Database:** Supabase
- **UI Components:** Custom + Radix UI

## 📦 Installation

1. Clone repository:
```bash
git clone <repository-url>
cd azizah_project_boutique
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
# Copy .env.example to .env
copy .env.example .env

# Edit .env dengan kredensial Supabase kamu
```

4. Run development server:
```bash
npm run dev
```

5. Open browser:
```
http://localhost:5173
```

## 🗂️ Project Structure

```
azizah_project_boutique/
├── public/                      # Static files
│   ├── fonts/                   # Custom fonts
│   └── img/                     # Images (logo, etc)
│
├── src/
│   ├── guest/                   # 🌐 GUEST AREA (Public Website)
│   │   ├── layouts/
│   │   │   └── GuestLayout.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Reservation.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── About.jsx
│   │   │   └── Gallery.jsx
│   │   └── components/
│   │       ├── Navbar.jsx
│   │       ├── Footer.jsx
│   │       ├── Hero.jsx
│   │       └── ProductCard.jsx
│   │
│   ├── layouts/                 # 🔐 ADMIN LAYOUTS
│   │   ├── MainLayout.jsx       # Admin dashboard layout
│   │   └── AuthLayout.jsx       # Login/Register layout
│   │
│   ├── pages/                   # 🔐 ADMIN PAGES
│   │   ├── Dashboard.jsx
│   │   ├── Product.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetail.jsx
│   │   ├── Customers.jsx
│   │   └── auth/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       └── Forgot.jsx
│   │
│   ├── components/              # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Table.jsx
│   │   ├── Modal.jsx
│   │   ├── Dialog.jsx
│   │   ├── Toast.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── ... (many more)
│   │
│   ├── services/                # API services
│   │   └── usersAPI.js
│   │
│   ├── lib/                     # Utilities
│   │   ├── supabase.js
│   │   └── utils.js
│   │
│   ├── data/                    # Mock/Static data
│   │   └── customersData.js
│   │
│   ├── App.jsx                  # Main routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
│
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── package.json
├── vite.config.js
├── tailwind.config.js
├── STRUKTUR_PROJECT.md          # Detailed project structure
└── README.md                    # This file
```

## 🌐 Routes

### Guest Routes (Public)
| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page |
| `/guest` | Home | Guest homepage |
| `/guest/products` | Products | Product catalog |
| `/guest/products/:id` | ProductDetail | Product detail |
| `/guest/reservation` | Reservation | Booking form |
| `/guest/contact` | Contact | Contact info + CRM |
| `/guest/about` | About | About us & team |
| `/guest/gallery` | Gallery | Product gallery |

### Admin Routes (Protected)
| Path | Component | Description |
|------|-----------|-------------|
| `/admin` | Dashboard | Admin dashboard |
| `/admin/product` | Product | Product management |
| `/admin/product/:id` | ProductDetail | Product detail |
| `/admin/orders` | Orders | Sales management |
| `/admin/orders/:id` | OrderDetail | Order detail |
| `/admin/customers` | Customers | Customer management |

### Auth Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/login` | Login | Admin login |
| `/register` | Register | Admin register |
| `/forgot` | Forgot | Forgot password |

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--cyan-400: #22d3ee
--cyan-500: #06b6d4
--teal-400: #2dd4bf
--teal-500: #14b8a6

/* Secondary Colors */
--pink-400: #f472b6
--pink-500: #ec4899
--rose-500: #f43f5e

/* Neutral Colors */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-500: #6b7280
--gray-700: #374151
--gray-800: #1f2937
```

### Typography
- **Heading:** Bold, large sizes
- **Body:** Regular weight
- **Small:** text-sm, text-xs

## 📱 Responsive Breakpoints
```
sm: 640px   (mobile)
md: 768px   (tablet)
lg: 1024px  (laptop)
xl: 1280px  (desktop)
2xl: 1536px (large desktop)
```

## 🔐 Authentication Flow

1. User masuk ke `/login`
2. Input email & password
3. Sistem validasi via Supabase
4. Jika valid:
   - Save user data ke `localStorage`
   - Redirect ke `/admin`
5. Jika invalid:
   - Show error message
6. Logout:
   - Clear `localStorage`
   - Redirect ke `/login`

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 📞 Contact Information (CRM)

Informasi kontak boutique yang ditampilkan di website:

- **Telepon:** +62 812-3456-7890
- **WhatsApp:** https://wa.me/6281234567890
- **Email:** info@jijahboutique.com
- **Alamat:** Jl. Fashion Boulevard No. 123, Jakarta Selatan, DKI Jakarta 12345
- **Jam Operasional:**
  - Senin - Jumat: 09:00 - 21:00 WIB
  - Sabtu: 09:00 - 22:00 WIB
  - Minggu: 10:00 - 21:00 WIB
- **Social Media:**
  - Instagram: @jijahboutique
  - Facebook: Jijah Boutique
  - TikTok: @jijahboutique
  - WhatsApp Business

## 🔧 Environment Variables

Create `.env` file in root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Database Schema (Supabase)

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  name VARCHAR,
  role VARCHAR DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The `dist` folder will be created with optimized production build.

### Deploy to Hosting
You can deploy to:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 🐛 Common Issues

### Issue: Route not found in production
**Solution:** Configure server to redirect all routes to `index.html`

### Issue: Environment variables not working
**Solution:** Make sure variables start with `VITE_` prefix

### Issue: Supabase connection error
**Solution:** Check `.env` credentials and Supabase project status

## 📚 Documentation

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes.

## 👩‍💻 Developer

Built with ❤️ for Jijah Boutique

---

**Version:** 1.0.0  
**Last Updated:** June 2026
