import { defineStore } from 'pinia'
import { useMessagesStore } from './messages'

export const useApiStore = defineStore('api', () => {
  const messages = useMessagesStore()

  async function makeRequest<ResponseType>(url: string | URL) {
    const response = await fetch('https://api.tvmaze.com/shows')
    if (response.ok) {
      return (await response.json()) as ResponseType
    }
    messages.addMessage('error', 'Ooops, Failed to load!')
    return null
  }

  return { makeRequest }
})
