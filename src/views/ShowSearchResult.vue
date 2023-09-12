<script setup lang="ts">
import ShowThumbnailList from '@/components/ShowThumbnailList.vue'

import { watchEffect } from 'vue'
import { useShowsSearchStore } from '@/stores/showsSearch'
import { useRoute } from 'vue-router'
const route = useRoute()

const shows = useShowsSearchStore()
watchEffect(() => {
  shows.searchFor(route.params.query as string)
})
</script>
<template>
  <main>
    <ShowThumbnailList title="Search results" :list="shows.list" :is-loading="shows.isLoading" />
  </main>
</template>
<style scoped>
main {
  padding: 2rem;
}
</style>
