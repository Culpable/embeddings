import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StructuredData } from '@/components/StructuredData'
import { buildPageMetadata } from '@/lib/metadata'

const capabilities = [
  {
    index: '01',
    title: 'Agent & LLM Pipeline Engineering',
    body: 'We build assistants, agents and the pipelines behind them: grounding answers in your own documents and data, connecting them to the software your teams use, and processing information at scale.',
  },
  {
    index: '02',
    title: 'Data Infrastructure',
    body: 'We integrate directly with your ERP, CRM, document systems and custom software, so AI works from current, accurate data rather than stale copies.',
  },
  {
    index: '03',
    title: 'E-commerce Expertise',
    body: 'For retailers, we bring product data and search experience, including Google Merchant Centre specifications, GTIN standards and product taxonomy.',
  },
]

const proofSignals = [
  {
    label: 'focus',
    value: 'AI that runs in production',
  },
  {
    label: 'built from',
    value: 'LLM pipelines + data infrastructure',
  },
  {
    label: 'based in',
    value: 'Perth + Melbourne',
  },
]

function IntroProofBand() {
  return (
    <div className="mt-10 grid max-w-4xl grid-cols-1 gap-3 text-base sm:grid-cols-3">
      {proofSignals.map(({ label, value }) => (
        <div
          key={label}
          className="surface-elevation-light rounded-2xl bg-white/80 px-4 py-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {label}
          </p>
          <p className="mt-2 font-display text-lg font-medium tracking-tight text-neutral-950">
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}


function ProofLedger() {
  return (
    <Container className="mt-16">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 p-6 text-white shadow-xl sm:p-8 lg:p-10">
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-300/70 via-white/60 to-emerald-300/70"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <p className="font-display text-sm font-semibold tracking-wider text-white/50">
                what sets us apart
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Built to work in the real world
              </h2>
              <p className="mt-5 text-base leading-7 text-neutral-400">
                Three things shape every engagement: hands-on engineering,
                connection to the systems you already run, and a team close
                enough to work alongside yours.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {proofSignals.map(({ label, value }) => (
                <div
                  key={label}
                  className="surface-elevation-dark rounded-2xl bg-white/[0.04] px-4 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                    {label}
                  </p>
                  <p className="mt-2 font-display text-xl font-medium tracking-tight text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="our expertise"
        title="Deep technical skill, applied to everyday work"
        invert
      >
        <p>
          We combine deep technical knowledge with hands-on delivery, across
          teams and industries. Whatever the problem, we start with your data
          and systems, build something your team will use, and keep improving
          it after launch.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger>
          <ul
            role="list"
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {capabilities.map(({ index, title, body }) => (
              <li key={index} className="text-neutral-300">
                <FadeIn>
                  <div className="relative pl-8">
                    {/* Left border — matches Border component pattern */}
                    <div
                      className="absolute left-0 top-0 h-6 w-px bg-white"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute bottom-0 left-0 top-8 w-px bg-white/10"
                      aria-hidden="true"
                    />

                    {/* Ordinal index */}
                    <span className="block font-display text-sm font-semibold tracking-widest text-white/50">
                      {index}
                    </span>

                    {/* Title */}
                    <strong className="mt-4 block font-display text-lg font-semibold tracking-tight text-white">
                      {title}.
                    </strong>

                    {/* Body */}
                    <p className="mt-3 text-base leading-7 text-neutral-400">
                      {body}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

export const metadata = buildPageMetadata('about')

export default function About() {
  return (
    <>
      <StructuredData routeKey="about" />
      <PageIntro
        eyebrow="about us"
        title="Solutions, not slideshows"
      >
        <p>
          Our strength is an implementation-first approach. We focus on real,
          measurable value from AI systems that run in production, inside the
          software, documents and processes your organisation already uses.
        </p>
        <p style={{ marginTop: '1rem' }}>
          You won&rsquo;t just get a strategy deck and a demo. We specialise in
          the implementation phase, where the real change happens.
        </p>
        <IntroProofBand />
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Embeddings was founded by engineers who spent years building large
            language model pipelines and enterprise data systems. We saw that
            while many consultancies talked about AI&rsquo;s potential, few
            could deliver practical systems that run in production. We started
            Embeddings to do exactly that.
          </p>
          <p>
            We&rsquo;re more than consultants. We&rsquo;re partners in putting
            AI to work in your organisation. Our team combines deep technical
            expertise with hands-on implementation experience, so every system
            we deliver is robust, secure and built to scale.
          </p>
        </div>
      </PageIntro>
      <ProofLedger />

      <Culture />

      <ContactSection />
    </>
  )
}
