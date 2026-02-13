// ---------------------------------------------------------------------------
// FreshnessPipelineFlow — Option A for Catalogue Freshness service section.
// Three source nodes (ERP, POS, Inventory) on the left with flowing particles
// along curved paths to a Catalogue node on the right. Uses animateMotion
// for particles (same technique as HeroDataFlow). Server Component (no JS).
// ---------------------------------------------------------------------------

export function FreshnessPipelineFlow() {
  return (
    <div
      className="relative mt-8 w-full overflow-hidden aspect-[2.1/1] md:aspect-[2.4/1] lg:aspect-[3/1]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 960 320"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
      >
        <defs>
          {/* Path gradients for connecting lines */}
          <linearGradient id="freshPipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#171717" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#171717" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#171717" stopOpacity="0.15" />
          </linearGradient>

          {/* Curved paths from each source to the catalogue node */}
          <path id="freshPathERP"   d="M 280 80  C 380 80,  500 120, 640 160" />
          <path id="freshPathPOS"   d="M 280 160 C 400 160, 500 160, 640 160" />
          <path id="freshPathInv"   d="M 280 240 C 380 240, 500 200, 640 160" />
        </defs>

        {/* ----------------------------------------------------------------- */}
        {/* Source nodes — left side                                          */}
        {/* ----------------------------------------------------------------- */}

        {/* ERP node */}
        <g>
          <rect x="160" y="60" width="110" height="40" rx="8" fill="white" stroke="#e5e5e5" strokeWidth="1" />
          <text
            x="215"
            y="85"
            textAnchor="middle"
            className="fill-neutral-950 font-display"
            style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}
          >
            ERP
          </text>
        </g>

        {/* POS node */}
        <g>
          <rect x="160" y="140" width="110" height="40" rx="8" fill="white" stroke="#e5e5e5" strokeWidth="1" />
          <text
            x="215"
            y="165"
            textAnchor="middle"
            className="fill-neutral-950 font-display"
            style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}
          >
            POS
          </text>
        </g>

        {/* Inventory node */}
        <g>
          <rect x="160" y="220" width="110" height="40" rx="8" fill="white" stroke="#e5e5e5" strokeWidth="1" />
          <text
            x="215"
            y="245"
            textAnchor="middle"
            className="fill-neutral-950 font-display"
            style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}
          >
            Inventory
          </text>
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* Connection paths (visible lines)                                  */}
        {/* ----------------------------------------------------------------- */}
        <path d="M 280 80  C 380 80,  500 120, 640 160" stroke="url(#freshPipeGrad)" strokeWidth="1.5" fill="none" />
        <path d="M 280 160 C 400 160, 500 160, 640 160" stroke="url(#freshPipeGrad)" strokeWidth="1.5" fill="none" />
        <path d="M 280 240 C 380 240, 500 200, 640 160" stroke="url(#freshPipeGrad)" strokeWidth="1.5" fill="none" />

        {/* ----------------------------------------------------------------- */}
        {/* Flowing particles along each path (animateMotion)                */}
        {/* ----------------------------------------------------------------- */}

        {/* ERP particles */}
        <circle r="3" fill="#171717" opacity="0.5">
          <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
            <mpath href="#freshPathERP" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#171717" opacity="0.3">
          <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s">
            <mpath href="#freshPathERP" />
          </animateMotion>
        </circle>

        {/* POS particles */}
        <circle r="3" fill="#171717" opacity="0.5">
          <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.3s">
            <mpath href="#freshPathPOS" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#171717" opacity="0.3">
          <animateMotion dur="3.5s" repeatCount="indefinite" begin="2s">
            <mpath href="#freshPathPOS" />
          </animateMotion>
        </circle>

        {/* Inventory particles */}
        <circle r="2.5" fill="#171717" opacity="0.4">
          <animateMotion dur="4s" repeatCount="indefinite" begin="0.6s">
            <mpath href="#freshPathInv" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#171717" opacity="0.3">
          <animateMotion dur="4s" repeatCount="indefinite" begin="2.5s">
            <mpath href="#freshPathInv" />
          </animateMotion>
        </circle>

        {/* ----------------------------------------------------------------- */}
        {/* Status text snippets — fade in/out along paths                   */}
        {/* ----------------------------------------------------------------- */}
        <text x="420" y="85" fill="#171717" style={{ fontSize: '9px', fontWeight: 500, opacity: 0.4 }} className="fresh-pipe-text-1">
          stock: 142 → 139
        </text>
        <text x="440" y="143" fill="#171717" style={{ fontSize: '9px', fontWeight: 500, opacity: 0.4 }} className="fresh-pipe-text-2">
          price: $189 → $179
        </text>
        <text x="460" y="240" fill="#171717" style={{ fontSize: '9px', fontWeight: 500, opacity: 0.4 }} className="fresh-pipe-text-3">
          status: active
        </text>

        {/* ----------------------------------------------------------------- */}
        {/* Catalogue node — right side (destination)                         */}
        {/* ----------------------------------------------------------------- */}
        <g>
          <rect x="640" y="130" width="140" height="60" rx="10" fill="white" stroke="#e5e5e5" strokeWidth="1" className="fresh-pipe-catalogue" />
          <text
            x="710"
            y="165"
            textAnchor="middle"
            className="fill-neutral-950 font-display"
            style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}
          >
            Catalogue
          </text>
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* CSS keyframes                                                     */}
        {/* ----------------------------------------------------------------- */}
        <style>{`
          /* Catalogue node breathes subtly to show it's receiving data */
          .fresh-pipe-catalogue {
            animation: freshPipePulse 3s ease-in-out infinite;
          }

          @keyframes freshPipePulse {
            0%, 100% { filter: drop-shadow(0 0 0 transparent); }
            50% { filter: drop-shadow(0 0 8px rgba(23, 23, 23, 0.06)); }
          }

          /* Status text snippets cycle visibility */
          .fresh-pipe-text-1 {
            animation: freshPipeTextFade 4s ease-in-out infinite;
          }
          .fresh-pipe-text-2 {
            animation: freshPipeTextFade 4s ease-in-out infinite 1.3s;
          }
          .fresh-pipe-text-3 {
            animation: freshPipeTextFade 4s ease-in-out infinite 2.6s;
          }

          @keyframes freshPipeTextFade {
            0%, 15% { opacity: 0; }
            25% { opacity: 0.5; }
            50% { opacity: 0.5; }
            65% { opacity: 0; }
            100% { opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  )
}
