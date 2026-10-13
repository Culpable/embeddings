import { Container } from '@/components/Container'

// ---------------------------------------------------------------------------
// Engagement timeline — the four steps of an engagement, from discovery to
// ongoing operation, each with what the client gets at the end of it.
//
// Phones and tablets show a single rail with the step title above its text.
// From the `lg` breakpoint the titles move into a right-aligned column to the
// left of the rail, so the rail and text line up with the section intro.
// ---------------------------------------------------------------------------

const steps = [
  {
    title: 'Discover',
    body: 'We map the work, the people and the systems involved, and find where AI will help and where it won’t.',
    output: 'A short list of opportunities, ranked by value and effort',
  },
  {
    title: 'Build',
    body: 'We build a working version on your real data and test it with the people who will use it.',
    output: 'A working system your team has already tried',
  },
  {
    title: 'Deploy',
    body: 'We connect it to your existing software, with the security and access controls your organisation needs.',
    output: 'A live system inside the tools your team already uses',
  },
  {
    title: 'Operate',
    body: 'We monitor, support and improve it as your business and the technology change.',
    output: 'Ongoing support and regular improvements',
  },
]


export function EngagementTimeline() {
  return (
    <Container className="mt-16">
      <ol
        role="list"
        className="relative space-y-12 border-l border-neutral-200 pl-8 lg:ml-[12rem]"
      >
        {steps.map(({ title, body, output }) => (
          <li key={title} className="relative">
            {/* Rail marker, centred on the 1px border */}
            <span
              className="absolute -left-[2.3rem] top-2 h-3 w-3 rounded-full bg-neutral-950 ring-4 ring-white"
              aria-hidden="true"
            />
            <h3 className="font-display text-2xl font-medium tracking-tight text-neutral-950 lg:absolute lg:-left-[14.5rem] lg:top-0 lg:w-[11rem] lg:text-right">
              {title}
            </h3>
            <p className="mt-2 max-w-2xl text-base text-neutral-600 lg:mt-0">
              {body}
            </p>
            <p className="mt-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
              You get: {output}
            </p>
          </li>
        ))}
      </ol>
    </Container>
  )
}
