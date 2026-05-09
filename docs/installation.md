---
title: Installation
description: Install Ultimate Watermark (free) from WordPress.org plus Ultimate Watermark Pro from your MantraBrain account, verify GD or Imagick, and create your first watermark template.
---

# Installation

> **New to WordPress?** Read [Your WordPress admin](/admin-dashboard) right after install — it maps every menu item under **Watermark** to the page in these docs.

## Requirements

- **WordPress 5.0+**
- **PHP 7.4+**
- **GD or Imagick** PHP extension (most hosts ship one; Imagick is preferred when available)
- For Pro: an active **Ultimate Watermark Pro license** from your [MantraBrain account](https://mantrabrain.com/account/)

> Ultimate Watermark Pro **requires the free plugin to be active**. Activating Pro without Free triggers a `wp_die` and auto-deactivates Pro — see `ultimate-watermark-pro.php:45–59,157–165`. Pro also enforces a **minimum free version** (`ULTIMATE_WATERMARK_MIN_VERSION` 2.0).

## 1. Install the free plugin

The free plugin is the foundation. Install it first.

### From WordPress.org (recommended)

<ol class="step-list">
  <li>Open <span class="screen-path">Plugins → Add New</span>.</li>
  <li>Search for <strong>Ultimate Watermark</strong> by MantraBrain.</li>
  <li>Click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
</ol>

### From a ZIP

<ol class="step-list">
  <li>Download <code>ultimate-watermark.zip</code> from <a href="https://wordpress.org/plugins/ultimate-watermark/" target="_blank" rel="noopener">wordpress.org/plugins/ultimate-watermark</a>.</li>
  <li>Open <span class="screen-path">Plugins → Add New → Upload Plugin</span>.</li>
  <li>Choose the ZIP, click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
</ol>

You should see a new top-level **Watermark** menu item in the WordPress sidebar.

## 2. Install Ultimate Watermark Pro (optional)

Pro is delivered as a separate plugin ZIP from your MantraBrain account.

<ol class="step-list">
  <li>Sign in at <a href="https://mantrabrain.com/account/" target="_blank" rel="noopener">mantrabrain.com/account</a>.</li>
  <li>Download <strong>ultimate-watermark-pro.zip</strong> from <strong>Downloads</strong>.</li>
  <li>In WordPress, open <span class="screen-path">Plugins → Add New → Upload Plugin</span>.</li>
  <li>Upload the ZIP, click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
</ol>

### Activate your Pro license

<ol class="step-list">
  <li>Open <span class="screen-path">Watermark → License</span>.</li>
  <li>Paste your <strong>license key</strong> (from your MantraBrain account → Licenses).</li>
  <li>Click <strong>Activate</strong>.</li>
</ol>

The license activates against `https://store.mantrabrain.com/edd-sl-api/?` (item_id 36499) — see [Troubleshooting](/troubleshooting) if your host firewalls outbound HTTPS.

## 3. Verify your image library

Open <span class="screen-path">Tools → Site Health → Info → Server</span> and check:

- **PHP image processing**: should show **GD** or **Imagick** (or both).

If both are present, Ultimate Watermark uses **Imagick** (better quality, more formats). Otherwise it falls back to GD. See `LibraryDetector.php:47–60`.

| Library | Pros | Limitations |
| --- | --- | --- |
| **Imagick** | Better quality, supports TIFF / BMP / SVG inputs, smarter font scaling. | Heavier on memory. Some hosts don't ship it. |
| **GD** | Universal — every host has it. Fast for typical JPEG/PNG. | No SVG support. JPEG/PNG/GIF/WebP only. |

> No GD or Imagick? Contact your host or install one before activating the plugin.

## 4. Verify the install

Quick sanity check:

| Check | Where | Pass |
| --- | --- | --- |
| Free plugin active | <span class="screen-path">Plugins → Installed Plugins</span> | "Ultimate Watermark" listed and active |
| Top-level menu | WordPress sidebar | "Watermark" visible with submenus |
| Image library | Site Health → Info | GD or Imagick (or both) |
| Pro active (if installed) | <span class="screen-path">Watermark → License</span> | Status: **Active** |
| Test upload | Media → Add New → upload a JPEG | Watermark applied (after first template is built) |

## 5. Build your first watermark

You haven't created any watermarks yet. Continue to [Quick start](/quick-start) — it walks you through:

- Choosing **text** or **image** watermark type
- Picking position, size, opacity
- Setting which post types and image sizes get watermarked
- Triggering bulk apply on existing media

## Updating

- **Free**: WordPress.org auto-updates apply via <span class="screen-path">Plugins → Installed Plugins</span>.
- **Pro**: After license activation, Pro updates show up in the same Plugins screen. The license must be **active** for update notifications to appear.

## Where next

- 🚀 [Quick start](/quick-start) — your first watermark in five minutes.
- 🧭 [Your WordPress admin](/admin-dashboard) — what every menu item does.
- 🖼️ [Watermarks](/watermarks) — text and image watermark fields explained.
