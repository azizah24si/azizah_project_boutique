# 🎨 Komponen Baru - Shadcn UI Style

Dokumentasi untuk 3 komponen baru yang ditambahkan ke project butik Jijah.

---

## 1. 🎉 Toast Notifications

**Lokasi:** `src/components/Toast.jsx`

Toast adalah notifikasi non-intrusive yang muncul di pojok kanan bawah layar. Lebih modern dan tidak mengganggu dibanding Alert.

### Fitur:
- ✅ Auto-dismiss dengan durasi custom
- ✅ 5 variant: default, success, error, warning, info
- ✅ Animasi smooth slide-in/out
- ✅ Dismissible manual dengan tombol close
- ✅ Stack multiple toasts

### Cara Pakai:

```jsx
import { useToast } from "../components/Toast";

function MyComponent() {
  const { addToast } = useToast();

  const handleSuccess = () => {
    addToast({
      title: "Berhasil!",
      description: "Data produk berhasil disimpan.",
      variant: "success",
      duration: 3000, // optional, default 3000ms
    });
  };

  return <button onClick={handleSuccess}>Simpan</button>;
}
```

### Setup:
Wrap App dengan `ToastProvider` di `src/App.jsx`:

```jsx
import { ToastProvider } from "./components/Toast";

function App() {
  return (
    <ToastProvider>
      {/* Your app */}
    </ToastProvider>
  );
}
```

---

## 2. 💬 Dialog Component

**Lokasi:** `src/components/Dialog.jsx`

Dialog adalah alternative Modal yang lebih accessible dengan animasi smooth dan keyboard support (ESC to close).

### Fitur:
- ✅ Backdrop blur effect
- ✅ Keyboard accessible (ESC to close)
- ✅ Click outside to close (optional)
- ✅ Multiple sizes: sm, md, lg, xl, full
- ✅ Custom footer support
- ✅ Smooth animations

### Cara Pakai:

```jsx
import Dialog from "../components/Dialog";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Buka Dialog</button>
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Form Tambah Produk"
        description="Isi form di bawah untuk menambahkan produk"
        size="md"
        footer={
          <div className="flex gap-3">
            <Button onClick={handleSave}>Simpan</Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
          </div>
        }
      >
        {/* Dialog content */}
        <input type="text" placeholder="Nama Produk" />
      </Dialog>
    </>
  );
}
```

### DialogConfirm Variant:

Untuk konfirmasi aksi berbahaya (delete, etc):

```jsx
import { DialogConfirm } from "../components/Dialog";

<DialogConfirm
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  title="Hapus Produk?"
  description="Apakah kamu yakin ingin menghapus produk ini?"
  confirmText="Ya, Hapus"
  cancelText="Batal"
  variant="danger" // danger | primary | success
/>
```

---

## 3. ⏳ Skeleton Loading

**Lokasi:** `src/components/Skeleton.jsx`

Skeleton memberikan feedback visual yang smooth saat data sedang loading, meningkatkan perceived performance.

### Fitur:
- ✅ Multiple variants: default, card, text, circle, avatar
- ✅ Preset components: SkeletonCard, SkeletonTable, SkeletonProduct
- ✅ Pulse animation
- ✅ Fully customizable

### Cara Pakai:

**Basic Skeleton:**
```jsx
import Skeleton from "../components/Skeleton";

<Skeleton className="h-4 w-full" />
<Skeleton className="h-8 w-1/2" />
<Skeleton variant="circle" className="w-10 h-10" />
```

**Preset Components:**
```jsx
import { SkeletonCard, SkeletonTable, SkeletonProduct } from "../components/Skeleton";

function ProductPage() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SkeletonTable rows={5} cols={6} />;
  }

  return <Table data={products} />;
}
```

**Custom Skeleton:**
```jsx
<div className="space-y-3">
  <Skeleton className="h-40 w-full rounded-lg" /> {/* Image */}
  <Skeleton className="h-4 w-3/4" /> {/* Title */}
  <Skeleton className="h-6 w-1/2" /> {/* Price */}
</div>
```

---

## 🎯 Implementasi di Project

### Halaman Product (`src/pages/Product.jsx`)
- ✅ Toast untuk feedback save/delete
- ✅ Dialog untuk form tambah produk
- ✅ DialogConfirm untuk konfirmasi hapus
- ✅ SkeletonTable saat loading data

### Halaman Orders (`src/pages/Orders.jsx`)
- ✅ Toast untuk feedback save
- ✅ Dialog untuk form tambah penjualan
- ✅ SkeletonTable saat loading data

### Demo Page (`/demo`)
Kunjungi `/demo` untuk melihat showcase semua komponen baru dengan contoh interaktif.

---

## 🚀 Keunggulan vs Komponen Lama

| Fitur | Alert (Lama) | Toast (Baru) |
|-------|-------------|--------------|
| Position | Inline | Fixed bottom-right |
| Intrusive | Ya | Tidak |
| Auto-dismiss | Manual | Otomatis |
| Stack | Tidak | Ya |

| Fitur | Modal (Lama) | Dialog (Baru) |
|-------|-------------|---------------|
| Animation | Basic | Smooth fade + slide |
| Backdrop | Solid | Blur effect |
| Keyboard | Basic | Full support (ESC) |
| Accessibility | Good | Better |

| Fitur | Spinner (Lama) | Skeleton (Baru) |
|-------|---------------|-----------------|
| UX | Generic loading | Content-aware |
| Layout Shift | Ya | Tidak |
| Perceived Speed | Slower | Faster |

---

## 📦 Dependencies

Tidak ada dependency tambahan! Semua komponen dibuat dengan:
- React hooks
- Tailwind CSS
- React Icons (sudah ada)

---

## 🎨 Customization

Semua komponen support custom className dan dapat disesuaikan dengan design system project:

```jsx
<Dialog className="custom-dialog" size="xl">
  {/* content */}
</Dialog>

<Skeleton className="bg-pink-200 rounded-3xl" />

<Toast variant="success" duration={5000} />
```

---

**Dibuat untuk:** Jijah Boutique Dashboard  
**Tanggal:** 31 Mei 2026  
**Style:** Shadcn UI inspired
