<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
// import Sidebar from './components/items/Sidebar.vue'
import ThemeButton from './components/items/ThemeButton.vue'
import Button from './components/items/Button.vue'
</script>

<template>
  <div>
    <Button></Button>
  </div>
</template>

<style scoped>
div {
  height: 52px;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: content-box;
  border: 1px solid white;
}
</style>
<!-- <div class="sidebar-container">
      <Sidebar></Sidebar>
    </div>
    <div class="content-container">
      <RouterView />
    </div> -->

<!-- <ThemeButton></ThemeButton> -->
