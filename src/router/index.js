import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/tts-login'
import noDevice from '../views/tts-no-device'
import praise from '../views/tts-praise'
import layout from '../views/tts-layout'
import index from '../views/layout/tts-index'
import wode from '../views/layout/tts-wode'
import shizhong from '../views/layout/tts-shizhong'
import xiaoxi from '../views/layout/tts-xiaoxi'
import { getToken } from '@/utils/auth'

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/no-device',
    component: noDevice
  },
  {
    path: '/praise',
    component: praise
  },
  {
    path: '/layout',
    component: layout,
    redirect: '/layout/index',
    children: [
      {
        path: 'index',
        component: index
      },
      {
        path: 'wode',
        component: wode
      },
      {
        path: 'xiaoxi',
        component: xiaoxi
      },
      {
        path: 'shizhong',
        component: shizhong
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
const whiteList = ['/login', '/no-device', '/praise']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    next()
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
    }
  }
})

export default router
