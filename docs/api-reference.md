---
title: REST & WP integration
description: Ultimate Watermark doesn't register custom REST routes. It hooks into WordPress's media and metadata pipelines — this page documents which hooks, when, and what you can do at each integration point.
---

# REST & WP integration

Ultimate Watermark **does not register custom REST routes**. There are no `/wp-json/ultimate-watermark/v1/...` endpoints. There's also **no shortcode**, **no Gutenberg block**, **no Elementor widget**, and **no WP-CLI command** in the current build.

So how does it apply watermarks to images uploaded via the REST API or block editor?

By **hooking WordPress core's media pipeline** at multiple points. This page documents every hook used, in the order they fire, so you can plan integrations around them.

## The integration points

When an image is uploaded — whether via the classic Media Library, the block editor, the REST `/wp-json/wp/v2/media` endpoint, or a custom plugin — WordPress fires a series of hooks. Ultimate Watermark listens to several:

### 1. `wp_handle_upload` (per-file, on classic upload)

`MediaLibraryIntegration.php:34–35` listens here. Triggered by `wp_handle_upload` when admin uploads through the standard form.

The plugin checks the new file's MIME type and, if eligible, applies watermarks **after** WordPress writes the file to disk.

### 2. `wp_generate_attachment_metadata` (per-attachment, all upload paths)

`RestApiIntegration.php:60` filters this hook. WordPress fires it whenever it generates the metadata array for an attachment — which happens for **every** upload path: classic, block editor, REST, WP-CLI, custom plugins.

Per-subsize watermarking happens here. For each subsize (`thumbnail`, `medium`, `large`, `full`, etc.), the watermark is painted into the file on disk if rules match.

### 3. `add_attachment` and `rest_after_insert_attachment`

`RestApiIntegration.php:20–61` hooks both. Fires after the new attachment post is created. Useful for late-binding metadata that depends on the post (e.g. featured-image-aware rules).

### 4. `rest_request_before_callbacks`

Fires before any REST callback — used to set up runtime state for REST-driven uploads.

### 5. `rest_insert_attachment`

Fires when an attachment is inserted via REST.

### Featured image flow

When a post sets a featured image (`_thumbnail_id`), Ultimate Watermark loops through the gallery list and applies watermarks where rules match (`RestApiIntegration.php:226–270`).

## What hooks each upload type uses

| Upload path | Hooks observed | Subsizes watermarked |
| --- | --- | --- |
| Media → Add New (classic) | `wp_handle_upload` + `wp_generate_attachment_metadata` | All matching rules |
| Block editor (insert image) | `wp_generate_attachment_metadata` | All matching rules |
| REST `POST /wp/v2/media` | `wp_generate_attachment_metadata` + `rest_insert_attachment` + `rest_after_insert_attachment` | All matching rules |
| Programmatic `wp_insert_attachment` | `wp_generate_attachment_metadata` | All matching rules |
| WP-CLI `wp media import` | Same as programmatic | All matching rules |

Bottom line: **every** upload path goes through `wp_generate_attachment_metadata`, so watermarks always apply.

## What's NOT integrated automatically

- **Featured image already set** before plugin activation — won't be watermarked retroactively. Use **Bulk → Apply** in Media Library.
- **Direct file uploads outside WP**: SCP, FTP, etc. — bypass the metadata pipeline. Use Bulk → Apply afterward.
- **Custom upload plugins** that skip `wp_generate_attachment_metadata` — won't trigger watermarking.

## OTF (Pro) frontend integration

Pro's on-the-fly module hooks differently. It filters HTML output to swap original `<img>` URLs for cached watermarked URLs:

| Hook | What it does |
| --- | --- |
| `the_content` | Rewrites image URLs in post bodies. |
| `post_thumbnail_html` | Rewrites featured-image markup. |
| `wp_get_attachment_image_attributes` | Tweaks attachment image rendering. |
| `wp_calculate_image_srcset` | **Strips srcset** so only the OTF-rendered image is served. |
| WooCommerce-specific hooks | When `otf_apply_to_woocommerce` is on. |

OTF's URL hash includes the original file mtime, so cache invalidation is automatic.

## A "real" REST API for Ultimate Watermark

If you need a true `/wp-json/ultimate-watermark/v1/...` endpoint to drive watermarking from outside WordPress, you can add one yourself in a small mu-plugin:

```php
add_action( 'rest_api_init', function () {
    register_rest_route( 'ultimate-watermark/v1', '/apply', [
        'methods'             => 'POST',
        'callback'            => function ( $request ) {
            $attachment_id = (int) $request['attachment_id'];
            // Re-trigger metadata generation, which fires watermarking.
            $file = get_attached_file( $attachment_id );
            $meta = wp_generate_attachment_metadata( $attachment_id, $file );
            wp_update_attachment_metadata( $attachment_id, $meta );
            return rest_ensure_response( [ 'ok' => true ] );
        },
        'permission_callback' => function () {
            return current_user_can( 'manage_options' );
        },
    ] );
} );
```

This is the same flow the bulk action uses internally.

## Triggering a re-apply programmatically

Inside a plugin or theme:

```php
$attachment_id = 123;
$file = get_attached_file( $attachment_id );

// Regenerate metadata (re-runs subsize creation + watermarking).
$meta = wp_generate_attachment_metadata( $attachment_id, $file );
wp_update_attachment_metadata( $attachment_id, $meta );
```

Or use the popular **Regenerate Thumbnails** plugin — it fires the same hook.

## Restoring an unwatermarked original

If backups are enabled and a backup exists for the file:

```php
$attachment_id = 123;
do_action( 'ultimate_watermark_restore_original', $attachment_id );
```

> The restore action requires backups to have been enabled at the time of the original watermark. See [Settings → Backups](/settings#backups-originals).

## REST authentication

Standard WordPress REST authentication applies — cookies + nonce for the same site, **Application Passwords** or **JWT** for off-site clients. Ultimate Watermark doesn't add any auth layer of its own.

## What about WP-CLI?

The plugin doesn't ship `WP_CLI::add_command` registrations. Useful CLI workflows still work via existing WP commands:

```bash
# Re-watermark every image (regenerates subsizes + fires our hooks).
wp media regenerate --yes

# Re-watermark just one attachment.
wp media regenerate 123 --yes

# Process in chunks to avoid memory issues.
wp media regenerate $(wp post list --post_type=attachment --posts_per_page=50 --offset=0 --field=ID) --yes
```

## Webhooks

Ultimate Watermark doesn't expose webhooks of its own. To send a notification on each watermark:

```php
add_action( 'ultimate_watermark_saved', function ( $id, $data ) {
    wp_remote_post( 'https://your-webhook.example.com/uw-saved', [
        'body' => wp_json_encode( [ 'id' => $id, 'data' => $data ] ),
    ] );
}, 10, 2 );
```

## Where to go next

- 🪝 [Hooks & filters](/hooks-filters) — every action and filter.
- 🖼️ [Watermarks](/watermarks) — what gets watermarked, when.
- ⚡ [Performance](/performance) — OTF cache + batch.
- 🛠️ [Troubleshooting](/troubleshooting) — uploads not getting watermarked.
