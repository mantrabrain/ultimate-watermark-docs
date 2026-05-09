---
title: Support
description: How to get help with Ultimate Watermark — community forum, MantraBrain support portal, priority Pro help, and writing a useful bug report.
---

# Support

The fastest path depends on whether you're using the free plugin or Ultimate Watermark Pro.

## Free users

### WordPress.org support forum

For general questions, bugs, and "how do I…" issues with the free plugin:

- 🌐 [WordPress.org → Ultimate Watermark → Support](https://wordpress.org/support/plugin/ultimate-watermark/)
- Include the answers from [What to include in a bug report](#what-to-include-in-a-bug-report) below.
- Volunteer-supported — replies usually within 1–3 business days.

### Documentation

You're already here. Use the search box (top of page, on every page) to scan the entire docs site by keyword.

## Pro users

### MantraBrain support portal

Pro license holders get **priority email support**:

- 🌐 [mantrabrain.com/support](https://mantrabrain.com/support/)
- Sign in with the email tied to your license.
- File a ticket with the answers from [What to include in a bug report](#what-to-include-in-a-bug-report) below.
- Replies typically within 24 hours.

## What to include in a bug report

The more of these you can pre-fill, the faster we can help:

1. **WordPress version** — `WordPress X.Y` from the bottom-right of any admin page.
2. **PHP version** — `Tools → Site Health → Info → Server`.
3. **Image library** (GD / Imagick / both) — same Site Health screen.
4. **Ultimate Watermark (free) version** — `Plugins → Installed Plugins`.
5. **Ultimate Watermark Pro version** (if using Pro) — same.
6. **Active theme name & version**.
7. **Other plugins** active during the issue.
8. **Steps to reproduce** — write them as numbered steps.
9. **What you expected**.
10. **What actually happened** — include screenshots if possible.
11. **Browser console errors** (F12 → Console) — copy any red lines.
12. **`wp-content/debug.log`** entries with `ultimate_watermark` or `uwm_` in them.
13. **Sample image** (if image-specific) — original + your watermark template export.

### Enabling debug logging

Add to `wp-config.php` (above `/* That's all, stop editing! */`):

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );
```

Reproduce the issue once, then check `wp-content/debug.log`.

## Common channels — at a glance

| Channel | Purpose | Audience |
| --- | --- | --- |
| [WordPress.org forum](https://wordpress.org/support/plugin/ultimate-watermark/) | General questions, free plugin bugs | Free + Pro |
| [MantraBrain support](https://mantrabrain.com/support/) | Priority help, license issues | Pro only |
| [GitHub](https://github.com/mantrabrain/ultimate-watermark-docs) | Docs source & history | Developers |

## Before opening a ticket

A quick sanity pass that resolves ~30 % of "bugs":

- ✅ Make sure both Free and Pro are **up to date**.
- ✅ Confirm GD or Imagick is installed.
- ✅ Disable third-party plugins one by one — see if the issue persists.
- ✅ Switch to a default theme (Twenty Twenty-Four / Five) — see if the issue persists.
- ✅ Clear caches — page cache, object cache, browser cache, OTF cache.
- ✅ Test with a fresh image upload — sometimes the issue is specific to one file.
- ✅ Check the [Troubleshooting](/troubleshooting) page for your symptom.

If the issue persists, file your ticket — and mention the steps you've already tried.

## Feature requests

We track feature requests separately from bugs:

- 🌐 [mantrabrain.com/contact](https://mantrabrain.com/contact/) — pick "Feature request" in the form.
- Include a clear use case ("I run X kind of business and I'd love it if Y").
- Pro license holders get priority on the roadmap.

## Custom development

Need a custom integration, watermark type, or migration? We do paid custom work for **Pro** customers — reach out via [mantrabrain.com/contact](https://mantrabrain.com/contact/).

## Where to go next

- ❓ [FAQs](/faqs) — answers before you ask.
- 🛠️ [Troubleshooting](/troubleshooting) — fix the most common issues.
- 📋 [Changelog](/changelog) — what's in each release.
