<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useShowsStore } from '@/stores/shows'
import { useKeyboard } from '@/utils/keyboard'
import ShowThumbnail from '@/components/ShowThumbnail.vue'
import ShowSkeletonList from '@/components/ShowSkeletonList.vue'

const props = defineProps(['title', 'list', 'isLoading'])

const items = ref<Array<InstanceType<typeof ShowThumbnail>>>([])
const { selectedIndex, handleFocus, handleBlur, handleOpen, move } = useKeyboard(items)
</script>
<template>
  <h2 data-testid="show-title-id">{{ props.title }}</h2>
  <ShowSkeletonList :count="30" v-if="isLoading" />
  <ul
    v-else-if="list"
    class="show-thumbnail-list"
    @keydown.prevent.left="move(-1)"
    @keydown.prevent.right="move(1)"
    @keydown.space="handleOpen"
    @focus="handleFocus"
    @blur="handleBlur"
    role="list"
  >
    <ShowThumbnail
      ref="items"
      v-for="(show, index) of list"
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
.show-thumbnail-list {
  display: flex;
  max-width: calc(100vw * 0.95);
  overflow-x: scroll;
  padding: 1rem 0;
  list-style: none;
  line-height: 1;
  margin: 0 -0.3rem;
}
.show-thumbnail-list:focus-within {
  outline: none;
}
@media screen and (max-width: 715px) {
  .show-thumbnail-list {
    flex-wrap: wrap;
    justify-content: space-between;
    rows-gap: 2rem;
  }
}
ul::-webkit-scrollbar {
  display: none;
}

ul {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
