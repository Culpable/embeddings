import Link from 'next/link'
import { buildPageMetadata } from '@/lib/metadata'

import { AgentConversationShowcase } from '@/components/AgentConversationShowcase'
import { Button } from '@/components/Button'
import { CapabilityBento } from '@/components/CapabilityBento'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { EngagementTimeline } from '@/components/EngagementTimeline'
import { FadeIn } from '@/components/FadeIn'
import { HeroAssistantConversation } from '@/components/HeroAssistantConversation'
import { SectionIntro } from '@/components/SectionIntro'
import { ShoppaCard } from '@/components/ShoppaCard'
import { StructuredData } from '@/components/StructuredData'

// ---------------------------------------------------------------------------
// Homepage — Embeddings as a broad AI consultancy that builds as well as
// advises. Sections run from the general offer to one specialism:
//   1. Hero: the promise, with an assistant working across business systems
//   2. What we build (#services): the five kinds of AI work
//   3. E-commerce (#ecommerce): one specialism, with the shopping demo and a
//      pointer to Shoppa for retailers who want a ready-made product
//   4. How we work (#how-we-work): the four-step engagement
//   5. Closing call to action
// ---------------------------------------------------------------------------


// Render the hero. It uses a wider container than the rest of the page
// (96rem instead of 80rem) so the copy and the assistant have room on large
// screens. Phones and tablets keep the standard Container's single column.
function Hero() {
  return (
    <div className="mx-auto mt-12 max-w-screen-2xl px-6 sm:mt-24 md:mt-32 lg:px-8">
      <div className="mx-auto grid max-w-2xl gap-12 lg:max-w-none lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            AI that works inside your organisation
          </h1>
          <p className="mt-6 text-lg text-neutral-600 sm:text-xl">
            We design, build and run AI systems that plug into your existing
            software and data, from internal assistants to agents that
            coordinate work across teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button href="/contact">Contact us</Button>
            <Link
              href="/process"
              className="inline-flex min-h-11 items-center rounded-full px-5 py-2 text-sm font-semibold text-neutral-950 ring-1 ring-neutral-950/10 transition-[transform,background-color,box-shadow] duration-200 ease-out hover:bg-neutral-50 hover:ring-neutral-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 active:scale-[0.96]"
            >
              <span className="relative top-px">See how we work</span>
            </Link>
          </div>
        </FadeIn>
        <FadeIn>
          <HeroAssistantConversation />
        </FadeIn>
      </div>
    </div>
  )
}


// Render the five kinds of AI work Embeddings builds.
function Services() {
  return (
    <section id="services" className="scroll-mt-24">
      <SectionIntro
        eyebrow="what we build"
        title="AI that connects to the way you already work"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Every build starts from your systems, your data and the work your
          people do every day.
        </p>
      </SectionIntro>
      <CapabilityBento />
    </section>
  )
}


// Render the e-commerce specialism: the shopping demo, then the pointer to
// Shoppa, the separate ready-made product.
function Ecommerce() {
  return (
    <section id="ecommerce" className="scroll-mt-24">
      <SectionIntro
        eyebrow="e-commerce"
        title="Custom shopping assistants, built on your catalogue"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          E-commerce is one of our specialisms. For retailers, we build
          assistants that answer from your catalogue, take customers to
          checkout and help after the sale, connected to the systems you
          already run.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <AgentConversationShowcase />
        <ShoppaCard />
      </Container>
    </section>
  )
}


// Render the four-step engagement.
function HowWeWork() {
  return (
    <section id="how-we-work" className="scroll-mt-24">
      <SectionIntro
        eyebrow="how we work"
        title="Solutions, not slideshows"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We don’t stop at advice. We build the system, put it into production,
          and keep it working.
        </p>
      </SectionIntro>
      <EngagementTimeline />
    </section>
  )
}


export const metadata = buildPageMetadata('home')

export default function Home() {
  return (
    <>
      <StructuredData routeKey="home" />
      <Hero />
      <Services />
      <Ecommerce />
      <HowWeWork />
      <ContactSection />
    </>
  )
}
