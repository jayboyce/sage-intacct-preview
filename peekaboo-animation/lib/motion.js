/*
 * Vanilla-JS port of sage-product-tours-new/lib/motion (tokens + presets),
 * for the standalone animation mock. Values kept 1:1 with the source so the
 * mock speaks the same motion language as the product-tour player.
 * Requires GSAP 3 on window.gsap.
 */
(function (global) {
  const gsap = global.gsap;

  // --- tokens.ts ---
  const DURATIONS = {
    instant: 0.2,
    short:   0.3,
    base:    0.5,
    medium:  0.6, // chart draws (bars)
    long:    0.9, // donut sweep / line draw
  };
  const EASINGS = {
    standard:        'power2.out',
    smooth:          'power1.inOut',
    gentleOvershoot: 'back.out(1.2)',
  };
  const STAGGERS = {
    tight: 0.05,
    base:  0.1,
    loose: 0.15,
  };

  // --- presets.ts: barGrowFromLeft ---
  // Grows each bar strictly left→right by animating its WIDTH (0→full) with x fixed.
  // (SVG <rect> can't be scaled from its left edge reliably — transform-origin on SVG
  //  defaults to the root at x=0, so scaleX slides the bar off-position. Width has no
  //  such ambiguity: the left edge stays put and the right edge sweeps out.)
  function barGrowFromLeft(bars, options = {}) {
    const {
      duration = DURATIONS.medium,
      ease     = EASINGS.standard,
      stagger  = STAGGERS.tight,
      delay    = 0,
    } = options;

    const tl = gsap.timeline({ delay });
    bars.forEach((bar, i) => {
      // Prefer a cached full width (bar may already be collapsed to width 0).
      if (bar.dataset.fullw == null) bar.dataset.fullw = bar.getBBox().width;
      const fullW = parseFloat(bar.dataset.fullw);
      bar.style.transform = 'none';
      bar.setAttribute('width', 0);
      // Tween a proxy and write the width attribute each frame (robust across
      // GSAP builds — avoids relying on the attr plugin for SVG geometry).
      const state = { w: 0 };
      tl.to(state, {
        w: fullW, duration, ease,
        onUpdate: () => bar.setAttribute('width', state.w),
      }, i * stagger);
    });
    return tl;
  }

  // --- presets.ts: ringDraw ---
  // Radial "draw-around" reveal for a donut/ring. Drives a masking circle's
  // stroke-dashoffset from its full length down to 0 so the ring is unveiled
  // segment-by-segment as the sweep travels around the circle.
  function ringDraw(maskCircle, options = {}) {
    const {
      duration = DURATIONS.long,
      ease     = EASINGS.standard,
      delay    = 0,
    } = options;

    const len = parseFloat(maskCircle.getAttribute('stroke-dasharray')) || 0;
    const state = { offset: len };
    maskCircle.setAttribute('stroke-dashoffset', len);
    return gsap.to(state, {
      offset: 0, duration, ease, delay,
      onUpdate: () => maskCircle.setAttribute('stroke-dashoffset', state.offset),
    });
  }

  // --- presets.ts: popIn ---
  function popIn(element, options = {}) {
    const {
      duration        = DURATIONS.short,
      ease            = EASINGS.gentleOvershoot,
      opacityEase     = EASINGS.standard,
      delay           = 0,
      startScale      = 0.85,
      transformOrigin = '50% 50%',
    } = options;

    gsap.set(element, { scale: startScale, opacity: 0, transformOrigin });
    return gsap.timeline({ delay })
      .to(element, { scale: 1, duration, ease }, 0)
      .to(element, { opacity: 1, duration, ease: opacityEase }, 0);
  }

  // --- presets.ts: fadeUp ---
  function fadeUp(element, options = {}) {
    const {
      duration = DURATIONS.base,
      ease     = EASINGS.standard,
      delay    = 0,
      y        = 16,
    } = options;

    gsap.set(element, { opacity: 0, y });
    return gsap.to(element, { opacity: 1, y: 0, duration, ease, delay });
  }

  global.SageMotion = { DURATIONS, EASINGS, STAGGERS, barGrowFromLeft, ringDraw, popIn, fadeUp };
})(window);
