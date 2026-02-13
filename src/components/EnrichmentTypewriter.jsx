// ---------------------------------------------------------------------------
// EnrichmentTypewriter — Option A for Catalogue Enrichment service section.
// Sparse product card on the left, LLM processor node in the centre,
// enriched card on the right with a typing animation revealing text.
// Flowing particles connect the three stages. Server Component (no JS).
// ---------------------------------------------------------------------------

export function EnrichmentTypewriter() {
  return (
    <div className="relative mt-8 w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 960 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
      >
        <defs>
          {/* Path gradients */}
          <linearGradient id="enrichTypeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#171717" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#171717" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#171717" stopOpacity="0.15" />
          </linearGradient>

          {/* Connection paths */}
          <path id="enrichTypePath1" d="M 230 160 C 300 160, 340 150, 400 150" />
          <path id="enrichTypePath2" d="M 520 160 C 580 160, 610 150, 660 145" />

          {/* Clip for typewriter reveal — animates inset from right */}
          <clipPath id="enrichTypeClip">
            <rect x="680" y="60" width="240" height="240" className="enrich-type-clip-rect" />
          </clipPath>
        </defs>

        {/* ----------------------------------------------------------------- */}
        {/* Left: Sparse product card                                         */}
        {/* ----------------------------------------------------------------- */}
        <g>
          <rect x="60" y="80" width="160" height="160" rx="10" fill="white" stroke="#e5e5e5" strokeWidth="1" />

          {/* Title — short */}
          <text x="80" y="110" fill="#171717" style={{ fontSize: '11px', fontWeight: 600, opacity: 0.7 }}>
            Blue Dress
          </text>

          {/* Description — one line only */}
          <rect x="80" y="122" width="120" height="4" rx="1.5" fill="#171717" opacity="0.12" />

          {/* Empty attribute slots — dashed */}
          <rect x="80" y="148" width="50" height="14" rx="7" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="3 2" opacity="0.12" />
          <rect x="136" y="148" width="50" height="14" rx="7" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="3 2" opacity="0.12" />
          <rect x="80" y="168" width="60" height="14" rx="7" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="3 2" opacity="0.12" />
          <rect x="146" y="168" width="54" height="14" rx="7" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="3 2" opacity="0.12" />

          {/* Label */}
          <text x="140" y="215" textAnchor="middle" fill="#171717" style={{ fontSize: '9px', fontWeight: 500, opacity: 0.3 }}>
            Sparse
          </text>
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* Connection: Sparse → Processor                                    */}
        {/* ----------------------------------------------------------------- */}
        <path d="M 230 160 C 300 160, 340 150, 400 150" stroke="url(#enrichTypeGrad)" strokeWidth="1.5" fill="none" />

        {/* Particles: Sparse → Processor */}
        <circle r="2.5" fill="#171717" opacity="0.4">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="0s">
            <mpath href="#enrichTypePath1" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#171717" opacity="0.3">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.2s">
            <mpath href="#enrichTypePath1" />
          </animateMotion>
        </circle>

        {/* ----------------------------------------------------------------- */}
        {/* Centre: LLM processor node (concentric circles like HeroDataFlow) */}
        {/* ----------------------------------------------------------------- */}
        <g>
          <circle cx="460" cy="155" r="50" fill="#171717" opacity="0.04" />
          <circle cx="460" cy="155" r="35" fill="#171717" opacity="0.06" />
          <circle cx="460" cy="155" r="22" fill="#171717" opacity="0.10" className="enrich-type-pulse" />

          {/* Inner "LLM" label */}
          <text x="460" y="159" textAnchor="middle" fill="#171717" style={{ fontSize: '10px', fontWeight: 700, opacity: 0.4 }}>
            LLM
          </text>

          {/* Orbital dots */}
          <circle cx="430" cy="125" r="2.5" fill="#171717" opacity="0.15" />
          <circle cx="490" cy="130" r="2" fill="#171717" opacity="0.12" />
          <circle cx="435" cy="185" r="2" fill="#171717" opacity="0.12" />
          <circle cx="488" cy="182" r="2.5" fill="#171717" opacity="0.15" />
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* Connection: Processor → Enriched                                  */}
        {/* ----------------------------------------------------------------- */}
        <path d="M 520 160 C 580 160, 610 150, 660 145" stroke="url(#enrichTypeGrad)" strokeWidth="1.5" fill="none" />

        {/* Particles: Processor → Enriched */}
        <circle r="2.5" fill="#171717" opacity="0.4">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.3s">
            <mpath href="#enrichTypePath2" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#171717" opacity="0.3">
          <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
            <mpath href="#enrichTypePath2" />
          </animateMotion>
        </circle>

        {/* ----------------------------------------------------------------- */}
        {/* Right: Enriched product card with typewriter reveal               */}
        {/* ----------------------------------------------------------------- */}
        <g>
          <rect x="660" y="60" width="240" height="200" rx="10" fill="white" stroke="#e5e5e5" strokeWidth="1" />

          {/* Title — typed out with clip-path animation */}
          <g clipPath="url(#enrichTypeClip)">
            <text x="680" y="90" fill="#171717" style={{ fontSize: '11px', fontWeight: 600, opacity: 0.7 }}>
              Women&apos;s A-Line Midi Dress
            </text>
            <text x="680" y="104" fill="#171717" style={{ fontSize: '10px', fontWeight: 400, opacity: 0.5 }}>
              Sapphire Blue, Taylor Swift-inspired
            </text>

            {/* Description lines — typed */}
            <rect x="680" y="120" width="200" height="4" rx="1.5" fill="#171717" opacity="0.15" />
            <rect x="680" y="130" width="180" height="4" rx="1.5" fill="#171717" opacity="0.12" />
            <rect x="680" y="140" width="160" height="4" rx="1.5" fill="#171717" opacity="0.10" />
          </g>

          {/* Attribute tags — fade in with staggered delays */}
          <g className="enrich-type-tag-1">
            <rect x="680" y="160" width="70" height="16" rx="8" fill="#171717" opacity="0.06" />
            <text x="715" y="168" dy="0.15" textAnchor="middle" dominantBaseline="central" fill="#171717" style={{ fontSize: '8px', fontWeight: 500, opacity: 0.5 }}>
              Sapphire Blue
            </text>
          </g>
          <g className="enrich-type-tag-2">
            <rect x="756" y="160" width="44" height="16" rx="8" fill="#171717" opacity="0.06" />
            <text x="778" y="168" dy="0.15" textAnchor="middle" dominantBaseline="central" fill="#171717" style={{ fontSize: '8px', fontWeight: 500, opacity: 0.5 }}>
              A-Line
            </text>
          </g>
          <g className="enrich-type-tag-3">
            <rect x="806" y="160" width="50" height="16" rx="8" fill="#171717" opacity="0.06" />
            <text x="831" y="168" dy="0.15" textAnchor="middle" dominantBaseline="central" fill="#171717" style={{ fontSize: '8px', fontWeight: 500, opacity: 0.5 }}>
              Crepe
            </text>
          </g>
          <g className="enrich-type-tag-4">
            <rect x="680" y="182" width="80" height="16" rx="8" fill="#171717" opacity="0.06" />
            <text x="720" y="190" dy="0.15" textAnchor="middle" dominantBaseline="central" fill="#171717" style={{ fontSize: '8px', fontWeight: 500, opacity: 0.5 }}>
              Wedding Guest
            </text>
          </g>
          <g className="enrich-type-tag-5">
            <rect x="766" y="182" width="58" height="16" rx="8" fill="#171717" opacity="0.06" />
            <text x="795" y="190" dy="0.15" textAnchor="middle" dominantBaseline="central" fill="#171717" style={{ fontSize: '8px', fontWeight: 500, opacity: 0.5 }}>
              Sizes 6–18
            </text>
          </g>

          {/* Blinking cursor — at end of typing text */}
          <rect x="860" y="82" width="1.5" height="14" fill="#171717" opacity="0.5" className="enrich-type-cursor" />

          {/* Label */}
          <text x="780" y="245" textAnchor="middle" fill="#171717" style={{ fontSize: '9px', fontWeight: 500, opacity: 0.3 }}>
            Enriched
          </text>
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* CSS keyframes                                                     */}
        {/* ----------------------------------------------------------------- */}
        <style>{`
          /* Typewriter clip-path reveal: expands from left to right using steps */
          .enrich-type-clip-rect {
            animation: enrichTypeReveal 5s steps(30) infinite;
          }

          @keyframes enrichTypeReveal {
            0% { width: 0; }
            60% { width: 240px; }
            85%, 100% { width: 240px; }
          }

          /* Blinking cursor */
          .enrich-type-cursor {
            animation: enrichTypeBlink 0.8s steps(1) infinite;
          }

          @keyframes enrichTypeBlink {
            0%, 50% { opacity: 0.5; }
            51%, 100% { opacity: 0; }
          }

          /* LLM processor pulse */
          .enrich-type-pulse {
            animation: enrichTypePulse 3s ease-in-out infinite;
          }

          @keyframes enrichTypePulse {
            0%, 100% { opacity: 0.08; }
            50% { opacity: 0.14; }
          }

          /* Attribute tag fade-in — staggered */
          .enrich-type-tag-1 { opacity: 0; animation: enrichTypeTagFade 5s ease-out infinite 2s; }
          .enrich-type-tag-2 { opacity: 0; animation: enrichTypeTagFade 5s ease-out infinite 2.3s; }
          .enrich-type-tag-3 { opacity: 0; animation: enrichTypeTagFade 5s ease-out infinite 2.6s; }
          .enrich-type-tag-4 { opacity: 0; animation: enrichTypeTagFade 5s ease-out infinite 2.9s; }
          .enrich-type-tag-5 { opacity: 0; animation: enrichTypeTagFade 5s ease-out infinite 3.2s; }

          @keyframes enrichTypeTagFade {
            0%, 5% { opacity: 0; transform: translateY(4px); }
            15% { opacity: 1; transform: translateY(0); }
            70% { opacity: 1; }
            85%, 100% { opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  )
}
