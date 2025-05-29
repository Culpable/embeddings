import { RootLayout } from '@/components/RootLayout'
import { siteMetadata } from '@/lib/metadata'
import MixpanelProvider from '@/components/MixpanelProvider'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s / Embeddings',
    default: siteMetadata.title
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: 'Embeddings',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-AU',
    type: 'website',
  },
  twitter: {
    card: siteMetadata.twitter.cardType,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
}

export default function Layout({ children }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <MixpanelProvider />
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
