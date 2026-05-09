---
title: Positioning & sizing
description: Place watermarks precisely with the 9-point grid, X/Y offsets in pixels or percentage, auto-scale by image dimensions, and JPEG quality controls.
---

# Positioning & sizing

Ultimate Watermark supports a familiar 9-point anchor grid plus pixel- or percentage-based offsets. Combined with auto-scale, you can build watermarks that look right on a 400 px thumbnail _and_ a 4000 px hero image.

## The 9-point grid

Pick one of nine anchors. The watermark's box is positioned relative to that anchor:

```
top-left      top      top-right
   ◯           ◯           ◯
            
   ◯           ◯           ◯
left       center        right

   ◯           ◯           ◯
bottom-left  bottom   bottom-right
```

Anchor values (from `AddWatermarkPage.php:897–910`):

| Anchor | Behaviour |
| --- | --- |
| `top-left` | Watermark's top-left corner aligns with image's top-left + offsets. |
| `top` | Watermark's top edge aligns horizontally centred. |
| `top-right` | Watermark's top-right corner aligns with image's top-right − x-offset. |
| `left` | Watermark's left edge aligns vertically centred. |
| `center` | Watermark is centred. |
| `right` | Watermark's right edge aligns vertically centred. |
| `bottom-left` | Watermark's bottom-left corner aligns with image's bottom-left + offsets. |
| `bottom` | Watermark's bottom edge aligns horizontally centred. |
| `bottom-right` | Watermark's bottom-right corner aligns with image's bottom-right − offsets. |

## Offsets

After picking an anchor, nudge the watermark with **X** and **Y** offsets:

| Field | Range | Note |
| --- | --- | --- |
| **Offset X** | −100 to +100 | Horizontal nudge from anchor. Negative shifts left. |
| **Offset Y** | −100 to +100 | Vertical nudge. Negative shifts up. |
| **Offset unit** | `pixels` or `percentage` | Switches between absolute (px) and image-relative (%). |

### Pixels vs percentage

- **Pixels**: useful for fine corner padding (e.g. always 20 px in from the edge regardless of image size).
- **Percentage**: scales with image size (e.g. 5 % from each edge — looks the same on small thumbs and big hero images).

## Common combos

| Goal | Anchor | Offset X | Offset Y | Unit |
| --- | --- | --- | --- | --- |
| Corner stamp 20 px in | bottom-right | -20 | -20 | pixels |
| Centred diagonal | center | 0 | 0 | pixels |
| Faint margin watermark | bottom-right | -5 | -5 | percentage |
| Top banner | top | 0 | 10 | pixels |

## Auto-scale by image dimensions

For **image watermarks**, the **Scaled %** size mode (`AddWatermarkPage.php:795–802`) makes the watermark width track the image width:

| Setting | What it means |
| --- | --- |
| `100` | Watermark width = image width (same as image). |
| `50` | Watermark width = half the image width. |
| `25` | Watermark width = a quarter of the image width. |
| `10` | Watermark width = a tenth of the image width. |

Use case: a logo that should be **roughly 1/8 of the image width** — so it's small on a thumbnail and scales up on a hero image. Set Scaled % = `12.5`.

For **text watermarks**, font scaling is handled automatically by the rendering library:

- **Imagick** scales the font size with the subsize ratio (`ImagickWatermarkProcessor.php:86–88`).
- **GD** uses your declared font size literally — set the size that looks right on the largest output.

## Quality controls (image watermark)

| Setting | Default | Range | Note |
| --- | --- | --- | --- |
| **Output quality** | 90 | 1–100 | JPEG quality. 90 is sane; 95+ is overkill for web. |
| **JPEG type** | baseline | baseline / progressive | Progressive renders top-to-bottom; baseline is faster. |

For PNG output, quality is lossless — these controls are ignored.

## What's NOT supported

The following are **not** in the current builder:

- **Random position** — there's no "place watermark at a random spot" toggle. (`Math.random` is only used for rule IDs, see `AddWatermarkPage.php:1204`.)
- **Padding / safe-area** beyond X/Y offsets — there's no separate margin field.
- **Tile / repeat** — no built-in repeating pattern. Use a single watermark instead.
- **Rotation** — no built-in rotate slider. Pre-rotate your watermark image in another tool.

> If random position or rotation is critical, add it via a custom hook against `ultimate_watermark_apply_custom_type` (see [Hooks & filters](/hooks-filters#processors)).

## Tips for sharp watermarks

- For **PNG logos**, render your source PNG at **2× the largest output size** so it scales down crisply.
- For **text watermarks**, prefer **system fonts** (Arial, Helvetica, Georgia, Times) — custom fonts via Imagick are tricky on shared hosts.
- For **dark-on-dark** issues, set color `#ffffff` with **opacity 80**, or vice versa.

## Per-subsize positioning

Each WordPress subsize (thumbnail, medium, large, full) is rendered independently. Ultimate Watermark applies the **same** position settings to each — but **percentage offsets** scale with the subsize, so:

- A 400 × 300 thumbnail: 5 % offset = 20 px / 15 px.
- A 4000 × 3000 hero: 5 % offset = 200 px / 150 px.

That's why percentage offsets are recommended for multi-size sites.

## Testing your position

The fastest way to dial in position:

1. Save the watermark template.
2. Upload one test image (different aspect ratios — square, landscape, portrait).
3. View at every subsize via the **Edit Image** screen (Media → click image → Image attributes shows each size's URL).
4. Iterate the offset values.

> Save → upload → tweak — usually 3 iterations is enough.

## Where to go next

- 🖼️ [Watermarks](/watermarks) — text / image fields.
- 🎯 [Conditional rules](/conditional-rules) — apply watermarks selectively.
- ⚡ [Performance](/performance) — sizing for performance trade-offs.
