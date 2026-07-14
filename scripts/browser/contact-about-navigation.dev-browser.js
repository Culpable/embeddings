const iterationCount = 20
const expectedH1 =
  'about us - The team behind Australia’s first agentic commerce consultancy'
const expectedTitle = 'About Us / Embeddings'
const expectedUrl = 'http://localhost:3002/about'
const results = []
const pageName = 'contact-about-navigation-regression'

const page = await browser.getPage(pageName)
try {
await page.setViewportSize({ width: 390, height: 900 })


for (let iteration = 1; iteration <= iterationCount; iteration += 1) {
  const requestFailures = []
  const pageErrors = []

  // Record every browser-reported network failure so aborted RSC requests cannot
  // disappear inside an otherwise successful client-side navigation.
  const recordRequestFailure = (request) => {
    requestFailures.push({
      errorText: request.failure()?.errorText ?? 'Unknown request failure',
      method: request.method(),
      resourceType: request.resourceType(),
      url: request.url(),
    })
  }

  // Record uncaught page errors independently from network failures because a
  // navigation can reach its destination while client rendering still fails.
  const recordPageError = (error) => {
    pageErrors.push({
      message: error.message,
      name: error.name,
      stack: error.stack,
    })
  }

  try {
    await page.goto('http://localhost:3002/contact', {
      // Finish the initial page load before exercising client navigation so the
      // report does not misclassify intentionally cancelled page-load assets.
      waitUntil: 'networkidle',
    })

    // Start the diagnostic boundary only after the contact page is settled so
    // a cancelled prefetch from the preceding iteration is not attributed to
    // the contact-to-about interaction under test.
    page.on('requestfailed', recordRequestFailure)
    page.on('pageerror', recordPageError)

    await page.getByRole('button', { name: 'Open navigation' }).click()

    await Promise.all([
      page.waitForURL(expectedUrl),
      page
        .getByRole('dialog', { name: 'Site navigation' })
        .getByRole('link', { name: 'about us' })
        .click(),
    ])

    const heading = page.locator('h1')
    await heading.waitFor({ state: 'visible' })

    const h1 = (await heading.innerText()).replace(/\s+/g, ' ').trim()
    const title = await page.title()
    const url = page.url()
    const renderedStateIsCorrect =
      url === expectedUrl &&
      title === expectedTitle &&
      h1 === expectedH1 &&
      pageErrors.length === 0
    const expectedRequestFailures = requestFailures.filter(
      ({ errorText, method, resourceType, url: requestUrl }) =>
        renderedStateIsCorrect &&
        errorText === 'net::ERR_ABORTED' &&
        method === 'GET' &&
        resourceType === 'fetch' &&
        requestUrl.startsWith(`${expectedUrl}?_rsc=`),
    )
    const unexpectedRequestFailures = requestFailures.filter(
      (failure) => !expectedRequestFailures.includes(failure),
    )

    results.push({
      expectedRequestFailures,
      iteration,
      h1,
      pageErrors,
      requestFailures,
      title,
      unexpectedRequestFailures,
      url,
    })
  } finally {
    page.off('requestfailed', recordRequestFailure)
    page.off('pageerror', recordPageError)
  }
}

const failedIterations = results.filter(
  ({ h1, pageErrors, title, unexpectedRequestFailures, url }) =>
    url !== expectedUrl ||
    title !== expectedTitle ||
    h1 !== expectedH1 ||
    unexpectedRequestFailures.length > 0 ||
    pageErrors.length > 0,
)
const expectedRequestFailureCount = results.reduce(
  (count, result) => count + result.expectedRequestFailures.length,
  0,
)
const rawRequestFailureCount = results.reduce(
  (count, result) => count + result.requestFailures.length,
  0,
)
const unexpectedRequestFailureCount = results.reduce(
  (count, result) => count + result.unexpectedRequestFailures.length,
  0,
)
const reportPath = await writeFile(
  'contact-about-navigation-regression.json',
  JSON.stringify(
    {
      expectedRequestFailureCount,
      failedIterationCount: failedIterations.length,
      iterationCount,
      rawRequestFailureCount,
      results,
      unexpectedRequestFailureCount,
      viewport: { height: 900, width: 390 },
    },
    null,
    2,
  ),
)

console.log(
  JSON.stringify(
    {
      expectedRequestFailureCount,
      failedIterationCount: failedIterations.length,
      iterationCount,
      rawRequestFailureCount,
      reportPath,
      results,
      unexpectedRequestFailureCount,
    },
    null,
    2,
  ),
)

if (failedIterations.length > 0) {
  throw new Error(
    `Navigation regression failed in ${failedIterations.length} of ${iterationCount} iterations`,
  )
}
} finally {
  await browser.closePage(pageName)
}
