// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
import Vue from 'vue'
// import store from './store'
import router from './router'
// import { sync } from 'vuex-router-sync'
// import VueRouter from 'vue-router'
import App from './App'
import './assets/base.css'
import './assets/iconfont.css'
// const routers = new VueRouter()
// routers.beforeEach(function (to, from, next) {
//   console.log(to, from, next)
// })

// sync(store, router)
// sync(router)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
