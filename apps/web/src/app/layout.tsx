import Footer from '@/components/layouts/Footer';
import Layout from '@/components/layouts/Layout';
import Navbar from '@/components/menu/Navbar';
import { getEnvUrl, metadataConfig } from '@/configs/app.config';

import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import './globals.css';

// Web metadata
export const metadata: Metadata = {
  title: metadataConfig.title,
  description: metadataConfig.description,
  keywords: metadataConfig.keywords,
  openGraph: {
    title: metadataConfig.title,
    type: 'website',
    url: getEnvUrl('app'),
    siteName: metadataConfig.shortTitle,
    description: metadataConfig.description,
    images: [
      {
        url: `${getEnvUrl('app')}/assets/og_image.jpg`,
        width: 1200,
        height: 630,
        alt: metadataConfig.shortTitle,
      },
    ],
  },
  twitter: {
    title: metadataConfig.title,
    description: metadataConfig.description,
    images: [
      {
        url: `${getEnvUrl('app')}/assets/og_image.jpg`,
        width: 1200,
        height: 630,
        alt: metadataConfig.shortTitle,
      },
    ],
    card: 'summary_large_image',
  },
};

/**
 * Component representing a root layout
 */
export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='apple-mobile-web-app-title' content={metadataConfig.shortTitle} />
      </head>
      <body className='antialiased'>
        <Layout>
          <Navbar />
          {children}
          <Footer />
        </Layout>
      </body>
    </html>
  );
}
