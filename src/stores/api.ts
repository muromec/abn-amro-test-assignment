import { defineStore } from 'pinia'
import { useMessagesStore } from './messages'

export const useApiStore = defineStore('api', () => {
  const messages = useMessagesStore()

  async function makeRequest<ResponseType>(url: string | URL) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Expect 200')
      }
      return (await response.json()) as ResponseType
    } catch (error) {
      messages.addMessage('error', 'Ooops, Failed to load!')
    }
    return null
  }

  return { makeRequest }
})
