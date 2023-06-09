import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layoutModule.vue'),
      children: [
        {
          path:'/',
          name:'pic2pdf',
          component: () => import('@/views/Pic2Pdf.vue')
        }
      ]
    },
  ]
})

export default router
