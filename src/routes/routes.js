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
        path: '/hello', name: "HelloWorld", component: HelloWorld, children: [
        //�û�����
        {path: '/hello/user', name: "User", component: User},
        //�˵�����
        {path: '/hello/menu', name: "Menu", component: Menu},
        //��ɫȨ�޹���
        {path: '/hello/Auth', name: "Auth", component: Auth},
        //�ֵ����
        {path: '/hello/Dictionaries', name: "Dictionaries", component: Dictionaries},
        //��������
        {path: '/hello/Region', name: "Region", component: Region},
        //�ɼ�����
        {path: '/hello/Gather', name: "Gather", component: Gather},
        //���ںŲ˵�����
        {path: '/hello/Accounts', name: "Accounts", component: Accounts},
        //�ɼ���Ա����
        {path: '/hello/Gatheruser', name: "Gatheruser", component: Gatheruser},
    ]
    },

]