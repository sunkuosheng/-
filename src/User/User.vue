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
        <!--<el-button @click="userfrist">首页</el-button>-->
        <!--<el-pagination-->
                <!--style="display: inline-block"-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:page-size=pagesize-->
                <!--layout="prev, pager, next,jumper"-->
                <!--:total=total>-->
        <!--</el-pagination>-->
        <!--<el-button @click="userlast">尾页</el-button>-->
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
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="form.name" placeholder="请选择角色" >
                        <el-option v-for="(item,index) in menuList" :key="index" :label="item.name" :value="item.name"></el-option>
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
    import axios from 'axios'
    import ElRow from "element-ui/packages/row/src/row";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElCol from "element-ui/packages/col/src/col";
    import storageUtil from '../util/storageUtil'
    import {queryUserForPage} from '../api'
    import {userDelete} from '../api'
    import {setPassword} from '../api'
    import {queryRoleForPage} from '../api'
    import {queryDeptList} from '../api'



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
                    name: '',
                    password: '',
                    state: '',
                    address: '',
                    role: '',
                    openID: '',
                },
                index: '',
                formLabelWidth: '120px',
                update: false,
                list: [],
                menuList:[],
                pagesize: 10,
                currentPage: 1,
                total: 100
            }
        },
        methods: {
            add(){

            },
            //新增
            addUser(){
                this.dialogFormVisible=true;
                this.queryRoleForPage();
                this.queryDeptList();

            },
            //查询
            selectuser() {
                this.queryUserForPage(this.input, this.currentPage, this.pagesize);
            },
            async setPassword(id) {
                try {
                    let result = await setPassword({id: id}, "GET");
                    if (result.code == 0) {
                        this.$message.success('重置密码成功成功');
                    }
                    else {
                        this.$message.error('删除失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
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
            //删除
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
                        for(var i=0;i<result.data.length;i++)
                        {
//                            console.log(result[i].name);
                            this.menuList.push({name:result.data[i].name});
                        }
                        console.log(this.menuList);
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
//                        for(var i=0;i<result.data.length;i++)
//                        {
////                            console.log(result[i].name);
//                            this.menuList.push({name:result.data[i].name});
//                        }
//                        console.log(this.menuList);
                        console.log(result);
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
            handleSizeChange: function (size) {
                //每页下拉显示数据
                this.pagesize = size;
            },
            handleCurrentChange: function (currentPage) {
                //点击第几页
                this.currentPage = currentPage;
                this.queryUserForPage(this.input, this.currentPage, this.pagesize);
            },
            //首页
            userfrist() {
                this.currentPage = 1;
                this.queryUserForPage(this.input, this.currentPage, this.pagesize);
            },
            //尾页
            userlast() {
                this.currentPage = Math.ceil(this.total / this.pagesize);
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
