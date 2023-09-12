<script setup lang="ts">
import ShowThumbnailList from '@/components/ShowThumbnailList.vue'
import ShowSkeletonList from '@/components/ShowSkeletonList.vue'

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
    <ShowSkeletonList :count="30" title="Search results" v-if="shows.isLoading" />
    <ShowThumbnailList v-if="shows.list" title="Search results" :list="shows.list" />
  </main>
</template>
<style scoped>
main {
  padding: 2rem;
}
</style>
