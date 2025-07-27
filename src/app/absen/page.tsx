
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { VerifyFaceAttendanceOutput } from '@/ai/flows/verify-face-attendance';

export default function AbsenPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(true); // Default to true and handle error
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const getCameraPermission = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error('getUserMedia is not supported');
                setHasCameraPermission(false);
                toast({
                  variant: 'destructive',
                  title: 'Kamera Tidak Didukung',
                  description: 'Browser Anda tidak mendukung akses kamera.',
                });
                return;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setHasCameraPermission(true);
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Akses Kamera Ditolak',
                    description: 'Mohon izinkan akses kamera di pengaturan browser Anda.',
                });
            }
        };

        getCameraPermission();

        // Cleanup function to stop video stream
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [toast]);

    const captureAndVerify = async () => {
        if (!videoRef.current || !canvasRef.current) return;
        setIsProcessing(true);

        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const photoDataUri = canvas.toDataURL('image/jpeg');

            try {
                const response = await fetch('/api/verify-face', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ photoDataUri })
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.statusText}`);
                }
                
                const result: VerifyFaceAttendanceOutput = await response.json();

                if (result.faceDetected) {
                    toast({
                        title: 'Verifikasi Berhasil',
                        description: 'Wajah terdeteksi. Absensi berhasil dicatat.',
                    });
                     // Here you would typically redirect or update the state
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Verifikasi Gagal',
                        description: 'Wajah tidak terdeteksi. Silakan coba lagi.',
                    });
                }
            } catch (error) {
                console.error("API call error:", error);
                toast({
                    variant: 'destructive',
                    title: 'Terjadi Kesalahan',
                    description: 'Gagal memproses gambar. Coba lagi nanti.',
                });
            }
        }
        setIsProcessing(false);
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-gray-800">
            <div className="relative flex flex-col h-screen w-full max-w-sm bg-background font-sans shadow-2xl overflow-hidden">
                <header className="bg-accent text-accent-foreground p-4 flex items-center">
                    <Link href="/dashboard" className="mr-4">
                        <Button variant="ghost" size="icon">
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold">ABSENSI WAJAH</h1>
                </header>

                <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-4">
                    <div className="w-full aspect-square bg-gray-300 rounded-lg overflow-hidden relative border-4 border-gray-200 shadow-lg">
                        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                        <canvas ref={canvasRef} className="hidden"></canvas>
                         {!hasCameraPermission && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white p-4">
                               <Alert variant="destructive" className="w-full">
                                  <AlertTitle>Akses Kamera Diperlukan</AlertTitle>
                                  <AlertDescription>
                                    Mohon izinkan akses kamera untuk menggunakan fitur ini.
                                  </AlertDescription>
                              </Alert>
                            </div>
                        )}
                    </div>
                    <p className="text-center text-muted-foreground">Posisikan wajah Anda di dalam bingkai dan pastikan pencahayaan cukup.</p>
                </main>

                <footer className="p-4">
                    <Button 
                        className="w-full h-14 text-lg rounded-full" 
                        onClick={captureAndVerify}
                        disabled={!hasCameraPermission || isProcessing}
                    >
                        {isProcessing ? 'Memproses...' : 'Ambil Foto & Absen'}
                    </Button>
                </footer>
            </div>
        </div>
    );
}
