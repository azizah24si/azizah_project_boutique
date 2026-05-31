# 📦 Instalasi Shadcn UI - Project Boutique Jijah

Dokumentasi lengkap instalasi shadcn/ui sesuai modul pembelajaran.

---

## 🔧 Langkah 1: Konfigurasi Awal (JSX)

### 1.1 Buat `jsconfig.json`

Buat file baru `jsconfig.json` di root project sejajar dengan `package.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 1.2 Edit `vite.config.js`

Tambahkan resolve dan import path:

```javascript
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### 1.3 Install Dependency Alias

```bash
npm install -D @types/node
```

**Output:**
```
added 2 packages, and audited 203 packages in 2s
```

---

## 🎨 Langkah 2: Instalasi shadcn/ui

### 2.1 Jalankan Init Command

```bash
npx shadcn@latest init
```

**Pertanyaan yang muncul:**
- ✅ Select a component library: **Radix**
- ✅ Which preset would you like to use: **Nova**

**Output:**
```
✔ Preflight checks.
✔ Verifying framework. Found Vite.
✔ Validating Tailwind CSS. Found v4.
✔ Validating import alias.
✔ Created components.json
```

### 2.2 Install Utility Dependencies

```bash
npm install clsx tailwind-merge
```

### 2.3 Buat File Utils

Buat file `src/lib/utils.js`:

```javascript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

---

## 📦 Langkah 3: Install Komponen

### 3.1 Install Skeleton Component

```bash
npx shadcn@latest add skeleton
```

**Output:**
```
√ Checking registry.
√ Created 1 file:
  - src\components\ui\skeleton.jsx
```

### 3.2 Install Dialog Component

```bash
npx shadcn@latest add dialog
```

**Output:**
```
√ Checking registry.
√ Created 1 file:
  - src\components\ui\dialog.jsx
i Skipped 1 file: (files might be identical, use --overwrite to overwrite)
  - src\components\ui\button.jsx
```

### 3.3 Install Alert Dialog Component

```bash
npx shadcn@latest add alert-dialog
```

**Output:**
```
√ Checking registry.
√ Created 1 file:
  - src\components\ui\alert-dialog.jsx
i Skipped 1 file: (files might be identical, use --overwrite to overwrite)
  - src\components\ui\button.jsx
```

---

## ✅ Verifikasi Instalasi

### Struktur Folder yang Terbentuk:

```
src/
├── components/
│   └── ui/
│       ├── skeleton.jsx       ✓ Installed
│       ├── dialog.jsx         ✓ Installed
│       ├── alert-dialog.jsx   ✓ Installed
│       └── button.jsx         ✓ Installed
└── lib/
    └── utils.js               ✓ Created
```

### File Konfigurasi:

```
root/
├── jsconfig.json              ✓ Created
├── components.json            ✓ Created
└── vite.config.js             ✓ Updated
```

---

## 🎯 Komponen yang Berhasil Diinstall

| No | Komponen | File | Status |
|----|----------|------|--------|
| 1 | Skeleton | `src/components/ui/skeleton.jsx` | ✅ |
| 2 | Dialog | `src/components/ui/dialog.jsx` | ✅ |
| 3 | Alert Dialog | `src/components/ui/alert-dialog.jsx` | ✅ |
| 4 | Button | `src/components/ui/button.jsx` | ✅ |

---

## 🚀 Cara Menggunakan

### Import Komponen:

```jsx
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
```

### Contoh Penggunaan:

```jsx
// Button
<Button>Click me</Button>
<Button variant="destructive">Delete</Button>

// Skeleton
<Skeleton className="h-4 w-full" />

// Dialog
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>

// Alert Dialog
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## 🎨 Demo Page

Kunjungi halaman demo untuk melihat semua komponen:

```
http://localhost:5173/shadcn
```

---

## 📊 Build Test

```bash
npm run build
```

**Output:**
```
✓ 1923 modules transformed.
dist/assets/ShadcnDemo-DUYw60Uz.js    77.25 kB │ gzip: 24.45 kB
✓ built in 2.34s
```

✅ **Build berhasil tanpa error!**

---

## 🎓 Catatan untuk Laporan

### Screenshot yang Perlu Diambil:

1. ✅ Output `npx shadcn@latest add skeleton`
2. ✅ Output `npx shadcn@latest add dialog`
3. ✅ Output `npx shadcn@latest add alert-dialog`
4. ✅ Struktur folder `src/components/ui/`
5. ✅ Halaman demo `/shadcn` di browser
6. ✅ Output `npm run build`

### Komponen yang Digunakan:

- **Skeleton**: Loading placeholder untuk UX yang lebih baik
- **Dialog**: Modal untuk form input dan detail
- **Alert Dialog**: Konfirmasi untuk aksi penting (delete, etc)
- **Button**: Tombol dengan berbagai variant

---

## 🔗 Referensi

- Dokumentasi Shadcn UI: https://ui.shadcn.com
- Radix UI: https://www.radix-ui.com
- Tailwind CSS: https://tailwindcss.com

---

**Project:** Jijah Boutique Dashboard  
**Tanggal:** 31 Mei 2026  
**Preset:** Radix Nova  
**Status:** ✅ Instalasi Berhasil
