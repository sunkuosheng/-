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