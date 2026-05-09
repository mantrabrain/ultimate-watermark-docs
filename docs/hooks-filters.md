---
title: Hooks & filters
description: Extend Ultimate Watermark with WordPress actions and filters — settings, watermark types, rules evaluator, processors, dynamic placeholders, frontend assets.
---

# Hooks & filters

Ultimate Watermark exposes actions and filters across both plugins so you can add behaviour without forking. This page lists the most useful ones with file:line references.

> Some marketing-mentioned hooks are **subscribed but never fired** in the current build. Those are flagged below as `dead`.

## Bootstrap & lifecycle

| Hook | Type | Args | When | File:line |
| --- | --- | --- | --- | --- |
| `ultimate_watermark_init` | action | `$plugin` | After textdomain & migration. | `Plugin.php:240` |
| `ultimate_watermark_admin_init` | action | `$plugin` | Admin bootstrap. | `Plugin.php:254` |
| `ultimate_watermark_enqueue_assets` | action | `$plugin` | Inside enqueue cycle. | `Plugin.php:268` |
| `ultimate_watermark_deactivate` | action | `$plugin` | Plugin deactivation. | `Plugin.php:285` |

```php
add_action( 'ultimate_watermark_init', function ( $plugin ) {
    // Register custom watermark types or dynamic placeholders.
} );
```

## Settings

| Hook | Type | Use |
| --- | --- | --- |
| `ultimate_watermark_settings_config` | filter | Modify settings field config rendered on the Settings page. |
| `ultimate_watermark_settings_tabs` | filter | Add tabs to the Settings page. |
| `ultimate_watermark_load_frontend_assets` | filter | Decide whether to enqueue right-click protection JS. |

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

> `ultimate_watermark_settings_fields` (subscribed in `ProAdminManager.php:29`) is **dead** — Free SettingsPage doesn't apply it. Use `ultimate_watermark_settings_config` instead.

## Watermark builder form

| Hook | Type | Use | File:line |
| --- | --- | --- | --- |
| `ultimate_watermark_type_options` | filter | Add new watermark types (beyond text/image). | `AddWatermarkPage.php:645` |
| `ultimate_watermark_text_settings_fields` | filter | Add fields to the text-watermark Appearance tab. | `:665` |
| `ultimate_watermark_add_form_sections` | filter | Add a new section to the Add Watermark form. | `:994` |
| `ultimate_watermark_rules_sections` | filter | Add to the Rules tab. | `:1000` |
| `ultimate_watermark_form_tabs` | filter | Add a new tab to the builder. | `:1006` |
| `ultimate_watermark_after_textarea_field` | action | Render extra HTML after a textarea field (Pro uses for placeholder helper). | `:418` |

```php
// Add a "Stamp profile" watermark type alongside text/image.
add_filter( 'ultimate_watermark_type_options', function ( $types ) {
    $types['stamp_profile'] = 'Stamp profile';
    return $types;
} );
```

## Rules evaluator

| Hook | Type | Args | Use | File:line |
| --- | --- | --- | --- | --- |
| `uwm_condition_types` | filter | `$types` | Register a custom rule type. | `AddWatermarkPage.php:1082` |
| `uwm_evaluate_condition` | filter | `$matches, $rule, $context` | Evaluate a rule for a given image context. | `RulesEvaluator.php:135` |
| `uwm_condition_context_value` | filter | `$value, $rule, $context` | Override the value pulled from context for a rule. | `:246` |
| `uwm_compare_values` | filter | `$matches, $left, $operator, $right` | Override comparison logic for a rule. | `:278` |

