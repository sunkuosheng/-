<template>
    <div class="el-main">
        <el-row >
            <p>基本服务>用户管理</p>
        </el-row>
        <el-row>
            <em>用户名</em>
            <el-input placeholder="用户名称" v-model="input" clearable style="width: 200px!important">用户名</el-input>
            <el-button type="primary" size="medium" @click="selectuser">查询</el-button>
            <el-button type="primary" size="medium" @click="adduser">新增</el-button>
        </el-row>
        <el-table :data="this.list.slice((currentPage-1)*pagesize,currentPage*pagesize)">
            <!--<el-col :span="3">-->
            <el-table-column
                    label="序号"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="登录名"
                    sortable>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"  title="查看"  type="primary" icon="el-icon-search"
                               @click="handleEnd(scope.$index, scope.row)"></el-button>
                    <el-button size="mini" type="info" title="修改信息" icon="el-icon-setting"
                               @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button size="mini" icon="el-icon-delete" title="删除信息" type="danger"
                               @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
            <!--</el-col>-->
        </el-table>

        <el-button  @click="userfrist">首页</el-button>
        <el-pagination
                style="display: inline-block"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="2"
                layout="prev, pager, next,jumper"
                :total=this.list.length>

        </el-pagination>
        <el-button  @click="userlast">尾页</el-button>
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
                pagesize: 2,//每页的数据条数
                currentPage: 1,//默认开始页面
                id:'',
            }
        },
        methods: {
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
            },
            //删除
            handleDelete(index, row) {
//                this.list.splice(index, 1);
                console.log(row);
                let id=row._id;
                console.log(row._id);
                var param={_id:id};
                let sessionId=this.$store.state.sessionId
                console.log(sessionId);
                axios
                    .get(
                        'http://10.16.10.250:7001/sys/user/delete?id='+id+""
                        ,{
                            headers: {
                                'sessionId':sessionId
                            }
                        }
                    )
                    .then(function (data) {
                        console.log(data);
                    })
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });

            },
            adduser() {
                this.form.name = "";
                this.form.address = "";
                this.form.role = "";
                this.form.password = "";
                this.form.state = "";
                this.form.openID = "";
                this.dialogFormVisible = true;

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
            },
//             查询
            selectuser() {
                if (this.input.trim() !== "") {
                    let newArr = [];
                    for (let i = 0; i < this.tableData.length; i++) {
                        let n = this.tableData[i].name.search(this.input);
                        if (n !== -1) {
                            newArr.push(this.tableData[i]);
                        }
                    }
                    this.list = newArr;
                }
                else {
                    this.list = this.tableData;
                }

            },
            filterHandle(value, row) {
                return this.input === row.name;

            },
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize) //每页下拉显示数据
            },

            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage) //点击第几页
            },
            //状态显示的变化
            stateFormatter(row) {
//                if(row.state===0)
//                {
//                    return '可用';
//                }
//                else
//                {
//                    return '禁用';
//                }
                return row.state == 0 ? '可用' : '禁用';
            },
            //首页
            userfrist() {
                this.currentPage = 1;
            },
            //尾页
            userlast() {
                this.currentPage = (this.list.length / 2);
            },
            handleEnd(index, row){
                console.log(row._id)
                axios
                    .get(
                        'http://10.16.10.250:7001/sys/dict/list?fid='+row._id+''
                    )
                    .then(response => (this.list = response.data.data)
                    )
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });

            }

        },

        watch: {
            tableData(newV,oldV) {
                this.list = newV;
                this.gdlist = newV;
                console.log(newV);
                console.log(oldV);
            },

        },
        mounted() {
//            this.list = this.tableData;
//            this.total = this.tableData.length;
//            console.log(this.$store.state.sessionId);
//            console.log(this.$store.state.username);
            this.total=this.list.length;
        },
        beforeCreate: function () {
//            this.list=this.tableData;
//            console.log(this.list);
//            console.log(this.tableData);
//            this.$nextTick(function() {
////                console.log(this.tableData);
//                this.list=this.tableData;
//            })

        },
//        created:function () {
//            this.list=this.tableData;
//            console.log(123);
//            console.log(this.list);
//            console.log(this.tableData);
//
//        },
//        berofeMount: function () {
//            this.list = this.tableData;
//            console.log(this.list);
//            console.log(this.tableData);
//        },
        //请求数据
        created() {
            axios
                .get(
                    'http://10.16.10.250:7001/sys/dict/list?fid=0'
                )
                .then(response => (this.list = response.data.data)
                )
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
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
