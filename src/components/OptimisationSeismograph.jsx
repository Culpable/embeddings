// ---------------------------------------------------------------------------
// OptimisationSeismograph — Option B for Contextual Optimisation section.
// A line chart with a trend line that has dramatic spike eruptions at key
// points. Drawn with stroke-dashoffset. Dashed drop lines connect spikes
// to product cards below showing content updates. Server Component (no JS).
// ---------------------------------------------------------------------------

export function OptimisationSeismograph() {
  // Trend line path — gentle baseline with dramatic spikes
  const trendPath = [
    'M 80 200',
    // Gentle baseline
    'C 120 198, 160 202, 200 200',
    'C 220 198, 240 195, 260 200',
    // Spike 1 — dramatic eruption at x≈320
    'C 280 198, 290 195, 300 180',
    'L 310 100 L 320 60 L 330 110 L 340 80 L 350 160',
    'C 360 195, 370 200, 390 200',
    // Calm middle
    'C 420 202, 460 198, 500 200',
    'C 520 198, 540 202, 560 200',
    // Spike 2 — second eruption at x≈640
    'C 590 198, 610 190, 620 170',
    'L 630 90 L 640 50 L 650 100 L 660 70 L 670 150',
    'C 680 195, 700 200, 720 200',
    // Trailing baseline
    'C 760 202, 800 198, 840 200',
    'L 880 200',
  ].join(' ')

  // Approximate path length for stroke-dashoffset
  const pathLength = 1400

  return (
    <div className="relative mt-8 w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 960 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
      >
        {/* ----------------------------------------------------------------- */}
        {/* Chart background — faint grid lines                               */}
        {/* ----------------------------------------------------------------- */}
        <line x1="80" y1="60" x2="880" y2="60" stroke="#171717" strokeWidth="0.5" opacity="0.03" />
        <line x1="80" y1="100" x2="880" y2="100" stroke="#171717" strokeWidth="0.5" opacity="0.03" />
        <line x1="80" y1="140" x2="880" y2="140" stroke="#171717" strokeWidth="0.5" opacity="0.03" />
        <line x1="80" y1="180" x2="880" y2="180" stroke="#171717" strokeWidth="0.5" opacity="0.04" />
        <line x1="80" y1="200" x2="880" y2="200" stroke="#171717" strokeWidth="0.5" opacity="0.06" />

        {/* X-axis baseline */}
        <line x1="80" y1="220" x2="880" y2="220" stroke="#171717" strokeWidth="0.5" opacity="0.08" />

        {/* Time markers along x-axis */}
        <text x="80" y="235" fill="#171717" style={{ fontSize: '8px', opacity: 0.25 }}>Jan</text>
        <text x="240" y="235" fill="#171717" style={{ fontSize: '8px', opacity: 0.25 }}>Mar</text>
        <text x="400" y="235" fill="#171717" style={{ fontSize: '8px', opacity: 0.25 }}>May</text>
        <text x="560" y="235" fill="#171717" style={{ fontSize: '8px', opacity: 0.25 }}>Jul</text>
        <text x="720" y="235" fill="#171717" style={{ fontSize: '8px', opacity: 0.25 }}>Sep</text>
        <text x="840" y="235" fill="#171717" style={{ fontSize: '8px', opacity: 0.25 }}>Nov</text>

        {/* ----------------------------------------------------------------- */}
        {/* Trend line — drawn with stroke-dashoffset over 10s               */}
        {/* ----------------------------------------------------------------- */}
        <path
          d={trendPath}
          stroke="#171717"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength}
          className="opt-seismo-line"
        />

        {/* ----------------------------------------------------------------- */}
        {/* Spike 1 — label and drop line to product card                    */}
        {/* ----------------------------------------------------------------- */}

        {/* Spike 1 label */}
        <text
          x="330"
          y="48"
          textAnchor="middle"
          fill="#171717"
          style={{ fontSize: '9px', fontWeight: 500, opacity: 0 }}
          className="opt-seismo-label-1"
        >
          Taylor Swift blue dress
        </text>

        {/* Drop line from spike 1 to product card */}
        <line
          x1="330"
          y1="60"
          x2="330"
          y2="260"
          stroke="#171717"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
          className="opt-seismo-drop-1"
        />

        {/* Product card below spike 1 */}
        <g className="opt-seismo-card-1">
          <rect x="280" y="258" width="100" height="30" rx="6" fill="white" stroke="#e5e5e5" strokeWidth="0.5" />
          <text x="330" y="277" textAnchor="middle" fill="#171717" style={{ fontSize: '7px', fontWeight: 500, opacity: 0.5 }}>
            Taylor Swift-inspired
          </text>
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* Spike 2 — label and drop line to product card                    */}
        {/* ----------------------------------------------------------------- */}

        {/* Spike 2 label */}
        <text
          x="645"
          y="38"
          textAnchor="middle"
          fill="#171717"
          style={{ fontSize: '9px', fontWeight: 500, opacity: 0 }}
          className="opt-seismo-label-2"
        >
          heavy metals in food
        </text>

        {/* Drop line from spike 2 to product card */}
        <line
          x1="645"
          y1="50"
          x2="645"
          y2="260"
          stroke="#171717"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
          className="opt-seismo-drop-2"
        />

        {/* Product card below spike 2 */}
        <g className="opt-seismo-card-2">
          <rect x="590" y="258" width="110" height="30" rx="6" fill="white" stroke="#e5e5e5" strokeWidth="0.5" />
          <text x="645" y="277" textAnchor="middle" fill="#171717" style={{ fontSize: '7px', fontWeight: 500, opacity: 0.5 }}>
            independently tested
          </text>
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* CSS keyframes                                                     */}
        {/* ----------------------------------------------------------------- */}
        <style>{`
          /* Draw the trend line from left to right over 10s */
          .opt-seismo-line {
            animation: optSeismoDraw 10s linear infinite;
          }

          @keyframes optSeismoDraw {
            0% { stroke-dashoffset: ${pathLength}; }
            85% { stroke-dashoffset: 0; }
            92%, 100% { stroke-dashoffset: 0; }
          }

          /* Spike 1 label — appears ~30% through (when line reaches spike 1) */
          .opt-seismo-label-1 {
            animation: optSeismoReveal1 10s ease-out infinite;
          }

          @keyframes optSeismoReveal1 {
            0%, 28% { opacity: 0; }
            33% { opacity: 0.5; }
            80% { opacity: 0.5; }
            90%, 100% { opacity: 0; }
          }

          /* Drop line 1 — appears after spike label */
          .opt-seismo-drop-1 {
            animation: optSeismoDrop1 10s ease-out infinite;
          }

          @keyframes optSeismoDrop1 {
            0%, 34% { opacity: 0; }
            40% { opacity: 0.12; }
            80% { opacity: 0.12; }
            90%, 100% { opacity: 0; }
          }

          /* Product card 1 — appears after drop line */
          .opt-seismo-card-1 {
            animation: optSeismoCard1 10s ease-out infinite;
          }

          @keyframes optSeismoCard1 {
            0%, 38% { opacity: 0; }
            44% { opacity: 1; }
            80% { opacity: 1; }
            90%, 100% { opacity: 0; }
          }

          /* Spike 2 label — appears ~60% through */
          .opt-seismo-label-2 {
            animation: optSeismoReveal2 10s ease-out infinite;
          }

          @keyframes optSeismoReveal2 {
            0%, 58% { opacity: 0; }
            63% { opacity: 0.5; }
            80% { opacity: 0.5; }
            90%, 100% { opacity: 0; }
          }

          /* Drop line 2 */
          .opt-seismo-drop-2 {
            animation: optSeismoDrop2 10s ease-out infinite;
          }

          @keyframes optSeismoDrop2 {
            0%, 64% { opacity: 0; }
            70% { opacity: 0.12; }
            80% { opacity: 0.12; }
            90%, 100% { opacity: 0; }
          }

          /* Product card 2 */
          .opt-seismo-card-2 {
            animation: optSeismoCard2 10s ease-out infinite;
          }

          @keyframes optSeismoCard2 {
            0%, 68% { opacity: 0; }
            74% { opacity: 1; }
            80% { opacity: 1; }
            90%, 100% { opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  )
}
