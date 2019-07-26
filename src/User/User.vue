<template>
    <div class="el-main">
        <el-row>
            <p>基本服务>用户管理</p>
        </el-row>
        <el-row>
            <em>用户名</em>
            <el-input placeholder="用户名称" v-model="input" clearable style="width: 200px!important">用户名</el-input>
            <el-button type="primary" size="medium" @click="selectuser">查询</el-button>
        </el-row>
        <el-table :data="this.list">
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
                    <el-button size="mini" type="info" title="修改信息" icon="el-icon-setting"
                               @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button size="mini" icon="el-icon-delete" title="删除信息" type="danger"
                               @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-button @click="userfrist">首页</el-button>
        <el-pagination
                style="display: inline-block"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="2"
                layout="prev, pager, next,jumper"
                :total=this.list.length>
        </el-pagination>
        <el-button @click="userlast">尾页</el-button>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="登录名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <!--<el-input v-model="form.state" autocomplete="off"></el-input>-->
                    <el-select v-model="form.state" placeholder="请选择状态">
                        <el-option label="可用" value="0"></el-option>
                        <el-option label="禁用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <!--<el-input v-model="form.role" autocomplete="off"></el-input>-->
                    <el-select v-model="form.role" placeholder="请选择角色">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="地区管理员" value="地区管理员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="openID" :label-width="formLabelWidth">
                    <el-input v-model="form.openID" autocomplete="off"></el-input>
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
                gdlist: [],
//                total:1000,//默认数据总数
                pagesize: 1,//每页的数据条数
                currentPage: 1,//默认开始页面
                id: '',
//                total:this.list.length
            }
        },
        methods: {
            //分页查询全部数据
            async selesData() {
                try {
                    let result = await queryUserForPage({queryName: '', page: 1, rows: 10}, "GET")
                    if (result.code == 0) {
                        console.log(result.data.list);
                        this.list = result.data.list;
                        this.$message.success('获取列表成功')

                    }
                    else {
                        this.$message.error('获取列表失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            async delData(id) {
                try {
                    let result = await userDelete({id:id}, "GET");

                    if (result.code == 0) {
                        this.$message.success('删除成功');
                    }
                    else {
                        this.$message.error('删除失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            }
            ,
            //分页查询数据
            loadData() {
                axios
                    .get(
                        'http://127.0.0.1:7001/sys/dict/listForPage?fid=0&page=' + this.currentPage + '&rows=10'
                    )
                    .then(response => {
                        this.list = response.data.data.list;
                        this.total = this.list.length;
                    })
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });
            }
            ,
            //            回填
            handleEdit(index, row) {
                this.index = index;
                this.dialogFormVisible = true;
                this.form.name = row.name;
                this.form.address = row.address;
                this.form.role = row.role;
                this.form.password = row.password;
                row.state === 0 ? this.form.state = '可用' : this.form.state = '禁用';
                this.form.openID = row.openID;
                this.update = true;
            }
            ,
            //删除
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    console.log('123');
                    this.delData(row._id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //            修改和增加
            add() {
                if (this.update) {
                    console.log("当前", this.index);
                    let tableDatum = this.tableData[this.index];
                    tableDatum.name = this.form.name;
                    tableDatum.address = this.form.address;
                    tableDatum.role = this.form.role;
                    tableDatum.password = this.form.password;
                    tableDatum.state = this.form.state;
                    tableDatum.openID = this.form.openID;
                    this.list = this.tableData;
                    this.update = false;
                }
                else {
                    let name = this.form.name;
                    let address = this.form.address;
                    let role = this.form.role;
                    let password = this.form.password;
                    let state = this.form.state;
                    let openID = this.form.openID;
                    this.tableData.push({
                        name: name,
                        address: address,
                        role: role,
                        password: password,
                        state: state,
                        openID: openID
                    })
                    this.list = this.tableData;
                }
                this.dialogFormVisible = false
            }
            ,
            //             查询
            selectuser() {
                if (this.input.trim() !== "") {
                    axios
                        .get(
                            'http://127.0.0.1:7001/sys/user/listForPage?queryName=' + this.input + ''
//                    http://127.0.0.1:7001/sys/user/listForPage?queryName=&page=1&rows=10&type=admin
                        )
                        .then(response => {
                                console.log("11", response);
                                this.list = response.data.data.list;
                                this.total = response.data.data.count;
                                console.log("222", this.list);
                            }
                        )
                        .catch(function (error) { // 请求失败处理
                            console.log(error);
                        });
                }
                else {
                    axios
                        .get(
                            'http://127.0.0.1:7001/sys/user/list'
                        )
                        .then(response => (this.list = response.data.data)
                        )
                        .catch(function (error) { // 请求失败处理
                            console.log(error);
                        });
                }
            }
            ,
            filterHandle(value, row) {
                return this.input === row.name;

            }
            ,
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize) //每页下拉显示数据
            }
            ,
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage) //点击第几页
            }
            ,
            //首页
            userfrist() {
                this.currentPage = 1;
            }
            ,
            //尾页
            userlast() {
                this.currentPage = (this.list.length / 2);
            }
        },
        watch: {
            list(newV, oldV) {
                console.log('我是新的');
                console.log(newV);
                console.log('我是老的');
                console.log(oldV);
            }
            ,
        }
        ,
        mounted() {
//            this.total = this.list.length;
            this.selesData();
        },
        //请求数据
        created() {

        },
    }
</script>
<style>
    .el-main {
        /*width: 1000px;*/
        /*height:1000px;*/
        /*border: 1px red solid;*/
    }

    .el-main button {
        margin-left: 20px !important;
    }

    em {
        font-style: normal;
        margin-right: 10px;
    }

    /*.el-table td,el-table th{*/
    /*text-align: center!important;*/
    /*}*/

</style>
