"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { studentPersonalProfileSchema } from "@/lib/validation/student";

export async function updateStudentPersonalProfile(input: unknown) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { success: false as const, message: "Sign in to update your profile." };

  const parsed = studentPersonalProfileSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, message: "Check the profile details and try again." };
  }

  try {
    const admin = createAdminClient();
    const { data: profile, error: profileError } = await admin
      .from("profiles").select("status").eq("id", user.id).maybeSingle();
    if (profileError || profile?.status !== "active") {
      return { success: false as const, message: "This account is not active." };
    }
    const { data: assignments, error: assignmentError } = await admin
      .from("user_roles").select("role_id").eq("user_id", user.id);
    if (assignmentError || !assignments?.length) {
      return { success: false as const, message: "This account is not authorized to update a student profile." };
    }
    const { data: roles, error: roleError } = await admin
      .from("roles").select("name").in("id", assignments.map(({ role_id }) => role_id));
    if (roleError || !roles?.some(({ name }) => name === "student")) {
      return { success: false as const, message: "This account is not authorized to update a student profile." };
    }
    const { data: student, error: studentError } = await supabase
      .from("students").select("id").eq("profile_id", user.id).maybeSingle();
    if (studentError || !student) return { success: false as const, message: "Student account not found." };

    const values = parsed.data;
    const { error: updateError } = await supabase.from("students").update({
      date_of_birth: values.dateOfBirth ?? null,
      profile_picture_url: values.profilePictureUrl ?? null,
      father_name: values.fatherName ?? null,
      mother_name: values.motherName ?? null,
      parent_occupation: values.parentOccupation ?? null,
      parent_education: values.parentEducation ?? null,
      parent_contact: values.parentContact ?? null,
      email: values.email ?? null,
      address: values.address ?? null,
    }).eq("id", student.id);
    if (updateError) return { success: false as const, message: "Your profile could not be saved. Please try again." };

    revalidatePath("/student");
    revalidatePath("/student/profile");
    return { success: true as const };
  } catch {
    return { success: false as const, message: "Your profile could not be saved. Please try again." };
  }
}
