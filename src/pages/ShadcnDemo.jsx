import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";

export default function ShadcnDemo() {
  const [loading, setLoading] = useState(false);

  const handleLoadData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen space-y-8">
      <PageHeader
        title="Shadcn UI Component Library"
        breadcrumb={["Dashboard", "Shadcn Demo"]}
      />

      {/* SKELETON DEMO */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          ⏳ Skeleton Component
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Skeleton loading dari shadcn/ui untuk feedback visual saat loading data.
        </p>
        <Button onClick={handleLoadData} disabled={loading}>
          {loading ? "Loading..." : "Simulasi Loading"}
        </Button>

        {loading && (
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
        )}
      </div>

      {/* DIALOG DEMO */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          💬 Dialog Component
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Dialog modal dari shadcn/ui dengan animasi smooth dan accessible.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Buka Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form Tambah Produk Boutique</DialogTitle>
              <DialogDescription>
                Isi form di bawah untuk menambahkan produk baru ke sistem boutique.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nama Produk
                </label>
                <input
                  id="name"
                  placeholder="Contoh: Dress Floral Pink"
                  className="px-3 py-2 border rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Harga
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="150000"
                  className="px-3 py-2 border rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="stock" className="text-sm font-medium">
                  Stok
                </label>
                <input
                  id="stock"
                  type="number"
                  placeholder="10"
                  className="px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan Produk</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* ALERT DIALOG DEMO */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          ⚠️ Alert Dialog Component
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Alert Dialog untuk konfirmasi aksi penting seperti hapus data.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Hapus Produk</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Aksi ini tidak dapat dibatalkan. Produk akan dihapus secara permanen
                dari database boutique.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction>Ya, Hapus</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* BUTTON VARIANTS */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          🎨 Button Variants
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Berbagai variant button dari shadcn/ui.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* INFO BOX */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-cyan-800 mb-2">
          ✅ Instalasi Berhasil!
        </h3>
        <p className="text-sm text-cyan-700 mb-4">
          Komponen shadcn/ui sudah berhasil diinstall dan siap digunakan untuk project boutique.
        </p>
        <div className="bg-white rounded-lg p-4 text-sm font-mono text-gray-700">
          <p className="text-cyan-600 font-bold mb-2">Komponen yang terinstall:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>✓ Skeleton - Loading placeholder</li>
            <li>✓ Dialog - Modal component</li>
            <li>✓ Alert Dialog - Confirmation dialog</li>
            <li>✓ Button - Button variants</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
