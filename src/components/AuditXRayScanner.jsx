// ---------------------------------------------------------------------------
// AuditXRayScanner — Catalogue Audit service section animation.
// A horizontal scan beam sweeps down a product card, revealing data gaps.
// Enhanced with amber/yellow glow on the beam (inspired by the magnifying-
// glass lens tint from the rejected Option C) and red/amber highlights on
// broken fields so discrepancies are visually unmistakable.
// Pure CSS keyframes, Server Component (no JS).
// ---------------------------------------------------------------------------

export function AuditXRayScanner() {
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
          {/* Warm amber glow halo for the scan beam (lens-tint effect) */}
          <linearGradient id="auditXrayGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.07" />
            <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>

          {/* Amber highlight wash — applied over discrepancy zones as beam passes */}
          <linearGradient id="auditHighlightWash" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
            <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.06" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ----------------------------------------------------------------- */}
        {/* Product card — centred at x=380, showing data fields              */}
        {/* ----------------------------------------------------------------- */}
        <g>
          {/* Card background */}
          <rect x="380" y="30" width="200" height="260" rx="12" fill="white" stroke="#e5e5e5" strokeWidth="1" />

          {/* Image placeholder — dashed outline (missing) — turns red when scanned */}
          <rect x="396" y="46" width="168" height="60" rx="6" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="6 4" opacity="0.15" />

          {/* Title line — solid (present but generic quality) */}
          <rect x="396" y="120" width="120" height="8" rx="3" fill="#171717" opacity="0.6" />

          {/* Price line — solid (present) */}
          <rect x="396" y="138" width="50" height="6" rx="2" fill="#171717" opacity="0.3" />

          {/* GTIN — dashed (missing) — neutral state, turns red when scanned */}
          <rect x="396" y="156" width="80" height="6" rx="2" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="4 3" opacity="0.2" />

          {/* Description line 1 — solid (present) */}
          <rect x="396" y="176" width="168" height="4" rx="1.5" fill="#171717" opacity="0.12" />
          {/* Description line 2 — dashed (thin/missing) */}
          <rect x="396" y="186" width="140" height="4" rx="1.5" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="4 3" opacity="0.12" />
          {/* Description line 3 — dashed (thin/missing) */}
          <rect x="396" y="196" width="100" height="4" rx="1.5" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="4 3" opacity="0.12" />

          {/* Attribute pills — 2 solid + 3 dashed */}
          <rect x="396" y="216" width="36" height="14" rx="7" fill="#171717" opacity="0.06" />
          <rect x="438" y="216" width="44" height="14" rx="7" fill="#171717" opacity="0.06" />
          <rect x="488" y="216" width="36" height="14" rx="7" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="3 2" opacity="0.12" />
          <rect x="396" y="236" width="40" height="14" rx="7" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="3 2" opacity="0.12" />
          <rect x="442" y="236" width="48" height="14" rx="7" fill="none" stroke="#171717" strokeWidth="1" strokeDasharray="3 2" opacity="0.12" />
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* Amber highlight zones — yellow wash over discrepancy rows that    */}
        {/* fades in as the beam crosses, mimicking the magnifying-glass lens */}
        {/* ----------------------------------------------------------------- */}

        {/* Highlight zone: Image placeholder */}
        <rect x="390" y="42" width="180" height="70" rx="4" fill="url(#auditHighlightWash)" className="audit-xray-highlight-img" />

        {/* Highlight zone: Title row */}
        <rect x="390" y="114" width="180" height="20" rx="4" fill="url(#auditHighlightWash)" className="audit-xray-highlight-title" />

        {/* GTIN highlight zone removed — not separately labelled */}

        {/* Highlight zone: Description rows */}
        <rect x="390" y="178" width="180" height="28" rx="4" fill="url(#auditHighlightWash)" className="audit-xray-highlight-desc" />

        {/* Highlight zone: Attribute rows */}
        <rect x="390" y="210" width="180" height="46" rx="4" fill="url(#auditHighlightWash)" className="audit-xray-highlight-attr" />

        {/* ----------------------------------------------------------------- */}
        {/* Red/amber overlays on broken fields — revealed by the beam        */}
        {/* These sit on top of the base fields and tint them red/amber       */}
        {/* ----------------------------------------------------------------- */}

        {/* Image placeholder — turns red when scanned (missing) */}
        <rect x="396" y="46" width="168" height="60" rx="6" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="6 4" className="audit-xray-red-img" />

        {/* Title — turns amber when scanned (generic quality) */}
        <rect x="396" y="118" width="120" height="12" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="audit-xray-amber-title" />

        {/* GTIN — dashed but not separately highlighted (part of card background) */}

        {/* Description line 2 — amber when scanned (thin/quality gap) */}
        <rect x="396" y="186" width="140" height="4" rx="1.5" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3" className="audit-xray-amber-desc2" />

        {/* Description line 3 — amber when scanned (thin/quality gap) */}
        <rect x="396" y="196" width="100" height="4" rx="1.5" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3" className="audit-xray-amber-desc3" />

        {/* Dashed attribute pills — turn red when scanned (missing fields) */}
        <rect x="488" y="216" width="36" height="14" rx="7" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" className="audit-xray-red-attr1" />
        <rect x="396" y="236" width="40" height="14" rx="7" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" className="audit-xray-red-attr2" />
        <rect x="442" y="236" width="48" height="14" rx="7" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" className="audit-xray-red-attr3" />

        {/* ----------------------------------------------------------------- */}
        {/* Scan beam — sweeps top to bottom of card                          */}
        {/* Amber-tinted glow halo for a warm diagnostic feel                 */}
        {/* ----------------------------------------------------------------- */}
        <g className="audit-xray-beam">
          {/* Wide warm glow halo */}
          <rect x="378" y="-4" width="204" height="30" rx="4" fill="url(#auditXrayGlow)" />
          {/* Sharp scan line — amber tinted core */}
          <rect x="380" y="11" width="200" height="2" rx="1" fill="#f59e0b" opacity="0.35" />
          {/* Hairline neutral edge for definition */}
          <rect x="380" y="12" width="200" height="0.5" fill="#171717" opacity="0.12" />
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* Warning markers — red "!" circles at positions of broken fields   */}
        {/* ----------------------------------------------------------------- */}

        {/* Warning at image placeholder (y=76 — centre of image area) */}
        <g className="audit-xray-warn-img">
          <circle cx="590" cy="76" r="9" fill="#dc2626" opacity="0.1" />
          <circle cx="590" cy="76" r="6" fill="#dc2626" opacity="0.15" />
          <text x="590" y="80" textAnchor="middle" fill="#dc2626" opacity="0.8" style={{ fontSize: '10px', fontWeight: 700 }}>!</text>
        </g>

        {/* Warning at title row (y=124) */}
        <g className="audit-xray-warn-title">
          <circle cx="590" cy="124" r="9" fill="#f59e0b" opacity="0.1" />
          <circle cx="590" cy="124" r="6" fill="#f59e0b" opacity="0.15" />
          <text x="590" y="128" textAnchor="middle" fill="#f59e0b" opacity="0.8" style={{ fontSize: '10px', fontWeight: 700 }}>!</text>
        </g>

        {/* GTIN warning removed — not separately labelled */}

        {/* Warning at description rows (y=186) — amber (quality gap) */}
        <g className="audit-xray-warn-desc">
          <circle cx="590" cy="191" r="9" fill="#f59e0b" opacity="0.1" />
          <circle cx="590" cy="191" r="6" fill="#f59e0b" opacity="0.15" />
          <text x="590" y="195" textAnchor="middle" fill="#f59e0b" opacity="0.8" style={{ fontSize: '10px', fontWeight: 700 }}>!</text>
        </g>

        {/* Warning at attributes rows (y=226) — red (missing fields) */}
        <g className="audit-xray-warn-attr">
          <circle cx="590" cy="233" r="9" fill="#dc2626" opacity="0.1" />
          <circle cx="590" cy="233" r="6" fill="#dc2626" opacity="0.15" />
          <text x="590" y="237" textAnchor="middle" fill="#dc2626" opacity="0.8" style={{ fontSize: '10px', fontWeight: 700 }}>!</text>
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* Stats text — static labels on the right                          */}
        {/* ----------------------------------------------------------------- */}
        <text
          x="660"
          y="145"
          fill="#dc2626"
          style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.7 }}
        >
          1 missing image
        </text>
        <text
          x="660"
          y="165"
          fill="#f59e0b"
          style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em', opacity: 0.6 }}
        >
          Title is generic
        </text>
        <text
          x="660"
          y="185"
          fill="#f59e0b"
          style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em', opacity: 0.6 }}
        >
          2 thin descriptions
        </text>
        <text
          x="660"
          y="205"
          fill="#dc2626"
          style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.7 }}
        >
          3 missing fields
        </text>

        {/* ----------------------------------------------------------------- */}
        {/* CSS keyframes for scan beam, warning pulse, and highlight zones   */}
        {/* ----------------------------------------------------------------- */}
        <style>{`
          /* Scan beam sweeps from top to bottom of card (y=30 → y=260) */
          .audit-xray-beam {
            animation: auditScanBeam 4s ease-in-out infinite;
          }

          @keyframes auditScanBeam {
            0%, 100% { transform: translateY(30px); }
            90% { transform: translateY(250px); }
            95% { transform: translateY(250px); }
          }

          /* ----------------------------------------------------------- */
          /* Amber highlight wash zones — fade in as beam passes          */
          /* ----------------------------------------------------------- */

          /* Image highlight zone — beam at ~8% */
          .audit-xray-highlight-img {
            opacity: 0;
            animation: auditHighlightImg 4s ease-in-out infinite;
          }
          @keyframes auditHighlightImg {
            0%, 4% { opacity: 0; }
            10% { opacity: 1; }
            30% { opacity: 0.7; }
            88%, 100% { opacity: 0; }
          }

          /* Title highlight zone — beam at ~35% */
          .audit-xray-highlight-title {
            opacity: 0;
            animation: auditHighlightTitle 4s ease-in-out infinite;
          }
          @keyframes auditHighlightTitle {
            0%, 30% { opacity: 0; }
            36% { opacity: 1; }
            55% { opacity: 0.7; }
            88%, 100% { opacity: 0; }
          }

          /* Description highlight zone — beam at ~60% */
          .audit-xray-highlight-desc {
            opacity: 0;
            animation: auditHighlightDesc 4s ease-in-out infinite;
          }
          @keyframes auditHighlightDesc {
            0%, 55% { opacity: 0; }
            60% { opacity: 1; }
            73% { opacity: 0.7; }
            88%, 100% { opacity: 0; }
          }

          /* Attributes highlight zone — beam at ~80% */
          .audit-xray-highlight-attr {
            opacity: 0;
            animation: auditHighlightAttr 4s ease-in-out infinite;
          }
          @keyframes auditHighlightAttr {
            0%, 72% { opacity: 0; }
            80% { opacity: 1; }
            88% { opacity: 0.7; }
            93%, 100% { opacity: 0; }
          }

          /* ----------------------------------------------------------- */
          /* Red/amber field overlays — appear when beam scans the row    */
          /* ----------------------------------------------------------- */

          /* Image turns red (missing) */
          .audit-xray-red-img {
            opacity: 0;
            animation: auditRedImg 4s ease-in-out infinite;
          }
          @keyframes auditRedImg {
            0%, 4% { opacity: 0; }
            12% { opacity: 0.6; }
            32% { opacity: 0.5; }
            90%, 100% { opacity: 0; }
          }

          /* Title turns amber (generic quality) */
          .audit-xray-amber-title {
            opacity: 0;
            animation: auditAmberTitle 4s ease-in-out infinite;
          }
          @keyframes auditAmberTitle {
            0%, 30% { opacity: 0; }
            38% { opacity: 0.6; }
            58% { opacity: 0.5; }
            90%, 100% { opacity: 0; }
          }

          /* Description lines turn amber (thin/quality gap) */
          .audit-xray-amber-desc2 {
            opacity: 0;
            animation: auditAmberDesc 4s ease-in-out infinite;
          }
          .audit-xray-amber-desc3 {
            opacity: 0;
            animation: auditAmberDesc 4s ease-in-out infinite 0.2s;
          }
          @keyframes auditAmberDesc {
            0%, 55% { opacity: 0; }
            62% { opacity: 0.5; }
            75% { opacity: 0.4; }
            90%, 100% { opacity: 0; }
          }

          /* Attribute pills turn red (missing fields) */
          .audit-xray-red-attr1 {
            opacity: 0;
            animation: auditRedAttr 4s ease-in-out infinite;
          }
          .audit-xray-red-attr2 {
            opacity: 0;
            animation: auditRedAttr 4s ease-in-out infinite 0.15s;
          }
          .audit-xray-red-attr3 {
            opacity: 0;
            animation: auditRedAttr 4s ease-in-out infinite 0.3s;
          }
          @keyframes auditRedAttr {
            0%, 72% { opacity: 0; }
            82% { opacity: 0.6; }
            88% { opacity: 0.5; }
            93%, 100% { opacity: 0; }
          }

          /* ----------------------------------------------------------- */
          /* Warning markers pulse on when beam crosses their row         */
          /* ----------------------------------------------------------- */

          /* Image warning at ~8% */
          .audit-xray-warn-img {
            animation: auditWarnImg 4s ease-in-out infinite;
          }
          @keyframes auditWarnImg {
            0%, 4% { opacity: 0; }
            10% { opacity: 1; }
            32% { opacity: 0.6; }
            90%, 100% { opacity: 0; }
          }

          /* Title warning at ~35% */
          .audit-xray-warn-title {
            animation: auditWarnTitle 4s ease-in-out infinite;
          }
          @keyframes auditWarnTitle {
            0%, 30% { opacity: 0; }
            36% { opacity: 1; }
            58% { opacity: 0.6; }
            90%, 100% { opacity: 0; }
          }

          /* Description warning at ~60% */
          .audit-xray-warn-desc {
            animation: auditWarnDesc 4s ease-in-out infinite;
          }
          @keyframes auditWarnDesc {
            0%, 55% { opacity: 0; }
            60% { opacity: 1; }
            75% { opacity: 0.6; }
            90%, 100% { opacity: 0; }
          }

          /* Attributes warning at ~80% */
          .audit-xray-warn-attr {
            animation: auditWarnAttr 4s ease-in-out infinite;
          }
          @keyframes auditWarnAttr {
            0%, 72% { opacity: 0; }
            80% { opacity: 1; }
            88% { opacity: 0.6; }
            93%, 100% { opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  )
}
