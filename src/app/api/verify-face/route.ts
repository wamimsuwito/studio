
import { verifyFaceAttendance } from '@/ai/flows/verify-face-attendance';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { photoDataUri } = await req.json();

    if (!photoDataUri) {
      return NextResponse.json({ error: 'photoDataUri is required' }, { status: 400 });
    }

    const result = await verifyFaceAttendance({ photoDataUri });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in verify-face API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to verify face', details: errorMessage }, { status: 500 });
  }
}
