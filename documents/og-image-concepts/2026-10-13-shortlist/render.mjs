/**
 * Render review-only candidates without starting a server or installing packages.
 * Reuse Bulma's Chromium at 2x, then downsample to opaque, profiled sRGB PNGs.
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { concepts, documentHtml } from './artwork.mjs';

const output = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(output, '../../..');
const appRequire = createRequire(path.join(root, 'package.json'));
const browserRequire = createRequire('/Users/sacino/bulma-root/site/package.json');
const sharp = appRequire('sharp');
const { chromium } = browserRequire('@playwright/test');
const colours = appRequire('tailwindcss/colors');
const safe = { left: 42, top: 36, right: 1158, bottom: 594 };
const protectedPaths = [
  'src/lib/site-config.mjs',
  'src/config/site.ts',
  'public/images/embeddings-ai-consultancy-1200x630.png',
];


function hash(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}


async function dataUrl(relativePath, mime) {
  return `data:${mime};base64,${(await readFile(path.join(root, relativePath))).toString('base64')}`;
}


function svgUrl(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}


async function brandAssets(theme) {
  const logo = await readFile(path.join(root, 'src/components/Logo.jsx'), 'utf8');
  const hero = await readFile(path.join(root, 'src/components/HeroAssistantConversation.jsx'), 'utf8');
  const markPath = logo.match(/id=\{`\$\{id\}-path`\}\s+d="([^"]+)"/)[1];
  const wordmarkGroup = logo.match(/<g\s+className=\{invert[^]*?transform="([^"]+)"[^]*?<path d="([^"]+)"/);
  const colour = theme === 'dark' ? '#ffffff' : colours.neutral[950];
  const mark = svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="${markPath}" stroke="${colour}" stroke-width="1.5" fill="none"/></svg>`);
  const wordmark = svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.06515 18.295944"><g fill="${colour}" transform="${wordmarkGroup[1]}"><path d="${wordmarkGroup[2]}"/></g></svg>`);
  // Read the simple homepage copy object without evaluating application code.
  const conversation = {
    label: hero.match(/label: '([^']+)'/)[1],
    question: hero.match(/question: '([^']+)'/)[1],
    answer: hero.match(/answer:\s*'([^']+)'/)[1],
    sources: [...hero.match(/sources: \[([^\]]+)\]/)[1].matchAll(/'([^']+)'/g)].map(match => match[1]),
    actions: [...hero.match(/actions: \[([^\]]+)\]/)[1].matchAll(/'([^']+)'/g)].map(match => match[1]),
  };
  return { mark, wordmark, conversation,
    displayFont: await dataUrl('public/fonts/Mona-Sans-display-latin.var.woff2', 'font/woff2'),
    bodyFont: await dataUrl('public/fonts/Mona-Sans-body-latin.var.woff2', 'font/woff2'),
  };
}


async function inspectLayout(page) {
  return page.evaluate(() => {
    const rectOf = rect => ({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
    // Measure every visible text node, including individual wrapped line fragments.
    const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
    const textBounds = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.textContent.trim()) continue;
      const element = node.parentElement;
      const range = document.createRange();
      range.selectNodeContents(node);
      const style = getComputedStyle(element);
      textBounds.push({ text: node.textContent.trim(), bounds: [...range.getClientRects()].map(rectOf),
        element: rectOf(element.getBoundingClientRect()),
        panel: element.closest('.panel') ? rectOf(element.closest('.panel').getBoundingClientRect()) : null,
        horizontalOverflow: element.scrollWidth > element.clientWidth + 1,
        fontFamily: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight,
        fontStretch: style.fontStretch, fontVariationSettings: style.fontVariationSettings,
        colour: style.color,
      });
    }
    const faces = [...document.fonts].map(face => ({ family: face.family, status: face.status, weight: face.weight, stretch: face.stretch }));
    return {
      width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight,
      fontFaces: faces,
      displayFontLoaded: document.fonts.check('500 59px MonaDisplay'),
      bodyFontLoaded: document.fonts.check('400 23px MonaBody'),
      missingImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.alt),
      footer: rectOf(document.querySelector('footer').getBoundingClientRect()),
      textBounds,
      artworkBounds: [...document.querySelectorAll('[data-geometry]')].map(element => ({ className: element.className, bounds: rectOf(element.getBoundingClientRect()) })),
    };
  });
}


function assertLayout(layout, label) {
  assert.equal(layout.width, 1200, `${label}: horizontal document overflow`);
  assert.equal(layout.height, 630, `${label}: vertical document overflow`);
  assert(layout.displayFontLoaded && layout.bodyFontLoaded, `${label}: brand fonts unavailable`);
  assert(layout.fontFaces.every(face => face.status === 'loaded'), `${label}: an embedded font failed`);
  assert.deepEqual(layout.missingImages, [], `${label}: an embedded image failed`);
  for (const item of layout.textBounds) {
    assert(!item.horizontalOverflow, `${label}: text overflow: ${item.text}`);
    for (const rect of item.bounds) {
      assert(rect.x >= safe.left && rect.y >= safe.top && rect.x + rect.width <= safe.right && rect.y + rect.height <= safe.bottom,
        `${label}: unsafe text: ${item.text} ${JSON.stringify(rect)}`);
      const parent = item.element;
      // Allow natural ascender/descender metrics; do not allow a clipped line or spill into another card.
      assert(rect.x >= parent.x - 1 && rect.x + rect.width <= parent.x + parent.width + 1,
        `${label}: text spills outside its element: ${item.text}`);
      assert(rect.y >= parent.y - 8 && rect.y + rect.height <= parent.y + parent.height + 8,
        `${label}: vertical text overflow: ${item.text}`);
      if (item.panel) {
        assert(rect.x >= item.panel.x + 12 && rect.x + rect.width <= item.panel.x + item.panel.width - 12,
          `${label}: insufficient card text padding: ${item.text}`);
      }
    }
  }
  for (const item of layout.artworkBounds) {
    const rect = item.bounds;
    assert(rect.x >= safe.left && rect.y >= safe.top && rect.x + rect.width <= safe.right && rect.y + rect.height <= safe.bottom,
      `${label}: artwork crosses safety bounds: ${item.className}`);
    assert(rect.y + rect.height <= layout.footer.y - 12,
      `${label}: artwork crowds footer: ${item.className}`);
  }
}


async function savePng(buffer, destination, width, height, background) {
  // Retain an explicit sRGB ICC profile and remove alpha after the Lanczos downsample.
  await sharp(buffer).resize(width, height, { kernel: 'lanczos3' }).flatten({ background })
    .toColourspace('srgb').withIccProfile('srgb').png({ compressionLevel: 9 }).toFile(destination);
  const bytes = await readFile(destination);
  const metadata = await sharp(bytes).metadata();
  assert.equal(metadata.width, width);
  assert.equal(metadata.height, height);
  assert.equal(metadata.space, 'srgb');
  assert.equal(metadata.hasAlpha, false);
  assert.equal(metadata.hasProfile, true);
  return { path: path.relative(output, destination), width, height, bytes: bytes.length,
    sha256: hash(bytes), colourSpace: metadata.space, opaque: !metadata.hasAlpha,
    iccProfileSha256: hash(metadata.icc),
  };
}


async function contactSheets(browser, results, assets) {
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await context.newPage();
  const sheets = [];
  try {
    for (const variant of ['dark']) {
      const paired = variant === 'dark-vs-white';
      const width = 1320;
      const height = 930;
      const background = variant === 'dark' ? '#171717' : '#f5f5f5';
      const colour = variant === 'dark' ? '#fff' : '#0a0a0a';
      const cards = [];
      for (const [index, item] of results.filter(result => paired || result.theme === variant).entries()) {
        const number = Number(item.id.slice(0, 2));
        const column = paired ? (item.theme === 'dark' ? 0 : 1) : index % 2;
        const row = paired ? number - 1 : Math.floor(index / 2);
        const x = column === 0 ? 40 : 680;
        const y = 136 + row * 376;
        const embedded = (await readFile(path.join(output, item.path))).toString('base64');
        cards.push(`<div class="candidate" style="left:${x}px;top:${y}px"><p>${String(number).padStart(2, '0')} / ${item.name}${paired ? ` / ${item.theme}` : ''}</p><img src="data:image/png;base64,${embedded}" alt="${item.name}, ${item.theme}"></div>`);
      }
      const note = '<div class="note"><h2>Three revised designs</h2><p>Approved copy and logo changes.</p><p>Review candidates only.<br>The live image selection is unchanged.</p></div>';
      await page.setViewportSize({ width, height });
      await page.setContent(`<!doctype html><html><head><style>@font-face{font-family:Mona;src:url('${assets.bodyFont}');font-weight:400 700}*{box-sizing:border-box}body{margin:0;width:${width}px;height:${height}px;background:${background};color:${colour};font-family:Mona,sans-serif}header{position:absolute;left:40px;top:32px}h1{margin:0;font-size:31px;font-weight:500;letter-spacing:-1px}header p{font-size:18px;margin:11px 0 0;opacity:.65}.candidate{position:absolute;width:600px}.candidate p{margin:0;height:39px;font-size:20px;line-height:30px}.candidate img{display:block;width:600px;height:315px;border:1px solid #a3a3a344}.note{position:absolute;left:680px;top:580px}h2{font-size:24px;font-weight:500;margin:0 0 20px}.note p{font-size:21px;line-height:1.5;margin:0 0 23px;opacity:.7}</style></head><body><header><h1>Embeddings / Revised dark concepts</h1><p>Three designs · 1200 × 630 · review only · 13 October 2026</p></header>${cards.join('')}${note}</body></html>`);
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(img => img.decode())); });
      const filename = paired ? '00-dark-vs-white.png' : `00-${variant}-contact-sheet.png`;
      sheets.push(await savePng(await page.screenshot(), path.join(output, filename), width, height, background));
    }
  } finally {
    await context.close();
  }
  return sheets;
}


async function render() {
  const protectedBefore = Object.fromEntries(await Promise.all(protectedPaths.map(async relative => [relative, hash(await readFile(path.join(root, relative)))])));
  const assetsByTheme = { dark: await brandAssets('dark'), white: await brandAssets('white') };
  const browser = await chromium.launch({ headless: true, args: ['--force-color-profile=srgb'] });
  const errors = [];
  const externalRequests = [];
  const results = [];
  let sheets;
  try {
    const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2, offline: true });
    await context.route(/^https?:/, async route => { externalRequests.push(route.request().url()); await route.abort(); });
    context.on('page', page => {
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    });
    const page = await context.newPage();
    for (const theme of ['dark']) {
      const directory = path.join(output, theme);
      await mkdir(path.join(directory, 'sources'), { recursive: true });
      await mkdir(path.join(directory, 'previews'), { recursive: true });
      for (const concept of concepts) {
        const html = documentHtml(concept, theme, assetsByTheme[theme]);
        const htmlPath = path.join(directory, 'sources', `${concept.id}.html`);
        await writeFile(htmlPath, html);
        await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
        await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(img => img.decode())); });
        const layout = await inspectLayout(page);
        assertLayout(layout, `${theme}/${concept.id}`);
        const master = await page.screenshot({ animations: 'disabled' });
        const masterMetadata = await sharp(master).metadata();
        assert.equal(masterMetadata.width, 2400);
        assert.equal(masterMetadata.height, 1260);
        const finalPath = path.join(directory, `${concept.id}.png`);
        const image = await savePng(master, finalPath, 1200, 630, theme === 'dark' ? colours.neutral[950] : '#ffffff');
        assert(image.bytes < 1_000_000, `${image.path}: must be below 1 MB`);
        const previews = [];
        for (const width of [600, 300]) {
          previews.push(await savePng(await readFile(finalPath), path.join(directory, 'previews', `${concept.id}-${width}.png`), width, Math.round(width * 630 / 1200), theme === 'dark' ? '#0a0a0a' : '#ffffff'));
        }
        results.push({ ...concept, theme, ...image, sourceHtmlSha256: hash(html), sourceHtml: path.relative(output, htmlPath), previews, layout });
        console.log(`Rendered ${image.path}: ${image.bytes} bytes; fonts, images and safe text bounds pass`);
      }
    }
    await context.close();
    sheets = await contactSheets(browser, results, assetsByTheme.white);
  } finally {
    await browser.close();
  }
  assert.deepEqual(errors, [], 'No console or page errors');
  assert.deepEqual(externalRequests, [], 'No network requests');
  const protectedAfter = Object.fromEntries(await Promise.all(protectedPaths.map(async relative => [relative, hash(await readFile(path.join(root, relative)))])));
  assert.deepEqual(protectedAfter, protectedBefore, 'Keep production selection and image unchanged');
  const sourcePaths = ['src/components/Logo.jsx', 'src/components/HeroAssistantConversation.jsx', 'src/components/CapabilityBento.jsx', 'src/styles/base.css', 'tailwind.config.js', 'public/fonts/Mona-Sans-display-latin.var.woff2', 'public/fonts/Mona-Sans-body-latin.var.woff2', 'documents/site-positioning.md'];
  const sourceHashes = Object.fromEntries(await Promise.all(sourcePaths.map(async relative => [relative, hash(await readFile(path.join(root, relative)))])));
  await writeFile(path.join(output, 'validation.json'), JSON.stringify({
    generatedAt: new Date().toISOString(), status: 'passed',
    renderer: { node: process.version, chromium: 'headless; --force-color-profile=srgb', playwright: browserRequire('@playwright/test/package.json').version, sharp: sharp.versions.sharp, viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2, downsample: 'Lanczos3 to 1x', networkRequests: externalRequests, installedPackages: false },
    safeMargins: { horizontal: 42, vertical: 36 }, sourceHashes,
    productionSelection: { unchanged: true, before: protectedBefore, after: protectedAfter },
    candidates: results, contactSheets: sheets, consoleErrors: errors, pageErrors: errors,
  }, null, 2) + '\n');
  console.log('Three revised candidates, six previews, one contact sheet and validation.json complete.');
}


await render();
