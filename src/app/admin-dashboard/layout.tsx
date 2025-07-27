
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Building, MapPin, Wrench } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Dashboard Admin</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/admin-dashboard/manajemen-karyawan" className="w-full">
                    <SidebarMenuButton tooltip="Manajemen Karyawan" isActive={pathname.startsWith('/admin-dashboard/manajemen-karyawan')}>
                        <Building />
                        Manajemen Karyawan
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/admin-dashboard/manajemen-lokasi" className="w-full">
                    <SidebarMenuButton tooltip="Manajemen Lokasi" isActive={pathname.startsWith('/admin-dashboard/manajemen-lokasi')}>
                        <MapPin />
                        Manajemen Lokasi
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                 <Link href="/admin-dashboard/manajemen-alat" className="w-full">
                    <SidebarMenuButton tooltip="Manajemen Alat" isActive={pathname.startsWith('/admin-dashboard/manajemen-alat')}>
                        <Wrench />
                        Manajemen Alat
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
          <SidebarTrigger />
          <h1 className="flex-1 text-lg font-semibold">Selamat Datang, Admin</h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
