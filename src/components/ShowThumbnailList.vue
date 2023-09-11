<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'
import ShowThumbnail from '@/components/ShowThumbnail.vue'
const props = defineProps(['genre'])

const shows = useShowsStore()
onMounted(() => {
  shows.load()
})
const filteredList = shows.filterByGenre(props.genre)

const selectedIndex = ref(-1)
const items = ref(null)

function handleFocus() {
  selectedIndex.value = 0
  items.value[selectedIndex.value].scrollIntoView()
}

function handleBlur() {
  selectedIndex.value = -1
}

function handleOpen() {
  items.value[selectedIndex.value].open()
}

function loop(value, max) {
  if (value < 0) {
    return max
  }
  if (value > max) {
    return 0
  }
  return value
}

function move(offset) {
  selectedIndex.value = loop(selectedIndex.value + offset, filteredList.value.length - 1)
  items.value[selectedIndex.value].scrollIntoView()
}
</script>
<template>
  <h2>{{ props.genre }}</h2>
  <ul
    v-if="shows.list"
    class="show-thumbnail-list"
    @keydown.prevent.left="move(-1)"
    @keydown.prevent.right="move(1)"
    @keydown.space="handleOpen"
    @focus="handleFocus"
    @blur="handleBlur"
    role="list"
  >
    <ShowThumbnail
      class="show-thumbnail"
      ref="items"
      v-for="(show, index) of filteredList"
      key="show.id"
      :id="show.id"
      :name="show.name"
      :image="show.image.medium"
      :value="show"
      :is-selected="index === selectedIndex"
    />
  </ul>
</template>
<style scoped>
h2 {
  margin-left: 0.3rem;
}
.show-thumbnail-list {
  display: flex;
  max-width: calc(100vw * 0.95);
  overflow-x: scroll;
  padding: 1rem 0;
}
.show-thumbnail-list:focus-within {
  outline: none;
}
.show-thumbnail {
  margin: 0 0.3rem;
}

ul::-webkit-scrollbar {
  display: none;
}

ul {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
