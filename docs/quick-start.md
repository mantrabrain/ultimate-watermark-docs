---
title: Quick start
description: Build your first Ultimate Watermark in five minutes — choose text or image type, position, size, opacity, and which uploads get watermarked.
---

# Quick start

> First time in WordPress? Open [Your WordPress admin](/admin-dashboard) in another tab — it maps every Watermark menu item to the matching docs page.

This walkthrough takes about 5–10 minutes and ends with watermarked images on your site.

## 1. Open the watermark builder

Open <span class="screen-path">Watermark → Add Watermark</span>.

You'll see a form with three tabs:

- **Basic** — name, type (text or image), enable / disable.
- **Appearance** — content (text content or image), position, size, opacity.
- **Rules** — when this watermark applies (post type, image size, conditions).

Plus a **Display** tab on Pro-active installs (controls on-the-fly frontend rendering).

## 2. Pick a type — text or image

### Text watermark

Use case: copyright text, your studio name, a website URL stamp.

In <span class="screen-path">Basic → Type</span>, select **Text**. The Appearance tab now shows:

| Field | What it is |
| --- | --- |
| **Watermark text** | Multi-line text. Supports newlines. |
| **Font family** | Built-in fonts (Arial, Helvetica, Georgia, Times, Courier, Verdana, Trebuchet, Comic Sans). |
| **Font size** | 8–72 px. |
| **Font weight** | Normal / Bold. |
| **Font style** | Normal / Italic. |
| **Decoration** | None / Underline / Line-through. |
| **Color** | Hex picker. |

> <span class="doc-pro-pill">Pro</span> Pro lets you embed dynamic placeholders like `&#123;&#123;date&#125;&#125;`, `&#123;&#123;user&#125;&#125;`, `&#123;&#123;ip&#125;&#125;`, `&#123;&#123;copyright&#125;&#125;` — see [Pro features → Dynamic placeholders](/third-party-integrations#dynamic-placeholders).

### Image watermark

Use case: a transparent logo PNG, a "© Studio" badge, or a stamp.

In <span class="screen-path">Basic → Type</span>, select **Image**. The Appearance tab now shows:

| Field | What it is |
| --- | --- |
| **Watermark image** | Pick from the media library. PNG with transparency works best. |
| **Size mode** | Original / Custom px / Scaled %. |
| **Custom width** (if Custom px) | Width in pixels. |
| **Scale percentage** (if Scaled %) | `100` = watermark width = image width. `25` = watermark is 25 % the width of the target image. |
| **Output quality** | JPEG quality (1–100). 90 is sane. |

> SVG watermarks work only when **Imagick** is the active library. GD doesn't read SVG. See [Installation §3](/installation#3-verify-your-image-library).

## 3. Position the watermark

Switch to the **Appearance** tab → **Position** section.

The 9-point grid:

```
┌──────────────────────┐
│  ◯       ◯       ◯   │   top-left | top | top-right
│                       │
│  ◯       ◯       ◯   │   left | center | right
│                       │
│  ◯       ◯       ◯   │   bottom-left | bottom | bottom-right
└──────────────────────┘
```

| Field | What it is |
| --- | --- |
| **Position** | Pick one of the 9 anchors. |
| **Offset X** | Horizontal nudge from the anchor (pixels or %). Negative = left. |
| **Offset Y** | Vertical nudge from the anchor. Negative = up. |
| **Offset unit** | `pixels` or `percentage`. |

Common combos:

- **Bottom-right + (-20 px, -20 px)** — 20 px in from the corner.
- **Center + (0 %, 0 %)** — perfectly centred.

## 4. Set rules — when this watermark applies

Switch to the **Rules** tab.

In the **free** plugin you can match by:

- **Post type** — `post`, `page`, attachment, custom CPTs.
- **Image size** — only watermark `full`, or `large`, or specific sizes.

> <span class="doc-pro-pill">Pro</span> Pro adds a much larger condition list — see [Conditional rules](/conditional-rules).

If you leave rules empty, the watermark applies to **every** uploaded image.

## 5. Save & test

Click **Save Watermark**. Now upload a fresh image at <span class="screen-path">Media → Add New</span>:

1. Pick a JPEG or PNG.
2. Wait for upload + thumbnail generation.
3. Click the new attachment → check the preview. The watermark should be visible at your chosen position.

Open the same image at different sizes (Large / Medium / Thumbnail) — each should be watermarked according to your rules.

## 6. (Optional) Watermark existing media

You probably have hundreds of images already. To watermark them in bulk:

<ol class="step-list">
  <li>Open <span class="screen-path">Media → Library</span> in <strong>List view</strong>.</li>
  <li>Tick the images you want to watermark.</li>
  <li>From the <strong>Bulk actions</strong> dropdown, pick <strong>Apply Ultimate Watermark</strong> (and the specific watermark name).</li>
  <li>Click <strong>Apply</strong>.</li>
</ol>

If you have very many (10 000+), Pro adds a batch processor (`wp_schedule_single_event` queue) — see [Performance](/performance#background-batch-processing).

> The bulk action also has a **Remove watermark** option that restores from the originals backup. See [Settings → Backups](/settings#backups).

## 7. (Pro) Turn on on-the-fly frontend display

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Watermark on the fly, never burn the original</span>
  </div>
  <p class="pro-callout__desc">Pro can render the watermark at request time — your originals stay untouched on disk; the visitor sees a watermarked version. Edit the watermark, refresh — done. No bulk re-process.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/ultimate-watermark#pricing">Unlock OTF →</a>
</div>

To enable:

<ol class="step-list">
  <li>Edit your watermark template.</li>
  <li>Switch to the <strong>Display</strong> tab.</li>
  <li>Toggle <strong>Display on frontend</strong>.</li>
  <li>Pick: apply to content (post body images), thumbnails, WooCommerce galleries.</li>
  <li>Optionally bypass for logged-in roles (default: administrator).</li>
  <li>Save.</li>
</ol>

Watermarked output is cached at `uploads/ultimate-watermark-frontend-cache/wm_<md5>.ext`. The cache is invalidated automatically when the watermark template changes (md5 includes file mtime).

## Where to go next

- 🖼️ [Watermarks](/watermarks) — every text / image field in detail.
- 📐 [Positioning & sizing](/positioning) — anchors, offsets, scaling.
- 🎯 [Conditional rules](/conditional-rules) — target-specific watermarks.
- ⚙️ [Global settings](/settings) — backups, right-click protection.
- 💎 [Pro features overview](/third-party-integrations) — what Pro unlocks.
