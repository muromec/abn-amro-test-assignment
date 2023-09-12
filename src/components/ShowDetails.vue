<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { cleanupHTML } from '@/utils/cleanupHTML'
import type { Show } from '@/stores/types'

const props = defineProps(['value'])
const details: Ref<Show> = computed(() => props.value)
function makeGenreRef(genre: string) {
  return `/genre/${genre}/`
}
</script>

<template>
  <div class="details">
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
  <div class="links">
    API:
    <a :href="details._links.self.href" :title="`API Link to ${details.name}`">{{
      details._links.self.href
    }}</a>
  </div>
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
.links {
  margin: 2rem 0;
}
</style>
