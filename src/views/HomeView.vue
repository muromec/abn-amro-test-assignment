<script setup lang="ts">
import ShowThumbnailList from '@/components/ShowThumbnailList.vue'
import { onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'

const shows = useShowsStore()
onMounted(() => {
  shows.load()
})
</script>

<template>
  <main v-if="shows.list">
    <ShowThumbnailList title="Drama" :list="shows.filterByGenre('Drama')" />
    <ShowThumbnailList title="Comedy" :list="shows.filterByGenre('Comedy')" />
    <ShowThumbnailList title="Mystery" :list="shows.filterByGenre('Mystery')" />
  </main>
</template>
<style scoped>
main {
  padding: 2rem;
}
</style>
