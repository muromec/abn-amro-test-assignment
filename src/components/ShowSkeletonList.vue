<script setup lang="ts">
import ShowSkeleton from './ShowSkeleton.vue'
const props = defineProps(['title', 'count'])
const list = new Array(props.count).fill(null)
</script>
<template>
  <h2>{{ props.title }}</h2>
  <div class="wrapper" aria-busy="true" aria-live="polite">
    <ShowSkeleton v-for="(_empty, index) in list" :key="index" />
  </div>
</template>
<style scoped>
.wrapper {
  padding: 1rem 0;
  display: flex;
  max-width: calc(100vw * 0.95);
  overflow-x: hidden;
  pointer-events: none;
  margin: 0 -0.3rem;
}
</style>
