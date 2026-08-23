export const ASSETS = {
  logo: "/logos/magnovite.png",
};

/* Quality ladder, best first. The scene starts at rung 0 on every device and
   the frame-time watchdog walks it down only where the frame rate cannot hold.
   Phones previously ran at a fixed pixelRatio of 1 with no bloom — a third of
   native resolution on a 3x screen, and no highlight bleed — which is why the
   sprites read as soft and the stars as flat grey. */
export interface QualityTier {
  /** Upper bound on devicePixelRatio for the render target. */
  dprCap: number;
  /** Bloom buffers are a chain of blurs, so they render at 1/n of the screen. */
  bloomDivisor: number;
  /** Bloom is the last thing to go — it is what makes the stars read as light. */
  bloom: boolean;
}

export const QUALITY_LADDER: QualityTier[] = [
  { dprCap: 2.0, bloomDivisor: 2, bloom: true },
  { dprCap: 1.5, bloomDivisor: 3, bloom: true },
  { dprCap: 1.25, bloomDivisor: 3, bloom: true },
  { dprCap: 1.0, bloomDivisor: 4, bloom: false },
];

export const QUALITY_WATCHDOG = {
  /** Frames are averaged over windows this long (ms) before judging them. */
  windowMs: 1200,
  /** Below this average the window counts as slow. */
  minFps: 40,
  /** Consecutive slow windows required to drop a rung. Never steps back up —
      hunting between tiers is more visible than sitting one rung low. */
  slowWindowsToDrop: 2,
};
