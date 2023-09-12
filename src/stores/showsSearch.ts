import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from './api'
import type { Show } from './shows'

type Link = {
  href: string
}

type SearchResult = {
  show: Show
}
type SearchResultList = Array<SearchResult>

export const useShowsSearchStore = defineStore('showsSearch', () => {
  const api = useApiStore()

  const list = ref<Show[] | null>(null)
  const loadingState = ref<'initial' | 'error' | 'loading' | 'ok'>('initial')
  const lastQuery = ref<string | null>(null)

  async function apiSearchFor(query: string) {
    const url = new URL('https://api.tvmaze.com/search/shows')
    url.searchParams.set('q', query)
    loadingState.value = 'loading'
    const response = await api.makeRequest<SearchResultList>(url)
    if (response) {
      list.value = response.map((result) => result.show)
      loadingState.value = 'ok'
    } else {
      loadingState.value = 'error'
    }
    lastQuery.value = query
  }
  function searchFor(query: string) {
    if (lastQuery.value === query) {
      return
    }
    return apiSearchFor(query)
  }
  const isLoading = computed(() => loadingState.value === 'loading')
  const isError = computed(() => loadingState.value === 'error')

  return { list, searchFor, isLoading, isError }
})
