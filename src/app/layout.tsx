import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import '../index.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights';

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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff6b35" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { 
              opacity: 0.3; 
              transform: translate(-50%, -50%) scale(1);
            }
            50% { 
              opacity: 0.6; 
              transform: translate(-50%, -50%) scale(1.1);
            }
          }
        `}</style>
      </head>
      <body style={{
        fontFamily: `${roboto.style.fontFamily}, ${inter.style.fontFamily}, system-ui, -apple-system, sans-serif`,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
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
        <SpeedInsights />
      </body>
    </html>
  );
}
