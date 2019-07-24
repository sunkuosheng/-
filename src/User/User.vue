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
                            prop="name"
                            label="登录名"
                            sortable>
                    </el-table-column>
                <!--</el-col>-->
                <!--<el-col :span="3">-->
                    <el-table-column
                            prop="password"
                            label="密码"
                            sortable>
                    </el-table-column>
                <!--</el-col>-->
                <!--<el-col :span="2">-->
                    <el-table-column
                            prop="state"
                            label="状态"
                            sortable
                            :formatter="stateFormatter">
                        <!--思路formatter  -->
                        <!--<slot>-->
                        <!--<span>{{row.state === 0 ?"":""}}</span>-->
                        <!--</slot>-->
                    </el-table-column>
                <!--</el-col>-->
                <!--<el-col :span="4">-->
                    <el-table-column
                            prop="address"
                            label="地址"
                            sortable>
                    </el-table-column>
                <!--</el-col>-->
                <!--<el-col :span="3">-->
                    <el-table-column
                            prop="role"
                            sortable
                            label="角色">
                    </el-table-column>
                <!--</el-col>-->
                <!--<el-col :span="2">-->
                    <el-table-column
                            prop="openID"
                            sortable
                            label="openID">
                    </el-table-column>
                <!--</el-col>-->
                <!--<el-col :span="5">-->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
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
                tableData: [{
                    name: '王小虎1',
                    password: '123333',
                    state: 0,
                    address: '上海市普陀区金沙江路 1518 弄',
                    role: '超级管理员',
                    openID: 1,

                }, {
                    name: '王小虎2',
                    password: '123333',
                    state: 0,
                    address: '上海市普陀区金沙江路 1518 弄',
                    role: '超级管理员',
                    openID: 1,
                }, {
                    name: '王小虎3',
                    password: '123333',
                    state: 0,
                    address: '上海市普陀区金沙江路 1518 弄',
                    role: '超级管理员',
                    openID: 1,
                }, {
                    name: '王小虎4',
                    password: '123333',
                    state: 0,
                    address: '上海市普陀区金沙江路 1518 弄',
                    role: '超级管理员',
                    openID: 1,
                }],
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
            }
        },
        methods: {
//            回填
            handleEdit(index, row) {

//                console.log(index, row);
//                console.log(this.tableData[index]);
                this.index = index;
                this.dialogFormVisible = true;
                this.form.name = row.name;
                this.form.address = row.address;
                this.form.role = row.role;
                this.form.password = row.password;
//                this.form.state = row.state;
                row.state === 0 ? this.form.state = '可用' : this.form.state = '禁用';
                this.form.openID = row.openID;
//                console.log(row.name);
//                console.log(row.date);
//                console.log(row.address);
                this.update = true;
            },
            //删除
            handleDelete(index, row) {
                this.tableData.splice(index, 1);
                console.log(index, row);
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
            }

        },

        watch: {
            tableData(newV, oldV) {
                this.list = newV;
                this.gdlist = newV;
                console.log(newV);
            },

        },
        mounted() {
            this.list = this.tableData;
            this.total = this.tableData.length;
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
//        create:function () {
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
