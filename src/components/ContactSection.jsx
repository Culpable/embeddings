import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { NoiseOverlay } from '@/components/NoiseOverlay'

// ---------------------------------------------------------------------------
// Floating catalogue data snippets — purely decorative CSS-animated text
// that drifts upward at varying speeds and opacities on the dark background.
// ---------------------------------------------------------------------------

const floatingSnippets = [
  { text: 'GTIN 0614141123456', x: '8%', delay: '0s', duration: '18s', opacity: '0.11' },
  { text: 'colour: Sapphire Blue', x: '72%', delay: '3s', duration: '22s', opacity: '0.14' },
  { text: 'silhouette: A-Line', x: '25%', delay: '7s', duration: '20s', opacity: '0.12' },
  { text: 'occasion: Wedding Guest', x: '55%', delay: '1s', duration: '24s', opacity: '0.11' },
  { text: 'material: Crepe', x: '88%', delay: '5s', duration: '19s', opacity: '0.14' },
  { text: 'Women\u2019s Midi Dress', x: '40%', delay: '9s', duration: '21s', opacity: '0.12' },
  { text: 'stock: 142 units', x: '15%', delay: '4s', duration: '23s', opacity: '0.11' },
  { text: 'trend: +758% YoY', x: '65%', delay: '8s', duration: '17s', opacity: '0.14' },
  { text: 'category: Dresses > Midi', x: '35%', delay: '2s', duration: '25s', opacity: '0.11' },
  { text: 'price: $189.00 AUD', x: '80%', delay: '6s', duration: '20s', opacity: '0.12' },
]

export function ContactSection({ invert = false }) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="relative overflow-hidden rounded-4xl bg-neutral-950 px-6 py-20 sm:px-12 sm:py-28 md:py-32">
        {/* Noise texture overlay for visual depth */}
        <NoiseOverlay id="contact" />
        {/* Floating catalogue data — decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {floatingSnippets.map(({ text, x, delay, duration, opacity }) => (
            <span
              key={text}
              className="absolute whitespace-nowrap font-mono text-xs text-white"
              style={{
                left: x,
                bottom: '-2rem',
                opacity,
                animation: `floatUp ${duration} ${delay} linear infinite`,
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Content */}
        <FadeIn>
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Your catalogue is your competitive moat
            </h2>
            <p className="mt-6 text-base text-neutral-400">
              Every day without action is market share lost to retailers with richer product data.
            </p>
            <Button href="/contact" invert className="mt-8">
              Contact us
            </Button>
          </div>
        </FadeIn>

        {/* CSS keyframes for the floating animation */}
        <style>{`
          @keyframes floatUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-120vh);
            }
          }

        `}</style>
      </div>
    </Container>
  )
}
