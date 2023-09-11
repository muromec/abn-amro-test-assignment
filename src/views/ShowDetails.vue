<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShowsStore } from '@/stores/shows'

const route = useRoute()
const shows = useShowsStore()
onMounted(() => {
  shows.load()
})
const details = shows.findDetails(Number(route.params.id))
</script>

<template>
  <main>
    <div v-if="details">
      <h2>{{ details.name }}</h2>
      <img :src="details.image.medium" />
    </div>
  </main>
</template>
<style scoped>
main {
  padding: 2rem;
}
</style>
