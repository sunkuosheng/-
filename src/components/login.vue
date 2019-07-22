<template>
    <div class="login">

        <div class="from">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="10px" class="demo-ruleForm">
                <img src="./image/d33253cf28752ec3b2be854e4043ea5.png"/>
                <p>登录用户名密码</p>
                <el-form-item  prop="username" >
                    <el-input v-model="ruleForm2.username"  placeholder="账号" size="20px" maxlenhth="10"  style="width: 350px!important"></el-input>
                </el-form-item>
                <el-form-item  prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass"  placeholder="密码" style="width: 350px!important"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm2')"style="width: 350px!important">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
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
                ruleForm2: {
                    pass: '',
                    username : ''
                },
                rules2: {
                    username : [
                        { validator: validateUsername,trigger: 'blur'}
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .login{
        /*width: 300px;*/
        /*text-align: center;*/
    }
    .login img{
        margin-top: 5%;
    }
</style>
