// ---------------------------------------------------------------------------
// CatalogueTransformation — Before/after product card visual that
// demonstrates the Embeddings value proposition. Server Component with
// FadeInStagger for sequential reveal: Before → Steps → After.
// ---------------------------------------------------------------------------

import { FadeIn, FadeInStagger } from '@/components/FadeIn'

// ---------------------------------------------------------------------------
// Individual service step pill
// ---------------------------------------------------------------------------

function ServiceStep({ number, label, className = '' }) {
  return (
    <div
      className={`grid grid-cols-[1.75rem_minmax(0,1fr)] items-center justify-start gap-x-3 ${className}`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-xs font-semibold text-white">
        {number}
      </span>
      <span className="min-w-0 text-left text-sm font-medium text-neutral-950">{label}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Attribute tag pill
// ---------------------------------------------------------------------------

function AttributeTag({ children, muted = false }) {
  return (
    <span
      className={
        muted
          ? 'before-shimmer inline-grid place-items-center rounded-full border border-dashed border-neutral-300 px-3 h-7 text-xs text-neutral-400'
          : 'inline-grid place-items-center rounded-full bg-neutral-950/[0.06] px-3 h-7 text-xs font-medium text-neutral-700'
      }
    >
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Before card — sparse, incomplete catalogue entry
// ---------------------------------------------------------------------------

function BeforeCard() {
  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
      {/* Left accent border — amber/red for "needs work" */}
      <div
        className="absolute inset-y-4 left-0 w-1 rounded-full bg-gradient-to-b from-amber-400 to-red-400"
        aria-hidden="true"
      />

      {/* Status badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Before
        </span>
        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
          Incomplete
        </span>
      </div>

      {/* Product title — generic, thin */}
      <h4 className="mt-5 font-display text-lg font-medium text-neutral-950">
        Blue Dress
      </h4>

      {/* GTIN — missing (shimmer effect reinforces incomplete data) */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs font-medium text-neutral-400">GTIN</span>
        <span className="before-shimmer inline-block h-4 w-24 rounded border border-dashed border-neutral-300" />
      </div>

      {/* Description — one line, generic */}
      <p className="mt-4 text-sm leading-relaxed text-neutral-500">
        A blue dress for women.
      </p>

      {/* Attributes — mostly missing */}
      <div className="mt-4 flex flex-wrap gap-2">
        <AttributeTag muted>colour?</AttributeTag>
        <AttributeTag muted>silhouette?</AttributeTag>
        <AttributeTag muted>occasion?</AttributeTag>
        <AttributeTag muted>material?</AttributeTag>
      </div>

      {/* Last updated — stale */}
      <p className="mt-5 text-xs text-red-500/80">
        Last updated: 8 months ago
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// After card — enriched, AI-ready catalogue entry
// ---------------------------------------------------------------------------

function AfterCard() {
  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
      {/* Left accent border — green for "optimised" */}
      <div
        className="absolute inset-y-4 left-0 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-green-500"
        aria-hidden="true"
      />

      {/* Status badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          After
        </span>
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          Agentic-ready
        </span>
      </div>

      {/* Product title — rich, detailed */}
      <h4 className="mt-5 font-display text-lg font-medium text-neutral-950">
        Women&rsquo;s A-Line Midi Dress &mdash; Sapphire Blue, Taylor Swift-inspired
      </h4>

      {/* GTIN — populated */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs font-medium text-neutral-400">GTIN</span>
        <span className="font-mono text-xs text-neutral-600">0614141123456</span>
      </div>

      {/* Description — multi-line, semantic */}
      <p className="mt-4 text-sm leading-relaxed text-neutral-600">
        Flattering A-line midi dress in sapphire blue crepe. Features a fitted bodice with subtle
        darting, a flowing midi-length skirt, and concealed side zip. Inspired by the blue dress trend
        popularised by Taylor Swift. Perfect for weddings, racing carnivals, and cocktail events.
        Machine washable. Available in sizes 6&ndash;18.
      </p>

      {/* Attributes — complete */}
      <div className="mt-4 flex flex-wrap gap-2">
        <AttributeTag>Sapphire Blue</AttributeTag>
        <AttributeTag>A-Line</AttributeTag>
        <AttributeTag>Midi</AttributeTag>
        <AttributeTag>Wedding Guest</AttributeTag>
        <AttributeTag>Crepe</AttributeTag>
        <AttributeTag>Sizes 6&ndash;18</AttributeTag>
      </div>

      {/* Trend tag */}
      <div className="mt-4 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-emerald-700">
          Trending: Taylor Swift blue dress
        </span>
      </div>

      {/* Last updated — fresh */}
      <p className="mt-4 text-xs text-emerald-600">
        Last updated: 2 hours ago
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main export — orchestrates the before/after layout with service steps
// ---------------------------------------------------------------------------

export function CatalogueTransformation() {
  return (
    <>
      <FadeInStagger>
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 lg:grid-cols-[1fr_auto_1fr]">
          {/* Before card */}
          <FadeIn>
            <BeforeCard />
          </FadeIn>

          {/* Service steps — the transformation pipeline */}
          <FadeIn>
            <div className="grid grid-cols-2 items-start gap-x-4 gap-y-3 px-2 md:w-full md:grid-cols-4 md:gap-x-8 md:gap-y-0 md:px-0 lg:h-full lg:w-auto lg:flex lg:flex-col lg:items-start lg:justify-between lg:self-stretch lg:py-8">
              {/* Arrow (horizontal on mobile, vertical on desktop) */}
              <div className="hidden h-6 w-px bg-gradient-to-b from-neutral-300 to-neutral-950/20 lg:block" aria-hidden="true" />

              <ServiceStep
                number="1"
                label="Audit"
                className="w-[8.75rem] justify-self-center justify-start md:w-full md:justify-self-stretch md:justify-start lg:w-full"
              />

              <ServiceStep
                number="2"
                label="Freshness"
                className="w-[8.75rem] justify-self-center justify-start md:w-full md:justify-self-stretch md:justify-start lg:w-full"
              />

              <ServiceStep
                number="3"
                label="Enrichment"
                className="w-[8.75rem] justify-self-center justify-start md:w-full md:justify-self-stretch md:justify-start lg:w-full"
              />

              <ServiceStep
                number="4"
                label="Optimisation"
                className="w-[8.75rem] justify-self-center justify-start md:w-full md:justify-self-stretch md:justify-start lg:w-full"
              />

              <div className="hidden h-6 w-px bg-gradient-to-b from-neutral-950/20 to-neutral-300 lg:block" aria-hidden="true" />
            </div>
          </FadeIn>

          {/* After card */}
          <FadeIn>
            <AfterCard />
          </FadeIn>
        </div>
      </FadeInStagger>

      {/* Shimmer animation for missing/dashed field placeholders in BeforeCard */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .before-shimmer {
          position: relative;
          overflow: hidden;
        }

        .before-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 0, 0, 0.04) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </>
  )
}
