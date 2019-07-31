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
    // console.log(to);
    // console.log(from);
    // next();
    const nextRoute = ['home', 'user', 'menu', 'role', 'dict','dept','info','wxMenu','collectionUser'];
    let isLogin = global.isLogin;  // �Ƿ��¼
    // δ��¼״̬����·�ɵ�nextRouteָ��ҳʱ����ת��login
    if (nextRoute.indexOf(to.name) >= 0) {
        if (!isLogin) {
            console.log('what fuck');
            routes.push({ name: 'Login' })
        }
    }
    // �ѵ�¼״̬����·�ɵ�loginʱ����ת��home
    if (to.name === 'Login') {
        if (isLogin) {
            routes.push({ name: 'home' });
            console.log('�Ѿ���½��');
        }
    }
    next();
})
Vue.config.productionTip = false

new Vue({
    router,
    store:store,
    render: h => h(App)
}).$mount('#app')
