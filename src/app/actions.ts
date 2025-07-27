'use server';

import { verifyFaceAttendance, type VerifyFaceAttendanceInput, type VerifyFaceAttendanceOutput } from '@/ai/flows/verify-face-attendance';

export async function verifyFace(input: VerifyFaceAttendanceInput): Promise<VerifyFaceAttendanceOutput> {
    try {
        const result = await verifyFaceAttendance(input);
        return result;
    } catch (error) {
        console.error("Error in verifyFaceAttendance flow:", error);
        throw new Error("An AI error occurred during face verification.");
    }
}
