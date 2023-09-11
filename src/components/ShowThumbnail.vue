<script setup lang="ts">
const props = defineProps(['value'])
</script>
<template>
<li>
  {{ props.value.name }}
  <img :src="props.value.image.medium" :alt="`Poster for ${props.value.name}`" />
</li>
</template>
