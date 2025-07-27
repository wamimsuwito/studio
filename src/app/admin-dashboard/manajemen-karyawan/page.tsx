
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
import { useLokasi } from '@/context/LokasiContext';

export default function ManajemenKaryawanPage() {
  const { lokasiList } = useLokasi();
  const [namaKaryawan, setNamaKaryawan] = useState('');
  const [nik, setNik] = useState('');

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
