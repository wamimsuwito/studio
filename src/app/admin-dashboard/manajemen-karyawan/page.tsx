
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Pencil, Trash2 } from 'lucide-react';
import { useLokasi } from '@/context/LokasiContext';
import { useKaryawan } from '@/context/KaryawanContext';
import { useToast } from '@/hooks/use-toast';
import type { Karyawan } from '@/context/KaryawanContext';

export default function ManajemenKaryawanPage() {
  const { lokasiList } = useLokasi();
  const { karyawanList, addKaryawan, updateKaryawan, deleteKaryawan } = useKaryawan();
  const { toast } = useToast();

  const [editingKaryawanId, setEditingKaryawanId] = useState<number | null>(null);
  const [namaKaryawan, setNamaKaryawan] = useState('');
  const [nik, setNik] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [lokasiId, setLokasiId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEditingKaryawanId(null);
    setNamaKaryawan('');
    setNik('');
    setJabatan('');
    setLokasiId('');
    setUsername('');
    setPassword('');
  };

  const handleSimpanKaryawan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKaryawan || !nik || !jabatan || !lokasiId || !username) {
      toast({
        variant: 'destructive',
        title: 'Input Tidak Lengkap',
        description: 'Semua kolom kecuali password harus diisi.',
      });
      return;
    }
    
    // Password is required only when creating a new user, not necessarily when updating
    if (!editingKaryawanId && !password) {
       toast({
        variant: 'destructive',
        title: 'Input Tidak Lengkap',
        description: 'Password harus diisi untuk karyawan baru.',
      });
      return;
    }

    const karyawanData = {
      nama: namaKaryawan,
      nik: nik,
      jabatan: jabatan,
      lokasiId: parseInt(lokasiId, 10),
      username: username,
      ...(password && { password }), // Only include password if it's not empty
    };

    if (editingKaryawanId) {
        updateKaryawan(editingKaryawanId, karyawanData);
        toast({
          title: 'Berhasil',
          description: 'Data karyawan berhasil diperbarui.',
        });
    } else {
        addKaryawan(karyawanData as Omit<Karyawan, 'id'>);
        toast({
          title: 'Berhasil',
          description: 'Karyawan baru berhasil ditambahkan.',
        });
    }

    resetForm();
  };

  const handleEdit = (karyawan: Karyawan) => {
    setEditingKaryawanId(karyawan.id);
    setNamaKaryawan(karyawan.nama);
    setNik(karyawan.nik);
    setJabatan(karyawan.jabatan);
    setLokasiId(karyawan.lokasiId.toString());
    setUsername(karyawan.username);
    setPassword(''); // Clear password field for security
  };

  const handleDelete = (id: number) => {
    deleteKaryawan(id);
    toast({
        variant: 'destructive',
        title: 'Dihapus',
        description: 'Data karyawan telah dihapus.'
    });
  };
  
  const getLokasiName = (id: number) => {
    return lokasiList.find(l => l.id === id)?.nama || 'Tidak Diketahui';
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle>{editingKaryawanId ? 'Edit Karyawan' : 'Tambah Karyawan Baru'}</CardTitle>
          <CardDescription>
            {editingKaryawanId ? 'Perbarui detail karyawan di bawah ini.' : 'Isi formulir di bawah ini untuk menambahkan karyawan baru ke sistem.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="karyawan-form" onSubmit={handleSimpanKaryawan} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nama-karyawan">Nama Karyawan</Label>
              <Input
                id="nama-karyawan"
                placeholder="Contoh: JOHN DOE"
                value={namaKaryawan}
                onChange={(e) => setNamaKaryawan(e.target.value.toUpperCase())}
                className="uppercase"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nik">NIK</Label>
              <Input
                id="nik"
                placeholder="Contoh: 1234567890"
                value={nik}
                onChange={(e) => setNik(e.target.value.toUpperCase())}
                className="uppercase"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="jabatan">Jabatan</Label>
              <Select value={jabatan} onValueChange={setJabatan}>
                <SelectTrigger id="jabatan">
                  <SelectValue placeholder="Pilih jabatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPRATOR">Oprator</SelectItem>
                  <SelectItem value="SOPIR">Sopir</SelectItem>
                  <SelectItem value="MEKANIK">Mekanik</SelectItem>
                  <SelectItem value="HELPER">Helper</SelectItem>
                  <SelectItem value="KEPALA BP">Kepala BP</SelectItem>
                  <SelectItem value="KEPALA QC">Kepala QC</SelectItem>
                  <SelectItem value="KEPALA MEKANIK">Kepala Mekanik</SelectItem>
                  <SelectItem value="KEPALA WORKSHOP">Kepala Workshop</SelectItem>
                  <SelectItem value="KEPALA GUDANG">Kepala Gudang</SelectItem>
                  <SelectItem value="ADMIN BP">Admin BP</SelectItem>
                  <SelectItem value="ADMIN LOGISTIK">Admin Logistik</SelectItem>
                  <SelectItem value="ADMIN QC">Admin QC</SelectItem>
                   <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lokasi">Lokasi</Label>
              <Select value={lokasiId} onValueChange={setLokasiId}>
                <SelectTrigger id="lokasi">
                  <SelectValue placeholder="Pilih lokasi kerja" />
                </SelectTrigger>
                <SelectContent>
                  {lokasiList.length > 0 ? (
                    lokasiList.map((lokasi) => (
                      <SelectItem key={lokasi.id} value={lokasi.id.toString()}>
                        {lokasi.nama}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-location" disabled>
                      Belum ada lokasi, tambahkan di Manajemen Lokasi.
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
             <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Masukkan username untuk login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={editingKaryawanId ? "Kosongkan jika tidak ingin ganti" : "Masukkan password untuk login"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex justify-between">
          <Button type="submit" form="karyawan-form">{editingKaryawanId ? 'Update' : 'Simpan'}</Button>
           {editingKaryawanId && (
                <Button variant="outline" onClick={resetForm}>Batal</Button>
            )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Karyawan</CardTitle>
          <CardDescription>
            Daftar karyawan yang terdaftar dalam sistem.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {karyawanList.length > 0 ? (
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>NIK</TableHead>
                            <TableHead>Jabatan</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Lokasi</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {karyawanList.map((karyawan) => (
                            <TableRow key={karyawan.id}>
                                <TableCell className="font-medium">{karyawan.nama}</TableCell>
                                <TableCell>{karyawan.nik}</TableCell>
                                <TableCell>{karyawan.jabatan}</TableCell>
                                <TableCell>{karyawan.username}</TableCell>
                                <TableCell>{getLokasiName(karyawan.lokasiId)}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(karyawan)}>
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
                                                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data karyawan secara permanen.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(karyawan.id)} className="bg-destructive hover:bg-destructive/90">
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
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                    <p className="text-lg">Belum ada data karyawan.</p>
                    <p className="text-sm">
                      Silakan tambahkan karyawan baru menggunakan formulir di sebelah kiri.
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
