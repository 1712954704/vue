import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 抽奖插件
import LuckDraw from 'vue-luck-draw'
// axios
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(LuckDraw)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
