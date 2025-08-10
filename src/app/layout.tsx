import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../index.css'
import Header from '../components/marketing/Header'
import Footer from '../components/marketing/Footer'
import ScrollToTop from '../components/ui/ScrollToTop'
import FloatingChat from '../components/ui/FloatingChat'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weatherhaven - Deployable Shelter Solutions',
  description: 'Rapidly deployable shelter systems for defense, disaster response, and remote industry. Ready in hours, not weeks.',
  keywords: 'deployable shelters, military shelters, disaster response, remote camps, mobile infrastructure, modular shelters, rapid deployment',
  authors: [{ name: 'Weatherhaven' }],
  creator: 'Weatherhaven',
  publisher: 'Weatherhaven',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://weatherhaven-config.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Weatherhaven - Deployable Shelter Solutions',
    description: 'Rapidly deployable shelter systems for defense, disaster response, and remote industry.',
    url: 'https://weatherhaven-config.vercel.app',
    siteName: 'Weatherhaven',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Weatherhaven Deployable Shelters',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weatherhaven - Deployable Shelter Solutions',
    description: 'Rapidly deployable shelter systems for defense, disaster response, and remote industry.',
    images: ['/og-image.jpg'],
    creator: '@weatherhaven',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// Structured data for organization
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Weatherhaven',
  url: 'https://weatherhaven-config.vercel.app',
  logo: 'https://weatherhaven-config.vercel.app/logo.png',
  description: 'Leading provider of deployable shelter solutions for defense, disaster response, and remote industry.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CA',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-604-555-0123',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.linkedin.com/company/weatherhaven',
    'https://twitter.com/weatherhaven',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#667eea" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{
        fontFamily: inter.style.fontFamily,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        margin: 0,
        padding: 0
      }}>
        <Header />
        <main style={{ paddingTop: '64px' }}>
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingChat />
        <Analytics />
      </body>
    </html>
  )
}
