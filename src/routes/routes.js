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
    //��¼
    {path: '/', name: "Login", component: Login},
    {//��ҳ
        path: '/home', name: "home", component: HelloWorld, children: [
        //�û�����
        {path: '/home/user', name: "user", component: User},
        //�˵�����
        {path: '/home/menu', name: "menu", component: Menu},
        //��ɫȨ�޹���
        {path: '/home/role', name: "role", component: Auth},
        //�ֵ����
        {path: '/home/dict', name: "dict", component: Dictionaries},
        //��������
        {path: '/home/dept', name: "dept", component: Region},
        //�ɼ�����
        {path: '/home/info', name: "info", component: Gather},
        //���ںŲ˵�����
        {path: '/home/wxMenu', name: "wxMenu", component: Accounts},
        //�ɼ���Ա����
        {path: '/home/collectionUser', name: "collectionUser", component: Gatheruser},
    ]
    },
]
// // ȫ��·������
// routes.beforeEach((to, from, next) => {
//     console.log('navigation-guards');
//     // to: Route: ����Ҫ�����Ŀ�� ·�ɶ���
//     // from: Route: ��ǰ������Ҫ�뿪��·��
//     // next: Function: һ��Ҫ���ø÷����� resolve ������ӡ�ִ��Ч������ next �����ĵ��ò�����
//
//     const nextRoute = ['home', 'user', 'menu', 'role', 'dict','dept','info','wxMenu','collectionUser'];
//     let isLogin = global.isLogin;  // �Ƿ��¼
//     // δ��¼״̬����·�ɵ�nextRouteָ��ҳʱ����ת��login
//     if (nextRoute.indexOf(to.name) >= 0) {
//         if (!isLogin) {
//             console.log('what fuck');
//             routes.push({ name: 'Login' })
//         }
//     }
//     // �ѵ�¼״̬����·�ɵ�loginʱ����ת��home
//     if (to.name === 'login') {
//         if (isLogin) {
//             routes.push({ name: 'home' });
//         }
//     }
//     next();
// });