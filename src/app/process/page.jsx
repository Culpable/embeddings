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
          We work closely with our clients to understand their{' '}
          <strong className="font-semibold text-neutral-950">needs</strong> and
          goals, embedding ourselves in their every day operations to understand
          what makes their business tick.
        </p>
        <p>
          Our team of AI experts begins by thoroughly analysing your current processes and workflows. 
          We identify opportunities for automation and optimisation, evaluate your data infrastructure, 
          and design tailored AI solutions that integrate seamlessly with your existing systems. 
          Throughout implementation, we ensure your team is equipped to leverage these new capabilities 
          effectively.
        </p>
        <p>
          Our team of private investigators shadow the company director’s for
          several weeks while our account managers focus on going through their
          trash. Our senior security experts then perform social engineering
          hacks to gain access to their{' '}
          <strong className="font-semibold text-neutral-950">business</strong>{' '}
          accounts — handing that information over to our forensic accounting
          team.
        </p>
        <p>
          Once the full audit is complete, we report back with a comprehensive{' '}
          <strong className="font-semibold text-neutral-950">plan</strong> and,
          more importantly, a budget.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>Process Analysis</TagListItem>
        <TagListItem>Technical Assessment</TagListItem>
        <TagListItem>Data Evaluation</TagListItem>
        <TagListItem>Solution Design</TagListItem>
        <TagListItem>Implementation Strategy</TagListItem>
        <TagListItem>Performance Monitoring</TagListItem>
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
          team to customise solutions that maximise your organisation's potential.
        </p>
        <p>
          We maintain transparent communication throughout the process, providing regular 
          updates on implementation progress and early results, ensuring you're always 
          informed about your AI transformation journey.
        </p>
      </div>

      <Blockquote
        author={{ name: 'Sarah Mitchell', role: 'CTO of TechForward' }}
        className="mt-12"
      >
        Embeddings' systematic approach to AI implementation helped us achieve 
        results we didn't think possible in such a short timeframe.
      </Blockquote>
    </Section>
  )
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We ensure seamless integration of AI solutions while maintaining your existing 
          workflows, focusing on minimal disruption and maximum{' '}
          <strong className="font-semibold text-neutral-950">efficiency gains</strong>.
        </p>
        <p>
          Our team provides comprehensive{' '}
          <strong className="font-semibold text-neutral-950">training</strong>{' '}
          to ensure your staff can effectively leverage the new AI capabilities, 
          maximising adoption and return on investment.
        </p>
        <p>
          We maintain ongoing support and optimisation to ensure your AI solutions 
          continue to deliver{' '}
          <strong className="font-semibold text-neutral-950">
            measurable value
          </strong>{' '}
          as your business evolves and grows.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Comprehensive Testing">
          Rigorous testing ensures your AI solutions perform reliably and securely 
          in your specific business context.
        </ListItem>
        <ListItem title="Robust Infrastructure">
          We implement enterprise-grade infrastructure to ensure high availability 
          and scalability of your AI solutions.
        </ListItem>
        <ListItem title="Ongoing Support">
          Our team provides continuous support and optimisation to ensure your AI 
          solutions evolve with your business needs.
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
        eyebrow="Our values"
        title="Harnessing technology for a brighter future"
      >
        <p>
          We combine deep technical expertise with innovative thinking to help 
          Australian businesses stay ahead in the rapidly evolving digital landscape. 
          Our commitment to excellence drives everything we do.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Technical Excellence">
            Our team stays at the forefront of AI advancements, ensuring our clients 
            benefit from the latest innovations in machine learning and automation.
          </GridListItem>
          <GridListItem title="Client Success">
            We measure our success through our clients' achievements, focusing on 
            delivering tangible business value and measurable results.
          </GridListItem>
          <GridListItem title="Innovation">
            We continuously explore new ways to apply AI technology to solve complex 
            business challenges and drive efficiency.
          </GridListItem>
          <GridListItem title="Transparency">
            We maintain open communication throughout the transformation process, 
            ensuring clarity and alignment at every step.
          </GridListItem>
          <GridListItem title="Partnership">
            We build long-term relationships with our clients, supporting their 
            ongoing AI journey and evolution.
          </GridListItem>
          <GridListItem title="Expertise">
            Our team combines deep technical knowledge with practical business 
            experience to deliver optimal solutions.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Our Process',
  description:
    'We help Australian businesses transform through strategic AI implementation, combining technical expertise with practical business solutions.',
}

export default function Process() {
  return (
    <>
      <PageIntro eyebrow="Our process" title="How we work">
        <p>
          We take a systematic approach to AI implementation, ensuring each solution 
          is tailored to your specific needs while maximising efficiency and return 
          on investment.
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
