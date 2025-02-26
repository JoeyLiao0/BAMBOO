<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
</script>

<template>
  <div class="demo">
    <p>{{ theme }}</p>
    <button @click="toggleTheme">切换主题</button>
  </div>
</template>

<style scoped>
.demo {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  width: 200px;
  height: 200px;
  background-color: lightcyan;
  border-radius: 10px;
  border: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.demo button {
  width: 100px;
  height: 40px;
  background-color: lightsalmon;
  border-radius: 999px;
  border: none;
}

.demo p {
  font-size: 1.5rem;
  color: rgb(5, 42, 255);
}
</style>
