<script setup lang="ts">
void 0 /* not having setup spols coverage for quick look */
</script>
<template>
  <div role="alert">Something went a bit wrong and we will deal with it in no time.</div>
</template>
<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 13vh;
  line-height: 1.1;
  padding: 0 1em;
  padding-bottom: 1em;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-thickness: 0.03em;
}
@media screen and (max-width: 600px) {
  div {
    padding: 0;
    margin: var(--margin-v) var(--margin-h);
    font-size: 1.5rem;
    align-items: start;
  }
}
</style>
