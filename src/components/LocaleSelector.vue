<script setup lang="ts">
import { useGettext } from 'vue3-gettext'
const gettext = useGettext()
function select(code: string) {
  gettext.current = code
}
const languages = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' }
]
</script>
<template>
  <div>
    <label>{{ $gettext('Select language') }}</label>
    <ul role="menubar">
      <button
        v-for="lang in languages"
        role="menuitem"
        :key="lang.code"
        :aria-selected="gettext.current === lang.code"
        @click="select(lang.code)"
      >
        {{ lang.label }}
      </button>
    </ul>
  </div>
</template>
<style scoped>
div {
  display: flex;
  margin: var(--margin-v) var(--margin-h);
  margin-top: -3rem;
}
ul {
  list-style: none;
  padding: 0;
}
button {
  appearance: none;
  background: none;
  border: none;
  border-left: 1px dashed var(--color-border);
}
button:first-child {
  border-left: none;
}
[aria-selected='true'] {
  border-bottom: 2px solid var(--color-border);
}
</style>
