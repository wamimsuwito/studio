
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ManajemenLokasiPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Lokasi Baru</CardTitle>
            <CardDescription>
              Isi formulir di bawah ini untuk menambahkan lokasi baru ke sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nama-lokasi">Nama Lokasi</Label>
                <Input id="nama-lokasi" placeholder="Contoh: Kantor Cabang Utama" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="detail-lokasi">Detail Lokasi</Label>
                <Textarea
                  id="detail-lokasi"
                  placeholder="Masukkan alamat lengkap atau koordinat lokasi..."
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Simpan Lokasi</Button>
          </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Daftar Lokasi</CardTitle>
                <CardDescription>Daftar lokasi yang terdaftar dalam sistem.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <p className="text-lg">Belum ada data lokasi.</p>
                    <p className="text-sm">Silakan tambahkan lokasi baru menggunakan formulir di sebelah kiri.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
