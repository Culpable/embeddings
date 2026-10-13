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
import { StructuredData } from '@/components/StructuredData'
import { buildPageMetadata } from '@/lib/metadata'
import {
  processImageSizes,
  processImages,
  sourceSet,
} from '@/lib/process-image-config.mjs'
import { preload } from 'react-dom'

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

// Render one process stage: a photo (or, for stages without one, an aside
// card) beside the stage number, title, deliverable and copy. Even stages
// swap sides on desktop. `output` names what the client has at the end of the
// stage, matching the "You get" lines in the homepage timeline.
function Section({ id, title, output, image, aside, signals = [], children }) {
  return (
    <Container className="group/section [counter-increment:section]">
      {/* Container does not forward `id`, so the stage anchor (linked from the
          structured data, e.g. /process#deploy) sits on this inner wrapper. */}
      <div
        id={id}
        className="scroll-mt-24 lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20"
      >
        {/* Photos keep a fixed width and bleed past the text column on
            purpose. An aside card instead fills the space left beside the
            text, so it never runs past the container edge. */}
        {image ? (
          <div className="flex justify-center">
            <FadeIn className="w-full max-w-[33.75rem] flex-none lg:w-[45rem] lg:max-w-none">
              <div className="relative">
                <StylizedImage
                  {...image}
                  className="justify-center lg:justify-end lg:group-even/section:justify-start"
                />
                <ProcessImageSignals title={title} signals={signals} />
              </div>
            </FadeIn>
          </div>
        ) : (
          <div className="flex justify-center lg:min-w-0 lg:flex-1">
            <FadeIn className="w-full max-w-[33.75rem] lg:max-w-none">
              {aside}
            </FadeIn>
          </div>
        )}
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            {output ? (
              <p className="mt-4 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
                You get: {output}
              </p>
            ) : null}
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
      id="discover"
      title="Discover"
      output="A short list of opportunities, ranked by value and effort"
      image={{
        image: processImages.whiteboard,
        priority: true,
        sizes: processImageSizes.whiteboard,
      }}
      signals={[
        { label: 'scope', value: 'people, data and systems' },
        { label: 'output', value: 'ranked opportunities' },
      ]}
    >
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Through process mapping and data analysis, we identify the{' '}
          <strong className="font-semibold text-neutral-950">
            key opportunities
          </strong>{' '}
          where AI can take the most work off your team. We look at your
          knowledge systems, document workflows and the software your people
          use every day, and we’re clear about where AI won’t help.
        </p>
        <p>
          You then receive an{' '}
          <strong className="font-semibold text-neutral-950">
            implementation roadmap
          </strong>
          : the specific AI systems we recommend, the data and integrations
          each one needs, and how we’ll measure its value.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>Production System Analysis</TagListItem>
        <TagListItem>Integration Requirements</TagListItem>
        <TagListItem>Solution Design</TagListItem>
        <TagListItem>Security Assessment</TagListItem>
        <TagListItem>Implementation Planning</TagListItem>
        <TagListItem>Deployment Strategy</TagListItem>
      </TagList>
    </Section>
  )
}

function Build() {
  return (
    <Section
      id="build"
      title="Build"
      output="A working system your team has already tried"
      image={{
        image: processImages.laptop,
        shape: 1,
        sizes: processImageSizes.standard,
      }}
      signals={[
        { label: 'built on', value: 'your real data' },
        { label: 'tested by', value: 'the people who use it' },
      ]}
    >
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We build a working version on your real data early, and test it with
          the people who will use it. You see working software, not a demo
          deck.
        </p>
        <p>
          We work in short cycles, showing you progress and adjusting as we
          learn what works for your team.
        </p>
        <p>
          Each client has a dedicated lead who keeps communication clear and
          works closely with our engineers, so the system fits how your
          organisation actually works.
        </p>
      </div>
    </Section>
  )
}


