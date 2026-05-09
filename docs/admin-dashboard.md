---
title: Your WordPress admin
description: A plain-English map of the Ultimate Watermark WordPress admin sidebar — every menu item, what it does, and the corresponding docs page.
---

# Your WordPress admin

After activating Ultimate Watermark, a top-level **Watermark** menu appears in the WordPress sidebar. Click any item below for the matching docs page.

| Sidebar label | What it does | Docs |
| --- | --- | --- |
| **Watermark → Dashboard** | Overview cards (active watermarks, recent uploads, library stats). | This page |
| **Analytics** | Stats: number of images watermarked, breakdown by template, recent activity. | [Performance](/performance) |
| **Watermarks** | List of every watermark template you've created. Edit / duplicate / delete. | [Watermarks](/watermarks) |
| **Add Watermark** | Builder for a new watermark template (text or image). | [Watermarks](/watermarks) |
| **Settings** | Plugin-wide options: backup, right-click protection, drag prevention, logged-in protection. | [Global settings](/settings) |
| **Backups** | List of original images stored under `uploads/ulwm-backup/YYYY/MM/`. Restore individual images. | [Settings → Backups](/settings#backups) |
| **Get Pro** | Free-only: marketing comparison page for Ultimate Watermark Pro. | [Pro features](/features) |
| **License** <span class="pro-pill">PRO</span> | Activation, deactivation, status check, debug logs. | [Installation §2](/installation#activate-your-pro-license) |

## How the menus interact with each other

```
Watermark (top)
├─ Dashboard           — read-only overview
├─ Analytics           — stats & charts
├─ Watermarks          ──┬── Add Watermark
├─                       └── (edit existing in list)
├─ Settings            — plugin-wide options
├─ Backups             — original images list
├─ Get Pro             (free only)
└─ License             [Pro]
```

## Capabilities (who can see what)

Every menu requires `manage_options` (administrators by default). The plugin doesn't add custom roles or capabilities.

> If you need a non-admin role to manage watermarks, use a capability-mapping plugin like **User Role Editor** to grant `manage_options` to that role — but be aware this also grants access to a wide range of other site settings.

## Where the data lives

| Data | Storage |
| --- | --- |
| Watermark templates | Custom post type (`ultimate_watermark`). Configuration is in post meta. |
| Plugin-wide settings | WordPress options key `ultimate_watermark_options`. |
| Originals | Disk under `wp-content/uploads/ulwm-backup/YYYY/MM/`. |
| OTF cache <span class="pro-pill">PRO</span> | Disk under `wp-content/uploads/ultimate-watermark-frontend-cache/`. |
| Logs table | DB table `{$wpdb->prefix}ultimate_watermark_logs` exists but is currently unused (reserved for future). |

## Where next

- 🚀 [Quick start](/quick-start) — your first watermark.
- 🖼️ [Watermarks](/watermarks) — full builder reference.
- ⚙️ [Global settings](/settings) — plugin-wide options.
