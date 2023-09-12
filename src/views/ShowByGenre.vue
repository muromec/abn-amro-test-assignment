<script setup lang="ts">
import ShowThumbnailList from '@/components/ShowThumbnailList.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

import { onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'
import { useRoute } from 'vue-router'
const route = useRoute()
const shows = useShowsStore()

onMounted(() => {
  shows.lazyLoad()
})
</script>

<template>
  <main>
    <ErrorMessage v-if="shows.isError" />
    <ShowThumbnailList
      v-else
      :title="route.params.query"
      :list="shows.filterByGenre(route.params.query as string).value"
      :is-loading="shows.isLoading"
    />
  </main>
</template>
<style scoped>
main {
  padding: 2rem;
}
</style>
