<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useShowDetails } from '@/stores/showDetails'
import { cleanupHTML } from '@/utils/cleanupHTML'
import ErrorMessage from '@/components/ErrorMessage.vue'

const route = useRoute()
const detailsStore = useShowDetails()

watchEffect(async () => {
  await detailsStore.lazyLoadById(Number(route.params.id))
})
const details = detailsStore.findDetails(Number(route.params.id))
const isError = detailsStore.isErrorById(Number(route.params.id))

function makeGenreRef(genre: string) {
  return `/genre/${genre}/`
}
</script>

<template>
  <main>
    <ErrorMessage v-if="isError" />
    <div v-else-if="details" class="details">
      <div class="col">
        <h2>{{ details.name }}</h2>
        <img class="poster" :src="details.image.medium" />
        <div class="genres">
          <span v-for="genre of details.genres">
            <router-link :to="makeGenreRef(genre)">{{ genre }}</router-link>
          </span>
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
img.poster {
  margin-top: 1rem;
}
.summary {
  margin: 3rem 2rem;
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
