import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { ContactForm } from './ContactForm'
import { ContactDetails } from './ContactDetails'

export const metadata = {
  title: 'Contact Us',
  description: "Contact us to learn how we can integrate AI into your business.",
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="contact us" title="Transform your business with AI">
        <p>Ready to experience the future of work? Find out how we can integrate AI into your business.</p>
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
