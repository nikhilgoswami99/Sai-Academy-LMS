import { createClient } from '@/lib/supabase/client'

export type LoginResult =
  | { success: true }
  | { success: false; message: string }

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<LoginResult> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return {
        success: false,
        message: 'Sign-in failed. Check your email and password and try again.',
      }
    }

    return { success: true }
  } catch (error) {
    if (error instanceof Error && error.message.includes('not configured')) {
      return {
        success: false,
        message: 'Sign-in is temporarily unavailable. Please contact your academy administrator.',
      }
    }

    return {
      success: false,
      message: 'We could not connect to the sign-in service. Please try again.',
    }
  }
}
