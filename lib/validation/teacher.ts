import { z } from "zod";

const optional = (max = 500) => z.preprocess((v) => typeof v === "string" && !v.trim() ? null : v, z.string().trim().max(max).nullable().optional());
const email = z.email().trim().toLowerCase();
const phone = z.string().trim().min(7).max(20).regex(/^\+?[0-9][0-9\s().-]*$/);

export const teacherCreateSchema = z.object({
  fullName: z.string().trim().min(1).max(200), email, password: z.string().min(8).max(128), phone,
  qualification: optional(200), specialization: optional(200), address: optional(2000), joiningDate: z.iso.date(),
});
export const teacherUpdateSchema = z.object({
  id: z.uuid(), fullName: z.string().trim().min(1).max(200), email: z.preprocess((v) => v === "" ? null : v, email.nullable()),
  phone, qualification: optional(200), specialization: optional(200), address: optional(2000), joiningDate: z.iso.date(), status: z.enum(["active", "inactive"]),
});
export const teacherFormSchema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("create"), ...teacherCreateSchema.shape }),
  z.object({
    mode: z.literal("edit"),
    ...teacherUpdateSchema.omit({ id: true }).shape,
    password: z.string().optional(),
  }),
]);
export const teacherAssignmentSchema = z.object({
  teacherId: z.uuid(), academicYearId: z.uuid(), targetId: z.uuid(), targetType: z.enum(["class", "batch"]),
});
