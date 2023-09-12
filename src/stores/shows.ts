import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from './api'

type Link = {
  href: string
}

export type Show = {
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

export const useShowsStore = defineStore('shows', () => {
  const api = useApiStore()

  const list = ref<Show[] | null>(null)
  const isLoading = ref<boolean>(false)

  async function load() {
    isLoading.value = true
    const response = await api.makeRequest<ShowList>('https://api.tvmaze.com/shows')
    if (response) {
      list.value = response
    }
    isLoading.value = false
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

  return { list, filterByGenre, findDetails, load, lazyLoad, isLoading }
})
