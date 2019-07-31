<template>
    <div class="login">
        <img src="./image/d33253cf28752ec3b2be854e4043ea5.png"/>
        <div class="from">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="10px" class="demo-ruleForm">
                <p>登录用户名密码</p>
                <el-form-item prop="username">
                    <el-input v-model="ruleForm2.username" placeholder="账号" size="20px" maxlenhth="10"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm2')" style="width: 340px!important;">提交
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
    import {userLogin} from '../api'
    import storageUtil from '../util/storageUtil'
    import {queryUser} from '../api'

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
                        this.queryUser(this.ruleForm2.username);
                        storageUtil.save("sessionId", result.data);
                        storageUtil.save("loginName", this.ruleForm2.username);
                        this.$router.replace("/home");
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
                        this.deptname = result.data[0].dept.name;
                        storageUtil.save("deptName", this.deptname);
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
                        return false;
                    }
                });
            },
        }
    }
</script>
<style scoped>
    .login {
        margin: 100px auto;
        width: 350px;
        text-align: center;
        background-image: url("image/4ef7b0258ce5a7f4f4e133d6c2b0814.png");
        background-size: 100% 100%;
    }

    .login img {
        text-align: center;
        width: 400px;
        height: 200px;
    }

    .from {
        margin-top: 20px;
    }

    .from p {
        margin-left: 19px;
    }
</style>
