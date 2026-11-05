import { z } from "zod";

const optionalText = (maxLength = 500) =>
  z.preprocess(
    (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : value),
    z.string().trim().max(maxLength).nullable().optional(),
  );

const optionalDate = z.preprocess(
  (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.iso.date().nullable().optional(),
);

const optionalPercentage = z.preprocess(
  (value: unknown) => {
    if (value === "" || value === null || value === undefined) return null;
    if (typeof value === "string") return Number(value);
    return value;
  },
  z.number().finite().min(0).max(100).nullable().optional(),
);

const optionalEmail = z.preprocess(
  (value: unknown) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.email().trim().toLowerCase().optional(),
);

const optionalPhone = z.preprocess(
  (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.string().trim().max(20).regex(/^\+?[0-9][0-9\s().-]*$/, "Enter a valid phone number.").nullable().optional(),
);

const optionalImageUrl = z.preprocess(
  (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.url().refine((value) => /^https?:\/\//i.test(value), "Use an HTTP or HTTPS image URL.").nullable().optional(),
);

export const studentAdmissionSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  studentContact: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^\+?[0-9][0-9\s().-]*$/, "Enter a valid phone number."),
  schoolName: z.string().trim().min(1).max(200),
  classId: z.string().uuid(),
  boardId: z.string().uuid(),
  academicYearId: z.string().uuid(),
  // The course is resolved server-side to the active Crash Course. The browser
  // must not be able to select or submit an arbitrary course.
  courseId: z.string().uuid().optional(),
  cityCode: z.string().trim().regex(/^[A-Z]{3}$/, "City code must be three uppercase letters."),
  learningMode: z.enum(["online", "offline"]),
  admissionDate: z.iso.date(),
});

export type StudentAdmissionInput = z.infer<typeof studentAdmissionSchema>;
export type StudentAdmissionFormInput = z.input<typeof studentAdmissionSchema>;

export const studentPersonalProfileSchema = z.object({
  dateOfBirth: optionalDate,
  profilePictureUrl: optionalImageUrl,
  fatherName: optionalText(200),
  motherName: optionalText(200),
  parentOccupation: optionalText(200),
  parentEducation: optionalText(200),
  parentContact: optionalPhone,
  email: optionalEmail,
  address: optionalText(2000),
});

export type StudentPersonalProfile = z.infer<typeof studentPersonalProfileSchema>;

const requiredPhone = z
  .string()
  .trim()
  .min(7)
  .max(20)
  .regex(/^\+?[0-9][0-9\s().-]*$/, "Enter a valid phone number.");

export const studentAdminUpdateSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  studentContact: requiredPhone,
  schoolName: z.string().trim().min(1).max(200),
  dateOfBirth: optionalDate,
  profilePictureUrl: optionalImageUrl,
  lastYearPercentage: optionalPercentage,
  fatherName: optionalText(200),
  motherName: optionalText(200),
  parentOccupation: optionalText(200),
  parentEducation: optionalText(200),
  parentContact: optionalPhone,
  email: optionalEmail,
  address: optionalText(2000),
  admissionSource: optionalText(200),
});

export type StudentAdminUpdateInput = z.infer<typeof studentAdminUpdateSchema>;
