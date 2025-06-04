'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
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