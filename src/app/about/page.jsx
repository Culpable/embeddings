import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'

const capabilities = [
  {
    index: '01',
    title: 'Agent & LLM Pipeline Engineering',
    body: 'We build the shopping agent and the pipelines that feed it: grounding answers in your catalogue, connecting your search and commerce systems, and enriching product data at scale so descriptions, categories, and attributes are complete. Thousands of SKUs processed in hours.',
  },
  {
    index: '02',
    title: 'Data Infrastructure',
    body: 'We integrate directly with your ERP, PIM, and inventory systems to keep catalogue data fresh and accurate. Real-time stock, pricing, and product status — because AI agents penalise stale data.',
  },
  {
    index: '03',
    title: 'Retail Domain Expertise',
    body: (
      <>
        We understand Google Merchant Centre specifications, GTIN standards,
        product taxonomy, and the emerging standards of agentic commerce.
      </>
    ),
  },
]

const proofSignals = [
  {
    label: 'focus',
    value: 'retailer-owned shopping agents',
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
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
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
                proof of focus
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Built around one retail problem, not a broad AI menu
              </h2>
              <p className="mt-5 text-base leading-7 text-neutral-400">
                The consultancy story resolves into three concrete signals:
                shopping-agent depth, engineering delivery, and Australian
                retail proximity.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {proofSignals.map(({ label, value }) => (
                <div
                  key={label}
                  className="surface-elevation-dark rounded-2xl bg-white/[0.04] px-4 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
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
        eyebrow="our approach"
        title="Built for retail conversations, not generic AI consulting"
        invert
      >
        <p>
          Most AI consultancies offer broad capability across dozens of use
          cases. We chose a different path: deep, vertical expertise in one
          problem. Putting a trustworthy agent between a retailer and their
          customer, on the retailer&rsquo;s terms, grounded in the
          retailer&rsquo;s own product data.
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
                    <span className="block font-display text-sm font-semibold tracking-widest text-white/40">
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

export const metadata = {
  title: 'About Us',
  description:
    'The Australian consultancy building retailer-owned AI shopping agents, combining LLM pipeline engineering and data infrastructure at scale.',
}

export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="about us"
        title="The team building Australia&rsquo;s retailer-owned shopping agents"
      >
        <p>
          Embeddings was founded on a single conviction: the retailers who win
          in agentic commerce will be the ones who own the conversation and have
          the best product data behind it. We combine LLM pipeline engineering
          with data infrastructure at scale to deliver both.
        </p>
        <p style={{ marginTop: '1rem' }}>
          We don&rsquo;t hand you a strategy deck and wish you luck. We enrich
          your catalogue, build your agent on top of it, and hand you the
          controls.
        </p>
        <IntroProofBand />
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Embeddings was founded by engineers who spent years building large
            language model pipelines and enterprise data systems. When agentic
            shopping emerged — AI agents autonomously researching and purchasing
            on behalf of consumers — we saw the critical gap: retailers had
            decades of product data locked in formats AI couldn&rsquo;t parse,
            and no way to put their own agent in front of customers. Rich
            product knowledge trapped in PDFs, spreadsheets, and legacy ERPs. We
            built Embeddings to solve that problem.
          </p>
          <p>
            Our approach is engineering-led and outcome-driven. We measure
            success in catalogue completeness scores, enrichment coverage, and
            freshness latency — not slide counts. Every engagement begins with a
            quantitative audit and ends with an enriched catalogue and a
            shopping agent your team controls.
          </p>
        </div>
      </PageIntro>
      <ProofLedger />
      <Container className="mt-16">
        <StatList>
          <StatListItem
            value="393%"
            label="YoY growth in AI-driven e-commerce"
            sourceLabel="Adobe"
            sourceHref="https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable"
          />
          <StatListItem
            value="$3–5T"
            label="Projected agentic commerce by 2030"
            sourceLabel="McKinsey"
            sourceHref="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-automation-curve-in-agentic-commerce"
          />
          <StatListItem
            value="81%"
            label="Of retail execs say AI will weaken brand loyalty"
            sourceLabel="Deloitte"
            sourceHref="https://www.deloitte.com/us/en/insights/industry/retail-distribution/retail-distribution-industry-outlook.html"
          />
        </StatList>
      </Container>

      <Culture />

      <ContactSection />
    </>
  )
}
