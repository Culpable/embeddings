import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpg'
import imageBlakeReid from '@/images/team/blake-reid.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageMichaelFoster from '@/images/team/michael-foster.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpg'
import { loadArticles } from '@/lib/mdx'

const capabilities = [
  {
    index: '01',
    title: 'LLM Pipeline Engineering',
    body: 'We build and operate large language model pipelines that enrich product catalogs at scale — generating descriptions, categories, and attributes from raw product data and images. Thousands of SKUs processed in hours.',
  },
  {
    index: '02',
    title: 'Data Infrastructure',
    body: 'We integrate directly with your ERP, PIM, and inventory systems to keep catalog data fresh and accurate. Real-time stock, pricing, and product status — because AI agents penalise stale data.',
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
        title="Built for catalogs, not generic AI consulting"
        invert
      >
        <p>
          Most AI consultancies offer broad capability across dozens of use cases. We chose a
          different path — deep, vertical expertise in the one problem that determines whether
          retailers survive the agentic shift: catalog data quality.
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

const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        image: { src: imageLeslieAlexander },
      },
      {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        image: { src: imageMichaelFoster },
      },
      {
        name: 'Dries Vincent',
        role: 'Partner & Business Relations',
        image: { src: imageDriesVincent },
      },
    ],
  },
  {
    title: 'Team',
    people: [
      {
        name: 'Chelsea Hagon',
        role: 'Senior Developer',
        image: { src: imageChelseaHagon },
      },
      {
        name: 'Emma Dorsey',
        role: 'Senior Designer',
        image: { src: imageEmmaDorsey },
      },
      {
        name: 'Leonard Krasner',
        role: 'VP, User Experience',
        image: { src: imageLeonardKrasner },
      },
      {
        name: 'Blake Reid',
        role: 'Junior Copywriter',
        image: { src: imageBlakeReid },
      },
      {
        name: 'Kathryn Murphy',
        role: 'VP, Human Resources',
        image: { src: imageKathrynMurphy },
      },
      {
        name: 'Whitney Francis',
        role: 'Content Specialist',
        image: { src: imageWhitneyFrancis },
      },
      {
        name: 'Jeffrey Webb',
        role: 'Account Coordinator',
        image: { src: imageJeffreyWebb },
      },
      {
        name: 'Benjamin Russel',
        role: 'Senior Developer',
        image: { src: imageBenjaminRussel },
      },
      {
        name: 'Angela Fisher',
        role: 'Front-end Developer',
        image: { src: imageAngelaFisher },
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata = {
  title: 'About Us',
  description:
    'The only Australian consultancy combining LLM pipeline engineering and data infrastructure at scale — purpose-built to make retail catalogs agentic-ready.',
}

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <>
      <PageIntro eyebrow="about us" title="The team behind Australia&rsquo;s first agentic commerce consultancy">
        <p>
          Embeddings was founded on a single conviction: the retailers who win in agentic commerce
          will be the ones with the best product data. We&rsquo;re the only Australian consultancy
          that combines LLM pipeline engineering with data infrastructure at scale — purpose-built
          for catalog readiness.
        </p>
        <p style={{ marginTop: '1rem' }}>
          We don&rsquo;t hand you a strategy deck and wish you luck. We audit, enrich, and
          operationalise your catalog so AI agents from Google and OpenAI recommend your products
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
            Our approach is engineering-led and outcome-driven. We measure success in catalog
            completeness scores, enrichment coverage, and freshness latency — not slide counts.
            Every engagement begins with a quantitative audit and ends with a catalog that&rsquo;s
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

      {/* <Team /> */}

      {/* <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={blogArticles}
      /> */}

      <ContactSection />
    </>
  )
}
