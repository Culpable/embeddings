import Link from 'next/link'

import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { StructuredData } from '@/components/StructuredData'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata('privacy')

const sections = [
  {
    title: 'What this notice covers',
    body: (
      <p>
        embeddings.au is Embeddings’ public marketing site. This notice explains
        the personal information handled when you visit the site, submit a
        business enquiry, or contact Embeddings by email. Other sites linked from
        Embeddings are outside the scope of this notice.
      </p>
    ),
  },
  {
    title: 'Information handled by this site',
    body: (
      <>
        <p>
          When you visit this site, service providers may handle technical and
          usage information such as your IP address, browser, device, referring
          page, pages visited, and interactions with the site. Browser storage
          may be used to support analytics and recognise a returning browser.
        </p>
        <p>
          If you submit a business enquiry, Embeddings receives the contact
          details, company information, budget range, and message that you choose
          to provide.
        </p>
      </>
    ),
  },
  {
    title: 'How information is used',
    body: (
      <p>
        Embeddings uses information to operate and protect the site, understand
        how it is used, answer business enquiries, assess potential business
        relationships, maintain business records, meet legal duties, and resolve
        disputes.
      </p>
    ),
  },
  {
    title: 'Sharing and retention',
    body: (
      <>
        <p>
          Embeddings does not sell personal information. Information may be
          handled by providers that support website hosting, enquiry delivery,
          analytics, security, or professional advice. Embeddings may also
          disclose information when required by law.
        </p>
        <p>
          Information is kept only for as long as it is reasonably needed for
          these purposes. Service providers may process information outside
          Australia under their own terms and safeguards.
        </p>
      </>
    ),
  },
  {
    title: 'Your choices and contact',
    body: (
      <p>
        You can contact Embeddings by email instead of using the enquiry form.
        You can also block or clear browser storage through your browser. To ask
        about, correct, or request deletion of personal information you sent to
        Embeddings, email{' '}
        <Link
          href="mailto:solutions@embeddings.au"
          className="font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
        >
          solutions@embeddings.au
        </Link>
        . Embeddings will respond subject to applicable legal obligations.
      </p>
    ),
  },
  {
    title: 'Changes to this notice',
    body: (
      <p>
        Embeddings may update this notice when the site, service providers, or
        legal obligations change. The date at the top shows the latest published
        version.
      </p>
    ),
  },
]

export default function Privacy() {
  return (
    <>
      <StructuredData routeKey="privacy" />
      <PageIntro eyebrow="privacy" title="Privacy at Embeddings">
        <p>
          This notice covers the Embeddings marketing site at embeddings.au and
          business enquiries submitted through the contact form or by email.
        </p>
      </PageIntro>
      <Container className="mt-16 sm:mt-24">
        <div className="max-w-3xl space-y-12 text-base leading-7 text-neutral-600">
          <p>
            <strong className="font-semibold text-neutral-950">
              Last updated:
            </strong>{' '}
            30 August 2026
          </p>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4">{section.body}</div>
            </section>
          ))}
        </div>
      </Container>
    </>
  )
}
