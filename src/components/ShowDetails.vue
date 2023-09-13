<script setup lang="ts">
import { computed } from 'vue'
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
    <div class="col poster">
      <h2 data-testid="show-title-id">{{ details.name }}</h2>
      <img class="poster" :src="details.image.medium" />
      <div class="genres">
        <span v-for="(genre, index) of details.genres" :key="index">
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
.details {
  display: flex;
  flex-direction: row;
  column-gap: var(--margin-h);
}
@media screen and (max-width: 600px) {
  .details {
    flex-direction: column;
  }
}

img.poster {
  margin-top: 1rem;
}
.summary {
  margin-top: calc(var(--margin-v) + 1rem); /* to align with the image above */
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
  margin: var(--margin-v) 0;
}
.col.poster {
  max-width: 210px;
}
</style>
