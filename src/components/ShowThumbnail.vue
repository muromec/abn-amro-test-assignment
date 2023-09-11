<script setup lang="ts">
const props = defineProps(['name', 'image'])
</script>
<template>
  <li>
    {{ props.name }}
    <img :src="props.image" :alt="`Poster for ${props.name}`" />
  </li>
</template>
