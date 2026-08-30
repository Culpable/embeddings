import {
  buildStructuredData,
  serialiseStructuredData,
} from '@/lib/structured-data.mjs'

export function StructuredData({ routeKey }) {
  return (
    <script
      id={`${routeKey}-structured-data`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serialiseStructuredData(buildStructuredData(routeKey)),
      }}
    />
  )
}
