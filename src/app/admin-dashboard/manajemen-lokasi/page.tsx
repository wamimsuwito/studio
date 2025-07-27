
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
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
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useLokasi, type Lokasi } from '@/context/LokasiContext';

export default function ManajemenLokasiPage() {
  const { lokasiList, addLokasi, updateLokasi, deleteLokasi } = useLokasi();
  const [namaLokasi, setNamaLokasi] = useState('');
  const [detailLokasi, setDetailLokasi] = useState('');
  const [editingLokasiId, setEditingLokasiId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSimpanLokasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (namaLokasi.trim() === '' || detailLokasi.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Input Tidak Lengkap',
        description: 'Nama dan detail lokasi tidak boleh kosong.',
      });
      return;
    }

    if (editingLokasiId !== null) {
      updateLokasi(editingLokasiId, { nama: namaLokasi, detail: detailLokasi });
      toast({ title: 'Berhasil', description: 'Data lokasi berhasil diperbarui.' });
    } else {
      const newLokasi: Omit<Lokasi, 'id'> = {
        nama: namaLokasi,
        detail: detailLokasi,
      };
      addLokasi(newLokasi);
      toast({ title: 'Berhasil', description: 'Lokasi baru berhasil ditambahkan.' });
    }
    
    resetForm();
  };

  const handleEdit = (lokasi: Lokasi) => {
    setEditingLokasiId(lokasi.id);
    setNamaLokasi(lokasi.nama);
    setDetailLokasi(lokasi.detail);
  };

  const handleDelete = (id: number) => {
    deleteLokasi(id);
    toast({
        variant: 'destructive',
        title: 'Dihapus',
        description: 'Data lokasi telah dihapus.'
    });
  };
  
  const resetForm = () => {
    setEditingLokasiId(null);
    setNamaLokasi('');
    setDetailLokasi('');
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle>{editingLokasiId ? 'Edit Lokasi' : 'Tambah Lokasi Baru'}</CardTitle>
          <CardDescription>
            {editingLokasiId
                ? 'Perbarui detail lokasi di bawah ini.'
                : 'Isi formulir di bawah ini untuk menambahkan lokasi baru.'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSimpanLokasi}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nama-lokasi">Nama Lokasi</Label>
                <Input
                  id="nama-lokasi"
                  placeholder="Contoh: KANTOR CABANG UTAMA"
                  value={namaLokasi}
                  onChange={(e) => setNamaLokasi(e.target.value.toUpperCase())}
                  className="uppercase"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="detail-lokasi">Detail Lokasi</Label>
                <Textarea
                  id="detail-lokasi"
                  placeholder="MASUKKAN ALAMAT LENGKAP ATAU KOORDINAT LOKASI..."
                  value={detailLokasi}
                  onChange={(e) => setDetailLokasi(e.target.value.toUpperCase())}
                  className="uppercase"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-between">
            <Button type="submit">{editingLokasiId ? 'Update Lokasi' : 'Simpan Lokasi'}</Button>
            {editingLokasiId && (
                <Button variant="outline" onClick={resetForm}>Batal</Button>
            )}
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Lokasi</CardTitle>
          <CardDescription>
            Daftar lokasi yang terdaftar dalam sistem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {lokasiList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
              <p className="text-lg">Belum ada data lokasi.</p>
              <p className="text-sm">
                Silakan tambahkan lokasi baru menggunakan formulir di sebelah kiri.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Lokasi</TableHead>
                  <TableHead>Detail</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lokasiList.map((lokasi) => (
                  <TableRow key={lokasi.id}>
                    <TableCell className="font-medium">{lokasi.nama}</TableCell>
                    <TableCell>{lokasi.detail}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(lokasi)}>
                            <Pencil className="w-4 h-4"/>
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                    <Trash2 className="w-4 h-4"/>
                                 </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data lokasi secara permanen.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(lokasi.id)} className="bg-destructive hover:bg-destructive/90">
                                    Hapus
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
