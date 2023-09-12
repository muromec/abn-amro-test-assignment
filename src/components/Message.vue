<script setup lang="ts">
import type { MessageType } from '@/stores/messages'
const props = defineProps(['id', 'type', 'content'])
const emit = defineEmits(['close'])
const typeLabel = {
  notify: 'Info',
  error: 'Error'
}[props.type as MessageType]
function handleClose() {
  emit('close', props.id)
}
</script>
<template>
  <div class="message" :class="`message-${type}`">
    <div class="contents">
      <span class="type">{{ typeLabel }}</span>
      <span>{{ props.content }}</span>
    </div>
    <button @click="handleClose">Close</button>
  </div>
</template>
<style scoped>
.message {
  margin: 0.5rem 0;
  padding: 0.7rem 1.5rem;
  border-radius: 0.7rem;
  color: var(--color-text);
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--color-border);
  animation: slidein 0.4s;
  position: relative;
}
.message.message-info {
  background-color: color-mix(in srgb, #34c9eb 10%, white);
}
.message.message-error {
  background-color: color-mix(in srgb, #fa0000 10%, white);
}

.message span {
  padding-inline: 0.2rem;
}
.message span.type {
  border-inline-end: 1px solid var(--color-border);
}

button {
  appearance: none;
  border: none;
  margin-inline-start: 1.5rem;
  border-radius: 0.3rem;
}

@keyframes slidein {
  from {
    top: -30vh;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
</style>
