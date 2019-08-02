<template>
    <div class="login">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="10px"
                 class="demo-ruleForm">
        <img src="./image/d33253cf28752ec3b2be854e4043ea5.png"/>
                <p>登录用户名密码</p>
                <el-form-item prop="username">
                    <el-input v-model="ruleForm2.username" placeholder="账号" size="20px" maxlenhth="10"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm2')"
                               style="width: 340px!important;">提交
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
</template>
<script>
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
    import {userLogin} from '../api'
    import storageUtil from '../util/storageUtil'
    import {queryUser} from '../api'
    import {userInfos} from '../api'


    export default {
        components: {ElFormItem},
        name: 'login',
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }
                callback();
            };
            return {
                deptname: '',
                sessionId: '',
                username: '',
                ruleForm2: {
                    pass: '',
                    username: '',
                },
                rules2: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            //用户登录
            async login() {
                try {
                    let result = await userLogin({
                        loginName: this.ruleForm2.username,
                        loginPwd: this.ruleForm2.pass
                    }, 'GET');
                    if (result.code == "0") {
                        storageUtil.save("sessionId", result.data);
                        storageUtil.save("loginName", this.ruleForm2.username);
                        this.queryUser(this.ruleForm2.username);

                    } else {
                        this.$message.error('登录失败,请核对账号和密码');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            //查询用户的省份请求 根据用户名
            async queryUser(admin) {
                try {
                    let result = await queryUser({loginName: admin}, 'GET');
                    if (result.code == "0") {
                        console.log('我市', result);
                        this.deptname = result.data[0].dept.name;
                        console.log('我是用户名', this.deptname);
                        let fid = result.data[0]._id;

                        if (fid == '5d0070438217f92210e6f972') {
                            storageUtil.save("fid", '0');
                        }
                        else {
                            console.log(456);
                            fid = result.data[0].dept._id;
//                            fid = result.data[0].dept.fid;

                            storageUtil.save("fid", fid);
                        }
                        storageUtil.save("deptName", this.deptname);
                        this.$router.replace("/home");
                    } else {
                        this.$message.error('查询用户失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            //登录
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login();
                    } else {
                        console.log('error submit!!');
                        this.$router.replace("/home");
                        return false;
                    }
                });
            },
        },
        watch: {
            deptname(newde, oldde) {
                this.deptname=newde;
            }
        }
    }
</script>
<style scoped>
    .login {
        margin: 20% auto;
        width: 350px;
        height:100vh;
        text-align: center;
        /*background-image: url("image/4ef7b0258ce5a7f4f4e133d6c2b0814.png");*/
        /*background-size: 100% 100%;*/
    }

    .login img {
        text-align: center;
        width: 400px;
        height: 200px;
    }



    /*.from p {*/
        /*margin-left: 19px;*/
    /*}*/
</style>
