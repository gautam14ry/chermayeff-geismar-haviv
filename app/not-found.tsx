'use client'
import Link from 'next/link'
import './globals.css'

const NotFoundPage = () => {
  return (
    <main className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-description">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="not-found-button primary">
              Go Home
            </Link>
            <Link href="/contact" className="not-found-button secondary">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="not-found-visual">
          <div className="not-found-graphic">
            <div className="graphic-element"></div>
            <div className="graphic-element"></div>
            <div className="graphic-element"></div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
