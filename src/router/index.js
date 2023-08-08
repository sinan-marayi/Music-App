import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import useUserStore from '@/stores/user'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/ManageView.vue'),
    meta:{isAuthRequired:true}
  },
  {
    path: '/manage-music',
    redirect: { name: 'manage' }
  },  
  {
    path:'/song/:id',
    name:'song',
    component: () => import('../views/SongView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

// global gaurd (imp)

router.beforeEach((to, from, next) => {

  if(!to.meta.isAuthRequired){
    next()
    return
  }

  const userStore = useUserStore()

  if(userStore.isLoggedIn){
    next()
  }else{
    next({name:'home'})
  }

})

export default router
