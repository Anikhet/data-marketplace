'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from './actions'
import { useActionState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface FormState {
  success: boolean
  error?: string
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const redirectTo = typeof searchParams.redirectedFrom === 'string' 
    ? searchParams.redirectedFrom 
    : '/dashboard'
  const router = useRouter()

  const [state, formAction] = useActionState<FormState, FormData>(async (prevState: FormState, formData: FormData) => {
    try {
      formData.append('redirectTo', redirectTo)
      await login(formData)
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'An error occurred' }
    }
  }, { success: false })

  useEffect(() => {
    if (state.success) {
      router.push(redirectTo)
    }
  }, [state.success, router, redirectTo])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500">Enter your email to login to your account</p>
        </div>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" required type="password" />
          </div>
          {state.error && (
            <div className="text-sm text-red-500">
              {state.error}
            </div>
          )}
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link className="underline" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}