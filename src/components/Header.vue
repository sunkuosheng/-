<template>
    <div class="header">
            <el-row>
                <div class="top">
                    <el-col :span="5" style="height: 100%">
                        <img src="../image/70319f7290452f66e9cc7d236f5133d.png" style="height: 100%;width: 100%"/>
                    </el-col>
                    <el-col :span="12" style="height: 100%">
                    </el-col>
                    <el-col :span="3" style="height: 100%;line-height:50px">
                        <el-dropdown>
                            <span class="el-dropdown-link" style="display: inline-block">欢迎你:{{name}}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><span @click="out">退出登录</span></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="1" style="height: 100%;line-height:50px">
                    </el-col>
                    <el-col :span="3" style="height: 100%;line-height:50px">
                        <span class="el-dropdown-link" style="display: inline-block" :title="deptName">
                            <!--截取0到8的字符剩下的用...显示-->
                            {{deptName.length>8?deptName.substring(0,8)+"...":deptName}}
                        </span>
                    </el-col>
                </div>
            </el-row>
    </div>
</template>
<script>
    import storageUtil from '../util/storageUtil'
    import {userLogout} from '../api'
    import {userInfo} from '../api'
    export default {
        name: 'Header',
        data () {
            return {
                name: '',
                deptName: '',
            }
        },
        methods:{
            //退出
            out(){
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
            //获取用户名和地区
            const  result=await userInfo();
            if(result.code=='0'){
                this.name=result.data.loginName;
                this.deptName=result.data.dept;
            }
        },
    }
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
