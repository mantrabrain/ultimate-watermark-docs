import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const vitepressLastUpdatedComponent = path.resolve(
  __dirname,
  '../../node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue'
)
const customLastUpdatedComponent = path.resolve(
  __dirname,
  './theme/components/VPDocFooterLastUpdated.vue'
)

export default defineConfig({
  title: 'Ultimate Watermark Documentation',
  description:
    'Official documentation for the Ultimate Watermark WordPress plugin (Free + Pro) — text & image watermarks, conditional rules, on-the-fly Pro display, performance & integrations.',
  lang: 'en-US',

  head: [
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Ultimate Watermark, WordPress, watermark plugin, image protection, copyright, text watermark, image watermark, MantraBrain'
      }
    ],
    ['meta', { name: 'author', content: 'MantraBrain' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#4f46e5' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/docs/logo.svg' }],
    ['link', { rel: 'manifest', href: '/docs/site.webmanifest' }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://ultimate-watermark.mantrabrain.com/docs/' }],
    ['meta', { property: 'og:title', content: 'Ultimate Watermark Documentation' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Text & image watermarks, conditional rules, on-the-fly Pro display, performance and Pro features.'
      }
    ],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Ultimate Watermark Documentation' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content: 'Text & image watermarks, conditional rules, on-the-fly Pro display, performance and Pro features.'
      }
    ],

    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Ultimate Watermark Documentation',
        description:
          'Official documentation for the Ultimate Watermark WordPress plugin (Free + Pro).',
        url: 'https://ultimate-watermark.mantrabrain.com/docs/'
      })
    ]
  ],

  base: '/docs/',
  /** Resolved relative to the VitePress root (`docs/`); keeps Netlify publish at `docs/.vitepress/dist`. */
  outDir: '.vitepress/dist',
  cleanUrls: true,

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Ultimate Watermark Docs',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          {
            text: 'Get started',
            items: [
              { text: 'Installation', link: '/installation' },
              { text: 'Quick start', link: '/quick-start' },
              { text: 'Your WordPress admin', link: '/admin-dashboard' }
            ]
          },
          {
            text: 'Protect your images',
            items: [
              { text: 'Watermarks (text + image)', link: '/watermarks' },
              { text: 'Positioning & sizing', link: '/positioning' },
              { text: 'Conditional rules', link: '/conditional-rules' },
              { text: 'Backups & originals', link: '/settings#backups' }
            ]
          },
          {
            text: 'Configure',
            items: [
              { text: 'Global settings', link: '/settings' },
              { text: 'Performance & caching', link: '/performance' },
              { text: 'Pro features overview', link: '/third-party-integrations' },
              { text: 'All Pro features', link: '/features' }
            ]
          }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Hooks & filters', link: '/hooks-filters' },
          { text: 'REST & WP integration', link: '/api-reference' }
        ]
      },
      {
        text: 'Help',
        items: [
          { text: 'FAQs', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Support', link: '/support' }
        ]
      },
      {
        text: 'Ultimate Watermark Pro',
        link: 'https://mantrabrain.com/plugins/ultimate-watermark',
        target: '_blank',
        rel: 'noopener'
      }
    ],

    sidebar: [
      {
        text: 'Get started',
        collapsed: false,
        items: [
          { text: 'Home', link: '/' },
          { text: 'Installation', link: '/installation' },
          { text: 'Quick start', link: '/quick-start' },
          { text: 'Your WordPress admin', link: '/admin-dashboard' }
        ]
      },
      {
        text: 'Protect your images',
        collapsed: false,
        items: [
          { text: 'Watermarks (text + image)', link: '/watermarks' },
          { text: 'Positioning & sizing', link: '/positioning' },
          { text: 'Conditional rules', link: '/conditional-rules' }
        ]
      },
      {
        text: 'Configure',
        collapsed: false,
        items: [
          { text: 'Global settings', link: '/settings' },
          { text: 'Performance & caching', link: '/performance' },
          { text: 'Pro features overview', link: '/third-party-integrations' },
          { text: 'All Pro features', link: '/features' }
        ]
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'Hooks & filters', link: '/hooks-filters' },
          { text: 'REST & WP integration', link: '/api-reference' }
        ]
      },
      {
        text: 'Help',
        collapsed: false,
        items: [
          { text: 'FAQs', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Support', link: '/support' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mantrabrain/ultimate-watermark-docs' }
    ],

    footer: {
      message:
        '© MantraBrain · GPLv3+ · <a href="https://mantrabrain.com/plugins/ultimate-watermark#pricing" target="_blank" rel="noopener"><strong>Ultimate Watermark</strong> — pricing</a>',
      copyright: `Copyright © ${new Date().getFullYear()} MantraBrain`
    },

    editLink: {
      pattern:
        'https://github.com/mantrabrain/ultimate-watermark-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated'
    },

    search: { provider: 'local' },

    outline: { level: [2, 3], label: 'On this page' },

    docFooter: { prev: 'Previous', next: 'Next' },

    markdownSource: {
      pattern:
        'https://raw.githubusercontent.com/mantrabrain/ultimate-watermark-docs/main/docs/:path'
    }
  },

  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' }
  },

  vite: {
    define: { __VUE_OPTIONS_API__: false },
    server: { host: true },
    build: { minify: 'esbuild', chunkSizeWarningLimit: 1000 },
    optimizeDeps: { exclude: ['vitepress'] },
    resolve: {
      alias: {
        [vitepressLastUpdatedComponent]: customLastUpdatedComponent
      }
    }
  },

  ignoreDeadLinks: true,

  sitemap: { hostname: 'https://ultimate-watermark.mantrabrain.com/docs/' },

  transformHead: ({ pageData }) => {
    const description =
      pageData.frontmatter?.description ||
      'Official documentation for the Ultimate Watermark WordPress plugin (Free + Pro).'
    const title = pageData.title
      ? `${pageData.title} | Ultimate Watermark Documentation`
      : 'Ultimate Watermark Documentation'
    const slug = pageData.relativePath.replace(/\.md$/, '').replace(/(^|\/)index$/, '')
    const canonical = slug
      ? `https://ultimate-watermark.mantrabrain.com/docs/${slug}`
      : 'https://ultimate-watermark.mantrabrain.com/docs/'
    return [
      ['meta', { name: 'description', content: description }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['link', { rel: 'canonical', href: canonical }]
    ]
  }
})
