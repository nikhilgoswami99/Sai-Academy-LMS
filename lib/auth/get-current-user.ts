"use server";

import { getSuperAdminContext } from "@/lib/auth/super-admin";

export type CurrentUserResult =
  | { authenticated: false }
  | { authenticated: true; authorized: boolean };

export async function getCurrentUser(): Promise<CurrentUserResult> {
  const result = await getSuperAdminContext();
  if (result.success) return { authenticated: true, authorized: true };
  return result.authenticated
    ? { authenticated: true, authorized: false }
    : { authenticated: false };
}
