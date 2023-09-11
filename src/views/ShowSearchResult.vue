<script setup lang="ts">
import ShowThumbnailList from '@/components/ShowThumbnailList.vue'

import { watchEffect } from 'vue'
import { useShowsStore } from '@/stores/shows'
import { useRoute } from 'vue-router'
const route = useRoute()

const shows = useShowsStore()
watchEffect(() => {
  shows.searchFor(route.params.query as string)
})
</script>
<template>
  <ShowThumbnailList title="Search results" :list="shows.list" />
</template>
