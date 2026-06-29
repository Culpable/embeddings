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
    title: 'LLM Pipeline Engineering',
    body: 'We build and operate large language model pipelines that enrich product catalogues at scale — generating descriptions, categories, and attributes from raw product data and images. Thousands of SKUs processed in hours.',
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
        We understand Google Merchant Centre specifications, GTIN standards, product taxonomy, and
        the emerging requirements of Google&rsquo;s Universal Commerce Protocol and OpenAI&rsquo;s
        Instant Checkout.
      </>
    ),
  },
]

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="our approach"
        title="Built for catalogues, not generic AI consulting"
        invert
      >
        <p>
          Most AI consultancies offer broad capability across dozens of use cases. We chose a
          different path — deep, vertical expertise in the one problem that determines whether
          retailers survive the agentic shift: catalogue data quality.
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
    'The only Australian consultancy combining LLM pipeline engineering and data infrastructure at scale — purpose-built to make retail catalogues agentic-ready.',
}

export default function About() {
  return (
    <>
      <PageIntro eyebrow="about us" title="The team behind Australia&rsquo;s first agentic commerce consultancy">
        <p>
          Embeddings was founded on a single conviction: the retailers who win in agentic commerce
          will be the ones with the best product data. We&rsquo;re the only Australian consultancy
          that combines LLM pipeline engineering with data infrastructure at scale — purpose-built
          for catalogue readiness.
        </p>
        <p style={{ marginTop: '1rem' }}>
          We don&rsquo;t hand you a strategy deck and wish you luck. We audit, enrich, and
          operationalise your catalogue so AI agents from Google and OpenAI recommend your products
          first.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Embeddings was founded by engineers who spent years building large language model
            pipelines and enterprise data systems. When agentic shopping emerged — AI agents
            autonomously researching and purchasing on behalf of consumers — we saw the critical
            gap: retailers had decades of product data locked in formats that AI agents couldn&rsquo;t
            parse. Rich product knowledge trapped in PDFs, spreadsheets, and legacy ERPs. We built
            Embeddings to solve that problem.
          </p>
          <p>
            Our approach is engineering-led and outcome-driven. We measure success in catalogue
            completeness scores, enrichment coverage, and freshness latency — not slide counts.
            Every engagement begins with a quantitative audit and ends with a catalogue that&rsquo;s
            ready for Google&rsquo;s Universal Commerce Protocol, OpenAI&rsquo;s Instant Checkout,
            and whatever comes next.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="758%" label="YoY growth in AI-driven e-commerce" />
          <StatListItem value="$3–5T" label="Projected agentic commerce by 2030" />
          <StatListItem value="81%" label="Of retail execs say AI will weaken brand loyalty" />
        </StatList>
      </Container>

      <Culture />

      <ContactSection />
    </>
  )
}
