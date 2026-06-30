import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/process/laptop.webp'
import imageMeeting from '@/images/process/meeting.webp'
import imageWhiteboard from '@/images/process/whiteboard.webp'

function ProcessImageSignals({ title, signals }) {
  if (signals.length === 0) {
    return null
  }

  return (
    <ul
      role="list"
      aria-label={`${title} visual signals`}
      className="pointer-events-none static z-10 mt-3 grid w-full gap-2 sm:absolute sm:bottom-6 sm:right-6 sm:mt-0 sm:w-[min(28rem,calc(100%-3rem))] sm:grid-cols-2"
    >
      {signals.map(({ label, value }) => (
        <li
          key={label}
          className="rounded-xl border border-white/45 bg-white/90 px-3 py-2 shadow-[0_8px_24px_rgba(23,23,23,0.12)] backdrop-blur"
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-neutral-500">
            {label}
          </p>
          <p className="mt-1 font-display text-sm font-semibold tracking-tight text-neutral-950">
            {value}
          </p>
        </li>
      ))}
    </ul>
  )
}

function Section({ title, image, signals = [], children }) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-full max-w-[33.75rem] flex-none lg:w-[45rem] lg:max-w-none">
            <div className="relative">
              <StylizedImage
                {...image}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end lg:group-even/section:justify-start"
              />
              <ProcessImageSignals title={title} signals={signals} />
            </div>
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Discover() {
  return (
    <Section
      title="Audit"
      image={{ src: imageWhiteboard, priority: true }}
      signals={[
        { label: 'scorecard', value: '74/100 ready' },
        { label: 'gaps ranked', value: '128 fixes' },
      ]}
    >
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We start with the product catalogue because that is where agentic
          commerce is won or lost. Our audit checks{' '}
          <strong className="font-semibold text-neutral-950">
            GTIN coverage, taxonomy depth, image quality, descriptions, pricing,
            stock freshness, and merchant-feed readiness
          </strong>{' '}
          against the standards AI agents already use to rank products.
        </p>
        <p>
          You receive a prioritised remediation plan that shows which gaps block
          recommendation eligibility, which fixes protect revenue first, and
          which data owners need to be involved. The output is practical: a
          catalogue-readiness score, a risk register, and the fastest path to
          richer product data.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>Merchant Feed Audit</TagListItem>
        <TagListItem>GTIN Coverage</TagListItem>
        <TagListItem>Attribute Gaps</TagListItem>
        <TagListItem>Taxonomy Review</TagListItem>
        <TagListItem>Freshness Risk</TagListItem>
        <TagListItem>Revenue Priority</TagListItem>
      </TagList>
    </Section>
  )
}

function Build() {
  return (
    <Section
      title="Engineer"
      image={{ src: imageLaptop, shape: 1 }}
      signals={[
        { label: 'pipeline', value: 'ERP + PIM sync' },
        { label: 'governance', value: 'review queue' },
      ]}
    >
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Once the gaps are clear, we build the pipelines that make catalogue
          data durable. ERP, PIM, POS, and inventory signals are normalised into
          product records that AI agents can read, compare, and trust without
          waiting for manual spreadsheet clean-up.
        </p>
        <p>
          Our enrichment layer adds the content agents need: complete
          attributes, clearer descriptions, better categorisation, and
          trend-aware language that still sounds like your brand. Every field
          stays traceable, so merchandising teams can review the data before it
          reaches a live feed.
        </p>
        <p>
          We keep implementation narrow and measurable. The work is organised
          around catalogue coverage, freshness latency, feed acceptance, and the
          specific product categories with the highest commercial impact.
        </p>
      </div>

      <Blockquote className="mt-12">
        Embeddings showed us which catalogue gaps were stopping our products
        from being understood and gave our merchandising team a practical way to
        fix them at scale.
      </Blockquote>
    </Section>
  )
}

function Deliver() {
  return (
    <Section
      title="Optimise"
      image={{ src: imageMeeting, shape: 2 }}
      signals={[
        { label: 'freshness', value: '<15 min drift' },
        { label: 'signals', value: 'trend pulse' },
      ]}
    >
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          A catalogue is only agentic-ready if it stays current. We help teams
          operate the new data layer in production, with monitoring for stale
          inventory, rejected feed fields, missing product identifiers, and
          content that drifts away from live search demand.
        </p>
        <p>
          Trend signals are folded back into the catalogue, so products can
          respond to cultural demand, regulatory news, and seasonal shifts while
          staying accurate. The goal is a living product data layer that
          strengthens every recommendation surface.
        </p>
        <p>
          We continue measuring whether the catalogue{' '}
          <strong className="font-semibold text-neutral-950">
            performs at scale
          </strong>{' '}
          across agentic shopping entry points, merchant feeds, and internal
          commerce systems.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Feed Monitoring">
          We watch acceptance rates, stale records, rejected attributes, and
          catalogue freshness so issues are fixed before they affect
          recommendation quality.
        </ListItem>
        <ListItem title="Trend Response">
          We connect product content to live demand signals, then update
          descriptions and attributes where the commercial opportunity justifies
          action.
        </ListItem>
        <ListItem title="Merchandising Handover">
          We document the workflow, review controls, and ownership model so
          internal teams can keep improving the catalogue after launch.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="our values"
        title="Built for agentic commerce, not generic AI adoption"
      >
        <p>
          Catalogue readiness is a technical, commercial, and operational
          problem. These principles keep the work focused on recommendation
          quality rather than broad AI theatre.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Agent-readable data">
            Product records need complete identifiers, attributes, descriptions,
            and categories that agents can compare without guessing.
          </GridListItem>
          <GridListItem title="Freshness as a signal">
            Stock, price, availability, and status changes must reach commerce
            surfaces before stale data costs visibility.
          </GridListItem>
          <GridListItem title="Measurable coverage">
            Progress is tracked through catalogue completeness, feed acceptance,
            enrichment quality, and freshness latency.
          </GridListItem>
          <GridListItem title="Brand-safe enrichment">
            Generated content needs governance, review paths, and traceability
            so product truth stays intact.
          </GridListItem>
          <GridListItem title="Retail workflow fit">
            The system must work with merchandising, data, and commerce teams
            rather than creating a separate AI process.
          </GridListItem>
          <GridListItem title="Live optimisation">
            Trend signals, seasonality, and regulatory moments should improve
            catalogue content while demand is still active.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Catalogue Readiness Process',
  description:
    'How Embeddings audits, enriches, and optimises retail catalogues for agentic commerce.',
}

export default function Process() {
  return (
    <>
      <PageIntro
        eyebrow="our process"
        title="How we make catalogues agentic-ready"
      >
        <p>
          We turn retail catalogues into product data layers that Google,
          OpenAI, and commerce agents can read, trust, and recommend. The
          process moves from quantified gaps to live optimisation without
          drifting into generic AI consulting.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Build />
        <Deliver />
      </div>

      <Values />

      <ContactSection />
    </>
  )
}
