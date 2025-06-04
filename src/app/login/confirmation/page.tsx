'use client'

import Link from 'next/link'

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg border border-border">
        <div>
          <h2 className="mt-6 text-center text-4xl font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Check your email
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            We&apos;ve sent you a magic link. Click the link in your email to sign in.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Didn&apos;t receive an email? Check your spam folder or{' '}
            <Link href="/login" className="text-primary hover:text-primary/80">
              try again
            </Link>
          </p>
          <Link
            href="/"
            className="block w-full text-center py-2 px-4 border border-input text-sm font-medium rounded-md text-foreground bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  )
} 