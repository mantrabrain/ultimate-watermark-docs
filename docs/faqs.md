---
title: FAQs
description: Frequently asked questions about Ultimate Watermark — Free vs Pro, GD vs Imagick, AVIF support, originals safety, multisite, large libraries.
---

# Frequently asked questions

## Getting started

### Is Ultimate Watermark really free?

Yes. The core plugin is GPLv3-or-later, lives on [WordPress.org](https://wordpress.org/plugins/ultimate-watermark/), and ships text & image watermarks, conditional rules (post type + image size), originals backup, right-click protection, and one watermark template out of the box.

### Do I need Ultimate Watermark Pro?

Only if you need any of: **unlimited templates**, **dynamic placeholders** (<span v-pre><code>{{date}}</code>, <code>{{user}}</code>, <code>{{ip}}</code></span>), **on-the-fly frontend rendering**, **WooCommerce integration**, **advanced conditional rules** (file type, dimensions, file size, orientation, aspect ratio, date range, categories), or **background batch processing**.

The free plugin already covers most blogs and portfolios.

### Does Pro work without Free?

No. Ultimate Watermark Pro **requires the free plugin to be active** — and at minimum version 2.0. Activating Pro without Free auto-deactivates Pro and shows an admin error.

## Versions & compatibility

### What WordPress / PHP versions are required?

- WordPress **5.0+**.
- PHP **7.4+**.
- **GD or Imagick** PHP extension.

### Does Ultimate Watermark support multisite?

Yes — install network-wide and activate per site. Each site has its own watermarks, settings, and license activation. Pro license seats count individually.

### Block editor / Gutenberg compatible?

Yes. Watermarks apply during attachment metadata generation, which fires regardless of the editor. There's no Gutenberg block to insert — the plugin operates on uploads, not on content blocks.

### Elementor / Divi / Beaver Builder?

Same — watermarks apply at upload time. Whether you place the image via Elementor, Divi, or any other page builder doesn't affect watermarking.

## Image formats & libraries

### Which image formats are supported?

| Format | Free | Pro |
| --- | :-: | :-: |
| JPEG | ✅ | ✅ |
| PNG | ✅ | ✅ |
| GIF | ✅ | ✅ |
| WebP | ✅ | ✅ |
| TIFF (Imagick only) | ✅ | ✅ |
| BMP (Imagick only) | ✅ | ✅ |
| SVG (as watermark, Imagick only) | ✅ | ✅ |
| AVIF | ⚠️ companion | ⚠️ companion |
| PDF | — | — |
| Video | — | — |

### What about AVIF?

WordPress generates AVIF subsizes on capable hosts. Ultimate Watermark watermarks the **JPEG sibling** that WP generates alongside; the AVIF stays in sync. There's no dedicated AVIF rendering branch — AVIF is treated as a companion file.

### GD or Imagick — which should I use?

- If both are installed, Ultimate Watermark uses **Imagick** automatically (better quality, more formats).
- If only one is installed, it uses that one.
- You can't override the choice in settings.

### My host doesn't have Imagick

That's fine — GD covers JPEG/PNG/GIF/WebP. You'll just lose TIFF/BMP/SVG support.

## Originals & data safety

### Are my original images safe?

Only if you **enable backups**. The free plugin defaults to backups **off** in the form (and the activator seeds defaults that may differ). Open <span class="screen-path">Watermark → Settings → General → Enable backup functionality</span> and turn it on.

When backups are on, the original is copied to `uploads/ulwm-backup/YYYY/MM/` **before** the watermark is applied. You can restore via Bulk → Remove watermark.

> ⚠️ With backups off, the watermarked file is the only copy. There's no undo.

### What if I want to never modify originals?

That's exactly what **Pro's on-the-fly (OTF) display** does. The original stays untouched on disk; visitors see a watermarked version that's rendered at request time and cached.

### How big can my image be?

GD limits:

- Up to **15 000 px** per side.
- Up to **50 MB** file size.

Imagick obeys your `policy.xml` and PHP `memory_limit`.

> For larger images, see [Performance](/performance).

## Watermarking behaviour

### Will old uploads be watermarked automatically?

No. Watermarks apply only to **new** uploads. To watermark existing media, use **Media → Library → Bulk action → Apply Ultimate Watermark**.

### Will every image size be watermarked?

By default, yes — if your watermark's **Rules → Image size** field is empty. Limit to specific sizes by populating that field.

### Can I have different watermarks for different content types?

<span class="doc-pro-pill">Pro</span> Yes — Pro removes the one-template limit. Create one template per use case and use **Rules** to scope each.

### Multiple watermarks per image?

Yes — every active template that matches the rules gets applied in sequence (sorted by post ID ascending). Useful for stacking a logo + a "DRAFT" diagonal stamp.

## On-the-fly (OTF) <span class="pro-pill">PRO</span>

### How does OTF differ from burned-in?

Burned-in watermarks modify the file on disk. OTF leaves the file unchanged and renders the watermark at request time, caching the output.

Trade-offs:

| Aspect | Burned-in | OTF |
| --- | --- | --- |
| Original safety | Only safe if backups on | Always preserved |
| Edit watermark, refresh updates | No (need bulk re-apply) | Yes (cache invalidates) |
| First-render latency | None | Yes (one-time) |
| CDN compat | Native | Native (URLs are static after render) |
| Subsequent loads | Native speed | Native speed (served from cache) |

### Does OTF work with my CDN?

Yes. The cached watermarked file lives at `wp-content/uploads/ultimate-watermark-frontend-cache/` — a regular path that CDNs cache like any other static file. Just remember to **purge** the CDN folder when you change watermarks.

### Why is `srcset` stripped on OTF?

OTF renders one watermarked image at the size the page requested. Serving alternative resolutions via `srcset` would mean rendering each alternative — costly. The plugin strips `srcset` and serves only the OTF version.

## Right-click & drag protection

### Does it actually stop people from saving images?

It stops casual right-click-save and drag-save. A determined visitor can still:

- Open DevTools → Network tab → find the image URL.
- Take a screenshot.
- Print the page.

For real protection use **OTF watermarking** (Pro) — even if they save, your watermark is on the file.

### Does it break logged-in editors?

By default no — the **Enable protection for logged-in users** toggle is off, so editors can right-click normally. Turn it on if you want everyone (including admins) to face the protection.

## License & updates

### Does Ultimate Watermark phone home?

Only Pro, only for license activation and update checks (against `https://store.mantrabrain.com/edd-sl-api/?`). The free plugin makes no outbound calls.

### Why doesn't my Pro update show?

Three causes:

1. License is expired or inactive.
2. Outbound HTTPS to `store.mantrabrain.com` is firewalled.
3. WP transient cache hasn't refreshed yet (try `wp transient delete --all`).

See [Troubleshooting → License](/troubleshooting#license-activation-fails).

## Multisite

### Is each subsite licensed separately?

Yes — Pro license seats are tracked per site. A 1-seat license = 1 site, 5-seat = 5 sites, etc. Each subsite needs its own activation.

## Large libraries

### I have 50 000 images — how long will the bulk apply take?

Free's bulk action processes synchronously: ~1–5 seconds per image, roughly 12 hours for 50K. Pro's batch processor (10/pass, scheduled) handles it without blocking the admin — typical throughput is 10K–20K per hour on a healthy host.

### Will it kill my server?

Process during off-peak hours. Lower the chunk size if you see CPU spikes. See [Performance → Tuning checklist](/performance#tuning-checklist).

## Where to go next

- 🛠️ [Troubleshooting](/troubleshooting) — fixes for common issues.
- 💎 [Pro features](/features) — full Pro catalog.
- 💬 [Get support](/support) — how to reach us.
