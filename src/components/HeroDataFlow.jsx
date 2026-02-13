// ---------------------------------------------------------------------------
// HeroDataFlow — Animated SVG illustration showing the agentic shopping
// pipeline: Retailer Catalogue → AI Agent → Consumer. Pure CSS animations
// using offset-path for flowing particles. Server Component (no JS needed).
//
// The AI Agent centre section uses Variant A (Neural Mesh + Orbital Dots).
// See documents/ai-agent-animation-variants.md for all variant designs.
// ---------------------------------------------------------------------------

export function HeroDataFlow() {
  return (
    <div className="relative mt-16 w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 960 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
      >
        {/* ----------------------------------------------------------------- */}
        {/* Definitions: gradients, filters, clip paths                       */}
        {/* ----------------------------------------------------------------- */}
        <defs>
          {/* Gradient for the connecting paths */}
          <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#171717" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#171717" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#171717" stopOpacity="0.15" />
          </linearGradient>

          {/* Gradient for the enrichment effect on the catalogue card */}
          <linearGradient id="enrichGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#171717" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#171717" stopOpacity="0.02" />
          </linearGradient>

          {/* Particle glow */}
          <radialGradient id="particleGlow">
            <stop offset="0%" stopColor="#171717" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#171717" stopOpacity="0" />
          </radialGradient>

          {/* Frosted glass blur for the AI agent node */}
          <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>

          {/* Connection path from catalogue to AI agent */}
          <path
            id="pathCatalogueToAgent"
            d="M 260 160 C 340 160, 360 140, 420 140"
          />

          {/* Connection path from AI agent to consumer */}
          <path
            id="pathAgentToConsumer"
            d="M 540 160 C 620 160, 640 160, 700 160"
          />

          {/* Secondary paths for visual richness */}
          <path
            id="pathCatalogueToAgent2"
            d="M 260 170 C 340 180, 370 170, 420 165"
          />
          <path
            id="pathAgentToConsumer2"
            d="M 540 155 C 620 150, 650 155, 700 152"
          />
        </defs>

        {/* ----------------------------------------------------------------- */}
        {/* Layer 1: Retailer Catalogue (left)                                */}
        {/* ----------------------------------------------------------------- */}
        <g className="hero-catalogue">
          {/* Label */}
          <text
            x="140"
            y="42"
            textAnchor="middle"
            className="fill-neutral-950 font-display text-[11px] font-semibold tracking-wider uppercase"
            style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}
          >
            Your catalogue
          </text>

          {/* Product card grid — 3 cards representing SKUs */}
          {/* Card 1 (enriched — full colour) */}
          <g className="hero-catalogue-card-enriched">
            <rect x="30" y="60" width="100" height="120" rx="8" fill="white" stroke="#e5e5e5" strokeWidth="1" />
            {/* Image placeholder */}
            <rect x="38" y="68" width="84" height="44" rx="4" fill="#f5f5f5" className="hero-enrich-fill" />
            {/* Title line */}
            <rect x="38" y="120" width="70" height="6" rx="2" fill="#171717" opacity="0.8" className="hero-enrich-fill" />
            {/* Price */}
            <rect x="38" y="132" width="30" height="5" rx="2" fill="#171717" opacity="0.4" className="hero-enrich-fill" />
            {/* GTIN */}
            <rect x="38" y="143" width="50" height="4" rx="2" fill="#171717" opacity="0.2" className="hero-enrich-fill" />
            {/* Description lines */}
            <rect x="38" y="153" width="84" height="3" rx="1" fill="#171717" opacity="0.12" className="hero-enrich-fill" />
            <rect x="38" y="160" width="60" height="3" rx="1" fill="#171717" opacity="0.12" className="hero-enrich-fill" />
            <rect x="38" y="167" width="72" height="3" rx="1" fill="#171717" opacity="0.12" className="hero-enrich-fill" />
          </g>

          {/* Card 2 (sparse — muted, represents incomplete data) */}
          <g opacity="0.4" className="hero-catalogue-card-sparse">
            <rect x="145" y="75" width="100" height="110" rx="8" fill="white" stroke="#e5e5e5" strokeWidth="1" />
            <rect x="153" y="83" width="84" height="40" rx="4" fill="#fafafa" />
            <rect x="153" y="131" width="50" height="6" rx="2" fill="#d4d4d4" />
            <rect x="153" y="143" width="20" height="5" rx="2" fill="#d4d4d4" />
            {/* Missing GTIN — dashed */}
            <rect x="153" y="154" width="40" height="4" rx="2" fill="none" stroke="#d4d4d4" strokeWidth="1" strokeDasharray="3 3" />
            {/* Missing description */}
            <rect x="153" y="164" width="70" height="3" rx="1" fill="none" stroke="#d4d4d4" strokeWidth="1" strokeDasharray="3 3" />
          </g>

          {/* Card 3 (very sparse — faded) */}
          <g opacity="0.2" className="hero-catalogue-card-sparse-2">
            <rect x="80" y="195" width="90" height="90" rx="8" fill="white" stroke="#e5e5e5" strokeWidth="1" />
            <rect x="88" y="203" width="74" height="36" rx="4" fill="#fafafa" />
            <rect x="88" y="247" width="40" height="5" rx="2" fill="#e5e5e5" />
            <rect x="88" y="258" width="60" height="3" rx="1" fill="none" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="3 3" />
          </g>
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* Connection paths: Catalogue → Agent                               */}
        {/* ----------------------------------------------------------------- */}
        <path d="M 260 160 C 340 160, 360 140, 420 140" stroke="url(#pathGrad)" strokeWidth="1.5" fill="none" />
        <path d="M 260 170 C 340 180, 370 170, 420 165" stroke="url(#pathGrad)" strokeWidth="1" fill="none" opacity="0.5" />

        {/* Flowing particles along path 1 */}
        <circle r="3" fill="#171717" opacity="0.5">
          <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
            <mpath href="#pathCatalogueToAgent" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#171717" opacity="0.3">
          <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
            <mpath href="#pathCatalogueToAgent" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="#171717" opacity="0.4">
          <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
            <mpath href="#pathCatalogueToAgent2" />
          </animateMotion>
        </circle>

        {/* ----------------------------------------------------------------- */}
        {/* Layer 2: AI Agent (centre) — Variant A: Neural Mesh + Orbital Dots*/}
        {/* ----------------------------------------------------------------- */}
        <g>
          {/* Label */}
          <text
            x="480"
            y="42"
            textAnchor="middle"
            className="fill-neutral-950 font-display text-[11px] font-semibold tracking-wider uppercase"
            style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}
          >
            AI agent
          </text>

          {/* Ambient glow behind the mesh */}
          <circle cx="480" cy="160" r="50" fill="white" opacity="0.05" filter="url(#glassBlur)" />

          {/* Central hub node — slightly larger with gentle pulse */}
          <circle cx="480" cy="160" r="5" fill="#171717" opacity="0.35" className="hero-agent-pulse" />
          <circle cx="480" cy="160" r="8" fill="#171717" opacity="0.06" className="hero-agent-pulse" />

          {/* Mesh nodes — 8 points distributed around centre.
              Each node pulses subtly with staggered timing to create
              a living, breathing constellation effect. */}
          {/* Node 1: top-left */}
          <circle cx="452" cy="130" r="2.5" fill="#171717">
            <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite" begin="0s" />
          </circle>
          {/* Node 2: top */}
          <circle cx="480" cy="118" r="2" fill="#171717">
            <animate attributeName="opacity" values="0.12;0.30;0.12" dur="3.5s" repeatCount="indefinite" begin="0.4s" />
          </circle>
          {/* Node 3: top-right */}
          <circle cx="510" cy="128" r="2.5" fill="#171717">
            <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite" begin="0.8s" />
          </circle>
          {/* Node 4: right */}
          <circle cx="520" cy="158" r="2" fill="#171717">
            <animate attributeName="opacity" values="0.12;0.28;0.12" dur="4s" repeatCount="indefinite" begin="1.2s" />
          </circle>
          {/* Node 5: bottom-right */}
          <circle cx="508" cy="190" r="2.5" fill="#171717">
            <animate attributeName="opacity" values="0.15;0.32;0.15" dur="3.2s" repeatCount="indefinite" begin="1.6s" />
          </circle>
          {/* Node 6: bottom */}
          <circle cx="478" cy="200" r="2" fill="#171717">
            <animate attributeName="opacity" values="0.12;0.30;0.12" dur="3.8s" repeatCount="indefinite" begin="2.0s" />
          </circle>
          {/* Node 7: bottom-left */}
          <circle cx="450" cy="188" r="2.5" fill="#171717">
            <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite" begin="2.4s" />
          </circle>
          {/* Node 8: left */}
          <circle cx="442" cy="158" r="2" fill="#171717">
            <animate attributeName="opacity" values="0.12;0.28;0.12" dur="3.6s" repeatCount="indefinite" begin="2.8s" />
          </circle>

          {/* Mesh connection lines — thin strokes linking nearby nodes */}
          {/* Hub to each node */}
          <line x1="480" y1="160" x2="452" y2="130" stroke="#171717" strokeWidth="0.5" opacity="0.10" />
          <line x1="480" y1="160" x2="480" y2="118" stroke="#171717" strokeWidth="0.5" opacity="0.10" />
          <line x1="480" y1="160" x2="510" y2="128" stroke="#171717" strokeWidth="0.5" opacity="0.10" />
          <line x1="480" y1="160" x2="520" y2="158" stroke="#171717" strokeWidth="0.5" opacity="0.10" />
          <line x1="480" y1="160" x2="508" y2="190" stroke="#171717" strokeWidth="0.5" opacity="0.10" />
          <line x1="480" y1="160" x2="478" y2="200" stroke="#171717" strokeWidth="0.5" opacity="0.10" />
          <line x1="480" y1="160" x2="450" y2="188" stroke="#171717" strokeWidth="0.5" opacity="0.10" />
          <line x1="480" y1="160" x2="442" y2="158" stroke="#171717" strokeWidth="0.5" opacity="0.10" />
          {/* Perimeter connections between adjacent nodes */}
          <line x1="452" y1="130" x2="480" y2="118" stroke="#171717" strokeWidth="0.4" opacity="0.07" />
          <line x1="480" y1="118" x2="510" y2="128" stroke="#171717" strokeWidth="0.4" opacity="0.07" />
          <line x1="510" y1="128" x2="520" y2="158" stroke="#171717" strokeWidth="0.4" opacity="0.07" />
          <line x1="520" y1="158" x2="508" y2="190" stroke="#171717" strokeWidth="0.4" opacity="0.07" />
          <line x1="508" y1="190" x2="478" y2="200" stroke="#171717" strokeWidth="0.4" opacity="0.07" />
          <line x1="478" y1="200" x2="450" y2="188" stroke="#171717" strokeWidth="0.4" opacity="0.07" />
          <line x1="450" y1="188" x2="442" y2="158" stroke="#171717" strokeWidth="0.4" opacity="0.07" />
          <line x1="442" y1="158" x2="452" y2="130" stroke="#171717" strokeWidth="0.4" opacity="0.07" />
          {/* Cross-mesh diagonals for density */}
          <line x1="452" y1="130" x2="510" y2="128" stroke="#171717" strokeWidth="0.3" opacity="0.05" />
          <line x1="510" y1="128" x2="508" y2="190" stroke="#171717" strokeWidth="0.3" opacity="0.05" />
          <line x1="442" y1="158" x2="520" y2="158" stroke="#171717" strokeWidth="0.3" opacity="0.05" />
          <line x1="450" y1="188" x2="510" y2="128" stroke="#171717" strokeWidth="0.3" opacity="0.05" />
          <line x1="452" y1="130" x2="478" y2="200" stroke="#171717" strokeWidth="0.3" opacity="0.05" />

          {/* Orbital data dots — travel along mesh paths via animateMotion */}
          {/* Dot 1: hub → node 3 → node 4 → node 5 → hub */}
          <circle r="2" fill="#171717" opacity="0.45">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              begin="0s"
              path="M 480,160 L 510,128 L 520,158 L 508,190 L 480,160"
            />
          </circle>
          {/* Dot 2: hub → node 7 → node 8 → node 1 → hub */}
          <circle r="1.5" fill="#171717" opacity="0.35">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              begin="1.5s"
              path="M 480,160 L 450,188 L 442,158 L 452,130 L 480,160"
            />
          </circle>
          {/* Dot 3: hub → node 2 → node 6 → hub (cross path) */}
          <circle r="1.8" fill="#171717" opacity="0.40">
            <animateMotion
              dur="3.5s"
              repeatCount="indefinite"
              begin="0.8s"
              path="M 480,160 L 480,118 L 478,200 L 480,160"
            />
          </circle>
        </g>

        {/* ================================================================= */}
        {/* VARIANT B (commented out for reference)                           */}
        {/* Scanning Beam + Neural Mesh — radar-sweep line rotates around     */}
        {/* the centre over a mesh of nodes that brighten as the beam passes. */}
        {/* See documents/ai-agent-animation-variants.md for full details.    */}
        {/* ================================================================= */}
        {/*
        <g>
          <text x="480" y="42" textAnchor="middle" className="fill-neutral-950 font-display text-[11px] font-semibold tracking-wider uppercase" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>AI agent</text>

          <circle cx="480" cy="160" r="50" fill="white" opacity="0.05" filter="url(#glassBlur)" />
          <circle cx="480" cy="160" r="48" fill="none" stroke="#171717" strokeWidth="0.3" opacity="0.06" />

          <!-- Mesh connection lines -->
          <line x1="480" y1="160" x2="452" y2="130" stroke="#171717" strokeWidth="0.5" opacity="0.08" />
          <line x1="480" y1="160" x2="480" y2="118" stroke="#171717" strokeWidth="0.5" opacity="0.08" />
          <line x1="480" y1="160" x2="510" y2="128" stroke="#171717" strokeWidth="0.5" opacity="0.08" />
          <line x1="480" y1="160" x2="520" y2="158" stroke="#171717" strokeWidth="0.5" opacity="0.08" />
          <line x1="480" y1="160" x2="508" y2="190" stroke="#171717" strokeWidth="0.5" opacity="0.08" />
          <line x1="480" y1="160" x2="478" y2="200" stroke="#171717" strokeWidth="0.5" opacity="0.08" />
          <line x1="480" y1="160" x2="450" y2="188" stroke="#171717" strokeWidth="0.5" opacity="0.08" />
          <line x1="480" y1="160" x2="442" y2="158" stroke="#171717" strokeWidth="0.5" opacity="0.08" />
          <line x1="452" y1="130" x2="480" y2="118" stroke="#171717" strokeWidth="0.4" opacity="0.06" />
          <line x1="480" y1="118" x2="510" y2="128" stroke="#171717" strokeWidth="0.4" opacity="0.06" />
          <line x1="510" y1="128" x2="520" y2="158" stroke="#171717" strokeWidth="0.4" opacity="0.06" />
          <line x1="520" y1="158" x2="508" y2="190" stroke="#171717" strokeWidth="0.4" opacity="0.06" />
          <line x1="508" y1="190" x2="478" y2="200" stroke="#171717" strokeWidth="0.4" opacity="0.06" />
          <line x1="478" y1="200" x2="450" y2="188" stroke="#171717" strokeWidth="0.4" opacity="0.06" />
          <line x1="450" y1="188" x2="442" y2="158" stroke="#171717" strokeWidth="0.4" opacity="0.06" />
          <line x1="442" y1="158" x2="452" y2="130" stroke="#171717" strokeWidth="0.4" opacity="0.06" />
          <line x1="452" y1="130" x2="508" y2="190" stroke="#171717" strokeWidth="0.3" opacity="0.04" />
          <line x1="442" y1="158" x2="520" y2="158" stroke="#171717" strokeWidth="0.3" opacity="0.04" />
          <line x1="450" y1="188" x2="510" y2="128" stroke="#171717" strokeWidth="0.3" opacity="0.04" />

          <!-- Mesh nodes with beam-synchronised flash classes -->
          <circle cx="452" cy="130" r="2.5" fill="#171717" className="hero-beam-node-1" />
          <circle cx="480" cy="118" r="2" fill="#171717" className="hero-beam-node-2" />
          <circle cx="510" cy="128" r="2.5" fill="#171717" className="hero-beam-node-3" />
          <circle cx="520" cy="158" r="2" fill="#171717" className="hero-beam-node-4" />
          <circle cx="508" cy="190" r="2.5" fill="#171717" className="hero-beam-node-5" />
          <circle cx="478" cy="200" r="2" fill="#171717" className="hero-beam-node-6" />
          <circle cx="450" cy="188" r="2.5" fill="#171717" className="hero-beam-node-7" />
          <circle cx="442" cy="158" r="2" fill="#171717" className="hero-beam-node-8" />

          <circle cx="480" cy="160" r="4" fill="#171717" opacity="0.30" className="hero-agent-pulse" />

          <!-- Rotating scanning beam (requires beamFade gradient in defs) -->
          <g>
            <line x1="480" y1="160" x2="480" y2="112" stroke="url(#beamFade)" strokeWidth="1.2" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 480 160" to="360 480 160" dur="4s" repeatCount="indefinite" />
            </line>
          </g>

          <!-- Required defs addition for Variant B:
          <linearGradient id="beamFade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#171717" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#171717" stopOpacity="0" />
          </linearGradient>
          -->

          <!-- Required CSS for Variant B:
          @keyframes beamFlash {
            0%, 8%   { opacity: 0.10; }
            4%       { opacity: 0.50; }
            12%, 100% { opacity: 0.10; }
          }
          .hero-beam-node-1 { animation: beamFlash 4s ease-in-out infinite 3.5s; opacity: 0.10; }
          .hero-beam-node-2 { animation: beamFlash 4s ease-in-out infinite 0.0s; opacity: 0.10; }
          .hero-beam-node-3 { animation: beamFlash 4s ease-in-out infinite 0.5s; opacity: 0.10; }
          .hero-beam-node-4 { animation: beamFlash 4s ease-in-out infinite 1.0s; opacity: 0.10; }
          .hero-beam-node-5 { animation: beamFlash 4s ease-in-out infinite 1.5s; opacity: 0.10; }
          .hero-beam-node-6 { animation: beamFlash 4s ease-in-out infinite 2.0s; opacity: 0.10; }
          .hero-beam-node-7 { animation: beamFlash 4s ease-in-out infinite 2.5s; opacity: 0.10; }
          .hero-beam-node-8 { animation: beamFlash 4s ease-in-out infinite 3.0s; opacity: 0.10; }
          -->
        </g>
        */}

        {/* ================================================================= */}
        {/* VARIANT C (commented out for reference)                           */}
        {/* Multi-layer Rings + Orbital Dots — 3 concentric dashed rings      */}
        {/* rotating at different speeds/directions with orbiting dots.        */}
        {/* See documents/ai-agent-animation-variants.md for full details.    */}
        {/* ================================================================= */}
        {/*
        <g>
          <text x="480" y="42" textAnchor="middle" className="fill-neutral-950 font-display text-[11px] font-semibold tracking-wider uppercase" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>AI agent</text>

          <circle cx="480" cy="160" r="52" fill="white" opacity="0.04" filter="url(#glassBlur)" />

          <!-- Ring 1 (innermost): r=20, clockwise, 8s -->
          <circle cx="480" cy="160" r="20" fill="none" stroke="#171717" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.15">
            <animateTransform attributeName="transform" type="rotate" from="0 480 160" to="360 480 160" dur="8s" repeatCount="indefinite" />
          </circle>

          <!-- Ring 2 (middle): r=35, counter-clockwise, 12s -->
          <circle cx="480" cy="160" r="35" fill="none" stroke="#171717" strokeWidth="0.6" strokeDasharray="6 4 2 4" opacity="0.10">
            <animateTransform attributeName="transform" type="rotate" from="360 480 160" to="0 480 160" dur="12s" repeatCount="indefinite" />
          </circle>

          <!-- Ring 3 (outermost): r=50, clockwise, 16s -->
          <circle cx="480" cy="160" r="50" fill="none" stroke="#171717" strokeWidth="0.4" strokeDasharray="3 6 1 6" opacity="0.07">
            <animateTransform attributeName="transform" type="rotate" from="0 480 160" to="360 480 160" dur="16s" repeatCount="indefinite" />
          </circle>

          <!-- Central core node -->
          <circle cx="480" cy="160" r="3.5" fill="#171717" opacity="0.30" className="hero-agent-pulse" />
          <circle cx="480" cy="160" r="6" fill="#171717" opacity="0.06" className="hero-agent-pulse" />

          <!-- Orbital dot 1: inner orbit (r=20), fast, clockwise -->
          <circle r="2" fill="#171717" opacity="0.40">
            <animateMotion dur="5s" repeatCount="indefinite" begin="0s" path="M 500,160 A 20,20 0 1,1 499.99,160" />
          </circle>

          <!-- Orbital dot 2: middle orbit (r=35), medium, counter-clockwise -->
          <circle r="1.8" fill="#171717" opacity="0.30">
            <animateMotion dur="8s" repeatCount="indefinite" begin="2s" path="M 515,160 A 35,35 0 1,0 514.99,160" />
          </circle>

          <!-- Orbital dot 3: outer orbit (r=50), slow, clockwise -->
          <circle r="1.5" fill="#171717" opacity="0.22">
            <animateMotion dur="11s" repeatCount="indefinite" begin="1s" path="M 530,160 A 50,50 0 1,1 529.99,160" />
          </circle>
        </g>
        */}

        {/* ----------------------------------------------------------------- */}
        {/* Connection paths: Agent → Consumer                                */}
        {/* ----------------------------------------------------------------- */}
        <path d="M 540 160 C 620 160, 640 160, 700 160" stroke="url(#pathGrad)" strokeWidth="1.5" fill="none" />
        <path d="M 540 155 C 620 150, 650 155, 700 152" stroke="url(#pathGrad)" strokeWidth="1" fill="none" opacity="0.5" />

        {/* Flowing particles along path 2 */}
        <circle r="3" fill="#171717" opacity="0.5">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.3s">
            <mpath href="#pathAgentToConsumer" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#171717" opacity="0.3">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.3s">
            <mpath href="#pathAgentToConsumer" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#171717" opacity="0.35">
          <animateMotion dur="3s" repeatCount="indefinite" begin="0.8s">
            <mpath href="#pathAgentToConsumer2" />
          </animateMotion>
        </circle>

        {/* ----------------------------------------------------------------- */}
        {/* Layer 3: Consumer chat interface (right)                          */}
        {/* ----------------------------------------------------------------- */}
        <g>
          {/* Label */}
          <text
            x="810"
            y="42"
            textAnchor="middle"
            className="fill-neutral-950 font-display text-[11px] font-semibold tracking-wider uppercase"
            style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}
          >
            Consumer
          </text>

          {/* Chat window frame */}
          <rect x="720" y="60" width="180" height="210" rx="12" fill="white" stroke="#e5e5e5" strokeWidth="1" />

          {/* Chat header bar */}
          <rect x="720" y="60" width="180" height="30" rx="12" fill="#fafafa" />
          <rect x="720" y="78" width="180" height="12" fill="#fafafa" />
          {/* Header dots */}
          <circle cx="738" cy="75" r="3" fill="#e5e5e5" />
          <circle cx="748" cy="75" r="3" fill="#e5e5e5" />
          <circle cx="758" cy="75" r="3" fill="#e5e5e5" />

          {/* User message bubble */}
          <rect x="760" y="100" width="128" height="40" rx="8" fill="#171717" opacity="0.06" />
          <text
            x="770"
            y="116"
            className="fill-neutral-950"
            style={{ fontSize: '8px', fontWeight: 500, opacity: 0.7 }}
          >
            Find me the best running
          </text>
          <text
            x="770"
            y="128"
            className="fill-neutral-950"
            style={{ fontSize: '8px', fontWeight: 500, opacity: 0.7 }}
          >
            shoes under $200
          </text>

          {/* AI response — product recommendation */}
          <rect x="732" y="152" width="140" height="48" rx="8" fill="#171717" opacity="0.04" />
          <text
            x="742"
            y="161"
            dominantBaseline="text-before-edge"
            className="fill-neutral-950"
            style={{ fontSize: '7.5px', fontWeight: 400, opacity: 0.5 }}
          >
            Based on 12 catalogues, I
          </text>
          <text
            x="742"
            y="172"
            dominantBaseline="text-before-edge"
            className="fill-neutral-950"
            style={{ fontSize: '7.5px', fontWeight: 400, opacity: 0.5 }}
          >
            recommend the Nike Pegasus
          </text>
          <text
            x="742"
            y="183"
            dominantBaseline="text-before-edge"
            className="fill-neutral-950"
            style={{ fontSize: '7.5px', fontWeight: 400, opacity: 0.5 }}
          >
            41 — $189, in stock, 4.8★
          </text>

          {/* Typing indicator for second response */}
          <g className="hero-typing-dots">
            <circle cx="742" cy="222" r="2.5" fill="#171717" opacity="0.15">
              <animate attributeName="opacity" values="0.15;0.4;0.15" dur="1.4s" repeatCount="indefinite" begin="0s" />
            </circle>
            <circle cx="752" cy="222" r="2.5" fill="#171717" opacity="0.15">
              <animate attributeName="opacity" values="0.15;0.4;0.15" dur="1.4s" repeatCount="indefinite" begin="0.2s" />
            </circle>
            <circle cx="762" cy="222" r="2.5" fill="#171717" opacity="0.15">
              <animate attributeName="opacity" values="0.15;0.4;0.15" dur="1.4s" repeatCount="indefinite" begin="0.4s" />
            </circle>
          </g>

          {/* Chat input bar */}
          <rect x="732" y="242" width="156" height="18" rx="9" fill="none" stroke="#e5e5e5" strokeWidth="1" />
          <text
            x="742"
            y="254"
            style={{ fontSize: '7px', opacity: 0.25 }}
            className="fill-neutral-500"
          >
            Ask anything...
          </text>
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* CSS animations for hero elements                                  */}
        {/* ----------------------------------------------------------------- */}
        <style>{`
          .hero-agent-pulse {
            animation: agentPulse 3s ease-in-out infinite;
          }

          @keyframes agentPulse {
            0%, 100% { opacity: 0.08; }
            50% { opacity: 0.14; }
          }
        `}</style>
      </svg>
    </div>
  )
}
