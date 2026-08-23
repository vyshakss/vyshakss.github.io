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

/* Sampling has to survive a phone scroll. A fling parks requestAnimationFrame,
   and the URL bar sliding away reallocates every render target — both look like
   a window full of missing frames, and neither means the GPU cannot hold the
   frame rate. The verdict is taken on the MEDIAN frame interval rather than the
   average: a parked loop is one enormous outlier the median ignores, while a
   device that is genuinely too slow has a slow middle frame too. A rung dropped
   during a rough patch is handed back once the frame rate proves itself again. */
export const QUALITY_WATCHDOG = {
  /** Frames are averaged over windows this long (ms) before judging them. */
  windowMs: 1200,
  /** Below this average the window counts as slow. */
  minFps: 40,
  /** Consecutive slow windows required to drop a rung. */
  slowWindowsToDrop: 3,
  /** A window is not judged until it holds this many intervals, so the median
      means something. It stays open until it does rather than being discarded —
      a device slow enough to miss the quota is exactly the one to diagnose. */
  minSamples: 6,
  /** Frame intervals kept per window for the median. A 1.2s window holds ~72
      frames at 60Hz and ~144 at 120Hz, so this never truncates in practice. */
  maxSamples: 256,
  /** Above this the window counts as comfortable. Kept clear of minFps so a
      device hovering on the edge does not climb straight back, but not so high
      that a 60Hz phone reporting its usual high-fifties never qualifies. */
  recoverFps: 48,
  /** Consecutive comfortable windows required to climb back up a rung. */
  goodWindowsToRecover: 4,
  /** How many times a rung may be demoted away from before it is written off
      for the session. A rung lost to a transient — a rough intro, a scroll —
      is worth trying again; one that has failed this often is not, and without
      the cap a device sitting exactly on the threshold would flap forever. */
  maxDemotionsPerRung: 2,
  /** Resizing and re-rendering at a new resolution costs a frame or two, so
      sampling ignores this long afterwards. */
  settleMs: 600,
  /** Windows touching a scroll within this long are discarded — the rung is
      decided on how the scene renders at rest, not on scroll-time compositing. */
  scrollGraceMs: 500,
};

/* A mobile URL bar collapsing fires resize with a new height and nothing else.
   Reallocating the renderer and the whole post chain for that is a visible
   hitch mid-scroll, and the canvas is CSS-stretched to the viewport anyway, so
   height-only changes below this fraction are left alone. */
export const RESIZE_HEIGHT_TOLERANCE = 0.2;
