'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import './globals.css'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error occurred:', error)
  }, [error])

  return (
    <main className="error-page">
      <div className="error-container">
        <div className="error-content">
          <h1 className="error-title">Something went wrong</h1>
          <h2 className="error-subtitle">An unexpected error occurred</h2>
          <p className="error-description">
            We&apos;re sorry, but something went wrong while loading this page. 
            Please try again or contact us if the problem persists.
          </p>
          
          {error.digest && (
            <div className="error-details">
              <p className="error-id">Error ID: {error.digest}</p>
            </div>
          )}
          
          <div className="error-actions">
            <button onClick={reset} className="error-button primary">
              Try Again
            </button>
            <Link href="/" className="error-button secondary">
              Go Home
            </Link>
            <Link href="/contact" className="error-button secondary">
              Contact Support
            </Link>
          </div>
        </div>
        <div className="error-visual">
          <div className="error-graphic">
            <div className="graphic-circle"></div>
            <div className="graphic-line"></div>
            <div className="graphic-dot"></div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage
