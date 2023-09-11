<script setup lang="ts">
import ShowThumbnailList from '@/components/ShowThumbnailList.vue'
</script>

<template>
  <main>
    <ShowThumbnailList genre="Drama" />
    <ShowThumbnailList genre="Comedy" />
    <ShowThumbnailList genre="Mystery" />
  </main>
</template>
<style scoped>
main {
  padding: 2rem;
}
</style>
