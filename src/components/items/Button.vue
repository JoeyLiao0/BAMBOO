<script setup>
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const props = defineProps({
  height: {
    type: Number,
    default: 50,
  },
  width: {
    type: Number,
    default: 100,
  },
  padding: {
    type: Number,
    default: 4,
  },
  onColor: {
    type: String,
    default: "#2196f3",
  },
  offColor: {
    type: String,
    default: "#ccc",
  },
  roundColor: {
    type: String,
    default: "#fff",
  },
});

console.log(props);

const themeStore = useThemeStore();
const { currentThemeName } = storeToRefs(themeStore);

const isDark = ref(currentThemeName.value === "dark");

function toggleSwitch() {
  themeStore.setTheme(isDark.value ? "dark" : "light");
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
  --height: v-bind(props.height + "px");
  --width: v-bind(props.width + "px");
  --padding: v-bind(props.padding + "px");
  --on-color: v-bind(props.onColor); /* 动态绑定选中颜色 */
  --off-color: v-bind(props.offColor); /* 动态绑定未选中颜色 */
  --round-color: v-bind(props.roundColor);
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

  background-color: var(--off-color);
  transition:
    background-color 0.8s,
    box-shadow 0.2s;
  border-radius: 999px;
}

.round {
  position: absolute;

  height: calc(var(--height) - 2 * var(--padding));
  aspect-ratio: 1 / 1;

  left: var(--padding);
  bottom: var(--padding);

  transition: transform 0.4s ease;

  background-color: var(--round-color);
  border-radius: 999px;
}

input:checked + .slider {
  background-color: var(--on-color);
}

input:checked + .slider .round {
  transform: translateX(calc(var(--width) - var(--height)));
}
</style>
