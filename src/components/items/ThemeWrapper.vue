<template>
  <slot></slot>
</template>

<script setup>
import { onMounted, provide, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeObject = useThemeStore()

function updateCSSVariables() {
  const theme = themeObject.themes[themeObject.currentThemeName]
  document.documentElement.style.setProperty('--bg-color', theme.bgColor)
  document.documentElement.style.setProperty('--text-color', theme.textColor)
}

onMounted(() => {
  updateCSSVariables()
})

watch(
  () => themeObject.currentThemeName,
  () => {
    updateCSSVariables()
  },
)
</script>
