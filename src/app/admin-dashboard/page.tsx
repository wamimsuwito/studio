
'use client';

export default function AdminDashboardPage() {
  return (
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Pilih menu dari sidebar untuk memulai
        </h2>
        <p className="text-muted-foreground">
          Anda dapat mengelola karyawan, lokasi, dan alat dari sini.
        </p>
      </div>
    </div>
  );
}
