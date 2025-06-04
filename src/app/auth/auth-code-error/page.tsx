'use client'

import Link from 'next/link'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg border border-border">
        <div>
          <h2 className="mt-6 text-center text-4xl font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            There was a problem authenticating your account. This could be because:
          </p>
          <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-2">
            <li>The magic link has expired</li>
            <li>The magic link has already been used</li>
            <li>There was a problem with the authentication process</li>
          </ul>
        </div>
        <div className="mt-8 space-y-4">
          <Link
            href="/login"
            className="block w-full text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="block w-full text-center py-2 px-4 border border-input text-sm font-medium rounded-md text-foreground bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 