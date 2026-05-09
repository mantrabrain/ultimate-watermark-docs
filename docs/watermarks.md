---
title: Watermarks (text + image)
description: Build text and image watermarks in Ultimate Watermark — every field, layered watermarks, supported formats, and the GD vs Imagick rendering pipeline.
---

# Watermarks

A watermark in Ultimate Watermark is a **template** — a set of fields that describes _what_ to stamp, _where_, _on which images_. You can have one (free) or many (Pro). Each upload runs through every active template that matches its rules.

## What a watermark _is_, technically

- **Custom post type**: `ultimate_watermark`.
- **Storage**: post + post meta (no separate DB table).
- **Free limit**: **one** active template (`WatermarkAjaxHandler.php:608–620`).
- **Pro**: unlimited.

## Watermark types

Two kinds you can build:

### Text watermark

Best for: copyright lines, studio names, URLs.

| Field | Default | Range / values |
| --- | --- | --- |
| **Watermark text** | _empty_ | Multi-line. |
| **Font family** | Arial | Arial / Helvetica / Georgia / Times / Courier / Verdana / Trebuchet / Comic Sans. |
| **Font size** | 24 px | 8 – 72 px. |
| **Font weight** | normal | normal / bold. |
| **Font style** | normal | normal / italic. |
| **Decoration** | none | none / underline / line-through. |
| **Color** | `#ffffff` | Hex picker. |
| **Opacity** | 70 % | 0 – 100. |

Each new line in the **Watermark text** box becomes a new line on the rendered watermark.