See [Conditional rules → Custom rule types via filter](/conditional-rules#custom-rule-types-via-filter) for a full example.

## Watermark data resolver

| Hook | Type | Use | File:line |
| --- | --- | --- | --- |
| `ultimate_watermark_sanitize_type` | filter | Sanitize the type value during save. | `WatermarkDataResolver.php:95` |
| `ultimate_watermark_before_normalize_data` | filter | Modify raw data before normalisation. | `:131` |
| `ultimate_watermark_after_normalize_data` | filter | Modify normalised data before persistence. | `:198` |
| `ultimate_watermark_sanitized_data` | filter | Final sanitization pass. | `WatermarkAjaxHandler.php:210` |

## Save lifecycle

| Hook | Type | Args | When |
| --- | --- | --- | --- |
| `ultimate_watermark_saved` | action | `$watermark_id, $data` | After save (`WatermarkAjaxHandler.php:574`). |
| `ultimate_watermark_security_violation` | action | `$type, $context` | Security guard tripped. |

```php
add_action( 'ultimate_watermark_saved', function ( $id, $data ) {
    // Sync watermark to a CDN edge config.
}, 10, 2 );
```

## Processors

| Hook | Type | Args | Use | File:line |
| --- | --- | --- | --- | --- |
| `ultimate_watermark_apply_custom_type` | action | `$image, $watermarkData, $type` | Apply a custom raster type that GD/Imagick processors don't know. | `GDWatermarkProcessor.php:294` |
| `ultimate_watermark_handle_custom_type` | filter | `$result, $image, $data, $type` | Return a non-false value to short-circuit and supply your own rendered image. | `:279` |

```php
add_filter( 'ultimate_watermark_handle_custom_type', function ( $result, $image, $data, $type ) {
    if ( $type !== 'qr' ) return $result;
    // ... render QR onto $image, return modified GD/Imagick handle ...
    return $image;
}, 10, 4 );
```

## Frontend / data

| Hook | Type | Use | File:line |
| --- | --- | --- | --- |
| `ultimate_watermark_load_frontend_assets` | filter (bool) | Whether to load right-click / drag-protection JS. | `AssetManager.php:130` |
| `ultimate_watermark_build_data` | filter | Tweak the data passed to the frontend (e.g. extra image URLs). | `WatermarkHelper.php:168` |
| `ultimate_watermark_statistics` | filter | Modify stats for the Analytics page. | `WatermarkHelper.php:873` |

## Pro: dynamic content

| Hook | Type | Args | Use |
| --- | --- | --- | --- |
| `ultimate_watermark_pro_register_dynamic_types` | action | `$manager` | Register additional placeholder types. |
| `ultimate_watermark_pro_resolve_placeholder` | filter | `($value, $placeholder, $data)` | Replace what a placeholder renders. |

```php
add_filter( 'ultimate_watermark_pro_resolve_placeholder', function ( $value, $placeholder, $data ) {
    if ( $placeholder === 'order_id' && ! empty( $data['post_id'] ) ) {
        return get_post_meta( $data['post_id'], '_order_id', true );
    }
    return $value;
}, 10, 3 );
```

## License updater (Pro)

| Hook | Type | Use |
| --- | --- | --- |
| `in_plugin_update_message-{$file}` | action | Custom update message row (WP core). |
| `edd_sl_api_request_verify_ssl` | filter | SSL verify for EDD updater. |
| `https_local_ssl_verify` | filter | License HTTP SSL switch. |

## Hooks that look like hooks but aren't

The following are **subscribed in code but never fired** — flagged for documentation honesty:

| Hook | Reason |
| --- | --- |
| `ultimate_watermark_before_apply` | Pro `DynamicWatermarkProcessor.php:22` subscribes; **no `do_action` exists** in either plugin. Treat as no-op. |
| `ultimate_watermark_admin_enqueue_scripts` | Pro `ProPlugin.php:117` subscribes; **never fired**. The real admin enqueue is `ProAdminManager::enqueueAssets`. |
| `ultimate_watermark_settings_fields` | Pro `ProAdminManager.php:29` subscribes; the free SettingsPage doesn't apply it. Use `ultimate_watermark_settings_config` instead. |

## Tip: discover all hooks at runtime

Drop this in `wp-content/mu-plugins/uw-hook-trace.php`:

```php
<?php
add_action( 'all', function ( $hook_name ) {
    if ( strpos( $hook_name, 'ultimate_watermark' ) === 0
      || strpos( $hook_name, 'uwm_' ) === 0 ) {
        error_log( "[Ultimate Watermark hook] $hook_name" );
    }
} );
```

This logs every plugin hook that fires during a request.

## Where to go next

- 🎯 [Conditional rules](/conditional-rules) — custom rule type recipes.
- ⚙️ [Global settings](/settings) — settings filter usage.
- 🔌 [REST & WP integration](/api-reference) — how the plugin hooks WP core.
