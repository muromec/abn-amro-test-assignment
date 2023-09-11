import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useShowsStore = defineStore('shows', () => {
  const list = ref(null)

  async function load() {
    const response = await fetch('https://api.tvmaze.com/shows')
    const data = await response.json()
    list.value = data
  }

  async function searchFor(query) {
    const url = new URL('https://api.tvmaze.com/search/shows')
    url.searchParams.set('q', query)
    const response = await fetch(url)
    const data = await response.json()
    list.value = data.map((result) => result.show)
  }

  function filterByGenre(genre) {
    return computed(() => list.value.filter((item) => item.genres.includes(genre)))
  }

  function findDetails(id) {
    return computed(() => list.value && list.value.find((item) => item.id === id))
  }

  return { list, filterByGenre, findDetails, load, searchFor }
})
