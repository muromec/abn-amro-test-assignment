<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SearchForm from './components/SearchForm.vue'
import MessageArea from './components/MessageArea.vue'
import LocaleSelector from './components/LocaleSelector.vue'
</script>

<template>
  <MessageArea />
  <header>
    <h1 class="long">{{ $gettext('I am a film gallery') }}</h1>
    <h1 class="short">{{ $gettext('Films') }}</h1>
    <div class="wrapper">
      <SearchForm class="search" />
      <nav>
        <RouterLink to="/">{{ $gettext('Home') }}</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
  <LocaleSelector />
</template>

<style scoped>
header {
  display: flex;
  line-height: 1.5;
  min-width: 100vw;
  max-width: 100vw;
  padding: 0 var(--margin-h);
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
}
h1.short {
  display: none;
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
@media screen and (max-width: 600px) {
  h1.short {
    display: inline-block;
  }
  h1.long {
    display: none;
  }
}
@media screen and (max-width: 390px) {
  .search {
    display: none;
  }
}
</style>
