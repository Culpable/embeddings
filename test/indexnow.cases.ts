import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';

import { deployWithIndexNow, readBuiltSite, submitIndexNow } from '../scripts/indexnow.mjs';

const directory = mkdtempSync(join(tmpdir(), 'astro-indexnow-'));
const origin = 'https://embeddings.au';
const key = 'test-indexnow-key';
const production = { WORKERS_CI: '1', WORKERS_CI_BRANCH: 'main', WRANGLER_CI_OVERRIDE_NAME: 'embeddings' };
const html = (body: string, noindex = false) => `<html><head>${noindex ? '<meta name="robots" content="noindex">' : ''}</head><body>${body}</body></html>`;
const sitemap = (paths: string[]) => `<urlset>${paths.map((path) => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`;

after(() => {
  const result = spawnSync('trash', [directory], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
});


function fixture(name: string, pages: Record<string, string>) {
  const dist = join(directory, name);
  mkdirSync(dist, { recursive: true });
  writeFileSync(join(dist, 'indexnow.txt'), key);
  writeFileSync(join(dist, 'sitemap.xml'), sitemap(Object.keys(pages)));
  for (const [path, body] of Object.entries(pages)) {
    const route = join(dist, path.slice(1));
    mkdirSync(route, { recursive: true });
    writeFileSync(join(route, 'index.html'), body);
  }
  return dist;
}


function transport(before: Record<string, string>, afterPages: Record<string, string>, { bootstrap = false, statuses = [200], stale = false } = {}) {
  const submissions: { urlList: string[]; keyLocation: string; host: string }[] = [];
  let deployed = false;
  let attempts = 0;
  const fetchImpl = async (input: RequestInfo | URL, options: RequestInit = {}) => {
    const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url);
    if (url.origin === 'https://api.indexnow.org') {
      assert.equal(deployed, true, 'No notifications before deployment');
      const status = statuses[Math.min(attempts++, statuses.length - 1)];
      submissions.push(JSON.parse(String(options.body)));
      return new Response('', { status, headers: { 'retry-after': '0' } });
    }
    assert.equal(url.origin, origin);
    if (url.pathname === '/indexnow.txt') return new Response(deployed || !bootstrap ? key : '', { status: deployed || !bootstrap ? 200 : 404 });
    const pages = deployed && !stale ? afterPages : before;
    if (url.pathname === '/sitemap.xml') return new Response(sitemap(Object.keys(pages)));
    return new Response(pages[url.pathname] ?? '', { status: pages[url.pathname] ? 200 : 404, headers: { 'content-type': 'text/html' } });
  };
  return { fetchImpl, submissions, deploy: async () => { deployed = true; }, wait: async () => {} };
}


test('first deployment submits only eligible sitemap pages after ownership is live', async () => {
  const pages = { '/': html('Home'), '/post/': html('Post'), '/thank-you/': html('Thanks', true) };
  const distDirectory = fixture('first', pages);
  const network = transport(pages, pages, { bootstrap: true });
  await deployWithIndexNow({ distDirectory, environment: production, ...network, log: () => {} });
  assert.deepEqual(network.submissions[0].urlList, [`${origin}/`, `${origin}/post/`]);
  assert.equal(network.submissions[0].keyLocation, `${origin}/indexnow.txt`);
  assert.equal(network.submissions[0].host, 'embeddings.au');
});


test('subsequent deployments submit changed, added and removed pages only', async () => {
  const before = { '/': html('Home'), '/same/': html('Same'), '/old/': html('Old') };
  const pages = { '/': html('Updated'), '/same/': html('Same'), '/new/': html('New') };
  const network = transport(before, pages);
  await deployWithIndexNow({ distDirectory: fixture('changed', pages), environment: production, ...network, log: () => {} });
  assert.deepEqual(network.submissions[0].urlList, [`${origin}/`, `${origin}/new/`, `${origin}/old/`]);
});


test('unchanged deployments send no IndexNow request', async () => {
  const pages = { '/': html('Home') };
  const network = transport(pages, pages);
  await deployWithIndexNow({ distDirectory: fixture('same', pages), environment: production, ...network, log: () => {} });
  assert.equal(network.submissions.length, 0);
});

