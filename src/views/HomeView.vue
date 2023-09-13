<script setup lang="ts">
import ShowThumbnailList from '@/components/ShowThumbnailList.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

import { onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'

const shows = useShowsStore()
onMounted(() => {
  shows.lazyLoad()
})
</script>

<template>
  <main>
    <ErrorMessage v-if="shows.isError" />
    <template v-else>
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
    </template>
  </main>
</template>
