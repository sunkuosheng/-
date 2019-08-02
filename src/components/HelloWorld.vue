<template>
    <div class="header">
        <el-header style="padding: 0px">

            <el-row>
                <top-header></top-header>
            </el-row>
        </el-header>
        <el-main>
            <el-row>
                <el-col :span="6">
                    <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-col>
                <el-col :span="18">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>
<script>
    import storageUtil from '../util/storageUtil'
    import {userLogout} from '../api'
    import {loadLoginerRoleMenus} from '../api'
    import {queryDeptList} from '../api'
    import {queryRoleForPage} from '../api'
    import {userInfo} from '../api'
    import ElCol from "element-ui/packages/col/src/col";
    import topHeader from './Header.vue'
    import ElRow from "element-ui/packages/row/src/row";
    export default {
        components: {
            ElRow,
            ElCol,topHeader},
        name: 'HelloWorld',
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'name',
                },
                list: [],
                name: '',
                deptname: '',
                fid:'',
            };
        },
        methods: {
            //路由跳转 根据address字段
            handleNodeClick(data) {
                //点击父节点不跳转
                if(data.children==undefined||data.children.length==0) {
                    this.$router.replace(data.address);
                }
            },
            //登陆人权限请求
            async loadLoginerRoleMenus(loginName) {
                try {
                    let result = await loadLoginerRoleMenus({loginName: loginName}, "GET");
                    console.log('我是登陆人的请求下来的权限',result);
                    if (result.code == 0) {
                        let menuArr = [];
                        let roleArr = [];
                        menuArr = result.data.dbMenuArr;
                        roleArr = result.data.roleMenu;
                        //menuArr获取type数据
                        for (let i = 0; i < menuArr.length; i++) {
                            let imeuArr = menuArr[i];
                            for (let j = 0; j < roleArr.length; j++) {
                                let jroleArr = roleArr[j];
                                if (imeuArr._id == jroleArr.id) {
                                    imeuArr.type = jroleArr.type;
                                }
                            }
                        }
                        console.log('我是被赋值了type',menuArr);
                        //过滤type不等于Checked或者不等于HalfChecked
                        let smenuArr = [];
                        for (let c = 0; c < menuArr.length; c++) {
                            let cmenuArr = menuArr[c];
                            if (cmenuArr.type == 'Checked'||cmenuArr.type == 'HalfChecked') {
                                smenuArr.push(cmenuArr);
                            }
                        }
                        console.log('我是加了Checked',smenuArr);
                        //分出子父级
                        let winMenu = [];
                        for (let k = 0; k < smenuArr.length; k++) {
                            let kMenArr = smenuArr[k];
                            if (kMenArr.fid == '0') {
                                winMenu.push(kMenArr);
                            }
                            else {
                                for (let h = 0; h < winMenu.length; h++) {
                                    let hwinMenu = winMenu[h];
                                    if (hwinMenu._id == kMenArr.fid) {
                                        if (hwinMenu.children) {
                                            hwinMenu.children.push(kMenArr);
                                        }
                                        else {
                                            hwinMenu.children = [];
                                            hwinMenu.children.push(kMenArr);
                                        }
                                    }
                                }
                            }
                        }
                        this.list = winMenu;
                        console.log('我是权限',winMenu);
                    }
                    else {
                        this.$message.error('获取权限失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            //退出
            out() {
                this.$confirm('确定要退出系统吗?', '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    this.userLogout();
                }).catch(() => {
                });
            },
            //退出登录请求
            async userLogout() {
                try {
                    let result = await userLogout("GET");
                    if (result.code == 0) {
                        //    清除本地sessionId 用户名 地区
                        storageUtil.saveBasic("sessionId","");
                        this.$message.success('退出成功');
                        this.$router.replace("/");
                    }
                    else {
                        this.$message.error('退出失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
        },
        //html渲染之后
        async mounted() {
            //读取登录用户名
            this.name = storageUtil.read('loginName');
            //读取用户名 最高级地区
            this.deptname = storageUtil.read('deptName');
            //加载权限
            this.loadLoginerRoleMenus(this.name);

        },
    };
</script>
<style>
    .top {
        height: 60px;
        width: 100%;
        background-color: blue;
        padding: 0px;
    }

    .el-dropdown-link {
        font-size: 18px;
        color: antiquewhite;
    }

    img {
        width: 100px;
        height: 30px;
        float: left;
    }
</style>