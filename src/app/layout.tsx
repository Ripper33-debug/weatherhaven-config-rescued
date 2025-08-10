import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../index.css'
import Header from '../components/marketing/Header'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weatherhaven - Deployable Shelter Solutions',
  description: 'Rapidly deployable shelter systems for defense, disaster response, and remote industry. Ready in hours, not weeks.',
  keywords: 'deployable shelters, military shelters, disaster response, remote camps, mobile infrastructure',
  authors: [{ name: 'Weatherhaven' }],
  openGraph: {
    title: 'Weatherhaven - Deployable Shelter Solutions',
    description: 'Rapidly deployable shelter systems for defense, disaster response, and remote industry.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weatherhaven - Deployable Shelter Solutions',
    description: 'Rapidly deployable shelter systems for defense, disaster response, and remote industry.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
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
        <Analytics />
      </body>
    </html>
  )
}
