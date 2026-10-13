import { Check, FileText } from 'lucide-react'

// ---------------------------------------------------------------------------
// Hero assistant conversation — a general example of AI working inside an
// organisation. Someone asks about their own work, the assistant answers from
// the business's systems and names them, then ticks off the follow-up work.
//
// The example is deliberately industry-neutral so every visitor recognises it.
// The reveal is CSS-only: each beat reuses the shared `.agent-beat` animation
// and sets its own delay through --agent-beat-delay, so the component ships as
// a static server component with no client JavaScript.
// ---------------------------------------------------------------------------

const conversation = {
  label: 'Assistant',
  question: 'What needs my attention before Friday?',
  answer:
    'Three things. Two invoices are more than 30 days overdue, the supplier contract renews on Thursday, and four customer emails have waited over two days for a reply.',
  sources: ['Accounts', 'Contracts', 'Shared inbox'],
  actions: [
    'Payment reminders drafted in Accounts',
    'Four replies drafted in the shared inbox',
  ],
}

// Reveal timing: the question first, then the answer, then each completed
// action in turn.
const answerDelayMs = 900
const firstActionDelayMs = 1800
const actionStepMs = 600


export function HeroAssistantConversation() {
  return (
    <div className="surface-elevation-light overflow-hidden rounded-3xl bg-white">
      <div className="border-b border-neutral-950/5 px-5 py-3">
        <p className="text-sm font-semibold text-neutral-950">
          {conversation.label}
        </p>
      </div>
      <div className="space-y-4 bg-neutral-50/60 p-5">
        {/* Question from a member of staff */}
        <p className="agent-beat ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-neutral-950 px-4 py-3 text-sm text-white">
          {conversation.question}
        </p>

        {/* Answer, with the systems it came from */}
        <div
          className="agent-beat max-w-[92%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-neutral-700 ring-1 ring-neutral-950/5"
          style={{ '--agent-beat-delay': `${answerDelayMs}ms` }}
        >
          <p>{conversation.answer}</p>
          <ul role="list" className="mt-3 flex flex-wrap gap-1.5" aria-label="Sources">
            {conversation.sources.map((source) => (
              <li
                key={source}
                className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600"
              >
                <FileText className="h-3 w-3" aria-hidden="true" />
                {source}
              </li>
            ))}
          </ul>
        </div>

        {/* Follow-up work the assistant completed */}
        <ul role="list" className="space-y-4" aria-label="Completed actions">
          {conversation.actions.map((action, index) => (
            <li
              key={action}
              className="agent-beat flex items-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-700"
              style={{
                '--agent-beat-delay': `${firstActionDelayMs + index * actionStepMs}ms`,
              }}
            >
              <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
