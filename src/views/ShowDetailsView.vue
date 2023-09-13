<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useShowDetails } from '@/stores/showDetails'
import { cleanupHTML } from '@/utils/cleanupHTML'
import ErrorMessage from '@/components/ErrorMessage.vue'
import ShowDetails from '@/components/ShowDetails.vue'

const route = useRoute()
const detailsStore = useShowDetails()

watchEffect(async () => {
  await detailsStore.lazyLoadById(Number(route.params.id))
})
const details = detailsStore.findDetails(Number(route.params.id))
const isError = detailsStore.isErrorById(Number(route.params.id))
</script>

<template>
  <main>
    <ErrorMessage v-if="isError" />
    <ShowDetails v-if="details" :value="details" />
  </main>
</template>
