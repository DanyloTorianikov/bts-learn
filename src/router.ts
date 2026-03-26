import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/members',
      name: 'members',
      component: () => import('./views/MembersView.vue')
    },
    {
      path: '/members/:id',
      name: 'member-detail',
      component: () => import('./views/MemberDetailView.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('./views/QuizView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
