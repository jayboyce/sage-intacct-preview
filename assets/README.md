# Assets folder

All media for the tour lives here. Organize by chapter so assets are easy to find and swap.

## Folder structure

```
assets/
  welcome/      ← Welcome screen assets
  ch1/          ← Chapter 1 media (add more chapter folders as needed: ch3/, ch4/, etc.)
  ch2/          ← Chapter 2 media
  logos/        ← Customer logos used on testimonial/results slides
  closing/      ← Final screen product image
```

## File types supported

| Type | Extension | When to use |
|---|---|---|
| Lottie animation | `.lottie` | Animated product demos (preferred over video for lightweight motion) |
| Static image | `.svg` or `.png` | Non-animated screenshots or illustrations |
| Video placeholder | `.svg` | Shown while Brightcove video loads, or when `brightcoveId` is null |

## Naming convention

Use descriptive kebab-case names. Examples:
- `ch1/step-1-dashboard.lottie`
- `ch2/step-2-close-workspace.svg`
- `logos/acme-corp.png`
- `closing/product-screenshot.svg`

## Referencing assets in the tour data

All asset paths are set in `src/data/tourSteps.ts` using the `assetUrl()` helper:

```ts
media: { type: 'lottie', src: assetUrl('/assets/ch1/my-animation.lottie') }
```

The path starts with `/assets/` and matches this folder structure exactly.
