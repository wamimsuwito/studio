
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

interface Lokasi {
  id: number;
  nama: string;
  detail: string;
}

export default function ManajemenLokasiPage() {
  const [lokasiList, setLokasiList] = useState<Lokasi[]>([]);
  const [namaLokasi, setNamaLokasi] = useState('');
  const [detailLokasi, setDetailLokasi] = useState('');

  const handleSimpanLokasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (namaLokasi.trim() === '' || detailLokasi.trim() === '') {
      // You can add a toast notification here for better UX
      return;
    }
    const newLokasi: Lokasi = {
      id: Date.now(),
      nama: namaLokasi,
      detail: detailLokasi,
    };
    setLokasiList([...lokasiList, newLokasi]);
    setNamaLokasi('');
    setDetailLokasi('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Tambah Lokasi Baru</CardTitle>
          <CardDescription>
            Isi formulir di bawah ini untuk menambahkan lokasi baru ke sistem.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSimpanLokasi}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nama-lokasi">Nama Lokasi</Label>
                <Input
                  id="nama-lokasi"
                  placeholder="Contoh: Kantor Cabang Utama"
                  value={namaLokasi}
                  onChange={(e) => setNamaLokasi(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="detail-lokasi">Detail Lokasi</Label>
                <Textarea
                  id="detail-lokasi"
                  placeholder="Masukkan alamat lengkap atau koordinat lokasi..."
                  value={detailLokasi}
                  onChange={(e) => setDetailLokasi(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Simpan Lokasi</Button>
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
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {lokasiList.map((lokasi) => (
                  <TableRow key={lokasi.id}>
                    <TableCell className="font-medium">{lokasi.nama}</TableCell>
                    <TableCell>{lokasi.detail}</TableCell>
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
