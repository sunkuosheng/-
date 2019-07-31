import HelloWorld from '@/components/HelloWorld'
import Login from '@/Login/Login.vue'
import User from '@/User/User.vue'
import Menu from '@/Menu/Menu.vue'
import Auth from '@/Auth/Auth.vue'
import Dictionaries from '@/Dictionaries/Dictionaries.vue'
import Region from '@/Region/Region.vue'
import Gather from '@/Gather/Gather.vue'
import Accounts from '@/Accounts/Accounts.vue'
import Gatheruser from '@/Gatheruser/Gatheruser.vue'

export const routes = [
    //登录
    {path: '/', name: "Login", component: Login},
    {//主页
        path: '/home', name: "home", component: HelloWorld, children: [
        //用户管理
        {path: '/home/user', name: "user", component: User},
        //菜单管理
        {path: '/home/menu', name: "menu", component: Menu},
        //角色权限管理
        {path: '/home/role', name: "role", component: Auth},
        //字典管理
        {path: '/home/dict', name: "dict", component: Dictionaries},
        //地区管理
        {path: '/home/dept', name: "dept", component: Region},
        //采集数据
        {path: '/home/info', name: "info", component: Gather},
        //公众号菜单管理
        {path: '/home/wxMenu', name: "wxMenu", component: Accounts},
        //采集人员管理
        {path: '/home/collectionUser', name: "collectionUser", component: Gatheruser},
    ]
    },
]
// // 全局路由守卫
// routes.beforeEach((to, from, next) => {
//     console.log('navigation-guards');
//     // to: Route: 即将要进入的目标 路由对象
//     // from: Route: 当前导航正要离开的路由
//     // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//
//     const nextRoute = ['home', 'user', 'menu', 'role', 'dict','dept','info','wxMenu','collectionUser'];
//     let isLogin = global.isLogin;  // 是否登录
//     // 未登录状态；当路由到nextRoute指定页时，跳转至login
//     if (nextRoute.indexOf(to.name) >= 0) {
//         if (!isLogin) {
//             console.log('what fuck');
//             routes.push({ name: 'Login' })
//         }
//     }
//     // 已登录状态；当路由到login时，跳转至home
//     if (to.name === 'login') {
//         if (isLogin) {
//             routes.push({ name: 'home' });
//         }
//     }
//     next();
// });