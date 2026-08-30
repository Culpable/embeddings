import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { ContactForm } from './ContactForm'
import { ContactDetails } from './ContactDetails'
import { StructuredData } from '@/components/StructuredData'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata('contact')

export default function Contact() {
  return (
    <>
      <StructuredData routeKey="contact" />
      <PageIntro eyebrow="contact us" title="Your agent starts here">
        <p>
          Ready to own the conversation with your customers? Tell us about your
          catalogue and commerce stack, and we&rsquo;ll map the fastest path to
          a live agent.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </>
  )
}
