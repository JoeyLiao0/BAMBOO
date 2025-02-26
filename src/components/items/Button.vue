<script setup>
import { ref } from 'vue'

const isToggled = ref(false)

function toggleSwitch() {
  console.log('Switch toggled:', isToggled.value)
}
</script>

<template>
  <label class="switch">
    <input type="checkbox" v-model="isToggled" @change="toggleSwitch" />
    <div class="slider">
      <div class="round"></div>
    </div>
  </label>
</template>

<style scoped>
.switch {
  --height: 50px;
  --width: 160px;
  --margin: 4px;

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