function Deploy() {
  return (
    <Section
      id="deploy"
      title="Deploy"
      output="A live system inside the tools your team already uses"
      image={{
        image: processImages.meeting,
        shape: 2,
        sizes: processImageSizes.standard,
      }}
      signals={[
        { label: 'runs in', value: 'your existing tools' },
        { label: 'rollout', value: 'staged, with rollback' },
      ]}
    >
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We don’t stop at strategy decks. We focus on the{' '}
          <strong className="font-semibold text-neutral-950">
            implementation phase
          </strong>
          , where real value is created: systems that work in production, not
          just in a demo.
        </p>
        <p>
          We connect the system to the software you already run:{' '}
          <strong className="font-semibold text-neutral-950">
            ERP, CRM, document systems, project tools and custom-built software
          </strong>
          . Guardrails are set with your business, legal and IT teams, so it
          only does what it should.
        </p>
        <p>
          Our team provides{' '}
          <strong className="font-semibold text-neutral-950">
            hands-on support
          </strong>{' '}
          through rollout, so your people adopt the system and see results
          early.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>Production Deployment</TagListItem>
        <TagListItem>System Integration</TagListItem>
        <TagListItem>Access Controls</TagListItem>
        <TagListItem>Staged Rollout</TagListItem>
        <TagListItem>Team Training</TagListItem>
      </TagList>
    </Section>
  )
}


// The fourth stage has no photo, so the list of what's included takes the
// photo's place as a card.
function OperateIncluded() {
  return (
    <div className="surface-elevation-light rounded-3xl bg-white p-8 sm:p-10">
      <h3 className="font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Production Support">
          We monitor usage, errors and answer quality, and fix problems before
          your team has to report them.
        </ListItem>
        <ListItem title="Regular Improvements">
          We extend and refine the system as you learn what works, from new
          questions it should answer to new tasks it can take on.
        </ListItem>
        <ListItem title="Handover and Control">
          We document the system and its controls, so your team can change
          everyday settings directly, with review and rollback behind them.
        </ListItem>
      </List>
    </div>
  )
}


function Operate() {
  return (
    <Section
      id="operate"
      title="Operate"
      output="Ongoing support and regular improvements"
      aside={<OperateIncluded />}
    >
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          A live AI system is a product, not a project. We keep supporting and
          improving it so it{' '}
          <strong className="font-semibold text-neutral-950">
            performs at scale
          </strong>{' '}
          in production and changes as your business does.
        </p>
        <p>
          We track where it helps and where it falls short, so you can see the
          work it takes off your team and decide what to build next.
        </p>
      </div>
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
        title="AI that earns its place in your business"
      >
        <p>
          We combine deep technical expertise with practical business sense.
          Everything we build has to do real work for your team, and we measure
          it that way.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Technical Excellence">
            Our team stays at the forefront of AI, so you get current, proven
            techniques rather than last year’s approach.
          </GridListItem>
          <GridListItem title="Measurable Impact">
            We measure success by the work a system takes off your team and
            the time it gives back.
          </GridListItem>
          <GridListItem title="Practical Solutions">
            We turn complex AI capabilities into systems that solve real
            operational problems, inside the tools your team already uses.
          </GridListItem>
          <GridListItem title="Clear Communication">
            We keep you informed at every step, with plain answers about what
            AI can and can’t do for you.
          </GridListItem>
          <GridListItem title="Safe by Design">
            Access controls, review steps, privacy safeguards and traceability
            are built in from the start.
          </GridListItem>
          <GridListItem title="Lasting Partnership">
            We stay on after launch, supporting and extending your systems as
            your organisation grows.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata = buildPageMetadata('process')

export default function Process() {
  // Preload the first process image because it is the route's LCP candidate.
  preload(processImages.whiteboard.avif[2].url, {
    as: 'image',
    type: 'image/avif',
    imageSrcSet: sourceSet(processImages.whiteboard.avif),
    imageSizes: processImageSizes.whiteboard,
    fetchPriority: 'high',
  })

  return (
    <>
      <StructuredData routeKey="process" />
      <PageIntro
        eyebrow="our process"
        title="How we work"
      >
        <p>
          We take a systematic approach to AI implementation, so each system
          delivers value early and gives you a foundation to build on.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Build />
        <Deploy />
        <Operate />
      </div>

      <Values />

      <ContactSection />
    </>
  )
}
