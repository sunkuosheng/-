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
// Ĭ��URL����·��
// import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:7001/sys/user/list'
// import HelloWorld from './components/HelloWorld'
// import Login from '@/Login/Login.vue'
// import User from '@/User/User.vue'
// import Menu from '@/Menu/Menu.vue'
// import Auth from '@/Auth/Auth.vue'
// import Dictionaries from '@/Dictionaries/Dictionaries.vue'
// import Region from '@/Region/Region.vue'
// import Gather from '@/Gather/Gather.vue'
// import Accounts from '@/Accounts/Accounts.vue'
// import Gatheruser from '@/Gatheruser/Gatheruser.vue'
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(md5);
Vue.use(Vuex);
Vue.component('pages', pages);

// const routes = [
//     //��¼
//     {path: '/', name: "Login", component: Login},
//     {//��ҳ
//         path: '/hello', name: "HelloWorld", component: HelloWorld, children: [
//             //�û�����
//         {path: '/hello/user', name: "User", component: User},
//         //�˵�����
//         {path: '/hello/menu', name: "Menu", component: Menu},
//         //��ɫȨ�޹���
//         {path: '/hello/Auth', name: "Auth", component: Auth},
//         //�ֵ����
//         {path: '/hello/Dictionaries', name: "Dictionaries", component: Dictionaries},
//         //��������
//         {path: '/hello/Region', name: "Region", component: Region},
//         //�ɼ�����
//         {path: '/hello/Gather', name: "Gather", component: Gather},
//         //���ںŲ˵�����
//         {path: '/hello/Accounts', name: "Accounts", component: Accounts},
//         //�ɼ���Ա����
//         {path: '/hello/Gatheruser', name: "Gatheruser", component: Gatheruser},
//     ]
//     },
//
// ]
const router = new VueRouter({
    routes,
    mode: 'history'
})
Vue.config.productionTip = false

new Vue({
    router,
    store:store,
    render: h => h(App)
}).$mount('#app')
