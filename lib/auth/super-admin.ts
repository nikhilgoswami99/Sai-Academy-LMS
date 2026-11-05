import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type SuperAdminContext =
  | { success: true; userId: string; supabase: Awaited<ReturnType<typeof createClient>>; admin: ReturnType<typeof createAdminClient> }
  | { success: false; authenticated: boolean; message: string };

export async function getSuperAdminContext(): Promise<SuperAdminContext> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return { success: false, authenticated: false, message: "Sign in with a Super Admin account to continue." };

    const admin = createAdminClient();
    const { data: profile, error: profileError } = await admin
      .from("profiles").select("status").eq("id", user.id).maybeSingle();
    if (profileError || profile?.status !== "active") {
      return { success: false, authenticated: true, message: "Your account is not authorized to manage student records." };
    }
    const { data: assignments, error: assignmentError } = await admin
      .from("user_roles").select("role_id").eq("user_id", user.id);
    if (assignmentError || !assignments?.length) {
      return { success: false, authenticated: true, message: "Your account is not authorized to manage student records." };
    }
    const { data: roles, error: roleError } = await admin
      .from("roles").select("name").in("id", assignments.map(({ role_id }) => role_id));
    if (roleError || !roles?.some(({ name }) => name === "super_admin")) {
      return { success: false, authenticated: true, message: "Your account is not authorized to manage student records." };
    }
    return { success: true, userId: user.id, supabase, admin };
  } catch {
    return { success: false, authenticated: false, message: "Your access could not be verified. Check the Supabase server configuration and try again." };
  }
}
