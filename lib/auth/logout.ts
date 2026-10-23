import { createClient } from '@/lib/supabase/client'

export type LogoutResult =
  | { success: true }
  | { success: false; message: string }

export async function signOut(): Promise<LogoutResult> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        message: 'We could not sign you out. Please try again.',
      }
    }

    return { success: true }
  } catch {
    return {
      success: false,
      message: 'We could not sign you out. Please check your connection and try again.',
    }
  }
}
