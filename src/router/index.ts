import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowDetails from '../views/ShowDetails.vue'
import ShowSearchResult from '../views/ShowSearchResult.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/show/:id/',
      name: 'show',
      component: ShowDetails
    },
    {
      path: '/search/:query/',
      name: 'search',
      component: ShowSearchResult
    }
  ]
})

export default router
