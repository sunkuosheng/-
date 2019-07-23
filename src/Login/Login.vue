<template>
    <div class="login">
        <img src="./image/d33253cf28752ec3b2be854e4043ea5.png"/>
        <div class="from">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="10px"
                     class="demo-ruleForm">
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
    </div>
</template>

<script>
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";

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
                ruleForm2: {
                    pass: '',
                    username: ''
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$router.push({
                            name: `HelloWorld`,
                            params: {
                                name: this.ruleForm2.username
                            }
                        })
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
    .login {
        margin: 100px auto;
        width: 350px;

        text-align: center;
    }

    .login img {
        /*margin-top: 5%;*/
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