> <span class="doc-pro-pill">Pro</span> Text supports **dynamic placeholders** like `&#123;&#123;date&#125;&#125;`, `&#123;&#123;user&#125;&#125;`, `&#123;&#123;ip&#125;&#125;`, `&#123;&#123;copyright&#125;&#125;`, `&#123;&#123;post_title&#125;&#125;` — see [Pro features → Dynamic placeholders](/third-party-integrations#dynamic-placeholders).

### Image watermark

Best for: a logo, transparent badge, signature stamp.

| Field | Default | Range / values |
| --- | --- | --- |
| **Watermark image** | — | Pick from media library. PNG-with-transparency works best. SVG works only with Imagick. |
| **Size mode** | Original | Original / Custom px / Scaled %. |
| **Custom width** (Custom px) | 200 | width in pixels (height auto). |
| **Scale percentage** (Scaled %) | 25 % | `100` = watermark width = full image width. |
| **Output quality** | 90 | JPEG quality, 1–100. |
| **Baseline / progressive** | baseline | JPEG baseline (faster) or progressive (better perceived load). |
| **Opacity** | 70 % | 0 – 100. |

## Multiple watermarks per image

Have more than one active watermark? Each gets applied **in sequence**:

1. Original image is loaded.
2. First watermark is painted.
3. Second watermark is painted on top of the result.
4. …and so on for every matching template.

This lets you stack — say, a copyright logo bottom-left and a "DRAFT" diagonal text in the middle.

> Order is by **post ID ascending**. To reorder, recreate them in your preferred order.

## Image formats supported

The free plugin (and Pro) support these via **GD** and **Imagick**:

| Format | GD | Imagick |
| --- | :-: | :-: |
| JPEG | ✅ | ✅ |
| PNG | ✅ | ✅ |
| GIF | ✅ | ✅ |
| WebP | ✅ | ✅ |
| AVIF | ⚠️ companion | ⚠️ companion |
| TIFF | — | ✅ |
| BMP | — | ✅ |
| SVG (as watermark) | — | ✅ |

> **AVIF**: Ultimate Watermark handles AVIF files as **companions** on disk (when WordPress generates an AVIF subsize alongside JPEG). It doesn't watermark the AVIF directly — the JPEG sibling gets watermarked, and AVIF stays in sync.
>
> **PDF / video**: Ultimate Watermark **doesn't** watermark PDFs or videos.

## GD vs Imagick

`LibraryDetector.php:47–60` picks **Imagick if loaded**, else **GD**. You can't override.

| Library | Pros | Cons |
| --- | --- | --- |
| **Imagick** | Higher quality, more formats (TIFF/BMP/SVG), smarter font scaling. | Heavier on memory. Some hosts don't ship it. |
| **GD** | Universal — every host has it. Fast for typical JPEG/PNG. | No SVG support; JPEG/PNG/GIF/WebP only. |

For very-large images: GD raises memory limit to **256 MB** during processing (`GDWatermarkProcessor.php:21`) and supports up to **15 000 px** per side and **50 MB** files (`:26–32`).

## Where the watermark gets painted

Two distinct paths:

### 1. Burned into the original (default)

When you upload an image, Ultimate Watermark intercepts via `wp_handle_upload` (`MediaLibraryIntegration.php:34–35`) and via `wp_generate_attachment_metadata` (`RestApiIntegration.php:60`). The watermark is **painted into the file on disk** — every subsize that matches your rules.

If you later edit the watermark template:

- New uploads use the new template.
- **Old uploads stay watermarked with the old version** (they're already burned in).
- Run **Bulk → Apply** to re-watermark old uploads.

### 2. On-the-fly at request time <span class="pro-pill">PRO</span>

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">OTF (on-the-fly) display</span>
  </div>
  <p class="pro-callout__desc">Pro renders the watermark <strong>at request time</strong> — original files stay untouched on disk; visitors see a watermarked version that's cached after first render.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/ultimate-watermark#pricing">Unlock OTF →</a>
</div>

Toggle the **Display on frontend** option in the watermark's **Display** tab. See [Pro features → On-the-fly display](/features#on-the-fly-display).

## Per-subsize control

WordPress generates multiple sizes per upload (thumbnail, medium, medium_large, large, scaled, full). You can choose which sizes Ultimate Watermark stamps.

In your watermark's **Rules → Image size** field, select:

- **(empty)** — apply to **all** sizes.
- **`full`** — only the original.
- **`large`** — only the large size.
- Specific sizes: `thumbnail`, `medium`, `large`, etc.

> WordPress creates an extra `scaled` subsize on uploads ≥ 2560 px. Ultimate Watermark treats `full` as also matching `scaled` for backward compatibility (`WatermarkHelper.php:672–674`).

## Building a watermark — the form layout

Open <span class="screen-path">Watermark → Add Watermark</span>. The form uses tabs:

| Tab | Holds |
| --- | --- |
| **Basic** | Name, description, Active toggle, Type (text / image), Automatic / Manual / Frontend toggles. |
| **Appearance** | Type-specific fields (text or image), position, size. |
| **Rules** | Post type, image size, plus Pro-only conditions. |
| **Display** <span class="pro-pill">PRO</span> | OTF settings (apply to content, thumbnails, WooCommerce, role bypass, cache toggle). |

Toggles on **Basic**:

- **Active** — turn this template off without deleting.
- **Automatic watermarking** — apply on upload.
- **Manual watermarking** — apply via Media Library bulk action only.
- **Frontend watermarking** <span class="pro-pill">PRO</span> — render at request time.

## Editing a watermark

Edit the template — every change applies to **future** uploads. To re-watermark old uploads:

<ol class="step-list">
  <li>Open <span class="screen-path">Media → Library → List view</span>.</li>
  <li>Select the affected images.</li>
  <li>Bulk action: <strong>Apply Ultimate Watermark</strong> (your watermark name).</li>
  <li>Click <strong>Apply</strong>.</li>
</ol>

The bulk action processes synchronously for small batches. Pro's batch processor handles larger sets in the background — see [Performance](/performance#background-batch-processing).

## Removing a watermark

The Bulk action also has **Remove watermark** which restores the file from `uploads/ulwm-backup/YYYY/MM/`. This requires backups to have been **enabled at the time of the original watermark** — see [Settings → Backups](/settings#backups).

## Where to go next

- 📐 [Positioning & sizing](/positioning) — every position and offset detail.
- 🎯 [Conditional rules](/conditional-rules) — when each watermark applies.
- ⚙️ [Global settings](/settings) — backups, right-click protection.
- 💎 [Pro features](/features) — dynamic placeholders, OTF, WooCommerce.
