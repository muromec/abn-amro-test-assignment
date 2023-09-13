<script setup lang="ts">
import MessageElement from './MessageElement.vue'
import { useMessagesStore } from '@/stores/messages'

const messages = useMessagesStore()
</script>
<template>
  <div class="message-area">
    <div class="message-row">
      <MessageElement
        v-for="message of messages.stack"
        :key="message.id"
        :id="message.id"
        :type="message.type"
        :content="message.contents"
        @close="messages.removeMessage"
      />
    </div>
  </div>
</template>
<style scoped>
.message-area {
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.message-row {
  display: flex;
  flex-direction: column;
  pointer-events: all;
}
button {
  position: fixed;
  top: 50vh;
}
</style>
