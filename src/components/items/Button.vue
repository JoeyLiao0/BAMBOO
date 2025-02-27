<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const props = defineProps({
  height: {
    type: Number,
    default: 50,
  },
  width: {
    type: Number,
    default: 100,
  },
  margin: {
    type: Number,
    default: 4,
  },
})

const themeStore = useThemeStore()
const { currentThemeName } = storeToRefs(themeStore)

const isDark = ref(currentThemeName.value === 'dark')

function toggleSwitch() {
  themeStore.setTheme(isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <label class="switch">
    <input type="checkbox" v-model="isDark" @change="toggleSwitch" />
    <div class="slider">
      <div class="round"></div>
    </div>
  </label>
</template>

<style scoped>
.switch {
  --height: v-bind(props.height + 'px');
  --width: v-bind(props.width + 'px');
  --margin: v-bind(props.margin + 'px');

  position: relative;
  display: inline-block;
  box-sizing: content-box;
  width: var(--width);
  height: var(--height);
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute; /* 脱离文档流 */
  margin: 0;
  border: 0;
}

.slider {
  position: relative;
  display: block;
  cursor: pointer;
  width: 100%;
  height: 100%;

  background-color: #ccc;
  transition:
    background-color 0.8s,
    box-shadow 0.2s;
  border-radius: 999px;
  border: none;
}

.round {
  position: absolute;

  height: calc(var(--height) - 2 * var(--margin));
  aspect-ratio: 1 / 1;

  left: var(--margin);
  bottom: var(--margin);

  margin: auto 0;

  transition: transform 0.4s ease;

  background-color: white;
  border-radius: 999px;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider .round {
  transform: translateX(calc(var(--width) - var(--height)));
}
</style>
