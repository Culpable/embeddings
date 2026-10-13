/**
 * Own the review artwork, copy and physical layout, independently of the site.
 * Receive the real brand assets from render.mjs; never approximate the logo.
 */
export const concepts = [
  { id: '01-systems-hub', name: 'Systems hub' },
  { id: '02-hero-conversation', name: 'Hero conversation' },
  { id: '03-five-capabilities', name: 'Five capabilities poster' },
  { id: '04-implementation-path', name: 'Implementation path' },
  { id: '05-brand-poster', name: 'Brand poster' },
];


// Keep the capability order identical to the current positioning document.
const capabilities = [
  'Knowledge assistants', 'Customer chatbots', 'Workflow automation',
  'System integration', 'Agent orchestration',
];


function icon(name) {
  const paths = {
    document: '<path d="M14 3H5v18h14V8l-5-5Z M14 3v5h5 M8 12h8 M8 16h6"/>',
    crm: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2 M17 6h4 M17 10h4 M18 14h3"/>',
    erp: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    inbox: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',
    project: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18 M15 3v18 M5 8h2 M11 12h2 M17 7h2"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    arrow: '<path d="M4 12h16 M14 6l6 6-6 6"/>',
    knowledge: '<path d="M12 6C9 3 5 3 3 4v15c3-1 6-1 9 1 M12 6c3-3 7-3 9-2v15c-3-1-6-1-9 1V6Z"/>',
    chat: '<path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 1 1 18 0Z M7 10h10 M7 14h7"/>',
    workflow: '<rect x="3" y="3" width="6" height="6" rx="2"/><rect x="15" y="15" width="6" height="6" rx="2"/><path d="M9 6h9v9 M3 18h7 M7 14l4 4-4 4"/>',
    integration: '<path d="M8 8 5 5a3 3 0 0 1 4-4l3 3 M16 16l3 3a3 3 0 0 1-4 4l-3-3 M8 16l8-8 M4 12l8 8 M12 4l8 8"/>',
    orchestration: '<circle cx="12" cy="12" r="3"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="m6 6 4 4 M14 10l4-4 M6 18l4-4 M14 14l4 4"/>',
  };
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}


function brand(assets, centred = false) {
  return `<div class="brand${centred ? ' centred' : ''}" data-geometry><img class="brand-mark" src="${assets.mark}" alt="Embeddings ribbon mark"><img class="brand-word" src="${assets.wordmark}" alt="Embeddings"></div>`;
}


function footer() {
  return '<footer><span>AI consulting and implementation · Australia</span><span>embeddings.au</span></footer>';
}


function lead() {
  return '<div class="lead"><h1>AI that works<br>inside your<br>organisation.</h1><p class="support">We design, build and run AI inside your existing software and data.</p></div>';
}


function systems(assets) {
  // Draw five explicit connections behind the cards; each result belongs to a system.
  const nodes = [
    ['documents', 'document', 'Documents', 'Answer with source'],
    ['crm', 'crm', 'CRM', 'Record updated'],
    ['inbox', 'inbox', 'Shared inbox', 'Reply drafted'],
    ['erp', 'erp', 'ERP', 'Report updated'],
    ['project', 'project', 'Project tools', 'Task updated'],
  ];
  return `${brand(assets)}${lead()}
    <svg class="connections" viewBox="0 0 1200 630" fill="none" aria-hidden="true"><g stroke="var(--connector)" stroke-width="1.5"><path d="M768 241V259Q768 276 791 276H839Q858 276 858 294"/><path d="M1020 241V259Q1020 276 997 276H919Q898 276 898 294"/><path d="M810 339H835 M921 339H960"/><path d="M878 380V408Q878 422 896 422H900Q914 422 914 436"/></g><g fill="var(--ink)"><circle cx="768" cy="241" r="3"/><circle cx="1020" cy="241" r="3"/><circle cx="810" cy="339" r="3"/><circle cx="960" cy="339" r="3"/><circle cx="914" cy="436" r="3"/></g></svg>
    <div class="hub panel" data-geometry><img src="${assets.mark}" alt="Embeddings coordinates the connected systems"></div>
    ${nodes.map(([position, glyph, title, result]) => `<div class="system panel ${position}" data-geometry><div class="system-title">${icon(glyph)}<span>${title}</span></div><div class="result">${icon('check')}<span>${result}</span></div></div>`).join('')}${footer()}`;
}


function conversation(assets) {
  // Use the homepage's exact copy while freezing the final, completed illustration.
  const copy = assets.conversation;
  return `${brand(assets)}${lead()}<div class="conversation panel" data-geometry><div class="conversation-header"><img src="${assets.mark}" alt=""><span>${copy.label}</span></div><div class="conversation-body"><p class="question">${copy.question}</p><div class="answer"><p>${copy.answer}</p><div class="sources">${copy.sources.map(source => `<span>${icon('document')}${source}</span>`).join('')}</div></div><div class="actions">${copy.actions.map(action => `<div class="action">${icon('check')}<span>${action}</span></div>`).join('')}</div></div></div>${footer()}`;
}


