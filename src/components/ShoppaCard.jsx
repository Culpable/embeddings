// ---------------------------------------------------------------------------
// Shoppa card — points retailers who want a ready-made product to Shoppa,
// a separate packaged AI shopping agent with its own site.
//
// The card borrows Shoppa's own mark and Warm Sunrise colours so visitors can
// see at a glance that Shoppa is a different brand from Embeddings. Keep the
// copy to that distinction only: no Shoppa feature, setup or pricing claims.
// ---------------------------------------------------------------------------

// Shoppa's brand colours, from shoppa-root/src/styles/global.css.
const shoppaColours = {
  canvas: '#fff4e9',
  ink: '#3b2416',
  inkSoft: '#6b4a31',
  accent: '#d6552b',
  border: '#f0dec8',
}

const shoppaUrl = 'https://shoppa.au/'


// Render Shoppa's app mark (a shopping bag inside a chat bubble), from
// shoppa-root/public/icon.svg.
function ShoppaMark({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#D6552B" />
      <path
        fill="#FFF4E9"
        d="M14 19h36a7 7 0 0 1 7 7v19a7 7 0 0 1-7 7H25l-8 7 1.5-7H14a7 7 0 0 1-7-7V26a7 7 0 0 1 7-7Z"
      />
      <path
        fill="#3B2416"
        d="M17.75 21v-5C17.75 8.13 24.13 1.75 32 1.75S46.25 8.13 46.25 16v5h-4.5v-5c0-5.38-4.37-9.75-9.75-9.75S22.25 10.62 22.25 16v5h-4.5Z"
      />
      <path
        fill="#3B2416"
        d="M44 27c.75 5.14 3.86 8.25 9 9-5.14.75-8.25 3.86-9 9-.75-5.14-3.86-8.25-9-9 5.14-.75 8.25-3.86 9-9Z"
      />
    </svg>
  )
}


export function ShoppaCard() {
  return (
    <div
      className="mt-10 flex flex-col gap-6 rounded-3xl p-8 ring-1 sm:flex-row sm:items-center sm:p-10"
      style={{
        backgroundColor: shoppaColours.canvas,
        color: shoppaColours.ink,
        '--tw-ring-color': shoppaColours.border,
      }}
    >
      <ShoppaMark className="h-14 w-14 flex-none" />
      <div className="flex-1">
        <h3 className="font-display text-2xl font-medium tracking-tight">
          Prefer a ready-made shopping agent?
        </h3>
        <p className="mt-2 text-base" style={{ color: shoppaColours.inkSoft }}>
          shoppa is a packaged AI shopping agent for retailers. Choose it if you
          want a product rather than a custom build.
        </p>
      </div>
      <a
        href={shoppaUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 w-fit flex-none items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-white transition-[transform,filter] duration-200 ease-out hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 active:scale-[0.96]"
        style={{ backgroundColor: shoppaColours.accent }}
      >
        <span className="relative top-px">Visit shoppa.au</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}
