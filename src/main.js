import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/fonts/iconfont.css' // 引入iconfont
import Vant from 'vant'
import 'vant/lib/index.css' // 引入vant组件库
import 'amfe-flexible/index.min.js' // 引入rem适配根标签

/* // 移动端适配
// 1. rem动态
//   - amfe-flexible
//   - 不管处于什么分辨率, 1rem始终是 1/10视口大小

// 2. 将px --> rem
//  - postcss-pxtorem
//  - vant官网
//  - 版本是5.1.1
 */

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