function capabilityPoster(assets) {
  const glyphs = ['knowledge', 'chat', 'workflow', 'integration', 'orchestration'];
  return `${brand(assets, true)}<div class="poster-lead"><h1>Practical AI,<br>built and run.</h1></div><div class="capabilities">${capabilities.map((label, index) => `<div class="capability panel" data-geometry>${icon(glyphs[index])}<span>${label}</span></div>`).join('')}</div>${footer()}`;
}


function implementationPath(assets) {
  const stages = ['Discover', 'Build', 'Deploy', 'Operate'];
  return `${brand(assets)}<div class="path-lead"><h1>Solutions,<br>not slideshows.</h1><p class="support">We build, deploy and run what we recommend.</p></div><div class="path-strip">${stages.map((stage, index) => `${index ? `<div class="path-arrow">${icon('arrow')}</div>` : ''}<div class="stage panel" data-geometry><span class="stage-dot" aria-hidden="true"></span><h2>${stage}</h2>${index === 3 ? '<span class="live"><i aria-hidden="true"></i>Live</span>' : ''}</div>`).join('')}</div>${footer()}`;
}


function brandPoster(assets) {
  // Extend the outline's open visual direction into one quiet systems connection.
  return `${brand(assets)}<div class="oversized-brand" data-geometry><img class="poster-mark" src="${assets.mark}" alt="Embeddings ribbon mark"><img class="poster-word" src="${assets.wordmark}" alt="Embeddings"></div><h1 class="tagline">Practical AI for<br>Australian businesses</h1><svg class="brand-line" viewBox="0 0 1200 630" fill="none" aria-hidden="true"><path d="M97 313V314Q97 336 120 336H1080Q1120 336 1158 304" stroke="var(--connector)" stroke-width="1.5"/><g fill="var(--canvas)" stroke="var(--connector)" stroke-width="1.5"><circle cx="190" cy="336" r="5"/><circle cx="738" cy="336" r="5"/><circle cx="995" cy="336" r="5"/><circle cx="1131" cy="323" r="5"/></g></svg>${footer()}`;
}


