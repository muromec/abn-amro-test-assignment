<script setup lang="ts">
import ShowThumbnailList from '@/components/ShowThumbnailList.vue'
import { onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'

const shows = useShowsStore()
onMounted(() => {
  shows.lazyLoad()
})
</script>

<template>
  <main>
    <ShowThumbnailList
      title="Drama"
      :list="shows.filterByGenre('Drama').value"
      :is-loading="shows.isLoading"
    />
    <ShowThumbnailList
      title="Comedy"
      :list="shows.filterByGenre('Comedy').value"
      :is-loading="shows.isLoading"
    />
    <ShowThumbnailList
      title="Mystery"
      :list="shows.filterByGenre('Mystery').value"
      :is-loading="shows.isLoading"
    />
  </main>
</template>
<style scoped>
main {
  padding: 2rem;
}
</style>
