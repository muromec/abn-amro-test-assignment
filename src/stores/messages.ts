import { ref } from 'vue'
import { defineStore } from 'pinia'

type MessageType = 'error' | 'notify'
type Message = {
  id: number
  type: MessageType
  contents: string
}

export const useMessagesStore = defineStore('messages', () => {
  let nextId = 0
  const stack = ref<Array<Message>>([])

  /* However tempting it is to add timeout here to dissmiss messages
     automatically, it's against accessibility guidlines to do so
     without also letting user pause the timer or adjust it's duration */
  function addMessage(type: MessageType, contents: string) {
    const message: Message = {
      id: nextId,
      type,
      contents
    }
    stack.value.push(message)
    nextId += 1
  }

  function removeMessage(id: number) {
    stack.value = stack.value.filter((message) => message.id !== id)
  }

  return { stack, addMessage, removeMessage }
})
