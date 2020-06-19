import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// CSS(bootstrap-honoka)のロード
import 'bootstrap-honoka/dist/css/bootstrap.css'

// bootstrap-vueライブラリのロード
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
  render: h => h(App),
}).$mount('#app')