function styles(assets) {
  // Embed the original WOFF2 bytes with the same width axis as the homepage h1.
  return `
@font-face{font-family:MonaDisplay;src:url('${assets.displayFont}') format('woff2');font-weight:400 700;font-stretch:125%;font-display:block}
@font-face{font-family:MonaBody;src:url('${assets.bodyFont}') format('woff2');font-weight:400 700;font-stretch:100%;font-display:block}
*{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px}body{font-family:MonaBody,sans-serif;font-synthesis:none;-webkit-font-smoothing:antialiased}
.art{position:relative;isolation:isolate;width:1200px;height:630px;background:var(--canvas);color:var(--ink)}
.dark{--canvas:#0a0a0a;--ink:#fff;--secondary:#a3a3a3;--surface:rgba(255,255,255,.05);--ring:rgba(255,255,255,.1);--connector:#525252;--chip:rgba(255,255,255,.06);--bubble:#262626;--answer:rgba(255,255,255,.04);--question:#fff;--question-ink:#0a0a0a}
.white{--canvas:#fff;--ink:#0a0a0a;--secondary:#525252;--surface:#fafafa;--ring:rgba(10,10,10,.1);--connector:#a3a3a3;--chip:#f5f5f5;--bubble:#f5f5f5;--answer:#fff;--question:#0a0a0a;--question-ink:#fff}
h1,h2,p{margin:0}h1{font-family:MonaDisplay,sans-serif;font-stretch:125%;font-variation-settings:"wdth" 125;font-weight:500;letter-spacing:-.04em;line-height:1.08}
.brand{position:absolute;top:48px;left:64px;height:43px;display:flex;align-items:center;gap:13px}.brand.centred{left:50%;transform:translateX(-50%)}.brand-mark{width:43px;height:43px}.brand-word{width:206px;height:auto}
footer{position:absolute;left:64px;right:64px;bottom:43px;display:flex;justify-content:space-between;gap:32px;font-size:18px;line-height:26px;color:var(--secondary)}footer span:last-child{color:var(--ink);white-space:nowrap}
.lead{position:absolute;left:64px;top:168px;width:545px;display:flex;flex-direction:column;gap:27px}.lead h1{font-size:59px}.support{font-size:23px;line-height:1.45;color:var(--secondary);max-width:476px}
.panel{background:var(--surface);border:1px solid var(--ring);border-radius:24px}.icon{width:24px;height:24px;flex:none;vertical-align:middle}.connections{position:absolute;inset:0;width:1200px;height:630px;z-index:-1}
.system{position:absolute;height:96px;padding:18px 19px;display:flex;flex-direction:column;justify-content:space-between;border-radius:20px}.system-title{display:flex;align-items:center;gap:11px;font-size:21px;font-weight:500;white-space:nowrap}.system-title .icon{width:22px;height:22px;color:var(--secondary)}.result{display:flex;align-items:center;gap:6px;align-self:flex-start;background:var(--chip);border-radius:7px;padding:4px 7px;font-size:15px;color:var(--secondary);white-space:nowrap}.result .icon{width:13px;height:13px}
.documents{left:660px;top:145px;width:216px}.crm{left:912px;top:145px;width:216px}.inbox{left:608px;top:291px;width:202px}.inbox .system-title{font-size:19px}.erp{left:960px;top:291px;width:176px}.project{left:792px;top:436px;width:244px}.hub{position:absolute;left:835px;top:294px;width:86px;height:86px;border-radius:24px;display:grid;place-items:center;background:var(--canvas)}.hub img{width:55px;height:55px}
.conversation{position:absolute;left:638px;top:128px;width:498px;border-radius:28px}.conversation-header{display:flex;align-items:center;gap:9px;height:48px;padding:0 22px;border-bottom:1px solid var(--ring);font-size:18px;font-weight:600}.conversation-header img{width:25px;height:25px}.conversation-body{padding:18px;display:flex;flex-direction:column;gap:12px}.question{align-self:flex-end;max-width:88%;border-radius:16px 16px 5px 16px;background:var(--question);color:var(--question-ink);padding:10px 14px;font-size:19px;line-height:1.3}.answer{background:var(--answer);border:1px solid var(--ring);border-radius:16px 16px 16px 5px;padding:15px 16px}.answer p{font-size:18px;line-height:1.38}.sources{display:flex;gap:7px;margin-top:12px}.sources>span{display:flex;align-items:center;gap:5px;padding:4px 7px;border-radius:20px;background:var(--chip);font-size:12px;white-space:nowrap;color:var(--secondary)}.sources .icon{width:13px;height:13px}.actions{display:flex;flex-direction:column;gap:8px}.action{display:flex;align-items:center;gap:9px;border:1px dashed var(--connector);border-radius:11px;padding:7px 10px;font-size:14px;line-height:18px;font-weight:500}.action .icon{width:18px;height:18px}
.poster-lead{position:absolute;top:157px;left:64px;width:1072px;text-align:center}.poster-lead h1{font-size:83px;line-height:1.04}.capabilities{position:absolute;left:64px;right:64px;top:381px;display:flex;justify-content:center;flex-wrap:wrap;gap:14px 16px}.capability{height:64px;padding:0 23px;display:flex;align-items:center;gap:12px;font-size:23px;font-weight:500;border-radius:18px}.capability .icon{color:var(--secondary)}
.path-lead{position:absolute;left:64px;top:155px;display:flex;flex-direction:column;gap:24px}.path-lead h1{font-size:79px;line-height:1.04}.path-lead .support{max-width:none}.path-strip{position:absolute;left:64px;right:64px;top:413px;display:grid;grid-template-columns:1fr 42px 1fr 42px 1fr 42px 1fr;align-items:center;gap:12px}.stage{height:115px;padding:23px 22px;position:relative;display:flex;flex-direction:column;justify-content:center;gap:10px;border-radius:22px}.stage h2{font-family:MonaDisplay,sans-serif;font-stretch:125%;font-variation-settings:"wdth" 125;font-size:30px;font-weight:500;letter-spacing:-.03em}.stage-dot{width:7px;height:7px;background:var(--secondary);border-radius:50%}.path-arrow{display:flex;justify-content:center;color:var(--secondary)}.path-arrow .icon{width:26px;height:26px}.live{position:absolute;right:17px;top:17px;display:flex;align-items:center;gap:5px;border:1px solid var(--ring);border-radius:20px;padding:4px 8px;font-size:13px;line-height:17px}.live i{width:5px;height:5px;border-radius:50%;background:var(--ink)}
.oversized-brand{position:absolute;left:64px;top:187px;width:1072px;display:flex;align-items:center;gap:28px}.poster-mark{width:151px;height:151px}.poster-word{width:893px;height:auto}.tagline{position:absolute;top:377px;left:279px;font-size:49px;line-height:1.15;letter-spacing:-.035em}.brand-line{position:absolute;inset:0;width:1200px;height:630px;z-index:-1}
`;
}


export function documentHtml(concept, theme, assets) {
  const renderers = [systems, conversation, capabilityPoster, implementationPath, brandPoster];
  const index = concepts.findIndex(item => item.id === concept.id);
  return `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=1200"><title>Embeddings / ${concept.name} / ${theme}</title><style>${styles(assets)}</style></head><body><main class="art ${theme}" aria-label="${concept.name}">${renderers[index](assets)}</main></body></html>`;
}
