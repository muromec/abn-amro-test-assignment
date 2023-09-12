import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from './api'
import { useShowsStore } from './shows'
import type { Show } from './shows'

type ShowCashe = {
  [key: number]: Show
}
type LoadingStates = {
  [key: number]: 'loading' | 'error'
}

export const useShowDetails = defineStore('showDetails', () => {
  const cache = ref<ShowCash>({})
  const api = useApiStore()
  const loadingState = ref<LoadingStates>({})

  const shows = useShowsStore()

  async function loadById(id: number) {
    loadingState.value[id] = 'loading'
    const details = await api.makeRequest<Show>(`https://api.tvmaze.com/shows/${id}`)

    if (!details) {
      loadingState.value[id] = 'error'
      return null
    }
    delete loadingState.value[id]

    cache.value[id] = details
  }

  function lazyLoadById(id: number) {
    if (findDetails(id).value !== null) {
      return
    }
    return loadById(id)
  }

  function findDetails(id: number) {
    return computed(() => {
      // it's important to trigger both dependencies
      // instead of doing inline ||,
      // as vue has to know all access to make computed recompute
      const cachedEntry = cache.value[id]
      const cachedFromList = shows.findDetails(id).value
      return cachedEntry || cachedFromList || null
    })
  }

  function isLoadingById(id: number) {
    return computed(() => loadingState.value[id] === 'loading')
  }
  function isErrorById(id: number) {
    return computed(() => loadingState.value[id] === 'error')
  }

  return { lazyLoadById, isLoadingById, isErrorById, findDetails }
})
