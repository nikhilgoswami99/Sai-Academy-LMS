"use server"

import { createClient } from '@/lib/supabase/server'

export type CurrentUserResult =
  | { authenticated: false }
  | { authenticated: true; authorized: boolean }

export async function getCurrentUser(): Promise<CurrentUserResult> {
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) return { authenticated: false }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('status')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError || profile?.status !== 'active') {
      return { authenticated: true, authorized: false }
    }

    const { data: assignments, error: assignmentError } = await supabase
      .from('user_roles')
      .select('role_id')
      .eq('user_id', user.id)

    if (assignmentError || !assignments?.length) {
      return { authenticated: true, authorized: false }
    }

    const roleIds = assignments.map((assignment) => assignment.role_id)
    const { data: roles, error: roleError } = await supabase
      .from('roles')
      .select('name')
      .in('id', roleIds)

    if (roleError) return { authenticated: true, authorized: false }

    return {
      authenticated: true,
      authorized: roles?.some((role) => role.name === 'super_admin') ?? false,
    }
  } catch {
    return { authenticated: false }
  }
}
