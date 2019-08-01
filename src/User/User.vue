<template>
    <div class="el-main">
        <el-row>
            <p>基本服务>用户管理</p>
        </el-row>
        <el-row>
            <em>用户名</em>
            <el-input placeholder="用户名称" v-model="input" clearable style="width: 200px!important">用户名</el-input>
            <el-button type="primary" size="medium" @click="selectuser">查询</el-button>
            <el-button type="primary" size="medium" @click="addUser">新增</el-button>
        </el-row>
        <el-table :data="list">
            <el-table-column
                    prop="loginName"
                    label="登录名"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="dept.name"
                    label="地址"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="role.name"
                    sortable
                    label="角色">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="info" title="重置密码" icon="el-icon-setting"
                               @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button size="mini" icon="el-icon-delete" title="删除信息" type="danger"
                               @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <pages
                style="display: inline-block"
                :total=total
                :currentPage=currentPage
                :pageSize=pagesize
                @handleCurrentChangeSub="handleCurrentChange">
        </pages>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="登录名" :label-width="formLabelWidth">
                    <el-input v-model="form.loginName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="地区" :label-width="formLabelWidth">
                    <el-cascader :options="options" :props="defaultProps" v-model="form.address"
                                 clearable></el-cascader>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="form.name" placeholder="请选择角色">
                        <el-option v-for="(item,index) in menuList" :key="index" :label="item.name"
                                   :value="item._id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElCol from "element-ui/packages/col/src/col";
    import storageUtil from '../util/storageUtil'
    import {queryUserForPage} from '../api'
    import {userDelete} from '../api'
    import {setPassword} from '../api'
    import {queryRoleForPage} from '../api'
    import {queryDeptList} from '../api'
    import {userInsert} from '../api'

    export default {
        components: {
            ElCol,
            ElButton,
            ElRow
        },
        data() {
            return {
                input: '',
                dialogFormVisible: false,
                form: {
                    loginName: '',
                    password: '',
                    address: '',
                    name: '',
                },
                index: '',
                formLabelWidth: '120px',
                update: false,
                list: [],
                menuList: [],
                options: [],
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    value: '_id'
                },
                pagesize: 10,
                currentPage: 1,
                total: 100
            }
        },
        methods: {
            //增加
            add() {
                let loginName = this.form.loginName;
                let loginPwd = this.form.password;
                let role = this.form.address;
                let dept = this.form.name;
                this.userInsert(loginName, loginPwd, role[role.length - 1], dept);
                this.dialogFormVisible = false;
            },
            //新增
            addUser() {
                this.dialogFormVisible = true;
                this.queryRoleForPage();
                this.queryDeptList();

            },
            //用户添加
            async userInsert(loginName, loginPwd, role, dept) {
                try {
                    let result = await userInsert({
                        loginName: loginName,
                        loginPwd: loginPwd,
                        role: role,
                        dept: dept
                    }, "post");
                    if (result.code == 0) {
                        this.$message.success('用户增加成功');
                    }
                    else {
                        this.$message.error('用户增加失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            //查询
            selectuser() {
                this.queryUserForPage(this.input, this.currentPage, this.pagesize);
            },
            //重置密码请求
            async setPassword(id) {
                try {
                    let result = await setPassword({id: id}, "GET");
                    if (result.code == 0) {
                        this.$message.success('重置密码成功');
                    }
                    else {
                        this.$message.error('重置密码失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            //用户删除请求
            async delData(id) {
                try {
                    let result = await userDelete({id: id}, "GET");
                    if (result.code == 0) {
                        this.$message.success('删除成功');
                        this.queryUserForPage(this.input);
                    }
                    else {
                        this.$message.error('删除失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            //删除操作
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delData(row._id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //重置密码
            handleEdit(index, row) {
                this.setPassword(row._id);
            },
            //用户查询
            async queryUserForPage(queryName, currentPage, pagesize) {
                try {
                    let result = await queryUserForPage({
                        queryName: queryName,
                        page: currentPage,
                        rows: pagesize
                    }, "GET");
                    if (result.code == 0) {
                        this.list = result.data.list;
                        this.total = result.data.count;
                    }
                    else {
                        this.$message.error('获取列表失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            //权限列表查询 超级管理员 地区管理员
            async queryRoleForPage() {
                try {
                    let result = await queryRoleForPage("GET");
                    if (result.code == 0) {
                        this.menuList = result.data;
                    }
                    else {
                        this.$message.error('获取列表失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            //查询地区 省 市
            async queryDeptList() {
                try {
                    let result = await queryDeptList("GET");
                    if (result.code == 0) {
                        let tlist = [];
                        //三级联动
                        for (let j = 0; j < result.data.length; j++) {
                            let item = result.data[j];
                            if (!item.fid || item.fid == '0') {
                                tlist.push(item);
                            } else {
                                for (let k = 0; k < result.data.length; k++) {
                                    let tItem = result.data[k];
                                    if (tItem._id == item.fid) {
                                        if (tItem.children) {
                                            tItem.children.push(item);
                                        } else {
                                            tItem.children = [];
                                            tItem.children.push(item);
                                        }
                                    }
                                }
                            }
                        }
                        this.options = tlist;
                    }
                    else {
                        this.$message.error('获取列表失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            filterHandle(value, row) {
                return this.input === row.name;
            },
            //点击页码
            handleCurrentChange: function (currentPage) {
                //点击第几页
                this.currentPage = currentPage;
                this.queryUserForPage(this.input, this.currentPage, this.pagesize);
            },
        },
        mounted() {
            this.queryUserForPage(this.input, this.currentPage, this.pagesize);
        },
    }
</script>
<style>
    .el-main {
    }

    .el-main button {
        margin-left: 20px !important;
    }

    em {
        font-style: normal;
        margin-right: 10px;
    }
</style>
