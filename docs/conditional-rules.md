---
title: Conditional rules
description: Apply watermarks only where they matter — by post type, image size, MIME type, dimensions, file size, orientation, aspect ratio, date range, and categories.
---

<div class="doc-pro-callout" role="note">
  <span class="doc-pro-pill">Pro</span>
  <span><strong>Free</strong> rules cover post type and image size. <strong>Pro</strong> adds file type, image dimensions, file size, orientation, aspect ratio, date range, post category, and (with WooCommerce) <code>product_cat</code> &amp; <code>product_tag</code>.</span>
  <a class="doc-pro-callout__cta" href="https://mantrabrain.com/plugins/ultimate-watermark#pricing" target="_blank" rel="noopener">View pricing &amp; buy →</a>
</div>

# Conditional rules

Most sites don't want every image watermarked. You probably want to:

- Stamp **product photos** but skip avatars.
- Watermark **gallery images** but leave thumbnails clean.
- Apply **only to images larger than 1000 px**.
- Different watermark for **product photos** than for **blog images**.

Conditional rules let you do all of that without writing code.

## Where rules are configured

Open <span class="screen-path">Watermark → Edit your template → Rules</span>.

You'll see one or more **rule rows**. Each row is a single condition. Multiple rules within a watermark are AND-combined (all must match).

Click **Add rule** to add another condition. Click **×** to remove.

## Free rule types

| Rule | What it matches |
| --- | --- |
| **Post type** | Apply only when the image is attached to a post of this type (`post`, `page`, `attachment`, custom CPTs). |
| **Image size** | Apply only to specific WordPress subsizes (`full`, `large`, `medium`, `thumbnail`, …). |

> If you leave **Image size** empty, every subsize is watermarked (`WatermarkHelper.php:660–662`).

## Pro rule types

<div class="pro-callout">
  <div class="pro-callout__head">
    <span class="pro-callout__badge">PRO</span>
    <span class="pro-callout__title">Granular conditions</span>
  </div>
  <p class="pro-callout__desc">Pro adds file type, dimensions, file size, orientation, aspect ratio, date range, and category-based rules. With WooCommerce active, you also get product category and tag rules.</p>
  <a class="pro-callout__cta" href="https://mantrabrain.com/plugins/ultimate-watermark#pricing">Unlock advanced rules →</a>
</div>

| Rule | What it matches |
| --- | --- |
| **File type** (`file_type`) | MIME type — `image/jpeg`, `image/png`, `image/gif`, `image/webp`. Skip e.g. PNG-with-alpha to avoid black backgrounds. |
| **Image width** | Match width as `is greater than`, `is less than`, or `equals` (in px). Skip thumbnails. |
| **Image height** | Same operators on height. |
| **File size** | Skip very small or very large files. Operators: `>`, `<`, `=` (KB / MB). |
| **Image orientation** | Landscape / portrait / square. |
| **Image aspect ratio** | Match `16:9`, `4:3`, `1:1`, custom. |
| **Date range** | Apply only to images uploaded between two dates. |
| **Post category** | Match parent post's category (taxonomy `category`). |
| **`product_cat`** (WC) | WooCommerce product category. |
| **`product_tag`** (WC) | WooCommerce product tag. |

> The full list of registered Pro condition types is in `ProAdminManager.php:1017–1118`.

## Operators

Each rule has an operator. Available values:

| Operator | Meaning |
| --- | --- |
| `equals` | Exact match. |
| `not_equals` | Not this value. |
| `contains` | Substring match (string fields). |
| `greater_than` | Numeric comparison. |
| `less_than` | Numeric comparison. |
| `in` | One of a list. |
| `not_in` | None of a list. |

## Common rule recipes

### Watermark only large images (≥ 1000 px wide)

| Rule | Operator | Value |
| --- | --- | --- |
| Image width | greater_than | 1000 |

### Watermark only product gallery images

| Rule | Operator | Value |
| --- | --- | --- |
| Post type | equals | product |
| Image size | in | full, large |

### Watermark JPEG and WebP, but skip PNG (transparency)

| Rule | Operator | Value |
| --- | --- | --- |
| File type | in | image/jpeg, image/webp |

### Different watermark for blog vs product

Create **two** templates:

**Template A** — _Blog watermark_

| Rule | Operator | Value |
| --- | --- | --- |
| Post type | equals | post |

**Template B** — _Product watermark_

| Rule | Operator | Value |
| --- | --- | --- |
| Post type | equals | product |

Each upload runs through both templates; only the matching one applies.

### Watermark only photos uploaded after 2024

| Rule | Operator | Value |
| --- | --- | --- |
| Date range | between | 2024-01-01 → today |

## Empty rules → apply to all

If a watermark has **no rules at all**, it applies to **every** uploaded image — subject to the image-size match in `watermark_sizes` (also acting as `apply to all` when empty).

## Rule precedence vs legacy

Older versions of Ultimate Watermark used `watermark_on` and `watermark_post_types` meta directly (`WatermarkHelper.php:494–519`). The current build prefers **unified `watermark_rules`**:

1. If `watermark_rules` is non-empty → evaluate via `RulesEvaluator`.
2. If `watermark_rules` is empty → fall back to legacy `watermark_on` + sizes (`WatermarkHelper.php:726–793`).

You don't need to think about this unless you're migrating from a very old install — the new builder writes `watermark_rules`.

## Custom rule types via filter

Add your own condition types by hooking `uwm_condition_types` (`AddWatermarkPage.php:1082`):

```php
add_filter( 'uwm_condition_types', function ( $types ) {
    $types['custom_meta'] = [
        'label'     => 'Custom post meta',
        'operators' => [ 'equals', 'not_equals' ],
    ];
    return $types;
} );

add_filter( 'uwm_evaluate_condition', function ( $matches, $rule, $context ) {
    if ( $rule['type'] !== 'custom_meta' ) return $matches;
    $value = get_post_meta( $context['post_id'], $rule['meta_key'], true );
    return $value === $rule['value'];
}, 10, 3 );
```

See [Hooks & filters](/hooks-filters#rules-evaluator) for the full evaluator API.

## Performance note

Each rule is evaluated **per subsize** during upload / metadata generation. Adding 10 rules per template costs ~10 × N evaluations per upload (where N = number of subsizes). For typical sites this is negligible — but if you're processing thousands of uploads in a batch, prefer **fewer specific rules** over many generic ones.

## Where to go next

- 🖼️ [Watermarks](/watermarks) — building the templates.
- 📐 [Positioning](/positioning) — anchor & offset details.
- ⚡ [Performance](/performance) — batch processing big libraries.
- 💎 [Pro features](/features) — full advanced rule set.
