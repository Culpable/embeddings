const widths = [390, 640, 960, 1080, 1440]

function candidates(slug, format) {
  return widths.map((width) => ({
    width,
    url: `/images/process/${slug}-${width}.${format}`,
  }))
}

function image(slug, sourceFile, width, height) {
  return {
    slug,
    sourceFile,
    width,
    height,
    avif: candidates(slug, 'avif'),
    webp: candidates(slug, 'webp'),
    fallback: `/images/process/${slug}-960.webp`,
  }
}

export const processImageSizes = {
  standard:
    '(min-width: 1024px) 656px, (min-width: 640px) 540px, calc(100vw - 48px)',
  whiteboard:
    '(min-width: 1024px) 656px, (min-width: 640px) 492px, calc(91.1vw - 43.7px)',
}

export function processImageSlotWidth(viewportWidth, slug = 'standard') {
  if (viewportWidth >= 1024) return 656
  if (viewportWidth >= 640) return slug === 'whiteboard' ? 492 : 540

  const standardWidth = viewportWidth - 48

  // Match the whiteboard SVG's 655:719 width ratio inside its shared wrapper.
  return slug === 'whiteboard' ? standardWidth * (655 / 719) : standardWidth
}

export const processImages = {
  whiteboard: image('whiteboard', 'src/images/process/whiteboard.webp', 1440, 1080),
  laptop: image('laptop', 'src/images/process/laptop.webp', 1440, 1800),
  meeting: image('meeting', 'src/images/process/meeting.webp', 1440, 960),
}

export function sourceSet(candidates) {
  return candidates.map(({ url, width }) => `${url} ${width}w`).join(', ')
}
