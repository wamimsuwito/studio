
'use client';

import {
  DollarSign,
  FileText,
  Mail,
  CalendarClock,
  WifiOff,
  Wallet,
  Award,
  ClipboardList,
  Users,
  FilePenLine,
  Megaphone,
  Send,
  Power,
  ChevronLeft,
  Grid,
  Menu as MenuIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const menuItems = [
  { icon: DollarSign, label: 'Slip Gaji' },
  { icon: FileText, label: 'SPK' },
  { icon: Mail, label: 'Surat' },
  { icon: CalendarClock, label: 'Absen' },
  { icon: WifiOff, label: 'Offline' },
  { icon: Wallet, label: 'Sisa Kasbon' },
  { icon: Award, label: 'Karirku' },
  { icon: ClipboardList, label: 'Tugas Harian' },
  { icon: Users, label: 'Meeting' },
  { icon: FilePenLine, label: 'Pengajuan Izin' },
  { icon: Megaphone, label: 'Pengaduan' },
  { icon: Send, label: 'Penugasan' },
];

const MenuItem = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <div className="flex flex-col items-center space-y-2">
    <Button
      variant="ghost"
      className="bg-accent text-accent-foreground rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-accent/90"
    >
      <Icon className="w-10 h-10" />
    </Button>
    <p className="text-sm font-medium text-center text-gray-700">{label}</p>
  </div>
);

export default function MenuPage() {
    const router = useRouter();

    const handleLogout = () => {
        // Here you can add any logout logic, like clearing tokens
        router.push('/');
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-gray-800">
          <div className="relative flex flex-col h-screen w-full max-w-sm bg-gray-50 font-sans shadow-2xl overflow-hidden">
            <header className="bg-accent text-accent-foreground p-4 flex justify-between items-center">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                </Link>
                <h1 className="text-lg font-bold">PT. FARIKA RIAU PERKASA</h1>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <Power className="w-6 h-6" />
                </Button>
            </header>
            
            <div className="bg-accent p-4 text-accent-foreground flex items-center space-x-4">
                <div className="bg-white/30 p-3 rounded-full">
                    <Users className="w-8 h-8"/>
                </div>
                <div>
                    <p className="text-sm">FRP - 0007</p>
                    <p className="font-bold text-lg">EZRA WAMIN HUTABARAT</p>
                    <p className="text-xs font-semibold tracking-wider bg-yellow-400 text-black px-2 py-0.5 rounded-full inline-block mt-1">KADEPT. TEKNIK</p>
                </div>
            </div>

            <main className="flex-grow p-4 overflow-y-auto">
              <div className="grid grid-cols-3 gap-y-6 gap-x-4">
                {menuItems.map((item, index) => (
                  <MenuItem key={index} icon={item.icon} label={item.label} />
                ))}
              </div>
            </main>

            <footer className="w-full bg-background flex justify-center items-center p-2 text-white flex-shrink-0">
                <div className="w-full flex justify-around items-center max-w-xs">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="text-white">
                          <MenuIcon size={28} />
                        </Button>
                    </Link>
                    <Link href="/absen">
                      <Button variant="ghost" size="icon" className="bg-accent text-white rounded-full w-16 h-16 shadow-lg hover:bg-accent/90">
                          <span className="text-4xl font-bold">A</span>
                      </Button>
                    </Link>
                    <Link href="/menu">
                      <Button variant="ghost" className="text-white">
                        <Grid size={28} />
                      </Button>
                    </Link>
                </div>
            </footer>
          </div>
        </div>
    );
}