test('legacy slashless URLs verify redirects when a same-named output directory exists', async () => {
  const pages = { '/': html('Home'), '/about/': html('About') };
  const network = transport({ '/': html('Home'), '/about': html('Old about') }, pages);
  const fetchImpl = async (input: RequestInfo | URL, options: RequestInit = {}) => {
    if (String(input) === `${origin}/about` && options.headers) return new Response(null, { status: 308, headers: { Location: '/about/' } });
    return network.fetchImpl(input, options);
  };
  await deployWithIndexNow({ distDirectory: fixture('slash-migration', pages), environment: production, ...network, fetchImpl, log: () => {} });
  assert.deepEqual(network.submissions[0].urlList, [`${origin}/about/`, `${origin}/about`]);
});


test('local and preview invocations cannot deploy or submit', async () => {
  for (const environment of [{}, { ...production, WORKERS_CI_BRANCH: 'preview' }, { ...production, WRANGLER_CI_OVERRIDE_NAME: 'embeddings-preview' }]) {
    let touched = false;
    await assert.rejects(deployWithIndexNow({ environment, fetchImpl: async () => { touched = true; return new Response(''); }, deploy: async () => { touched = true; } }), /Workers Builds/);
    assert.equal(touched, false);
  }
});


test('failed deployment never submits', async () => {
  const pages = { '/': html('Home') };
  const network = transport(pages, pages, { bootstrap: true });
  await assert.rejects(deployWithIndexNow({ distDirectory: fixture('failed', pages), environment: production, ...network, deploy: async () => { throw new Error('Deployment failed'); } }), /Deployment failed/);
  assert.equal(network.submissions.length, 0);
});


test('stale live content prevents IndexNow notification after successful deployment', async () => {
  const before = { '/': html('Old') };
  const pages = { '/': html('Updated') };
  const network = transport(before, pages, { stale: true });
  await assert.rejects(deployWithIndexNow({ distDirectory: fixture('stale', pages), environment: production, ...network }), /Deployment succeeded.*IndexNow/s);
  assert.equal(network.submissions.length, 0);
});


test('rate limits retry and 202 means received with ownership validation pending', async () => {
  const pages = { '/': html('Home') };
  const network = transport(pages, pages, { bootstrap: true, statuses: [429, 202] });
  const result = await deployWithIndexNow({ distDirectory: fixture('retry', pages), environment: production, ...network, log: () => {} });
  assert.equal(result.status, 202);
  assert.equal(network.submissions.length, 2);
});


test('permanent submission failures remain visible without repeated requests', async () => {
  const pages = { '/': html('Home') };
  const network = transport(pages, pages, { bootstrap: true, statuses: [403] });
  await assert.rejects(deployWithIndexNow({ distDirectory: fixture('forbidden', pages), environment: production, ...network }), /Deployment succeeded.*403/s);
  assert.equal(network.submissions.length, 1);
});


test('ownership mismatch prevents any submission', async () => {
  const site = readBuiltSite(fixture('wrong-key', { '/': html('Home') }));
  let submissions = 0;
  const fetchImpl = async (_url: RequestInfo | URL, options: RequestInit = {}) => {
    if (options.method === 'POST') submissions += 1;
    return new Response('different key');
  };
  await assert.rejects(submitIndexNow(site, [...site.pages.values()], { fetchImpl, wait: async () => {} }), /ownership/);
  assert.equal(submissions, 0);
});


test('sitemap indexes work and foreign URLs cannot be submitted', () => {
  const dist = fixture('index', { '/': html('Home') });
  writeFileSync(join(dist, 'sitemap.xml'), `<sitemapindex><sitemap><loc>${origin}/sitemap-0.xml</loc></sitemap></sitemapindex>`);
  writeFileSync(join(dist, 'sitemap-0.xml'), sitemap(['/']));
  assert.equal(readBuiltSite(dist).pages.size, 1);
  writeFileSync(join(dist, 'sitemap-0.xml'), '<urlset><url><loc>https://app.example.com/private/</loc></url></urlset>');
  assert.throws(() => readBuiltSite(dist), /canonical/);
});
