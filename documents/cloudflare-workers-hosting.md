# Cloudflare Workers hosting and cutover record

## Current state, 13 October 2026

The local Astro replacement and the isolated hosted preview pass the recorded local/preview acceptance checks. Production cutover is not authorised or executed. The repository remains public, GitHub Pages serves the previous release, and all 22 DNS records match the execution baseline. A pending, unverified sender domain is prepared; no sender DNS, Worker runtime secret, Git-connected build trigger, search notification or repository-visibility change has been made.

- Account: `213ab3604485056376263d22fa242742`.
- Zone: `embeddings.au`, `9148c362fcb1400590f7a5eb923f75fc`.
- Repository: `Culpable/embeddings`, GitHub repository ID `897801182`, owner ID `31677655`, branch `main`.
- Selected production Worker: `embeddings`; it does not exist yet.
- Isolated Worker: `embeddings-preview`, with no custom domains or production mail secrets.
- Active preview bootstrap version: `020ca849-9c6c-4a73-b29a-31b601a87d64`.
- Reviewed inactive preview version: `b27ab615-c71d-4c66-ad83-ee660a4a7634`.
- Reviewed preview: [version URL](https://b27ab615-embeddings-preview.webpop.workers.dev), [migration alias](https://migration-embeddings-preview.webpop.workers.dev).
- Public Pages serving build: `f588814aff922bff3ca9cefb3f4b112f370dbbd0`. Local pre-migration source baseline: `35d81cdde4adc78ea9e1e90ac011efa76c49ba01`. These are separate authorities.
- Pages configuration: `gh-pages:/`, custom domain `embeddings.au`, HTTPS enforced, approved certificate for apex only, expiry `2026-12-24`.
- Frozen local comparison output: `.artifacts/astro_cloudflare_workers_migration/baseline/out/`. The exact published `gh-pages` archive `gh-pages-f588814aff922bff3ca9cefb3f4b112f370dbbd0.tar.gz` is retained there, SHA-256 `ce037a1c907a87ba4281e2a118c75867a0e862386ffdf3c489484be53404e137`. The exact source archive `source-35d81cdde4adc78ea9e1e90ac011efa76c49ba01.tar` is retained there too. Preserve these outside public hosting through cutover and privacy acceptance.

## Local and deployment commands

Use Node `22.17.0` and locked npm installation. Root commands belong to Astro. Start development with `npm run dev` on port 3002; stop only a foreground server started by the task. Build with `npm run build`, then use `npm run worker:dev` on port 8794 for real Static Assets/Worker behaviour. Stop the owned Worker before rebuilding its generated files.

`dist/` contains public assets, prerendered documents and private Markdown derivatives. `.astro-server/entry.mjs` is the hosted Worker entry; generated `.astro-server/wrangler.json` is the production deployment authority. `.astro-server/wrangler.preview.json` is flattened, has no routes or production secrets, and uses `CONTACT_MODE=preview`. `.astro-local/` contains injected provider fixtures and never appears in hosted configuration or public assets. Generated output and raw evidence are ignored. Prior server bundles are preserved under ignored `.artifacts/build-recovery/` before replacement.

`npm run deploy:initial` deploys the generated production configuration without IndexNow. `npm run deploy:preview` uploads an inactive preview version. `npm run deploy` is the production-only notifier and must remain inactive until canonical acceptance. The source Wrangler configuration is not a deployable substitute for generated adapter output.

The former push-triggered Pages publisher is replaced in source by a manual validation workflow. It does not publish. No source push has occurred, so the existing remote workflow is still the old publisher. Before any authorised source push, verify the commit includes this replacement. The old live Pages artefact remains available without rebuilding.

## Proposed Workers Builds settings

No build triggers have been created. Cloudflare's repository autofill API successfully reads `Culpable/embeddings` on `main`; that proves current public read access, not private access or an actual build. The earlier request without the required `branch` query returned an invalid-query error, not an access denial.

| Setting | Production | Preview |
|---|---|---|
| Worker identity | `embeddings` | `embeddings-preview` |
| Repository/root | `Culpable/embeddings`, `/` | Same |
| Branch filter | Only `main` | Exclude `main` |
| Installation | `npm ci` | `npm ci` |
| Build | `npm run lint && npm run check && npm run build && npm test` | Same |
| Initial publish | `npm run deploy:initial` | `npm run deploy:preview` |
| Later publish | `npm run deploy` after canonical acceptance | Inactive version upload only |
| Public challenge key | Shared managed widget key, after hostname authorisation | Official test key `1x00000000000000000000AA` |
| Runtime mail secrets | Separately scoped, see below | None |

Configure Node 22.17.0 and the pinned Wrangler from the lockfile. A production build rejects a missing or official test Turnstile site key when Workers Builds identifies `main`. Record actual trigger IDs, serving Git revision and build logs after execution. Do not accept a Worker name override to conceal a trigger mismatch. Verify Cloudflare GitHub App access after the repository becomes private and rebuild the existing revision without an empty commit.

## Contact setup boundary

The form retains name, email, company, phone, message and budget. Both native POST and enhancement use `/api/contact/`. The server requires the canonical Origin, bounded UTF-8 form input, the exact budget allowlist and a challenge verified for hostname `embeddings.au` and action `contact`. The fixed sender is `Embeddings <contact@notifications.embeddings.au>`, the recipient is `solutions@embeddings.au`, and the visitor address is Reply-To only. A Resend acceptance ID permits UI success but does not prove inbox receipt.

Production requires separately scoped `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `TURNSTILE_SECRET_KEY`. No secret value belongs in this document, repository, command history or browser evidence. Preview refuses live mail even if incorrectly supplied a recipient.

Current Resend administrative reads succeed using an existing authorised local credential without copying it. The earlier 403 is not treated as proof of permanent access denial. The shared account contains verified `notifications.taxgenie.com.au` and `auth.propva.com.au`, both in `ap-northeast-1`. No Embeddings domain exists. The account Usage API confirms domains used 2 / limit 3, monthly email limit 3,000 and daily limit 100. Adding the selected sender uses the last included domain slot; no paid upgrade is needed or authorised. Safe account/domain/usage metadata is retained in ignored cutover evidence; no key value is persisted.

Before provider-domain provisioning, the complete refreshed zone inventory above contains no `notifications.embeddings.au` record, no descendant of that hostname and no wildcard DNS record. Record count remains 22. The selected pending sender is `notifications.embeddings.au` in the existing account's `ap-northeast-1` region, sending only with inbound receiving disabled. Its provider-generated DNS will be recorded here before any DNS writes. Creating this pending verification resource does not send mail, alter DNS or change the live website. Existing Microsoft MX/SPF/DKIM remains untouched.

Reuse managed widget `Genie sites contact form`, site key `0x4AAAAAAEcl2dZMyeEwZapo`, only after authorising the exact hostname addition. Its complete public before-state is recorded below; preserve all existing hosts/settings. The widget secret is excluded. `embeddings.au` is not currently an allowed host. No widget changes have been made.

Widget public before-state:

```json
{
  "sitekey": "0x4AAAAAAEcl2dZMyeEwZapo",
  "modified_on": "2026-10-12T08:48:52.598641Z",
  "created_on": "2026-08-26T07:24:18.000615Z",
  "mode": "managed",
  "domains": [
    "legalgenie.com.au",
    "staging.trackmytrail.com.au",
    "taxgenie.com.au",
    "trackmytrail.com.au",
    "www.taxgenie.com.au"
  ],
  "name": "Genie sites contact form",
  "bot_fight_mode": false,
  "region": "world",
  "offlabel": false,
  "ephemeral_id": false,
  "clearance_level": "no_clearance",
  "deployed_via": "api",
  "last_modified_via": "api"
}
```

## Exact sender DNS packet

The pending Resend domain is `notifications.embeddings.au`, ID `4f0f6e02-4fc5-4ba1-a603-fdb7972a3ac2`, region `ap-northeast-1`, sending enabled and receiving disabled. Its status is `not_started`; open/click tracking is disabled. This uses the existing account's third and last included domain slot without a paid upgrade. No verification mail or DNS write has occurred.

A fresh zone read after provider preparation matches the original 22 records exactly. All four required owner names below are absent, with no wildcard record. Each before-state is therefore the empty list. These provider-generated public DNS values are not credentials. Under exact production sender authority, create only these records, unproxied, TTL 1 (Auto). Keep all Microsoft inbound records unchanged. After verification, keep these sender additions in subsequent cutover comparisons. Rollback of a sender record requires separate consent for deleting that exact newly created record; no old record is overwritten.

```json
[
  {
    "before": [],
    "createPayload": {
      "type": "TXT",
      "name": "resend._domainkey.notifications.embeddings.au",
      "content": "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwKXolUHpr4MBrfBHAka4TDYCGcMrAgnr9kE34nJ4biC32YOMyauDNiyINI9ZSgKhaqolsUv4XbgRt5S7JjgvKAQWrBjeVGo18S9uGrNkZztyIv0MfwB7WOFNfMLqFbbY/fKSOLATuZpq1iHn77XHQmiHgcuktYfHeXhCd5StukwIDAQAB",
      "ttl": 1,
      "proxied": false
    }
  },
  {
    "before": [],
    "createPayload": {
      "type": "MX",
      "name": "send.notifications.embeddings.au",
      "content": "feedback-smtp.ap-northeast-1.amazonses.com",
      "ttl": 1,
      "proxied": false,
      "priority": 10
    }
  },
  {
    "before": [],
    "createPayload": {
      "type": "TXT",
      "name": "send.notifications.embeddings.au",
      "content": "v=spf1 include:amazonses.com ~all",
      "ttl": 1,
      "proxied": false
    }
  },
  {
    "before": [],
    "createPayload": {
      "type": "CNAME",
      "name": "rsend.notifications.embeddings.au",
      "content": "send.forge.rmta.net",
      "ttl": 1,
      "proxied": false,
      "settings": {
        "flatten_cname": false
      }
    }
  }
]
```

After those records propagate, request verification of only Resend domain `4f0f6e02-4fc5-4ba1-a603-fdb7972a3ac2`, then confirm every required record and domain status. A separately scoped `sending_access` key is prepared, ID `68411c38-c235-4bfe-a2e3-42decf07f4ee`, restricted to this domain. Its value is stored only in macOS Keychain, service `embeddings-resend-sending-api-key`, account `embeddings`; presence is verified without printing it. Read it through the authorised Keychain/Security.framework owner and pass it directly to the exact production Worker secret after release approval. Never reuse the administrative credential or a sibling’s sender identity. Actual receipt remains a separate canonical test gate.

## Verified web before-state

The read-only refresh matches all baseline records exactly. Before applying a future authorised change, refresh again and stop if a relevant record differs. Restore DNS content/settings with the payloads below; Cloudflare may allocate new record IDs when deleted records are recreated.

Complete affected web records:

```json
[
  {
    "id": "c697f42e312431f06f4368e2e1ee1997",
    "name": "embeddings.au",
    "type": "A",
    "content": "185.199.111.153",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-03T09:47:28.223273Z",
    "modified_on": "2024-12-03T09:47:28.223273Z"
  },
  {
    "id": "f3fb739f9dfc30521644385ebf8a8110",
    "name": "embeddings.au",
    "type": "A",
    "content": "185.199.110.153",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-03T09:47:19.613675Z",
    "modified_on": "2024-12-03T09:47:19.613675Z"
  },
  {
    "id": "827c0d876ac756ed9f0879e534648b1c",
    "name": "embeddings.au",
    "type": "A",
    "content": "185.199.109.153",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-03T09:46:57.862497Z",
    "modified_on": "2024-12-03T09:46:57.862497Z"
  },
  {
    "id": "b11597634c646cdd38dc45b10bbb6d6b",
    "name": "embeddings.au",
    "type": "A",
    "content": "185.199.108.153",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-03T09:46:45.335002Z",
    "modified_on": "2024-12-03T09:46:45.335002Z"
  },
  {
    "id": "8b7d58879d85a58f4b01b316b0c7512d",
    "name": "embeddings.au",
    "type": "AAAA",
    "content": "2606:50c0:8003::153",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-03T11:42:50.63287Z",
    "modified_on": "2024-12-03T11:42:50.63287Z"
  },
  {
    "id": "639026f4f91c241594d530f1df639820",
    "name": "embeddings.au",
    "type": "AAAA",
    "content": "2606:50c0:8002::153",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-03T11:42:42.187494Z",
    "modified_on": "2024-12-03T11:42:42.187494Z"
  },
  {
    "id": "c5ddd8eb77fcb64303fea4cf1d1c8cbd",
    "name": "embeddings.au",
    "type": "AAAA",
    "content": "2606:50c0:8001::153",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-03T11:42:33.812145Z",
    "modified_on": "2024-12-03T11:42:33.812145Z"
  },
  {
    "id": "027b61333a30a1b23a23266c227d0428",
    "name": "embeddings.au",
    "type": "AAAA",
    "content": "2606:50c0:8000::153",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-03T11:42:17.790003Z",
    "modified_on": "2024-12-03T11:42:17.790003Z"
  },
  {
    "id": "804a54ceade29898335c9c9bc30fdd92",
    "name": "www.embeddings.au",
    "type": "CNAME",
    "content": "embeddings.au",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {
      "flatten_cname": false
    },
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-17T01:21:18.865958Z",
    "modified_on": "2024-12-17T01:21:18.865958Z"
  }
]
```

Restoration payloads, keyed by recorded identity. Update an existing matching record with PUT; recreate a removed record with POST after detaching the task-created managed domain. Never overwrite unrelated records:

```json
[
  {
    "originalId": "c697f42e312431f06f4368e2e1ee1997",
    "payload": {
      "type": "A",
      "name": "embeddings.au",
      "content": "185.199.111.153",
      "ttl": 1,
      "proxied": false,
      "settings": {},
      "comment": null,
      "tags": []
    }
  },
  {
    "originalId": "f3fb739f9dfc30521644385ebf8a8110",
    "payload": {
      "type": "A",
      "name": "embeddings.au",
      "content": "185.199.110.153",
      "ttl": 1,
      "proxied": false,
      "settings": {},
      "comment": null,
      "tags": []
    }
  },
  {
    "originalId": "827c0d876ac756ed9f0879e534648b1c",
    "payload": {
      "type": "A",
      "name": "embeddings.au",
      "content": "185.199.109.153",
      "ttl": 1,
      "proxied": false,
      "settings": {},
      "comment": null,
      "tags": []
    }
  },
  {
    "originalId": "b11597634c646cdd38dc45b10bbb6d6b",
    "payload": {
      "type": "A",
      "name": "embeddings.au",
      "content": "185.199.108.153",
      "ttl": 1,
      "proxied": false,
      "settings": {},
      "comment": null,
      "tags": []
    }
  },
  {
    "originalId": "8b7d58879d85a58f4b01b316b0c7512d",
    "payload": {
      "type": "AAAA",
      "name": "embeddings.au",
      "content": "2606:50c0:8003::153",
      "ttl": 1,
      "proxied": false,
      "settings": {},
      "comment": null,
      "tags": []
    }
  },
  {
    "originalId": "639026f4f91c241594d530f1df639820",
    "payload": {
      "type": "AAAA",
      "name": "embeddings.au",
      "content": "2606:50c0:8002::153",
      "ttl": 1,
      "proxied": false,
      "settings": {},
      "comment": null,
      "tags": []
    }
  },
  {
    "originalId": "c5ddd8eb77fcb64303fea4cf1d1c8cbd",
    "payload": {
      "type": "AAAA",
      "name": "embeddings.au",
      "content": "2606:50c0:8001::153",
      "ttl": 1,
      "proxied": false,
      "settings": {},
      "comment": null,
      "tags": []
    }
  },
  {
    "originalId": "027b61333a30a1b23a23266c227d0428",
    "payload": {
      "type": "AAAA",
      "name": "embeddings.au",
      "content": "2606:50c0:8000::153",
      "ttl": 1,
      "proxied": false,
      "settings": {},
      "comment": null,
      "tags": []
    }
  },
  {
    "originalId": "804a54ceade29898335c9c9bc30fdd92",
    "payload": {
      "type": "CNAME",
      "name": "www.embeddings.au",
      "content": "embeddings.au",
      "ttl": 1,
      "proxied": false,
      "settings": {
        "flatten_cname": false
      },
      "comment": null,
      "tags": []
    }
  }
]
```

## Unchanged mail, identity and verification inventory

These 13 records are outside the web cutover. Compare all fields after sender provisioning and again after web cutover. Sender records approved later must be added to the comparison, not removed by restoring this older inventory.

```json
[
  {
    "id": "18ccb0d812274d5b2338e3837d7b7e83",
    "name": "autodiscover.embeddings.au",
    "type": "CNAME",
    "content": "autodiscover.outlook.com",
    "proxiable": true,
    "proxied": false,
    "ttl": 3600,
    "settings": {
      "flatten_cname": false
    },
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-05T06:36:05.653792Z",
    "modified_on": "2024-12-05T06:36:05.653792Z"
  },
  {
    "id": "42ed1434bf105732c260687074795a64",
    "name": "enterpriseenrollment.embeddings.au",
    "type": "CNAME",
    "content": "enterpriseenrollment-s.manage.microsoft.com",
    "proxiable": true,
    "proxied": false,
    "ttl": 3600,
    "settings": {
      "flatten_cname": false
    },
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-05T06:36:05.662699Z",
    "modified_on": "2024-12-05T06:36:05.662699Z"
  },
  {
    "id": "ef3cc0667c1fadebbc563d4d48d299da",
    "name": "enterpriseregistration.embeddings.au",
    "type": "CNAME",
    "content": "enterpriseregistration.windows.net",
    "proxiable": true,
    "proxied": false,
    "ttl": 3600,
    "settings": {
      "flatten_cname": false
    },
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-05T06:36:05.668471Z",
    "modified_on": "2024-12-05T06:36:05.668471Z"
  },
  {
    "id": "e83786cba044d36717b597a6f39460be",
    "name": "lyncdiscover.embeddings.au",
    "type": "CNAME",
    "content": "webdir.online.lync.com",
    "proxiable": true,
    "proxied": false,
    "ttl": 3600,
    "settings": {
      "flatten_cname": false
    },
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-05T06:36:05.65476Z",
    "modified_on": "2024-12-05T06:36:05.65476Z"
  },
  {
    "id": "bd25ace8540be2be5c7356930753b8cd",
    "name": "selector1._domainkey.embeddings.au",
    "type": "CNAME",
    "content": "selector1-embeddings-au._domainkey.embeddings.y-v1.dkim.mail.microsoft",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {
      "flatten_cname": false
    },
    "meta": {},
    "comment": "DKIM record added 02/09/25",
    "tags": [],
    "created_on": "2025-09-02T11:27:50.761449Z",
    "modified_on": "2025-09-02T11:27:50.761449Z",
    "comment_modified_on": "2025-09-02T11:27:50.761449Z"
  },
  {
    "id": "b754c4da0489e9569330e3b242a9a0db",
    "name": "selector2._domainkey.embeddings.au",
    "type": "CNAME",
    "content": "selector2-embeddings-au._domainkey.embeddings.y-v1.dkim.mail.microsoft",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "settings": {
      "flatten_cname": false
    },
    "meta": {},
    "comment": "DKIM record added 02/09/25",
    "tags": [],
    "created_on": "2025-09-02T11:28:17.593374Z",
    "modified_on": "2025-09-02T11:28:17.593374Z",
    "comment_modified_on": "2025-09-02T11:28:17.593374Z"
  },
  {
    "id": "e4374ad07509a973a317ca27e6bde719",
    "name": "sip.embeddings.au",
    "type": "CNAME",
    "content": "sipdir.online.lync.com",
    "proxiable": true,
    "proxied": false,
    "ttl": 3600,
    "settings": {
      "flatten_cname": false
    },
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-05T06:36:05.620643Z",
    "modified_on": "2024-12-05T06:36:05.620643Z"
  },
  {
    "id": "b2334b5710bc80bd9ec86220d308186d",
    "name": "embeddings.au",
    "type": "MX",
    "content": "embeddings-au.mail.protection.outlook.com",
    "priority": 0,
    "proxiable": false,
    "proxied": false,
    "ttl": 3600,
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-05T06:36:05.683819Z",
    "modified_on": "2024-12-05T06:36:05.683819Z"
  },
  {
    "id": "6e5aa9fcf5bcddbba05ab4ceb79d86bc",
    "name": "_sipfederationtls._tcp.embeddings.au",
    "type": "SRV",
    "content": "1 5061 sipfed.online.lync.com",
    "priority": 100,
    "proxiable": false,
    "proxied": false,
    "ttl": 3600,
    "data": {
      "port": 5061,
      "priority": 100,
      "target": "sipfed.online.lync.com",
      "weight": 1
    },
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-05T06:36:05.650897Z",
    "modified_on": "2024-12-05T06:36:05.650897Z"
  },
  {
    "id": "bb50fe119e36d502797393de43347018",
    "name": "_sip._tls.embeddings.au",
    "type": "SRV",
    "content": "1 443 sipdir.online.lync.com",
    "priority": 100,
    "proxiable": false,
    "proxied": false,
    "ttl": 3600,
    "data": {
      "port": 443,
      "priority": 100,
      "target": "sipdir.online.lync.com",
      "weight": 1
    },
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-05T06:36:05.688678Z",
    "modified_on": "2024-12-05T06:36:05.688678Z"
  },
  {
    "id": "f794e86de0d13b3d97979caf63ea6de2",
    "name": "embeddings.au",
    "type": "TXT",
    "content": "\"google-site-verification=effDNw-PKFYEnXIHuR8PopkxizNNkK6DGwrcCKn-eqY\"",
    "proxiable": false,
    "proxied": false,
    "ttl": 1,
    "settings": {},
    "meta": {},
    "comment": "GSC verification",
    "tags": [],
    "created_on": "2024-12-08T06:44:25.335284Z",
    "modified_on": "2024-12-08T06:44:25.335284Z",
    "comment_modified_on": "2024-12-08T06:44:25.335284Z"
  },
  {
    "id": "a379cc623cd427cd4fff18dbda9a2779",
    "name": "embeddings.au",
    "type": "TXT",
    "content": "\"v=spf1 include:spf.protection.outlook.com ~all\"",
    "proxiable": false,
    "proxied": false,
    "ttl": 3600,
    "settings": {},
    "meta": {},
    "comment": null,
    "tags": [],
    "created_on": "2024-12-05T06:36:05.681332Z",
    "modified_on": "2024-12-05T06:36:47.505668Z"
  },
  {
    "id": "dc903df76e1a6c06932a0e6af1c46cde",
    "name": "embeddings.au",
    "type": "TXT",
    "content": "\"MS=ms86314233\"",
    "proxiable": false,
    "proxied": false,
    "ttl": 1,
    "settings": {},
    "meta": {},
    "comment": "Microsoft email domain verification",
    "tags": [],
    "created_on": "2024-12-05T06:33:21.079536Z",
    "modified_on": "2024-12-05T06:33:21.079536Z",
    "comment_modified_on": "2024-12-05T06:33:21.079536Z"
  }
]
```

## TLS and redirect before-state

- No zone-owned redirect ruleset and no Page Rules are present. The three listed rulesets are Cloudflare-managed normalization, free WAF and DDoS protection; leave them intact.
- Universal certificate pack `d64c7d09-4f19-4b52-a79e-66c7dde9eadb` is active for apex and wildcard. Google Trust Services certificate `63baab09-d589-4ad7-b68b-0803d0a6fb3b` expires `2026-12-12T18:13:09Z`. Certificate inventory does not prove hostname serving readiness.
- Existing SSL mode is `flexible`; Always Use HTTPS is off; Automatic HTTPS Rewrites is on; minimum TLS is 1.0; TLS 1.3 is on. HSTS is disabled with max-age 0, no subdomains and no preload. The proposed cutover changes none of these shared zone settings.
- The exact strict-TLS baseline request `https://www.embeddings.au/about?migration=check` fails certificate hostname validation. Its raw output is retained at `.artifacts/astro_cloudflare_workers_migration/baseline/www-tls.txt`. Do not bypass verification.

## Proposed web mutations and expected result

These are prepared operations, not executed changes. Production authority must explicitly cover the account, zone, records, sender setup, widget addition, source push and canonical mail test before dependent actions proceed.

1. Provision and verify `embeddings` from the reviewed generated production bundle without attaching domains or notifying search. Configure its exact secrets and public widget key after provider setup. Record the generated production version separately from the preview version; IDs are not interchangeable.
2. Attach custom domain `embeddings.au` to `embeddings` in the verified zone. Cloudflare manages its routing/DNS/certificate. Resolve the eight conflicting recorded A/AAAA records through the approved managed-domain operation; explicitly authorise any required removal of those exact IDs. Preserve Pages while certificates and the new serving path become ready. Do not leave any old IPv6 delivery path behind.
3. Preserve `www` CNAME content `embeddings.au`, TTL 1, `flatten_cname=false`, comment null and tags empty; change only `proxied` from false to true. The exact record ID is `804a54ceade29898335c9c9bc30fdd92`.
4. Add one scoped edge redirect: match `www.embeddings.au` on either scheme, plus HTTP requests to apex. Return 301 to `https://embeddings.au` plus the requested path and preserve its query string. Create a zone ruleset in phase `http_request_dynamic_redirect`, recording returned IDs and full payload before relying on rollback. Do not redirect other hosts. Verify path encoding under the selected platform expression before executing it.
5. Verify valid TLS, both address families, apex HTTP-to-HTTPS, `www` to apex, and legacy `/about` to `/about/` with the original query preserved. Expect the exact regression request to end at `https://embeddings.au/about/?migration=check`. Verify HTML/Markdown, fixed files, noindex utilities, cache order, CSP and browser behaviour against the production version.
6. Submit one separately authorised synthetic enquiry to `solutions@embeddings.au` and confirm all six values and Reply-To in the mailbox. Retain Formspree service access and Pages until this gate succeeds.

Attach-domain API body after the production Worker exists:

```json
{"hostname":"embeddings.au","service":"embeddings","enabled":true,"previews_enabled":false,"zone_id":"9148c362fcb1400590f7a5eb923f75fc","zone_name":"embeddings.au"}
```

Targeted redirect action: `redirect`, parameters `from_value.status_code=301`, `from_value.target_url.expression=concat("https://embeddings.au", http.request.uri.path)`, `from_value.preserve_query_string=true`; expression `(http.host eq "www.embeddings.au") or (http.host eq "embeddings.au" and not ssl)`. Refresh the complete existing entrypoint before adding this rule. Confirm no conflicting rule exists and preserve all existing rules if the state changes.

Expected DNS: managed Cloudflare apex delivery, proxied `www` CNAME, no old Pages apex A/AAAA records, and unchanged mail/identity/verification records plus only authorised sender additions. Exact managed record IDs and edge answers are allocated at execution and must be recorded then.

## Rollback and retirement

Before Pages retirement, a failed canonical gate restores the old delivery: detach only the task-created custom domain, remove only the task-created redirect rule/ruleset, restore all nine web record payloads, then verify the saved Pages release, apex TLS, redirects and untouched records. Leave shared TLS settings and provider records intact. The pre-existing `www` certificate failure remains a known baseline limitation, not a successful rollback TLS claim.

After a successful private cutover, immediate rollback publishes a reviewed prior production Worker version with the same mail/security configuration and retained static assets. Record its actual production version before privacy changes. Never use the preview bootstrap as a production rollback, make the repository public, rewrite history or assume GitHub Pages supports the private repository's plan.

Only after canonical acceptance and confirmed mail receipt: disable Pages publishing/custom-domain association, verify DNS no longer targets Pages, retire replaced transport/dependencies without deleting protected reference animations, make the repository private under exact authority, and prove a private Git-connected rebuild. Keep `gh-pages` and useful verification claims. Do not cancel subscriptions without separate authority.

## Evidence and remaining gates

Local/preview evidence is recorded in `documents/evidence/astro_cloudflare_workers_migration/acceptance.md`; raw output stays ignored or in the task-owned dev-browser directory. Remaining required gates are actual Git-connected builds, sender DNS/verification and challenge provisioning, authorised source push, production Worker/domain cutover, canonical mail receipt, search notification if authorised, Pages retirement, private visibility and private build. The migration remains in progress.

Sources: [Workers domain API](https://developers.cloudflare.com/api/resources/workers/subresources/domains/methods/update/), [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), [repository access API](https://developers.cloudflare.com/api/resources/workers_builds/subresources/repos/subresources/config_autofill/methods/get/).

Additional sources: [Resend domain creation](https://resend.com/docs/api-reference/domains/create-domain), [Resend account usage](https://resend.com/changelog/account-usage-api), [domain-scoped key request contract](https://raw.githubusercontent.com/resend/resend-node/main/src/api-keys/interfaces/create-api-key-options.interface.ts).
