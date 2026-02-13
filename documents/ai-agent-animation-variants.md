# AI Agent Animation Variants

Technical reference for the three animation variants prototyped for the AI Agent centre section of the `HeroDataFlow` SVG (homepage hero).

**File:** `src/components/HeroDataFlow.jsx`
**Active variant:** Variant A (Neural Mesh + Orbital Dots)
**Inactive variants:** B and C are preserved as JSX comments in the same file.

---

## Shared constraints

All variants share these requirements:

- Monochrome `#171717` palette only
- Pure CSS/SVG animations (no JS — Server Component compatible)
- Centred at `(480, 160)` within `viewBox="0 0 960 320"`
- Must not alter the catalogue (left), consumer (right), connection paths, or flowing particles
- "AI agent" label remains at `(480, 42)`

---

## Variant A: Neural Mesh + Orbital Dots (ACTIVE)

**Concept:** A constellation of 8 interconnected nodes forming a mesh around the centre, with 3 data dots that travel along the mesh connection lines using `animateMotion`.

**Visual elements:**

- **Central hub:** Two concentric circles (r=5 solid, r=8 glow) with `hero-agent-pulse` animation
- **Ambient glow:** r=50 white circle at 0.05 opacity with `glassBlur` filter
- **8 mesh nodes** distributed around centre at varying distances (30-50px radius):
  - Each node pulses independently via `<animate>` on opacity
  - Staggered timing (0s to 2.8s begin offsets) with varying durations (3s to 4s)
  - Opacity range: 0.12-0.35
- **Connection lines:**
  - Hub-to-node: strokeWidth 0.5, opacity 0.10 (8 lines)
  - Perimeter (adjacent nodes): strokeWidth 0.4, opacity 0.07 (8 lines)
  - Cross-mesh diagonals: strokeWidth 0.3, opacity 0.05 (5 lines)
- **3 orbital data dots** travelling along mesh paths via `animateMotion`:
  - Dot 1: hub → node 3 → node 4 → node 5 → hub (4s, r=2, opacity 0.45)
  - Dot 2: hub → node 7 → node 8 → node 1 → hub (5s, r=1.5, opacity 0.35)
  - Dot 3: hub → node 2 → node 6 → hub (3.5s, r=1.8, opacity 0.40)

**Node positions (cx, cy):**

| Node | Position   | Radius |
|------|-----------|--------|
| 1    | 452, 130  | 2.5    |
| 2    | 480, 118  | 2.0    |
| 3    | 510, 128  | 2.5    |
| 4    | 520, 158  | 2.0    |
| 5    | 508, 190  | 2.5    |
| 6    | 478, 200  | 2.0    |
| 7    | 450, 188  | 2.5    |
| 8    | 442, 158  | 2.0    |

**CSS required:**

```css
.hero-agent-pulse {
  animation: agentPulse 3s ease-in-out infinite;
}
@keyframes agentPulse {
  0%, 100% { opacity: 0.08; }
  50% { opacity: 0.14; }
}
```

---

## Variant B: Scanning Beam + Neural Mesh (COMMENTED OUT)

**Concept:** A radar-sweep line rotates around the centre over a mesh of interconnected nodes. Each node brightens briefly as the beam passes its angular position.

**Visual elements:**

- Same mesh node layout and connection lines as Variant A (slightly lower opacities: 0.08/0.06/0.04)
- **Sweep trail:** r=48 circle outline (strokeWidth 0.3, opacity 0.06)
- **Rotating beam:** `<line>` from centre to y=112 (48px length), rotating 360 degrees in 4s via `animateTransform`. Stroke uses `beamFade` gradient (solid at centre, transparent at tip)
- **Beam-synchronised node flash:** Each node uses a CSS class (`hero-beam-node-1` through `hero-beam-node-8`) with an `animation-delay` matching its angular position in the 4s rotation cycle
- Central hub: r=4, opacity 0.30

**Additional defs required:**

```xml
<linearGradient id="beamFade" x1="0" y1="1" x2="0" y2="0">
  <stop offset="0%" stopColor="#171717" stopOpacity="0.30" />
  <stop offset="100%" stopColor="#171717" stopOpacity="0" />
</linearGradient>
```

**Additional CSS required:**

```css
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
```

**Beam rotation timing per node angle:**

| Node | Angle | Delay |
|------|-------|-------|
| 1    | 315°  | 3.5s  |
| 2    | 0°    | 0.0s  |
| 3    | 45°   | 0.5s  |
| 4    | 90°   | 1.0s  |
| 5    | 135°  | 1.5s  |
| 6    | 180°  | 2.0s  |
| 7    | 225°  | 2.5s  |
| 8    | 270°  | 3.0s  |

---

## Variant C: Multi-layer Rings + Orbital Dots (COMMENTED OUT)

**Concept:** 3 concentric dashed/dotted rings rotate at different speeds and directions, creating a gyroscope-like processing visual. Small dots orbit on circular paths at different radii.

**Visual elements:**

- **Ambient glow:** r=52 white circle at 0.04 opacity with `glassBlur` filter
- **Ring 1 (innermost):** r=20, clockwise, 8s period, strokeWidth 0.8, dasharray `4 3`, opacity 0.15
- **Ring 2 (middle):** r=35, counter-clockwise, 12s period, strokeWidth 0.6, dasharray `6 4 2 4`, opacity 0.10
- **Ring 3 (outermost):** r=50, clockwise, 16s period, strokeWidth 0.4, dasharray `3 6 1 6`, opacity 0.07
- **Central core:** Two concentric circles (r=3.5 solid at 0.30, r=6 glow at 0.06) with `hero-agent-pulse`
- **3 orbital dots** on circular `animateMotion` paths:
  - Dot 1: r=20 orbit, 5s duration, clockwise (r=2, opacity 0.40)
  - Dot 2: r=35 orbit, 8s duration, counter-clockwise (r=1.8, opacity 0.30)
  - Dot 3: r=50 orbit, 11s duration, clockwise (r=1.5, opacity 0.22)

**Orbital dot path syntax (circular arc):**

```
M [cx+radius],160 A [radius],[radius] 0 1,[direction] [cx+radius-0.01],160
```

Where direction is `1` for clockwise and `0` for counter-clockwise.

---

## Switching variants

To switch the active variant:

1. Comment out the current active `<g>` block (Variant A, lines ~148-260)
2. Uncomment the desired variant's `<g>` block
3. Add any required `<defs>` entries (Variant B needs the `beamFade` gradient)
4. Add any required CSS to the `<style>` block
5. Verify in the browser at `http://localhost:3002`
