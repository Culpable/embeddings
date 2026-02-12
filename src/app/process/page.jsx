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
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'

function Section({ title, image, children }) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
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
    <Section title="Discover" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Through detailed process mapping and data analysis, we identify{' '}
          <strong className="font-semibold text-neutral-950">key opportunities</strong>{' '}
          where AI can drive the most significant productivity gains. This includes 
          evaluating your knowledge management systems, document workflows, and 
          production environments.
        </p>
        <p>
          Following our discovery phase, we deliver a comprehensive{' '}
          <strong className="font-semibold text-neutral-950">implementation roadmap</strong>{' '}
          that outlines specific AI solutions, expected efficiency gains, and 
          clear ROI metrics for each proposed solution.
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
    <Section title="Build" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Based on our thorough analysis, we develop a comprehensive implementation plan 
          that aligns with your business objectives. Our approach focuses on delivering 
          measurable value through strategic AI integration.
        </p>
        <p>
          Each client is assigned a dedicated AI transformation specialist who ensures 
          clear communication and smooth implementation. They work closely with our technical 
          team to customise solutions that maximise your organisation’s potential.
        </p>
        <p>
          We maintain transparent communication throughout the process, providing regular 
          updates on implementation progress and early results, ensuring you’re always 
          informed about your AI transformation journey.
        </p>
      </div>

      <Blockquote
        className="mt-12"
      >
        Embeddings transformed our maintenance workflows within weeks. Their systematic
        approach to AI implementation helped us achieve a 70% reduction in document
        processing time.
      </Blockquote>
    </Section>
  )
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We don’t stop at strategy decks. We focus on the crucial{' '}
          <strong className="font-semibold text-neutral-950">implementation phase</strong>{' '}
          where real value is created. Our focus is on production-ready solutions that 
          work in the real world.
        </p>
        <p>
          Our team provides comprehensive{' '}
          <strong className="font-semibold text-neutral-950">hands-on support</strong>{' '}
          throughout deployment, ensuring successful adoption and measurable productivity 
          gains from day one.
        </p>
        <p>
          We maintain ongoing technical support to ensure your AI solutions{' '}
          <strong className="font-semibold text-neutral-950">
            perform at scale
          </strong>{' '}
          in production, evolving with your business needs.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Production Deployment">
          We handle the complex technical work of deploying AI solutions into your 
          live business environment, ensuring security, reliability, and performance.
        </ListItem>
        <ListItem title="System Integration">
          Our team manages the integration with your existing enterprise systems, 
          delivering a seamless experience for your users.
        </ListItem>
        <ListItem title="Production Support">
          We provide ongoing technical support and optimisation, ensuring your 
          solutions continue delivering value at enterprise scale.
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
        title="Transforming work through AI innovation"
      >
        <p>
          We combine deep technical expertise with practical business acumen to help 
          Australian organisations harness the power of generative AI. Our commitment 
          to delivering measurable results drives everything we do.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Technical Excellence">
            Our team stays at the forefront of generative AI advancements, ensuring our 
            clients benefit from cutting-edge solutions that deliver real business value.
          </GridListItem>
          <GridListItem title="Measurable Impact">
            We focus on delivering quantifiable productivity gains and efficiency 
            improvements that directly impact your bottom line.
          </GridListItem>
          <GridListItem title="Practical Innovation">
            We transform complex AI capabilities into practical business solutions that 
            solve real operational challenges.
          </GridListItem>
          <GridListItem title="Clear Communication">
            We maintain transparent dialogue throughout the transformation process, 
            ensuring alignment and understanding at every step.
          </GridListItem>
          <GridListItem title="Strategic Partnership">
            We build lasting relationships with our clients, supporting their ongoing 
            AI transformation journey and evolution.
          </GridListItem>
          <GridListItem title="Deep Expertise">
            Our team combines advanced AI knowledge with extensive business experience 
            to deliver solutions that work in the real world.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Our Process',
  description:
    'We help Australian businesses achieve radical productivity gains through strategic AI implementation, combining technical expertise with practical business solutions.',
}

export default function Process() {
  return (
    <>
      <PageIntro eyebrow="our process" title="How we work">
        <p>
          We take a systematic approach to AI implementation, ensuring each solution 
          delivers immediate value while building a foundation for long-term 
          transformation and sustained productivity gains.
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
