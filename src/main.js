import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import App from './App.vue'
require("./mock"); // import Mock from './mock'

Vue.config.productionTip = false
Vue.use(ElementUI)

// import VueRouter from 'vue-router'
// import routes from './routes'
// Vue.use(VueRouter)

// const router = new VueRouter({
//   routes
// })

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

new Vue({
	// router,
	render: h => h(App),
}).$mount('#app')
