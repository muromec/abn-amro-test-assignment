<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'
import ShowThumbnail from '@/components/ShowThumbnail.vue'
const props = defineProps(['genre'])

const shows = useShowsStore()
onMounted(() => {
  shows.load()
})
</script>
<template>
  <ul v-if="shows.list">
    <ShowThumbnail
      v-for="show of shows.list"
      key="show.id"
      :name="show.name"
      :image="show.image.medium"
      :value="show"
    />
  </ul>
</template>
