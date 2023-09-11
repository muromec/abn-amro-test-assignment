import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Link = {
  href: string
}

type Show = {
  id: number
  name: string
  genres: Array<string>
  image: {
    original: string
    medium: string
  }
  summary: string
  language: string
  premiered: string
  _links: {
    self: Link
  }
}
type ShowList = Array<Show>
type SearchResult = {
  show: Show
}
type SearchResultList = Array<SearchResult>

export const useShowsStore = defineStore('shows', () => {
  const list = ref<ShowList | null>(null)

  async function load() {
    const response = await fetch('https://api.tvmaze.com/shows')
    if (response.ok) {
      const data = (await response.json()) as ShowList
      list.value = data
    } else {
      // TODO show error
    }
  }

  async function searchFor(query: string) {
    const url = new URL('https://api.tvmaze.com/search/shows')
    url.searchParams.set('q', query)
    const response = await fetch(url)
    if (response.ok) {
      const data = (await response.json()) as SearchResultList
      list.value = data.map((result) => result.show)
    } else {
      // TODO show error
    }
  }

  function filterByGenre(genre: string) {
    return computed(() => list.value && list.value.filter((item) => item.genres.includes(genre)))
  }

  function findDetails(id: number) {
    return computed(() => list.value && list.value.find((item) => item.id === id))
  }

  return { list, filterByGenre, findDetails, load, searchFor }
})
