import clsx from 'clsx'

import { Container } from '@/components/Container'

// ---------------------------------------------------------------------------
// Capability bento — the five kinds of AI work Embeddings builds, in a grid of
// uneven tiles. The first tile is large and dark so the grid has one clear
// entry point; the rest alternate between white and light grey surfaces.
// ---------------------------------------------------------------------------

const capabilities = [
  {
    title: 'Knowledge assistants',
    body: 'Staff ask questions in plain English and get answers from your own documents, policies and records, with the source attached.',
  },
  {
    title: 'Customer chatbots',
    body: 'Answer customer questions on your site or portal from your real data, and hand over to your team when a person is needed.',
  },
  {
    title: 'Workflow automation',
    body: 'Take the repetitive steps out of quoting, reporting, onboarding and document handling, from start to finish.',
  },
  {
    title: 'System integration',
    body: 'Connect AI to the software you already run, including ERP, CRM, project management and custom-built tools.',
  },
  {
    title: 'Agent orchestration',
    body: 'Coordinate several agents across departments and software suites, so work moves between them with the right checks and approvals.',
  },
]

// Tile surface and desktop span for each position in the grid. On phones and
// tablets every tile stacks at full width.
const tileClassNames = [
  'bg-neutral-950 text-white lg:col-span-4 lg:row-span-2 lg:min-h-[22rem]',
  'surface-elevation-light bg-white lg:col-span-2',
  'bg-neutral-100 lg:col-span-2',
  'bg-neutral-100 lg:col-span-3',
  'surface-elevation-light bg-white lg:col-span-3',
]


export function CapabilityBento() {
  return (
    <Container className="mt-16">
      <ul role="list" className="grid gap-4 lg:grid-cols-6">
        {capabilities.map(({ title, body }, index) => {
          const isFeature = index === 0

          return (
            <li
              key={title}
              className={clsx(
                'flex flex-col justify-between rounded-3xl p-8',
                tileClassNames[index],
              )}
            >
              <h3
                className={clsx(
                  'font-display font-medium tracking-tight',
                  isFeature ? 'text-4xl sm:text-5xl' : 'text-2xl text-neutral-950',
                )}
              >
                {title}
              </h3>
              <p
                className={clsx(
                  'mt-6 text-base',
                  isFeature ? 'max-w-md text-neutral-300' : 'text-neutral-600',
                )}
              >
                {body}
              </p>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
