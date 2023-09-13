<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { ref } from 'vue'
const props = defineProps(['id', 'name', 'image', 'isSelected'])

const element = ref<HTMLElement | null>(null)
const router = useRouter()

function scrollIntoView() {
  ;(element.value as HTMLElement).scrollIntoView({ block: 'center', inline: 'center' })
}
function open() {
  return router.push(url)
}
defineExpose({ scrollIntoView, open })
const url = `/show/${props.id}/`
</script>
<template>
  <li
    role="listitem"
    class="show-thumbnail"
    :class="{ 'show-thumnail--selected': isSelected }"
    ref="element"
  >
    <router-link :to="url" tabindex="-1">
      <img
        data-testid="poster"
        :src="props.image"
        :alt="`Poster for ${props.name}`"
        :title="props.name"
      />
    </router-link>
  </li>
</template>
<style scoped>
.show-thumbnail {
  margin: 0 0.3rem;
  margin-bottom: 1rem;
}
.show-thumnail--selected {
  outline: 3px var(--color-border) solid;
  outline-offset: 0.1rem;
  border-radius: 0.3rem;
}
.show-thumbnail a {
  display: inline-block;
}
</style>
