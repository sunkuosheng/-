<template>
    <div class="header">
        <el-header style="padding: 0px">
            <el-row>
                <div class="top">
                    <el-col :span="5" style="height: 100%">
                        <img src="../image/70319f7290452f66e9cc7d236f5133d.png" style="height: 100%;width: 100%"/>
                    </el-col>
                    <el-col :span="12" style="height: 100%">
                    </el-col>
                    <el-col :span="7" style="height: 100%">
                        <el-dropdown style="margin-top: 5%!important; margin-right: 30%!important">
                            <span class="el-dropdown-link" style="display: inline-block">欢迎你:{{name}}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{deptname}}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><span @click="out">退出登录</span></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </div>
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

    export default {
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
            };
        },
        methods: {
            //路由跳转 根据address字段
            handleNodeClick(data) {
                this.$router.replace(data.address);
            },
            //登陆人权限请求
            async loadLoginerRoleMenus(loginName) {
                try {
                    let result = await loadLoginerRoleMenus({loginName: loginName}, "GET");
                    if (result.code == 0) {
                        console.log('res', result.data.dbMenuArr);
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
                        //过滤type不等于Checked
                        let smenuArr = [];
                        for (let c = 0; c < menuArr.length; c++) {
                            let cmenuArr = menuArr[c];
                            if (cmenuArr.type == 'Checked') {
                                smenuArr.push(cmenuArr);
                            }
                        }
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
                        console.log(winMenu);
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
                        //    清除本地sessionId
                        storageUtil.save("sessionId", "");
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
            }
        },
        //html渲染之后
        mounted() {
            this.name = storageUtil.read('loginName');
            this.deptname = storageUtil.read('deptName');
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