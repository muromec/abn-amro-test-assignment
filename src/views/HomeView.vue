<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows';
import ShowThumbnail from '@/components/ShowThumbnail.vue';

const shows = useShowsStore();
onMounted(() => {
  shows.load();
});
</script>

<template>
  <main>
    Main page
    <ul v-if="shows.list">
      <ShowThumbnail v-for="show of shows.list" key="show.id" :value="show" />
    </ul>
  </main>
</template>
<style scoped>
main {
  padding: 2rem;
}
</style>
