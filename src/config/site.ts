// Keep reviewed identity facts separate from the canonical origin and route inventory.
const socialImage = {
  path: '/images/embeddings-ai-consultancy-1200x630.png',
  width: 1200,
  height: 630,
  mimeType: 'image/png',
  alt: 'Embeddings: AI built into the way you work. Knowledge assistants, customer chatbots, workflow automation, system integration and agent orchestration.',
}

export const site = {
  name: 'Embeddings',
  language: 'en-AU',
  htmlLang: 'en-AU',
  openGraphLocale: 'en_AU',
  titleSeparator: ' / ',
  titlePrefixSeparator: ': ',
  defaultDescription: 'We design, build and run AI systems inside your existing software and data, from internal assistants to agents that coordinate work across teams.',
  socialImage,
  organisation: {
    name: 'Embeddings',
    description: 'Australian AI consultancy that designs, builds and runs AI systems inside organisations’ existing software and data, including custom shopping assistants for retailers.',
    logoPath: '/images/embeddings-logo.png',
  },
  publicEmail: 'solutions@embeddings.au',
} as const
