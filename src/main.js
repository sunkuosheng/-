import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import {routes} from './routes/routes'
import {store} from './store/store'
import md5 from './plugins/md5'
import Vuex from 'vuex'
import pages from'./pags/pages.vue'
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(md5);
Vue.use(Vuex);
Vue.component('pages', pages);

const router = new VueRouter({
    routes,
    mode: 'history',
})
router.beforeEach((to,from,next)=>{
    let isLogin = window.localStorage.getItem("sessionId");
    console.log(isLogin.length);
      if(isLogin.length>0||to.name === 'Login')
      {
          console.log(123);
          console.log(isLogin);
          next();
      }
      else
      {
         alert('请登录!');
          next('/');

      }
})
Vue.config.productionTip = false

new Vue({
    router,
    store:store,
    render: h => h(App)
}).$mount('#app')
