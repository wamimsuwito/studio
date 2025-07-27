
'use client';

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

export default function ManajemenKaryawanPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Karyawan Baru</CardTitle>
            <CardDescription>
              Isi formulir di bawah ini untuk menambahkan karyawan baru ke sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nama-karyawan">Nama Karyawan</Label>
                <Input id="nama-karyawan" placeholder="Contoh: John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nik">NIK</Label>
                <Input id="nik" placeholder="Contoh: 1234567890" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jabatan">Jabatan</Label>
                <Select>
                  <SelectTrigger id="jabatan">
                    <SelectValue placeholder="Pilih jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oprator">Oprator</SelectItem>
                    <SelectItem value="sopir">Sopir</SelectItem>
                    <SelectItem value="mekanik">Mekanik</SelectItem>
                    <SelectItem value="helper">Helper</SelectItem>
                    <SelectItem value="kepala-bp">Kepala BP</SelectItem>
                    <SelectItem value="kepala-qc">Kepala QC</SelectItem>
                    <SelectItem value="kepala-mekanik">Kepala Mekanik</SelectItem>
                    <SelectItem value="kepala-workshop">Kepala Workshop</SelectItem>
                    <SelectItem value="kepala-gudang">Kepala Gudang</SelectItem>
                    <SelectItem value="admin-bp">Admin BP</SelectItem>
                    <SelectItem value="admin-logistik">Admin Logistik</SelectItem>
                    <SelectItem value="admin-qc">Admin QC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lokasi">Lokasi</Label>
                <Select>
                  <SelectTrigger id="lokasi">
                    <SelectValue placeholder="Pilih lokasi kerja" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kantor-pusat">Kantor Pusat</SelectItem>
                    <SelectItem value="cabang-a">Cabang A</SelectItem>
                    <SelectItem value="cabang-b">Cabang B</SelectItem>
                    <SelectItem value="proyek-x">Proyek X</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Simpan</Button>
          </CardFooter>
        </Card>
        
        {/* You can add another card here for displaying employee list */}
        <Card>
            <CardHeader>
                <CardTitle>Daftar Karyawan</CardTitle>
                <CardDescription>Daftar karyawan yang terdaftar dalam sistem.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                    <p className="text-lg">Belum ada data karyawan.</p>
                    <p className="text-sm">Silakan tambahkan karyawan baru menggunakan formulir di sebelah kiri.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
