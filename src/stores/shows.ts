import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useShowsStore = defineStore('shows', () => {
  const list = ref(null)

  async function load() {
    const response = await fetch('https://api.tvmaze.com/shows')
    const data = await response.json()
    list.value = data
  }

  return { list, load }
})
