import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function getTeacherContext() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  try {
    const admin = createAdminClient();
    const [{ data: profile, error: profileError }, { data: roleLinks, error: rolesError }] = await Promise.all([
      admin.from("profiles").select("status").eq("id", user.id).maybeSingle(),
      admin.from("user_roles").select("role_id").eq("user_id", user.id),
    ]);
    if (profileError || rolesError || profile?.status !== "active" || !roleLinks?.length) return null;
    const { data: roles, error: roleError } = await admin.from("roles").select("name").in("id", roleLinks.map((r) => r.role_id));
    if (roleError || !roles?.some((r) => r.name === "teacher")) return null;
    const { data: teacher, error: teacherError } = await admin.from("teachers").select("id,full_name,email,phone,qualification,specialization,joining_date,status,profile_id").eq("profile_id", user.id).maybeSingle();
    if (teacherError || !teacher || teacher.profile_id !== user.id || teacher.status !== "active") return null;
    return { userId: user.id, teacher, supabase };
  } catch { return null; }
}
