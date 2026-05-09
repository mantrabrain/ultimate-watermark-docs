---
title: Pro features overview
description: A guided tour of every Ultimate Watermark Pro module — dynamic placeholders, on-the-fly display, advanced rules, WooCommerce, batch processing, unlimited templates.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro</span>
  <span>This page is the <strong>guided tour</strong> of Ultimate Watermark Pro. For the <strong>flat catalog</strong> (one card per feature), see <a href="/features">All Pro features</a>.</span>
  <a class="doc-pro-callout__cta" href="https://mantrabrain.com/ultimate-watermark-pro/" target="_blank" rel="noopener">View pricing &amp; buy →</a>
</div>

# Pro features overview

Ultimate Watermark Pro is a single plugin that adds about a half-dozen modules to the free core. Activating Pro unlocks every module — there's no per-feature toggle on the website. Modules expose their settings inside the watermark template builder (a new **Display** tab) and on the **Settings** page (a new **Advanced (Pro)** tab).

## Templates

### Unlimited templates

Free is limited to **one** active watermark template (`WatermarkAjaxHandler.php:608–620`). Pro removes the limit — make as many as you need:

- A copyright text watermark for **blog posts**.
- A logo watermark for **product photos**.
- A "DRAFT" diagonal stamp for **work-in-progress** uploads.
- Different watermarks per WooCommerce product category.

All run on every upload; conditional rules decide which ones actually apply.

## Dynamic content

### Dynamic placeholders

Embed `{{placeholder}}` tokens inside text watermarks. Pro replaces them at render time:

| Placeholder | Replaces with |
| --- | --- |
| `{{date}}` | Current date in WP date format. |
| `{{time}}` | Current time. |
| `{{year}}` | Current year. |
| `{{user}}` | Logged-in viewer's display name (or empty for guests). |
| `{{user_login}}` | Logged-in viewer's username. |
| `{{ip}}` | Visitor's IP address (deters re-publishing). |
| `{{copyright}}` | `© <year> <site name>`. |
| `{{post_title}}` | Title of the post the image is attached to. |
| `{{site_name}}` | Site title from <span class="screen-path">Settings → General</span>. |
| `{{site_url}}` | `home_url()`. |

Use cases:

- A "© 2026 Studio Name — viewed by John on 12 Mar 2026" diagonal stamp deters image reposting.
- A "Draft for {{post_title}}" stamp on staging uploads.

Resolved via `ProPlugin::processDynamicContent` (`ProPlugin.php:160–194`) and `DynamicContentManager::parseTemplate`.

### Custom placeholders

Register your own with the `ultimate_watermark_pro_register_dynamic_types` action and `ultimate_watermark_pro_resolve_placeholder` filter. See [Hooks & filters → Dynamic content](/hooks-filters#dynamic-content-pro).

## Frontend display

### On-the-fly (OTF) rendering

The flagship Pro feature. Instead of burning the watermark into the file on disk, Pro renders it **at request time** and serves the result.

Why this matters:

- **Originals stay clean** — the file on disk is never modified. Useful for stock photographers who need pristine masters.
- **Edit-and-go** — change the watermark template, hit Save, the next visitor sees the new version. No bulk re-process.
- **Cached output** — the rendered watermarked image is cached at `uploads/ultimate-watermark-frontend-cache/`. Subsequent visitors hit the cache. (`FrontendWatermarkManager.php:407–418`)

Set up: edit the watermark → **Display** tab → toggle on. See [Settings → Display tab](/settings#pro-display-tab-per-watermark) for every option.

### Role-based bypass

Pro lets you bypass the watermark for specific roles — useful for editors who need to copy images out without watermarks. Default bypass: **Administrator**.

## Conditional rules

### Advanced rule types

Pro adds 9+ new rule types beyond the free post-type / image-size:

- File type (MIME).
- Image width / height.
- File size.
- Image orientation.
- Image aspect ratio.
- Date range.
- Post category.
- WooCommerce product_cat / product_tag (when WC is active).

See [Conditional rules](/conditional-rules) for setup and recipes.

## E-commerce

### WooCommerce integration

The **EcommerceManager** module (`EcommerceManager.php`) hooks into WooCommerce:

- **Product images** are watermarked on upload.
- **Product gallery** images are watermarked.
- A **bulk action** in WooCommerce → Products lets you re-apply / remove watermark for selected products.
- The **OTF Display** tab has a dedicated **Apply to WooCommerce** toggle.
- Conditional rules can match `product_cat` and `product_tag`.
- Bulk batches process at **5 products per pass** (`EcommerceManager.php:335–339`) to fit shared-host limits.

Settings live under <span class="screen-path">Watermark → Settings → Advanced (Pro)</span> (`ProAdminManager.php:1471–1489`).

## Performance

### Background batch processing

For libraries with thousands of images, Pro queues work via `wp_schedule_single_event` and processes in chunks of **10** (`BatchManager.php:76–78,110–112`). The admin shows a progress UI; you can leave the page and it keeps running.

See [Performance → Background batch](/performance#background-batch-processing).

## License & updates

### License manager

Activate / deactivate / check status against `https://store.mantrabrain.com/edd-sl-api/?` (item_id 36499 — `License.php:31`). Pro updates show up in <span class="screen-path">Plugins → Installed Plugins</span> when license is active. Daily license check runs in the background.

Activation: <span class="screen-path">Watermark → License</span> (`ProAdminManager.php:75–81`).

## Plan tiers

Ultimate Watermark Pro is sold as a **single tier** — every active license unlocks every Pro module above. Pricing options differ on **license seats** and **renewal terms**.

> EDD's `price_id=1` is the visible price ID in code (`WatermarkActionsHandler.php:75`). For current seats and renewal terms, see the [pricing page](https://mantrabrain.com/ultimate-watermark-pro/).

## Where to go next

- 📋 [All Pro features](/features) — flat catalog.
- 🎯 [Conditional rules](/conditional-rules) — advanced rule recipes.
- ⚡ [Performance & caching](/performance) — OTF cache and batch processing.
- 🪝 [Hooks & filters](/hooks-filters) — extend Pro behaviour.
