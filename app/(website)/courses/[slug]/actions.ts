"use server";

import { z } from "zod";

const enrollmentRequestSchema = z.object({
  tokenId: z.number().int().min(1).max(6),
  classGroup: z.string().trim().min(1).max(30),
  subjectCount: z.number().int().min(1).max(6),
  fullName: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(7).max(20).regex(/^\+?[0-9][0-9\s().-]*$/),
  school: z.string().trim().min(1).max(200),
  referralSource: z.string().trim().min(1).max(500),
  board: z.string().trim().min(1).max(100),
  academicYear: z.string().trim().min(1).max(30),
  cityCode: z.string().trim().toUpperCase().regex(/^[A-Z]{3}$/),
  learningMode: z.enum(["online", "offline"]),
  consent: z.literal(true),
});

export async function saveEnrollmentRequest(input: unknown) {
  const parsed = enrollmentRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, message: "Please check the student details and try again." };
  }

  const endpoint = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  const secret = process.env.GOOGLE_SHEETS_SHARED_SECRET;
  if (!endpoint || !secret) {
    return { success: false as const, message: "Online enrollment is not connected yet. Please contact the academy to complete enrollment." };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        // All six class cards are part of Gift Token 1.
        tokenId: 1,
        paymentStatus: "Pending",
        submittedAt: new Date().toISOString(),
        secret,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    const result: unknown = await response.json();
    if (!response.ok || !result || typeof result !== "object" || (result as { ok?: unknown }).ok !== true) {
      return { success: false as const, message: "We couldn't save the enrollment details. Please retry or contact the academy." };
    }
    return { success: true as const };
  } catch {
    return { success: false as const, message: "We couldn't reach the enrollment form service. Please retry or contact the academy." };
  }
}
