import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    meta: { guess: true },
    component: () => import('../views/mainpage.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: { login: true },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user/signup',
    name: 'signup',
    meta: { guess: true },
    component: () => import('../views/register_member.vue')
  },
  {
    path: '/user/signuplibrarian',
    name: 'signuplibrarian',
    meta: { login: true },
    component: () => import('../views/register_librarian.vue')
  },
  {
    path: '/user/login',
    name: 'login',
    meta: { guess: true },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/user/borrow',
    name: 'borrow',
    meta: { login: true },
    component: () => import('../views/borrow.vue')
  },
  {
    path: '/user/return',
    name: 'return',
    meta: { login: true },
    component: () => import('../views/return_book.vue')
  },
  {
    path: '/user/manage_book',
    name: 'manage_book',
    meta: { login: true },
    component: () => import('../views/manage_book.vue')
  },
  {
    path: '/user/profile',
    name: 'profilepage',
    meta: { login: true },
    component: () => import('../views/profile.vue')
  },
  {
    path: '/user/edit',
    name: 'edit',
    meta: { login: true },
    component: () => import('../views/editbook.vue')
  },
  {
    path: '/user/accept',
    name: 'accept',
    meta: { login: true },
    component: () => import('../views/accept.vue')
  }
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/user/login' })
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in")
    next({ path: '/home'})
  }

  next()
})
export default router
