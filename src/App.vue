<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SearchForm from './components/SearchForm.vue'
</script>

<template>
  <header>
    <h1>I am a film gallery</h1>
    <div class="wrapper">
      <SearchForm class="search" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  line-height: 1.5;
  min-width: 100vw;
  padding: 0 2rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
}
.wrapper {
  display: flex;
}

nav {
  height: 100%;
  display: flex;
  align-items: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
