<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const query = ref('')
const router = useRouter()

function handleSearch() {
  router.push(`/search/${query.value}`)
}
</script>
<template>
  <form @submit.prevent="handleSearch">
    <input :placeholder="$gettext('Search…')" v-model="query" />
  </form>
</template>
