import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import '../index.css';
import Header from '../components/marketing/Header';
import Footer from '../components/marketing/Footer';
import ScrollToTop from '../components/ui/ScrollToTop';
import AdvancedChat from '../components/ui/AdvancedChat';
import CustomerPortal from '../components/ui/CustomerPortal';
import LoadingScreen from '../components/ui/LoadingScreen';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto'
});

export const metadata: Metadata = {
  title: {
    default: 'Weatherhaven - Global Leader in Deployable Shelter Solutions',
    template: '%s | Weatherhaven'
  },
  description: 'Weatherhaven is the world\'s leading provider of deployable shelter systems for military, disaster response, remote industry, and research applications. Rapid deployment, extreme environment protection, and modular solutions.',
  keywords: [
    'deployable shelters',
    'military shelters',
    'disaster response shelters',
    'field hospitals',
    'command centers',
    'remote camp solutions',
    'modular buildings',
    'rapid deployment',
    'extreme environment',
    'weatherhaven'
  ],
  authors: [{ name: 'Weatherhaven' }],
  creator: 'Weatherhaven',
  publisher: 'Weatherhaven',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://weatherhaven.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://weatherhaven.com',
    title: 'Weatherhaven - Global Leader in Deployable Shelter Solutions',
    description: 'World\'s leading provider of deployable shelter systems for military, disaster response, remote industry, and research applications.',
    siteName: 'Weatherhaven',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Weatherhaven Deployable Shelter Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weatherhaven - Global Leader in Deployable Shelter Solutions',
    description: 'World\'s leading provider of deployable shelter systems for military, disaster response, remote industry, and research applications.',
    images: ['/og-image.jpg'],
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
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Weatherhaven",
  "url": "https://weatherhaven.com",
  "logo": "https://weatherhaven.com/logo.png",
  "description": "Global leader in deployable shelter solutions for military, disaster response, remote industry, and research applications.",
  "foundingDate": "1983",
  "numberOfEmployees": "500+",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CA",
    "addressLocality": "Vancouver",
    "addressRegion": "BC"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-WEATHER",
    "contactType": "customer service",
    "availableLanguage": ["English", "Spanish", "French", "German", "Arabic"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/weatherhaven",
    "https://twitter.com/weatherhaven",
    "https://www.facebook.com/weatherhaven"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Deployable Shelter Solutions",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Tactical Command Center",
          "description": "Advanced command and control facility for military operations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Field Hospital System",
          "description": "Complete medical facility for emergency and routine care"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Emergency Relief Shelter",
          "description": "Immediate shelter solution for disaster victims"
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
        <LoadingScreen />
        <Header />
        <main style={{ paddingTop: '64px' }}>
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <AdvancedChat />
        <CustomerPortal />
        <Analytics />
      </body>
    </html>
  );
}
