'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface FormData {
  email: string
  otp: string
}

export default function LoginPage() {
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>()


  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      if (!otpSent) {
        const { error } = await supabase.auth.signInWithOtp({
          
          email: data.email,
          
          options: {

            data: { type: 'email' },
          },
        })

        if (error) throw error

        setOtpSent(true)
        toast.success('✅ OTP has been sent to your email')
      } else {
        const { error, data: result } = await supabase.auth.verifyOtp({
          email: data.email,
          token: data.otp,
          type: 'email',
        })

        if (error) throw error

        if (result.session) {
          toast.success('✅ Logged in successfully!')
          router.push('/')
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Card className="w-[350px] shadow-xl">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              {otpSent
                ? 'Enter the OTP sent to your email'
                : 'Enter your email to sign in'}
            </CardDescription>
          </CardHeader>

          <form className='flex flex-col gap-6 ' onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                {/* Email Field */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    disabled={otpSent}
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">Email is required</p>
                  )}
                </div>

                {/* OTP Field */}
                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col space-y-1.5"
                  >
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      {...register('otp', { required: true })}
                    />
                    {errors.otp && (
                      <p className="text-sm text-red-500">OTP is required</p>
                    )}
                  </motion.div>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {otpSent ? 'Verifying...' : 'Sending OTP...'}
                  </div>
                ) : otpSent ? (
                  'Verify OTP'
                ) : (
                  'Send OTP'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
