'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const otp = formData.get('otp') as string
  const supabase = await createClient()

  // If OTP is provided, verify it
  if (otp) {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    })

    if (error) {
      throw new Error(error.message)
    }

    redirect('/dashboard')
  }

  // If no OTP, send one
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return { success: true, message: 'OTP sent to your email' }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const redirectTo = formData.get('redirectTo') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/login/confirmation')
}