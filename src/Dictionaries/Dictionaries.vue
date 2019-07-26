<template>
    <div class="el-main">
        <el-row>
            <p>基本服务>字典管理</p>
        </el-row>
        <el-table :data="list">
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
                    <el-button size="mini" title="查看" type="primary" icon="el-icon-search"
                               @click="handleEnd(scope.$index, scope.row)"></el-button>
                    <el-button size="mini" type="info" title="修改信息" icon="el-icon-edit"
                               @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button size="mini" icon="el-icon-delete" title="删除信息" type="danger"
                               @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
            <!--</el-col>-->
        </el-table>
        <el-button type="primary" size="medium" @click="adduser">新增</el-button>
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
        <el-dialog title="编辑字典[项]" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="字典名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
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
                    fid: '',
                    _id:''
                },
                index: '',
                formLabelWidth: '120px',
                update: false,
                list: [],
                gdlist: [],
//                total:1000,//默认数据总数
                pagesize: 2,//每页的数据条数
                currentPage: 1,//默认开始页面
                id: '',
            }
        },
        methods: {
//            回填
            handleEdit(index, row) {
                this.index = index;
                this.dialogFormVisible = true;
                let form = row;
                this.form = form;
                this.update = true;
            },
            //删除
            handleDelete(index, row) {
//                this.list.splice(index, 1);
                console.log(row);
                let id = row._id;
                console.log(row._id);
                var param = {_id: id};
                let sessionId = this.$store.state.sessionId
                console.log(sessionId);
                axios
                    .get(
                        'http://127.0.0.1:7001/sys/user/delete?id=' + id + ""
                        , {
                            headers: {
                                'sessionId': sessionId
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
                //清空字典名称
                this.form.name = "";
                this.dialogFormVisible = true;
            },
//            修改和增加
            add() {
                if (this.update) {
                    console.log("当前", this.index);
                    let tableName = this.form.name;
                    let tableId = this.form._id;
                    console.log(tableId);
                    console.log(tableName);
                    //修改请求
                    axios
                        .post(
                            'http://127.0.0.1:7001/sys/dict/update',
                            {
                                id: tableId,
                                name: tableName
                            }
                        )
                        .then(function (data) {
                            console.log(data);
                        })
                        .catch(function (error) { // 请求失败处理
                            console.log(error);
                        });
                    this.update = false;
                }
                else {

                    var fid=this.form.fid;
                    //判断form的id有没有
                    if (fid===undefined)
                    {
                        fid=0;
                    }
                    else if(fid===0){
                        fid=this.form._id;

                    }
                    console.log('我是fid',fid);
                    console.log('我是id',this.form_id)
                    let name = this.form.name;
                    //添加请求
                    axios
                        .post(
                            'http://127.0.0.1:7001/sys/dict/add',
                            {
                                name: name,
                                fid: fid
                            }
                        )
                        .then(function (data) {
//                            console.log('我是添加完之后返回的数据' + data);
                        })
                        .catch(function (error) { // 请求失败处理
                            console.log(error);
                        });
                }
                this.loadData();
                this.dialogFormVisible = false

            },
//             查询
            selectuser() {

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
                this.loadData();

            },
            //首页
            userfrist() {
                this.currentPage = 1;
                this.loadData()
            },
            //尾页
            userlast() {
                this.currentPage = (this.list.length / 20);
                this.loadData()
            },
            //查看下一级
            handleEnd(index, row) {
                //把id存起来
                this.form.fid=this.list[index]._id;
                console.log(this.form.fid);
                console.log(row._id)
                axios
                    .get(
                        'http://127.0.0.1:7001/sys/dict/list?fid=' + row._id + ''
                    )
                    .then(response => {
                        this.list = response.data.data;

                    }
                    )
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });

            },
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
            },

        },

        mounted() {
            this.loadData();

        },

        //请求数据
        created() {

        },
    }
</script>
<style>
    .el-main {
        /*height:1000px;*/
        /*width: 1000px;*/
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
