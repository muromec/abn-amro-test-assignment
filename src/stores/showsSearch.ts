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

  async function searchFor(query: string) {
    const url = new URL('https://api.tvmaze.com/search/shows')
    url.searchParams.set('q', query)
    const response = await api.makeRequest<SearchResultList>(url)
    if (response) {
      list.value = response.map((result) => result.show)
    }
  }
  return { list, searchFor }
})
