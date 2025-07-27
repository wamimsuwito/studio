'use server';

import { verifyFaceAttendance, type VerifyFaceAttendanceInput, type VerifyFaceAttendanceOutput } from '@/ai/flows/verify-face-attendance';

export async function verifyFace(input: VerifyFaceAttendanceInput): Promise<VerifyFaceAttendanceOutput> {
    try {
        const result = await verifyFaceAttendance(input);
        return result;
    } catch (error) {
        console.error("Kesalahan pada alur verifyFaceAttendance:", error);
        throw new Error("Terjadi kesalahan AI saat verifikasi wajah.");
    }
}
