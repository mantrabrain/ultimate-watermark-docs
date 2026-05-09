---
title: Performance & caching
description: How Ultimate Watermark balances quality and speed — GD memory limits, the OTF cache, batch processing for large libraries, and CDN compatibility.
---

# Performance & caching

Watermarking is image processing — and image processing is heavy. This page explains how Ultimate Watermark manages memory, when it caches, and how to handle libraries with thousands of images.

## Memory & file limits

When GD is active, Ultimate Watermark raises memory before each watermark pass (`GDWatermarkProcessor.php:21`):

```
ini_set( 'memory_limit', '256M' );
```

It also limits to safe sizes (`GDWatermarkProcessor.php:26–32`):

| Limit | Value | What happens at the limit |
| --- | --- | --- |
| **Max image dimension** | 15 000 px per side | Larger images are skipped with a notice. |
| **Max file size** | 50 MB | Files above this size are skipped. |

For Imagick, no explicit limits — Imagick obeys your `policy.xml` and PHP `memory_limit`.

> If you're processing 8K photos or RAW exports, increase `memory_limit` to 512M and run the bulk apply during off-hours. Or use OTF (Pro) so the heavy lift only happens once per visitor request.

## The on-the-fly (OTF) cache <span class="pro-pill">PRO</span>

When Pro's OTF display is enabled, watermarked output is **cached on disk** to avoid re-rendering on every page load.

### Cache location

```
wp-content/uploads/ultimate-watermark-frontend-cache/wm_<md5>.ext
```

(`FrontendWatermarkManager.php:28,407–418`).

The `<md5>` hash includes:

- The original file path.
- The watermark template ID.
- The original file's **mtime** — so when you replace an image on disk, the cache invalidates automatically.
- The watermark template's settings hash — so when you edit the watermark, all cached images regenerate on next access.

(`FrontendWatermarkManager.php:330–335`)

### Cache lifetime

There is **no TTL**. Files live forever; cache hits are by file existence (`FrontendWatermarkManager.php:337–338`).

### Clearing the cache

From the admin: **Watermark → Settings → Pro → Clear OTF cache** (or AJAX action `ulwm_pro_clear_frontend_cache` — `FrontendWatermarkManager.php:41,480–496`).

Or delete the folder manually:

```bash
rm -rf wp-content/uploads/ultimate-watermark-frontend-cache/
```

The next visitor regenerates each cached file on-demand.

## Background batch processing <span class="pro-pill">PRO</span>

For libraries with thousands of images, processing them inline (during a bulk-action click) blocks the admin UI. Pro adds a background batch:

- A **`batch` post type** schedules work via `wp_schedule_single_event` (`BatchManager.php:76–78`).
- The batch handler (`BatchPostType.php:34`) processes a chunk on the next WP-Cron run.
- **Chunk size**: 10 images per pass (`BatchManager.php:110–112`).
- **WooCommerce batch size**: 5 products per pass (`EcommerceManager.php:335–339`).
- **Pro admin list batching**: 20 posts per page (`ProAdminManager.php:1266–1272,1311–1317`).

> If WP-Cron is broken, batches stall. See [Troubleshooting → WP-Cron](/troubleshooting#wp-cron-isnt-running) for fixing real-cron.

## Apply / un-apply existing media

The free media-library bulk action (`MediaLibraryIntegration.php:81–105`) processes selected items **synchronously**. For 50–100 items this is fine. For thousands, use Pro's batch.

| Volume | Best path |
| --- | --- |
| 1–100 | Free bulk action. |
| 100–1000 | Free bulk action in chunks of ~50, or Pro batch. |
| 1000+ | Pro batch (overnight). |

## CDN compatibility

If you serve images via a CDN (Cloudflare, BunnyCDN, KeyCDN):

- **Burned-in watermarks** (the default): the watermark is part of the file. CDNs cache the watermarked file once and serve it normally. ✅
- **OTF watermarks** (Pro): the watermarked file lives at `/wp-content/uploads/ultimate-watermark-frontend-cache/` — a regular path. CDNs cache it like any other static asset. ✅

> When you edit a watermark template, **purge** the CDN cache for the `ultimate-watermark-frontend-cache/` folder so visitors get the updated version.

## Responsive images

When Pro OTF is active, Ultimate Watermark **strips `srcset`** from `<img>` tags (`FrontendWatermarkManager.php:220–223,255–262`). The single OTF-rendered image is served instead.

Trade-off: simpler rendering, but visitors on small screens download the full resolution. To re-enable `srcset`, register your own `the_content` filter at a higher priority that re-injects the responsive markup after Ultimate Watermark runs.

## Image library choice

| Scenario | Recommendation |
| --- | --- |
| Mostly JPEG / PNG, modest sizes | GD is fine. |
| TIFF / BMP / SVG sources | Imagick required. |
| Very-large images (8K+) | Imagick + `policy.xml` tuning. |
| Shared hosting with low memory | GD + reduce max image size. |

The plugin auto-picks Imagick when available, GD otherwise (`LibraryDetector.php:47–60`).

## Tuning checklist

For larger sites, this order resolves 95 % of performance issues:

1. **Real cron**: switch from WP-Cron to system cron (see [Troubleshooting](/troubleshooting#wp-cron-isnt-running)).
2. **Disable** unused image subsizes in your theme — fewer subsizes = fewer watermark passes.
3. **Limit watermark to `full` + `large`** in the watermark's Rules → Image size.
4. **Use percentage offsets** so positions scale across subsizes.
5. **Increase PHP `memory_limit`** to 512M if you process > 4K images.
6. **Pro: enable OTF cache** so the heavy lift happens once per visitor session.

## Logs / activity

The plugin creates a database table `{$wpdb->prefix}ultimate_watermark_logs` (`Activator.php:46–56`), but the current build doesn't write to it (it's reserved for future). If you need an audit log, hook `ultimate_watermark_saved` (post-save) and write to your own table or an external log service.

## Where to go next

- 🖼️ [Watermarks](/watermarks) — per-template options.
- 🎯 [Conditional rules](/conditional-rules) — limit applications to fewer images.
- ⚙️ [Global settings](/settings) — backups, OTF cache toggle.
- 💎 [Pro features](/features) — full Pro module catalog.
