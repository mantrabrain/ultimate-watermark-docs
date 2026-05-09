---
title: Changelog
description: Ultimate Watermark version history. Recent releases for both the free plugin and Ultimate Watermark Pro.
---

# Changelog

Ultimate Watermark follows semantic versioning loosely — `MAJOR.MINOR.PATCH` where `MAJOR` is reserved for breaking compatibility changes (rare).

## Ultimate Watermark (free) — 2.0.8

- Polish: settings field validation messages.
- Fix: rare "Image size restriction" miss when WP creates a `scaled` subsize.
- i18n: extended translations file.

## Ultimate Watermark (free) — 2.0.x baseline

- Refactor of the processor layer (`Processors/GDWatermarkProcessor.php`, `Processors/ImagickWatermarkProcessor.php`).
- Unified rule evaluator (`RulesEvaluator.php`) replaces legacy `watermark_on` / `watermark_post_types` (still falls back to legacy when no unified rules exist).
- New conditional rule UI (filter `uwm_condition_types`).
- Originals backup folder pattern: `uploads/ulwm-backup/YYYY/MM/`.
- Right-click and drag-drop protection toggles in settings.

## Ultimate Watermark (free) — 1.x

- Initial release.
- GD-only processing.
- Single watermark template.
- Post type + image size rules.

## Ultimate Watermark Pro — 1.0.0

- Initial Pro release.
- **Unlimited templates** (removes free's one-template limit).
- **Dynamic placeholders** — `{{date}}`, `{{user}}`, `{{ip}}`, `{{copyright}}`, `{{post_title}}`, `{{site_name}}`, `{{site_url}}`.
- **On-the-fly (OTF) display** with disk cache at `uploads/ultimate-watermark-frontend-cache/`.
- **Display tab** in the watermark builder for OTF settings (apply to content / thumbnails / WooCommerce, role bypass, cache toggle).
- **WooCommerce integration** — product image and gallery handling, bulk batches, `product_cat` / `product_tag` rules.
- **Advanced conditional rules**: file type, image dimensions, file size, orientation, aspect ratio, date range, post category.
- **Background batch processor** (`wp_schedule_single_event` queue, 10-image chunks).
- **License manager** + EDD-based auto-updates.

## Compatibility

| Free | Pro | WordPress | PHP |
| --- | --- | --- | --- |
| 2.0.8 | 1.0.0 | 5.0+ | 7.4+ |
| 2.0.x | 1.0.0 | 5.0+ | 7.4+ |
| 1.x | — | 4.9+ | 7.0+ |

> Pro requires Free **2.0+** (`ULTIMATE_WATERMARK_MIN_VERSION` 2.0). Pro and Free major versions are independent.

## Where to find the canonical changelog

- **Free**: bundled `changelog.txt` and the [WordPress.org listing](https://wordpress.org/plugins/ultimate-watermark/#developers).
- **Pro**: bundled in the Pro ZIP as `changelog.txt`, plus the [MantraBrain changelog page](https://mantrabrain.com/plugins/ultimate-watermark#changelog).

## Where to go next

- 🚀 [Installation](/installation) — get started.
- 💎 [Pro features](/features) — what Pro adds.
- 💬 [Support](/support) — questions about a specific release.
