import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowDetailsView from '../views/ShowDetailsView.vue'
import ShowSearchResult from '../views/ShowSearchResult.vue'
import ShowByGenre from '../views/ShowByGenre.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/genre/:query/',
      name: 'genre',
      component: ShowByGenre
    },
    {
      path: '/show/:id/',
      name: 'show',
      component: ShowDetailsView
    },
    {
      path: '/search/:query/',
      name: 'search',
      component: ShowSearchResult
    }
  ]
})

export default router
