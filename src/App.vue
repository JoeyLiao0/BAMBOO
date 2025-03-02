<script setup>
import { RouterView } from "vue-router";
import Sidebar from "@/components/items/Sidebar.vue";
import ThemeWrapper from "./components/items/ThemeWrapper.vue";
import Button from "./components/items/Button.vue";

import { getDemo } from "@/api/userApi";
getDemo();
</script>

<template>
  <ThemeWrapper>
    <Sidebar></Sidebar>
    <Button></Button>
    <RouterView></RouterView>
  </ThemeWrapper>
</template>

<style scoped>
/* 让 .full-screen 占据整个屏幕 */
.full-screen {
  flex: 1;
  min-height: 0;
}
</style>
