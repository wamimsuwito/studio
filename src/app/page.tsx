'use client';

import { useState, useRef } from 'react';
import { verifyFace } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import { Camera, MapPin, Clock, Mail, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

type Location = { latitude: number; longitude: number };
type AttendanceData = { photo: string; location: Location; timestamp: Date };

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStatus('idle');
    setAttendanceData(null);
    setError(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      reset();
      return;
    }

    setStatus('processing');
    setError(null);
    setAttendanceData(null);

    const reader = new FileReader();
    reader.onerror = () => {
      setError("Failed to read photo.");
      setStatus('error');
    };
    reader.onload = async (e) => {
      const photoDataUri = e.target?.result as string;
      try {
        const [locationResult, verificationResult] = await Promise.all([
          getLocation(),
          verifyFace({ photoDataUri }),
        ]);

        if (!verificationResult?.faceDetected) {
          throw new Error("No face detected. Please ensure your face is clear and try again.");
        }
        if (!locationResult) {
          throw new Error("Could not retrieve location. Please enable location services.");
        }
        
        setAttendanceData({
          photo: photoDataUri,
          location: locationResult,
          timestamp: new Date(),
        });
        setStatus('success');
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        setStatus('error');
      }
    };
    reader.readAsDataURL(file);
  };

  const getLocation = (): Promise<Location | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          resolve(null);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  };

  const handleSendEmail = () => {
    if (!attendanceData) return;
    const { location, timestamp } = attendanceData;
    const subject = `Attendance Report - ${timestamp.toLocaleDateString()}`;
    const body = `Hello,\n\nThis is my attendance report.\n\nTimestamp: ${timestamp.toLocaleString()}\nLocation: ${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}\nGoogle Maps Link: https://www.google.com/maps?q=${location.latitude},${location.longitude}\n\nRegards,`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;
    window.location.href = mailtoLink;
  };

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center text-center p-10 space-y-4 h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Verifying your attendance...</p>
          </div>
        );
      case 'success':
        if (!attendanceData) return null;
        return (
          <>
            <CardContent className="space-y-4">
              <div className="aspect-square w-full relative overflow-hidden rounded-lg border bg-muted">
                <Image src={attendanceData.photo} alt="Attendance photo" fill style={{ objectFit: 'cover' }} data-ai-hint="person selfie" />
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-sm font-medium text-accent">
                  <CheckCircle className="h-5 w-5" />
                  <p>Verification Successful</p>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">{attendanceData.timestamp.toLocaleString()}</p>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <a href={`https://www.google.com/maps?q=${attendanceData.location.latitude},${attendanceData.location.longitude}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:underline">
                    {attendanceData.location.latitude.toFixed(4)}, {attendanceData.location.longitude.toFixed(4)}
                  </a>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2 !pt-0">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleSendEmail}>
                <Mail className="mr-2 h-4 w-4" />
                Send Report via Email
              </Button>
              <Button variant="outline" className="w-full" onClick={reset}>Clock In Again</Button>
            </CardFooter>
          </>
        );
      case 'error':
        return (
          <>
            <CardContent>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={reset}>Try Again</Button>
            </CardFooter>
          </>
        );
      case 'idle':
      default:
        return (
          <>
            <CardContent className="flex flex-col items-center justify-center text-center p-10 space-y-4 h-64">
              <div className="p-4 bg-primary/10 rounded-full">
                <Camera className="h-12 w-12 text-primary" />
              </div>
              <p className="text-muted-foreground">Tap the button to capture your photo and location for attendance.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={() => inputFileRef.current?.click()}>Clock In</Button>
            </CardFooter>
          </>
        );
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 font-body">
      <input type="file" accept="image/*" capture="user" ref={inputFileRef} onChange={handleFileChange} className="hidden" />
      <Card className="w-full max-w-sm shadow-xl overflow-hidden rounded-2xl">
        <CardHeader className="text-center border-b bg-card">
          <CardTitle className="text-3xl font-headline text-primary">SnapAttend</CardTitle>
          <CardDescription>Simple Photo & Location Attendance</CardDescription>
        </CardHeader>
        {renderContent()}
      </Card>
    </main>
  );
}
