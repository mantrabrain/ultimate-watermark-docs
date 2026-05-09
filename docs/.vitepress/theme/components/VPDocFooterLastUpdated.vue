<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useData } from 'vitepress'

const { theme, page } = useData()

const date = computed(() => new Date(page.value.lastUpdated!))
const isoDatetime = computed(() => date.value.toISOString())
const datetime = ref('')

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

/** Example: 2026 April 10 - 10:12PM (local time, client-rendered) */
function formatLastUpdated(d: Date): string {
  const y = d.getFullYear()
  const month = MONTHS[d.getMonth()]
  const day = d.getDate()
  let hour24 = d.getHours()
  const min = d.getMinutes().toString().padStart(2, '0')
  const ampm = hour24 >= 12 ? 'PM' : 'AM'
  let h12 = hour24 % 12
  if (h12 === 0) h12 = 12
  return `${y} ${month} ${day} - ${h12}:${min}${ampm}`
}

onMounted(() => {
  watchEffect(() => {
    datetime.value = formatLastUpdated(date.value)
  })
})
</script>

<template>
  <p class="VPLastUpdated">
    {{ theme.lastUpdated?.text || theme.lastUpdatedText || 'Last updated' }}:
    <time :datetime="isoDatetime">{{ datetime }}</time>
  </p>
</template>

<style scoped>
.VPLastUpdated {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .VPLastUpdated {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
