/**
 * Netlify serves the publish folder as the site root. With VitePress `base: '/docs/'`,
 * asset URLs are `/docs/assets/...`, so the bundle must place the VitePress output under
 * `docs/` (same idea as Sikshya’s `docs/docs/.vitepress/dist` layout). Routing uses
 * netlify.toml (shadow rewrite + optional root redirect).
 */
import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'docs/.vitepress/dist')
const out = join(root, 'netlify-dist')

if (!existsSync(dist)) {
  console.error('Missing VitePress output. Run `vitepress build docs` first:', dist)
  process.exit(1)
}

rmSync(out, { recursive: true, force: true })
mkdirSync(join(out, 'docs'), { recursive: true })
cpSync(dist, join(out, 'docs'), { recursive: true })

// Redirects live in netlify.toml (same pattern as Sikshya docs).

console.log('Netlify publish folder ready:', out)
