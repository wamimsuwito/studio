'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, Grid, Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    // Format date to "27 July 2025"
    setCurrentDate(now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }));
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\./g, ':'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAbsenClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push('/absen');
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="relative flex flex-col h-screen w-full max-w-sm bg-background font-sans shadow-2xl overflow-hidden">
        <header className="py-4 px-6 text-center">
          <h1 className="text-xl font-bold tracking-widest text-muted-foreground">DASHBOARD</h1>
        </header>

        <main className="flex-grow flex flex-col items-center px-4 space-y-4 overflow-hidden">
          <Card className="w-full shadow-lg rounded-2xl flex-shrink-0">
            <CardContent className="p-6 text-center">
              <p className="text-2xl font-bold text-red-500">FRP - 0007</p>
              <p className="text-lg font-bold text-primary mt-1">EZRA WAMIN HUTABARAT</p>
              <p className="text-sm text-gray-500">KADEPT. TEKNIK</p>
              <p className="text-sm text-gray-500 mt-2">{currentDate}</p>

              <div className="flex justify-around mt-4 text-sm">
                <div>
                  <p className="font-bold text-green-500">{currentTime}</p>
                  <p className="text-gray-500">Absen Masuk</p>
                </div>
                <div>
                  <p className="font-bold text-orange-400">00:00:00</p>
                  <p className="text-gray-500">Absen Pulang</p>
                </div>
                <div>
                  <p className="font-bold text-gray-600">0 Menit</p>
                  <p className="text-gray-500">Keterlambatan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full flex-grow shadow-lg rounded-t-2xl">
              <Tabs defaultValue="info" className="w-full h-full flex flex-col">
                  <CardContent className="p-4 flex-grow flex flex-col">
                       <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-auto">
                          <TabsTrigger value="info" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:rounded-l-full data-[state=active]:rounded-r-none rounded-l-full rounded-r-none flex-grow h-12 text-lg !shadow-none data-[state=inactive]:bg-gray-200">INFO</TabsTrigger>
                          <TabsTrigger value="detail" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:rounded-r-full data-[state=active]:rounded-l-none rounded-r-full rounded-l-none flex-grow h-12 text-lg !shadow-none data-[state=inactive]:bg-gray-200">Detail</TabsTrigger>
                      </TabsList>
                      <div className="flex-grow flex flex-col items-center justify-center pt-4 overflow-hidden">
                          <TabsContent value="info" className="flex-grow flex flex-col items-center justify-center w-full">
                              <div className="relative w-36 h-36 mb-4">
                                  <Image src="https://placehold.co/400x400.png" alt="Folder" layout="fill" objectFit="contain" data-ai-hint="folder file" />
                              </div>
                              <p className="text-gray-400">Upps!! Belum Ada Data</p>
                          </TabsContent>
                          <TabsContent value="detail" className="flex-grow flex items-center justify-center">
                              <p className="text-gray-400">Detail informasi akan ditampilkan di sini.</p>
                          </TabsContent>
                      </div>
                  </CardContent>
              </Tabs>
          </Card>
        </main>
        
        <footer className="w-full bg-background flex justify-center items-center p-2 text-white flex-shrink-0">
            <div className="w-full flex justify-around items-center max-w-xs">
                <Button variant="ghost" className="text-white">
                  <Menu size={28} />
                </Button>
                <div className="relative">
                   <Link href="/absen" onClick={handleAbsenClick}>
                    <Button variant="ghost" size="icon" className="bg-white text-accent rounded-full w-16 h-16 -translate-y-6 shadow-lg">
                        <HomeIcon size={40} className="font-bold" />
                    </Button>
                  </Link>
                </div>
                <Button variant="ghost" className="text-white">
                  <Grid size={28} />
                </Button>
            </div>
        </footer>
      </div>
    </div>
  );
}
