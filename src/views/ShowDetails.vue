<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShowsStore } from '@/stores/shows'
import { cleanupHTML } from '@/utils/cleanupHTML'

const route = useRoute()
const shows = useShowsStore()
onMounted(() => {
  shows.load()
})
const details = shows.findDetails(Number(route.params.id))
</script>

<template>
  <main>
    <div v-if="details" class="details">
      <div class="col">
        <h2>{{ details.name }}</h2>
        <img :src="details.image.medium" />
        <div class="genres">
          <span v-for="genre of details.genres">{{ genre }}</span>
        </div>
      </div>
      <div class="col summary">
        <p>{{ cleanupHTML(details.summary) }}</p>
        <p>Language: {{ details.language }}</p>
        <p>Premiered: {{ details.premiered }}</p>
      </div>
    </div>
  </main>
  <footer v-if="details">
    API:
    <a :href="details._links.self.href" :title="`API Link to ${details.name}`">{{
      details._links.self.href
    }}</a>
  </footer>
</template>
<style scoped>
main {
  padding: 2rem;
}
.details {
  display: flex;
  flex-direction: row;
}
.summary {
  margin: 2rem;
}
.summary p {
  margin-bottom: 0.4rem;
}

.genres {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.genres span {
  margin: 0 0.1rem;
  text-decoration-line: underline;
}
footer {
  margin: 2rem;
}
</style>
