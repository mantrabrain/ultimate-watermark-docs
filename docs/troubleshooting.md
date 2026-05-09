---
title: Troubleshooting
description: Fix common Ultimate Watermark issues — watermark not applied, blurry result, transparent PNG black background, memory errors, OTF cache stale, license activation.
---

# Troubleshooting

A symptom-based guide. Find the closest match, follow the steps, and you'll have it sorted in minutes.

## Activation & license

### Pro deactivates immediately on activation

**Symptom**: clicking _Activate_ on Ultimate Watermark Pro shows _Plugin auto-deactivated because Ultimate Watermark is required_.

**Cause**: the free plugin is not active (or is older than `ULTIMATE_WATERMARK_MIN_VERSION` 2.0).

**Fix**:

1. Open <span class="screen-path">Plugins → Installed Plugins</span>.
2. Activate (and update if needed) **Ultimate Watermark** first.
3. Then activate **Ultimate Watermark Pro**.

### License activation fails

**Symptom**: the License page shows _Could not connect to license server_ or _Invalid response_.

**Causes & fixes**:

| Cause | Fix |
| --- | --- |
| Outbound HTTPS firewall on your host | Whitelist `store.mantrabrain.com` in your host's outbound rules. |
| `wp_remote_post` blocked by a security plugin | Temporarily disable Wordfence / iThemes Security and retry. |
| Site URL changed since purchase | Manually deactivate the old URL in your MantraBrain account, then activate fresh. |
| License expired | Renew at [mantrabrain.com/account](https://mantrabrain.com/account/). |

## Watermarks not applied

### Newly uploaded image is not watermarked

**Cause checklist** (in order of likelihood):

1. **No active watermark template**.
   - Check <span class="screen-path">Watermark → Watermarks</span>. Make sure at least one is **Active**.
2. **Rules don't match**.
   - Edit the watermark, check the **Rules** tab. If you have `Post type = product` but uploaded the image standalone, it won't match.
   - **Empty rules apply to every upload** — start with empty rules to confirm the engine works.
3. **Image size restriction**.
   - Empty `Image size` rule applies to all sizes. If you set `Image size = full only`, thumbnails won't be watermarked.
4. **Automatic watermarking turned off**.
   - Edit the watermark → **Basic** tab → **Automatic watermarking** must be **on**.
5. **GD/Imagick missing**.
   - <span class="screen-path">Tools → Site Health → Info → Server</span> must show GD or Imagick.

### Existing images aren't watermarked

Watermarks apply **on upload only**. To watermark already-uploaded images:

<ol class="step-list">
  <li>Open <span class="screen-path">Media → Library → List view</span>.</li>
  <li>Select the images.</li>
  <li>Bulk action: <strong>Apply Ultimate Watermark</strong>.</li>
  <li>Click <strong>Apply</strong>.</li>
</ol>

For thousands of images, use Pro's batch processor — see [Performance](/performance#background-batch-processing).

### Watermark visible on full size but not thumbnails (or vice versa)

**Cause**: the watermark's **Image size** rule excludes some sizes.

**Fix**: edit the watermark, go to **Rules**, clear the Image size field (applies to all) or add the missing size.

## Visual issues

### Watermark looks pixelated / blurry

**Causes**:

- Image watermark is being upscaled. Ultimate Watermark scales the watermark image to match the requested size; if the source PNG is small, the result blurs.
- **Fix**: provide a watermark PNG **at least 2× the largest output size** so it scales **down** crisply.

### Transparent PNG output has black background

**Cause**: GD doesn't preserve alpha when re-saving JPEGs by default; certain image conversions strip transparency.

**Fix**:

- For watermarks **on JPEGs**: this is expected — JPEG has no alpha. Use a PNG output if you need transparency.
- For PNG → PNG with the watermark: ensure your source watermark is a 32-bit PNG (RGBA), not 24-bit (RGB).

### Watermark is in the wrong corner on small images

**Cause**: pixel-based offsets that exceed the small image's dimensions.

**Fix**: switch the offset unit from `pixels` to `percentage` so positioning scales with the image.

### Text watermark looks tiny on large images

**Cause**: GD renders text at the literal font size — 24 px on a 4000 px image is barely visible.

**Fix**: either (a) use Imagick (auto-scales by subsize ratio) or (b) increase the font size to suit the largest output.

## Memory & performance

### Out of memory during bulk apply

**Causes**: WordPress shared-host PHP memory limit is too low for image processing.

**Fixes**:

1. Add to `wp-config.php`:
   ```php
   define( 'WP_MEMORY_LIMIT', '512M' );
   ```
2. If your host caps PHP `memory_limit` lower, contact support.
3. Process fewer images per pass — use Pro's batch (10/pass) instead of selecting 200 in the bulk action.

### Bulk apply hangs / times out

**Cause**: synchronous bulk action exceeds the PHP `max_execution_time`.

**Fix**: split into smaller batches (~50 at a time), or use Pro's background batch processor.

### OTF rendering is slow on first visit

**Expected** — the OTF cache populates on first request. Subsequent visits are served from `uploads/ultimate-watermark-frontend-cache/` quickly. To pre-populate, hit each image URL once (a sitemap crawler works well).

### OTF cache stale / shows old watermark

**Cause**: edge cache (Cloudflare / CDN) is serving the old version, or your settings aren't updating the cache hash.

**Fix**:

1. Clear the OTF cache from settings (or `rm -rf wp-content/uploads/ultimate-watermark-frontend-cache/`).
2. Purge your CDN's cache for the same path.
3. The hash includes the watermark template's mtime and the image's mtime — if the watermark template hasn't been re-saved (just toggled options), force a re-save by changing a field, saving, then changing back and saving again.

## REST / block editor uploads

### Images uploaded via the block editor aren't watermarked

**Cause**: very rare — the metadata pipeline is hooked. Possible causes:

- Another plugin shortcuts `wp_generate_attachment_metadata`.
- Custom code in your theme runs `wp_insert_attachment` without metadata.

**Fix**: temporarily deactivate other plugins, retry. If the issue persists, file a support ticket with the list of active plugins.

### Direct FTP / SCP upload not watermarked

**Expected** — those bypass the WordPress media pipeline. After uploading via FTP, run the **Bulk → Apply** in Media Library or `wp media regenerate`.

## Right-click / drag

### Right-click protection doesn't work

**Causes**:

- Browser extension overrides `contextmenu` (e.g. some screenshot extensions).
- A theme JavaScript prevents Ultimate Watermark's listener from binding.

**Fix**:

1. Open dev tools → **Console** → `getEventListeners(document).contextmenu` to confirm a listener is attached.
2. Disable other plugins one by one to find the conflict.

### Logged-in users still get the protection

**Cause**: <span class="screen-path">Settings → Enable protection for logged-in users</span> is **on**.

**Fix**: turn it off.

## WP-Cron

### WP-Cron isn't running

**Symptom**: Pro batches stall, or no scheduled events fire.

**Cause**: WP-Cron only fires on page visits. Low-traffic sites barely run cron.

**Fix**: switch to a real cron job:

1. Add to `wp-config.php`:
   ```php
   define( 'DISABLE_WP_CRON', true );
   ```
2. Add a system cron entry (cPanel → Cron Jobs):
   ```
   */5 * * * * curl -s https://yoursite.com/wp-cron.php?doing_wp_cron > /dev/null 2>&1
   ```

This pings WP-Cron every 5 minutes regardless of visitors.

## Multisite

### Plugin shows on subsite but no menu

**Cause**: Network admin needs to grant the plugin to the subsite, but the activation hook didn't fire there.

**Fix**: from Network Admin → Plugins → Network Activate, then visit each subsite once.

## Diagnostics

### Enable debug logging

Add to `wp-config.php`:

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );
```

Reproduce the issue, then check `wp-content/debug.log` for entries with `ultimate_watermark` or `uwm_`.

### Hook tracer

Drop this in `wp-content/mu-plugins/uw-trace.php`:

```php
<?php
add_action( 'all', function ( $hook_name ) {
    if ( strpos( $hook_name, 'ultimate_watermark' ) === 0
      || strpos( $hook_name, 'uwm_' ) === 0 ) {
        error_log( "[UW] $hook_name" );
    }
} );
```

This logs every plugin hook that fires during a request — useful for tracking which point in the pipeline isn't running.

## Where to go next

- ❓ [FAQs](/faqs) — quick answers to common questions.
- 💬 [Get support](/support) — when you need a human.
- 🪝 [Hooks & filters](/hooks-filters) — extend behaviour for edge cases.
