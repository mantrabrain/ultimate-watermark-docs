<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

type MarkdownSourceConfig = { pattern?: string }

const { page, theme, frontmatter } = useData()

const rawUrl = computed(() => {
  if (frontmatter.value.markdownActions === false) return ''
  const pattern = (theme.value as { markdownSource?: MarkdownSourceConfig }).markdownSource
    ?.pattern
  const rel = page.value.relativePath
  if (!pattern || !rel) return ''
  return pattern.replace(':path', rel)
})

const visible = computed(() => Boolean(rawUrl.value))

const copied = ref(false)

async function copyPage() {
  const url = rawUrl.value
  if (!url) return
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('fetch failed')
    const text = await res.text()
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <div v-if="visible" class="vp-markdown-actions" aria-label="Markdown source">
    <button type="button" class="vp-markdown-actions__btn" @click="copyPage">
      {{ copied ? 'Copied!' : 'Copy page' }}
    </button>
    <a
      class="vp-markdown-actions__link"
      :href="rawUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      View as Markdown
    </a>
  </div>
</template>
