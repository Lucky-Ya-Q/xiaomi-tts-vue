import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/tts-login'
import noDevice from '../views/tts-no-device'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/no-device',
    component: noDevice
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
