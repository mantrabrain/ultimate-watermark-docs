---
title: Global settings
description: Plugin-wide options for Ultimate Watermark — backups & originals, right-click protection, drag-and-drop prevention, logged-in user behaviour, and the Pro Display tab.
---

# Global settings

Open <span class="screen-path">Watermark → Settings</span>. These options apply across **all** watermark templates. Per-template options live inside each watermark builder.

All values are stored in the WordPress options key `ultimate_watermark_options` (`SettingsPage.php:192`). The keys below are the literal option keys — useful for programmatic config.

## General tab

### Backups & originals

| Field | Key | Default | What it does |
| --- | --- | --- | --- |
| **Enable backup functionality** | `backup_image` | `0` (form default) | When **on**, the original file is copied to `uploads/ulwm-backup/YYYY/MM/` **before** the watermark is burned in. |
| **Backup strategy** | `backup_strategy` | `full_size` | `full_size` keeps the original full-resolution; alternatives keep less. |
| **Backup quality** | `backup_quality` | `90` | JPEG quality used when re-saving the backup (only for downscaled strategies). |

When backups are on, the **Bulk → Remove watermark** action restores from this folder.

> ⚠️ Disable backups only if you have your **own** off-site backup pipeline. Without backups, you can't restore an image after watermarking.

#### Where backups live on disk

```
wp-content/uploads/ulwm-backup/2026/05/your-image.jpg
```

(`BackupManager.php:62–68,80–84,114–119`).

A backup is created **once per upload** — the first time the image is processed. Subsequent watermark passes don't overwrite the backup.

### Right-click & drag protection

| Field | Key | Default | What it does |
| --- | --- | --- | --- |
| **Disable right click on images** | `disable_rightclick` | `0` | Adds a `contextmenu` listener that suppresses the menu over `<img>` elements. |
| **Prevent drag and drop** | `disable_drag_drop` | `0` | Suppresses `dragstart` on images so visitors can't drag-save. |
| **Enable protection for logged-in users** | `enable_protection_logged_in` | `0` | When **off**, logged-in users can right-click and drag normally. When **on**, even logged-in users get the protection. |

These run via `frontend.js` (`frontend.js:34–41`) — they don't stop a determined user (DevTools shows the original image URL), but they deter casual screenshot-and-save behaviour.

> Note: Some Pro marketing material mentions "hotlink protection." The current code defaults `disable_right_click` and `hotlink_protection` to `false` in OTF settings (`FrontendWatermarkManager.php:168–190`); a server-side hotlink layer isn't shipped. If you need real hotlink protection, use **.htaccess** rules or **Cloudflare Hotlink Protection**.

## Pro: Display tab (per-watermark)

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">On-the-fly display, per template</span>
  </div>
  <p class="pro-callout__desc">Pro adds a Display tab inside the watermark builder. Toggle on-the-fly rendering, decide whether to apply to post-content images, thumbnails, WooCommerce galleries, and which roles bypass the watermark.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/ultimate-watermark#pricing">Unlock OTF →</a>
</div>

Display tab fields (`ProAdminManager.php:1495–1577`):

| Field | Key | Default | What it does |
| --- | --- | --- | --- |
| **Display on frontend** | `otf_display_enabled` | `0` | Master toggle for OTF for this watermark. |
| **Apply to content** | `otf_apply_to_content` | `1` | Watermark images inside `the_content` (post bodies). |
| **Apply to thumbnails** | `otf_apply_to_thumbnails` | `1` | Watermark featured images / archive thumbnails. |
| **Apply to WooCommerce** | `otf_apply_to_woocommerce` | `0` | Watermark product galleries (requires WooCommerce). |
| **Bypass roles** | `otf_bypass_roles` | `['administrator']` | Multiselect: roles that see the unwatermarked image. |
| **Cache enabled** | `otf_cache_enabled` | `1` | Cache the rendered watermarked image for fast subsequent loads. |

See [Performance & caching](/performance) for cache mechanics.

## Pro: Advanced settings tab

The **Advanced (Pro)** tab in <span class="screen-path">Settings</span> currently houses the WooCommerce integration UI (`ProAdminManager.php:1471–1489`). Configure:

- WooCommerce-aware automatic watermarking on product image upload.
- WooCommerce gallery handling.
- Bulk batch settings (chunk size, throttle).

## Activator defaults

When you first activate the plugin, several keys are seeded in `Activator.php:67–78` with sensible defaults (e.g. `enable_watermarking` = on). The Settings UI's General tab shows a subset of those keys — the ones above. The seeded keys remain in the database for backward compatibility with older builds.

## Plugin-wide hooks

Two filters let you mutate the entire settings config:

| Hook | What it does |
| --- | --- |
| `ultimate_watermark_settings_config` | Modify the field config rendered on the Settings page. |
| `ultimate_watermark_settings_tabs` | Add a new tab to the Settings page. |

```php
add_filter( 'ultimate_watermark_settings_config', function ( $config ) {
    $config['general']['my_extra_field'] = [
        'label'   => 'My extra field',
        'type'    => 'checkbox',
        'default' => '0',
    ];
    return $config;
} );
```

See [Hooks & filters](/hooks-filters#settings) for more.

## Privacy / usage tracking

**There is no usage tracking or telemetry** in the free plugin beyond standard browser visits to your site.

Pro contacts the license server (`https://store.mantrabrain.com/edd-sl-api/?`) for **license activation and update checks** — see [Installation §2](/installation#activate-your-pro-license). Nothing else leaves your server.

## Where to go next

- 🖼️ [Watermarks](/watermarks) — per-template settings.
- 🎯 [Conditional rules](/conditional-rules) — when each watermark applies.
- ⚡ [Performance](/performance) — caching & batches.
- 💎 [Pro features](/features) — Display tab and WooCommerce details.
