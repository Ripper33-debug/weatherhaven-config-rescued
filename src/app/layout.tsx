import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import '../index.css';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto'
});

export const metadata: Metadata = {
  title: {
    default: 'TRECC Configurator',
    template: '%s | TRECC Configurator'
  },
  description: 'Interactive 3D configurator for TRECC deployable shelter systems',
  keywords: [
    'TRECC',
    'configurator',
    '3D',
    'shelter',
    'deployable'
  ],
  authors: [{ name: 'TRECC' }],
  creator: 'TRECC',
  publisher: 'TRECC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://trecc-configurator.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trecc-configurator.vercel.app',
    title: 'TRECC Configurator',
    description: 'Interactive 3D configurator for TRECC deployable shelter systems',
    siteName: 'TRECC Configurator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRECC Configurator',
    description: 'Interactive 3D configurator for TRECC deployable shelter systems',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a202c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{
        fontFamily: `${roboto.style.fontFamily}, ${inter.style.fontFamily}, system-ui, -apple-system, sans-serif`,
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)',
        color: '#e2e8f0',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        lineHeight: 1.6,
        fontWeight: 300
      }}>
        <main>
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
