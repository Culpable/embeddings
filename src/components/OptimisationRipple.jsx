// ---------------------------------------------------------------------------
// OptimisationRipple — Contextual Optimisation service section animation.
// Trend drops appear at a central point, triggering expanding concentric
// ripple rings. Product card nodes are contextually relevant to each trend
// so when a ripple reaches them, the "+optimised" badge makes sense.
//
// Trend → Relevant products:
//   "Taylor Swift blue dress" → Blue Midi Dress, Sapphire Earrings
//   "SPF sunscreen recall"   → SPF 50+ Sunscreen, UV Beach Hat
//   "heavy metals"           → Organic Chocolate, Kids Lunchbox
//
// Pure CSS keyframes, Server Component (no JS).
// ---------------------------------------------------------------------------

export function OptimisationRipple() {
  // Centre drop point
  const cx = 480
  const cy = 160

  // Product card nodes positioned around the centre, paired to trends
  const nodes = [
    { x: 280, y: 70,  label: 'Blue Midi Dress',   trend: 'dress' },
    { x: 680, y: 70,  label: 'Sapphire Earrings',  trend: 'dress' },
    { x: 230, y: 200, label: 'SPF 50+ Sunscreen',  trend: 'spf' },
    { x: 730, y: 200, label: 'UV Beach Hat',        trend: 'spf' },
    { x: 340, y: 270, label: 'Organic Chocolate',   trend: 'metals' },
    { x: 620, y: 270, label: 'Kids Lunchbox',       trend: 'metals' },
  ]

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
        {/* Product card nodes arranged around centre                         */}
        {/* ----------------------------------------------------------------- */}
        {nodes.map(({ x, y, label }, i) => (
          <g key={label} className={`opt-ripple-node opt-ripple-node-${i}`}>
            <rect x={x - 48} y={y - 12} width="96" height="24" rx="6" fill="white" stroke="#e5e5e5" strokeWidth="0.5" />
            <text x={x} y={y + 4} textAnchor="middle" fill="#171717" style={{ fontSize: '8px', fontWeight: 500, opacity: 0.5 }}>
              {label}
            </text>
            {/* "+optimised" badge — fades in when the matching ripple reaches this node */}
            <text
              x={x}
              y={y + 22}
              textAnchor="middle"
              fill="#16a34a"
              style={{ fontSize: '7px', fontWeight: 600, opacity: 0 }}
              className={`opt-ripple-badge opt-ripple-badge-${i}`}
            >
              +optimised
            </text>
          </g>
        ))}

        {/* ----------------------------------------------------------------- */}
        {/* Ripple set 1 — "Taylor Swift blue dress" trend drop               */}
        {/* Triggers: Blue Midi Dress (node 0), Sapphire Earrings (node 1)   */}
        {/* ----------------------------------------------------------------- */}
        <g className="opt-ripple-set-1">
          {/* Drop dot */}
          <circle cx={cx} cy={cy} r="4" fill="#171717" opacity="0.4" className="opt-ripple-drop-1" />
          {/* Expanding ripple rings */}
          <circle cx={cx} cy={cy} r="0" fill="none" stroke="#171717" strokeWidth="1" className="opt-ripple-ring-1a" />
          <circle cx={cx} cy={cy} r="0" fill="none" stroke="#171717" strokeWidth="0.75" className="opt-ripple-ring-1b" />
          <circle cx={cx} cy={cy} r="0" fill="none" stroke="#171717" strokeWidth="0.5" className="opt-ripple-ring-1c" />
        </g>

        {/* Trend label for ripple 1 */}
        <text
          x={cx}
          y={cy - 30}
          textAnchor="middle"
          fill="#171717"
          style={{ fontSize: '9px', fontWeight: 500, opacity: 0 }}
          className="opt-ripple-trend-1"
        >
          Taylor Swift blue dress
        </text>

        {/* ----------------------------------------------------------------- */}
        {/* Ripple set 2 — "SPF sunscreen recall" trend drop                  */}
        {/* Triggers: SPF 50+ Sunscreen (node 2), UV Beach Hat (node 3)      */}
        {/* ----------------------------------------------------------------- */}
        <g className="opt-ripple-set-2">
          <circle cx={cx - 15} cy={cy + 10} r="4" fill="#171717" opacity="0.4" className="opt-ripple-drop-2" />
          <circle cx={cx - 15} cy={cy + 10} r="0" fill="none" stroke="#171717" strokeWidth="1" className="opt-ripple-ring-2a" />
          <circle cx={cx - 15} cy={cy + 10} r="0" fill="none" stroke="#171717" strokeWidth="0.75" className="opt-ripple-ring-2b" />
          <circle cx={cx - 15} cy={cy + 10} r="0" fill="none" stroke="#171717" strokeWidth="0.5" className="opt-ripple-ring-2c" />
        </g>

        {/* Trend label for ripple 2 */}
        <text
          x={cx - 15}
          y={cy - 20}
          textAnchor="middle"
          fill="#171717"
          style={{ fontSize: '9px', fontWeight: 500, opacity: 0 }}
          className="opt-ripple-trend-2"
        >
          SPF sunscreen recall
        </text>

        {/* ----------------------------------------------------------------- */}
        {/* Ripple set 3 — "heavy metals" trend drop                          */}
        {/* Triggers: Organic Chocolate (node 4), Kids Lunchbox (node 5)     */}
        {/* ----------------------------------------------------------------- */}
        <g className="opt-ripple-set-3">
          <circle cx={cx + 20} cy={cy - 5} r="4" fill="#171717" opacity="0.4" className="opt-ripple-drop-3" />
          <circle cx={cx + 20} cy={cy - 5} r="0" fill="none" stroke="#171717" strokeWidth="1" className="opt-ripple-ring-3a" />
          <circle cx={cx + 20} cy={cy - 5} r="0" fill="none" stroke="#171717" strokeWidth="0.75" className="opt-ripple-ring-3b" />
          <circle cx={cx + 20} cy={cy - 5} r="0" fill="none" stroke="#171717" strokeWidth="0.5" className="opt-ripple-ring-3c" />
        </g>

        {/* Trend label for ripple 3 */}
        <text
          x={cx + 20}
          y={cy - 25}
          textAnchor="middle"
          fill="#171717"
          style={{ fontSize: '9px', fontWeight: 500, opacity: 0 }}
          className="opt-ripple-trend-3"
        >
          heavy metals in chocolate
        </text>

        {/* ----------------------------------------------------------------- */}
        {/* CSS keyframes                                                     */}
        {/* ----------------------------------------------------------------- */}
        <style>{`
          /* ----------------------------------------------------------- */
          /* Ripple ring expansion — scale from 0 to large, fade out     */
          /* ----------------------------------------------------------- */

          /* Ripple set 1 rings — starts at 0s */
          .opt-ripple-ring-1a { animation: optRippleExpand 12s ease-out infinite 0s; }
          .opt-ripple-ring-1b { animation: optRippleExpand 12s ease-out infinite 0.3s; }
          .opt-ripple-ring-1c { animation: optRippleExpand 12s ease-out infinite 0.6s; }

          /* Ripple set 2 rings — starts at 4s */
          .opt-ripple-ring-2a { animation: optRippleExpand 12s ease-out infinite 4s; }
          .opt-ripple-ring-2b { animation: optRippleExpand 12s ease-out infinite 4.3s; }
          .opt-ripple-ring-2c { animation: optRippleExpand 12s ease-out infinite 4.6s; }

          /* Ripple set 3 rings — starts at 8s */
          .opt-ripple-ring-3a { animation: optRippleExpand 12s ease-out infinite 8s; }
          .opt-ripple-ring-3b { animation: optRippleExpand 12s ease-out infinite 8.3s; }
          .opt-ripple-ring-3c { animation: optRippleExpand 12s ease-out infinite 8.6s; }

          @keyframes optRippleExpand {
            0% { r: 0; opacity: 0.3; }
            40% { r: 280; opacity: 0; }
            100% { r: 280; opacity: 0; }
          }

          /* ----------------------------------------------------------- */
          /* Drop dot appearance                                          */
          /* ----------------------------------------------------------- */
          .opt-ripple-drop-1 { animation: optDropAppear 12s ease-out infinite 0s; }
          .opt-ripple-drop-2 { animation: optDropAppear 12s ease-out infinite 4s; }
          .opt-ripple-drop-3 { animation: optDropAppear 12s ease-out infinite 8s; }

          @keyframes optDropAppear {
            0% { opacity: 0; r: 0; }
            3% { opacity: 0.5; r: 5; }
            8% { opacity: 0.3; r: 3; }
            30% { opacity: 0; }
            100% { opacity: 0; }
          }

          /* ----------------------------------------------------------- */
          /* Trend labels — fade in/out with each ripple                  */
          /* ----------------------------------------------------------- */
          .opt-ripple-trend-1 { animation: optTrendLabel 12s ease-in-out infinite 0s; }
          .opt-ripple-trend-2 { animation: optTrendLabel 12s ease-in-out infinite 4s; }
          .opt-ripple-trend-3 { animation: optTrendLabel 12s ease-in-out infinite 8s; }

          @keyframes optTrendLabel {
            0%, 2% { opacity: 0; }
            5% { opacity: 0.45; }
            25% { opacity: 0.45; }
            30%, 100% { opacity: 0; }
          }

          /* ----------------------------------------------------------- */
          /* Node flash + badge — timed to matching ripple arrival        */
          /* Each ripple set activates its two matching product nodes     */
          /* ----------------------------------------------------------- */

          /* Ripple 1 ("Taylor Swift blue dress") → nodes 0 & 1 */
          /* Ripple reaches nodes ~1.5s after drop (distance ÷ speed) */
          .opt-ripple-node-0 { animation: optNodeFlash 12s ease-out infinite 1.2s; }
          .opt-ripple-node-1 { animation: optNodeFlash 12s ease-out infinite 1.5s; }
          .opt-ripple-badge-0 { animation: optBadgeFade 12s ease-out infinite 1.6s; }
          .opt-ripple-badge-1 { animation: optBadgeFade 12s ease-out infinite 1.9s; }

          /* Ripple 2 ("SPF sunscreen recall") → nodes 2 & 3 */
          .opt-ripple-node-2 { animation: optNodeFlash 12s ease-out infinite 5.2s; }
          .opt-ripple-node-3 { animation: optNodeFlash 12s ease-out infinite 5.5s; }
          .opt-ripple-badge-2 { animation: optBadgeFade 12s ease-out infinite 5.6s; }
          .opt-ripple-badge-3 { animation: optBadgeFade 12s ease-out infinite 5.9s; }

          /* Ripple 3 ("heavy metals") → nodes 4 & 5 */
          .opt-ripple-node-4 { animation: optNodeFlash 12s ease-out infinite 9.2s; }
          .opt-ripple-node-5 { animation: optNodeFlash 12s ease-out infinite 9.5s; }
          .opt-ripple-badge-4 { animation: optBadgeFade 12s ease-out infinite 9.6s; }
          .opt-ripple-badge-5 { animation: optBadgeFade 12s ease-out infinite 9.9s; }

          @keyframes optNodeFlash {
            0%, 2% { filter: brightness(1); }
            5% { filter: brightness(1.4); }
            12% { filter: brightness(1); }
            100% { filter: brightness(1); }
          }

          @keyframes optBadgeFade {
            0%, 2% { opacity: 0; }
            6% { opacity: 0.6; }
            20% { opacity: 0.6; }
            25%, 100% { opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  )
}
