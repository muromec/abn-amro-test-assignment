<script setup lang="ts">
import ShowThumbnailList from '@/components/ShowThumbnailList.vue'
import { onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'
import { useRoute } from 'vue-router'
const route = useRoute()
const shows = useShowsStore()

onMounted(() => {
  shows.load()
})
</script>

<template>
  <main v-if="shows.list">
    <ShowThumbnailList
      :title="route.params.query"
      :list="shows.filterByGenre(route.params.query as string).value"
    />
  </main>
</template>
<style scoped>
main {
  padding: 2rem;
}
</style>
