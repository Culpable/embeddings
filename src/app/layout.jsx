import { RootLayout } from '@/components/RootLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site-config.mjs'

import '@/styles/tailwind.css'

export const metadata = {
  metadataBase: new URL(siteConfig.origin),
  ...buildPageMetadata('home'),
  title: {
    template: '%s / Embeddings',
    default: siteConfig.defaultTitle,
  },
}

export default function Layout({ children }) {
  return (
    <html
      lang={siteConfig.htmlLang}
      className="h-full bg-neutral-950 text-base antialiased"
    >
      <head>
        <link rel="describedby" href="/llms.txt" type="text/plain" />
        <link
          rel="preload"
          href="/fonts/Mona-Sans-latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      {/* Suppress hydration mismatch warnings when browser extensions inject transient body attributes. */}
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col overflow-x-hidden"
      >
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
