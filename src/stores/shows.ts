import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from './api'
import type { Show } from './types'

export const useShowsStore = defineStore('shows', () => {
  const api = useApiStore()

  const list = ref<Show[] | null>(null)
  const loadingState = ref<'initial' | 'error' | 'loading' | 'ok'>('initial')

  async function load() {
    loadingState.value = 'loading'
    const response = await api.makeRequest<Show[]>('https://api.tvmaze.com/shows')

    if (response) {
      list.value = response
      loadingState.value = 'ok'
    } else {
      loadingState.value = 'error'
    }
  }

  function lazyLoad() {
    if (list.value) {
      return
    }
    return load()
  }

  function filterByGenre(genre: string) {
    return computed(() => list.value && list.value.filter((item) => item.genres.includes(genre)))
  }

  function findDetails(id: number) {
    return computed(() => list.value && list.value.find((item) => item.id === id))
  }

  const isLoading = computed(() => loadingState.value === 'loading')
  const isError = computed(() => loadingState.value === 'error')

  return { list, filterByGenre, findDetails, load, lazyLoad, isLoading, isError }
})
