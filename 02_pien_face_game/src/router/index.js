import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Result from '../views/Result.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
    /** 
     * Vue-Routerのボイラープレートにはルートレベルコード分割
     * （このルートのための別のチャンク (about. [hash].js) を生成し、ルートが訪問されたときに遅延ロードされる）があるが
     * Electronの場合は遅延ロードする利点は特にないので、使う必要はない
     */
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  }
]

const router = new VueRouter({
  routes
})

export default router
