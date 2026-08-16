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

function Foundation() {
  return (
    <Section
      title="Foundation"
      image={{ src: imageWhiteboard, priority: true }}
      signals={[
        { label: 'scorecard', value: '74/100 ready' },
        { label: 'gaps ranked', value: '128 fixes' },
      ]}
    >
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We start with the product catalogue because your agent can only answer
          from what it knows. Our audit checks{' '}
          <strong className="font-semibold text-neutral-950">
            GTIN coverage, taxonomy depth, image quality, descriptions, pricing,
            stock freshness, and merchant-feed readiness
          </strong>{' '}
          against the standards both your own agent and external commerce agents
          rely on.
        </p>
        <p>
          You receive a prioritised remediation plan that shows which gaps
          produce wrong answers, which fixes protect revenue first, and which
          data owners need to be involved. The output is practical: a
          catalogue-readiness score, a risk register, and the fastest path to
          richer product data.
        </p>
        <p>
          We then close the gaps. LLM enrichment pipelines fill missing
          attributes, descriptions, and categories at scale, while real-time
          integrations from your ERP, PIM, POS, and inventory systems keep
          stock, price, and status current. Every generated field stays
          traceable, so merchandising can review the data before it reaches a
          live surface.
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

function Deploy() {
  return (
    <Section
      title="Deploy"
      image={{ src: imageLaptop, shape: 1 }}
      signals={[
        { label: 'search', value: 'plugged into your stack' },
        { label: 'checkout', value: 'in the conversation' },
      ]}
    >
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We ground your agent on the enriched catalogue, then build it into the
          site your customers already use. The interface is designed into your
          brand and your design system, so the agent looks like part of your
          store rather than a bolted-on chat box.
        </p>
        <p>
          The agent integrates with the search you already run:{' '}
          <strong className="font-semibold text-neutral-950">
            Algolia, Coveo, Elasticsearch, Google Retail Search, or your own
            index
          </strong>
          . You are never tied to one search index, and you can change providers
          without rebuilding the agent.
        </p>
        <p>
          We configure prompts, canned responses, and guardrails with your
          business, legal, and ecommerce teams, then connect the systems that
          complete the journey: cart, checkout, order status, returns, and any
          other API the conversation needs. Rollout is staged, with testing and
          rollback at every step.
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

function Operate() {
  return (
    <Section
      title="Operate"
      image={{ src: imageMeeting, shape: 2 }}
      signals={[
        { label: 'analytics', value: 'assisted revenue' },
        { label: 'control', value: 'self-service' },
      ]}
    >
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          A live agent is a product, not a project. We report on sessions,
          conversion, assisted revenue, search success, containment, and
          drop-off, so you can see where the conversation earns money and where
          it stalls.
        </p>
        <p>
          Those signals feed straight back into the catalogue. Trend and demand
          data keep product content aligned with what customers are actually
          asking for, while monitoring catches stale inventory, missing
          identifiers, and answers that drift away from product truth.
        </p>
        <p>
          Then we hand over the controls. Your team changes{' '}
          <strong className="font-semibold text-neutral-950">
            prompts, policies, and canned responses
          </strong>{' '}
          directly, with versioning, review, and rollback behind them, so
          routine changes never wait on anyone else.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Conversation Analytics">
          We report sessions, conversion, assisted revenue, drop-off, and
          containment so the agent is measured on commercial outcomes rather
          than message volume.
        </ListItem>
        <ListItem title="Catalogue Optimisation">
          We connect product content to live demand signals, then update
          descriptions and attributes where the commercial opportunity justifies
          action.
        </ListItem>
        <ListItem title="Self-Service Handover">
          We document the workflow, review controls, and ownership model so your
          team can change the agent and keep improving the catalogue after
          launch.
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
        title="Built for retail conversations, not generic AI adoption"
      >
        <p>
          Putting a trustworthy agent between you and your customer is a
          technical, commercial, and operational problem. These principles keep
          the work focused on answer quality and revenue rather than broad AI
          theatre.
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
          <GridListItem title="Measurable revenue">
            Progress is tracked through sessions, conversion, and assisted
            revenue, not message counts or activity dashboards.
          </GridListItem>
          <GridListItem title="Brand-safe conversations">
            Generated answers need governance, review paths, PII controls, and
            traceability so product truth and customer trust stay intact.
          </GridListItem>
          <GridListItem title="Retail workflow fit">
            The system must work with merchandising, data, and commerce teams
            rather than creating a separate AI process.
          </GridListItem>
          <GridListItem title="Your controls">
            Prompts, policies, and canned responses stay in your hands, with
            versioning and rollback behind every change.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'From Catalogue to Live Agent',
  description:
    'How Embeddings builds retailer-owned AI shopping agents: catalogue foundation, agent deployment, and live operation.',
}

export default function Process() {
  return (
    <>
      <PageIntro
        eyebrow="our process"
        title="How we take you from catalogue to live agent"
      >
        <p>
          We start with the product data, because your agent is only as good as
          what it knows. Then we build the agent around it, connect your
          commerce systems, and hand you the controls.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Foundation />
        <Deploy />
        <Operate />
      </div>

      <Values />

      <ContactSection />
    </>
  )
}
