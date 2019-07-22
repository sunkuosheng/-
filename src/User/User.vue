<template>
    <div class="el-main">
        <el-row>
            <p>基本服务&gt用户管理</p>
        </el-row>
        <el-row>
            <em>用户名</em>
            <el-input placeholder="用户名称" v-model="input" clearable style="width: 200px!important">用户名</el-input>
            <el-button type="primary" size="medium"  @click="selectuser">查询</el-button>
            <el-button type="primary" size="medium" @click="dialogFormVisible = true">新增</el-button>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="登录名" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="密码" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="地区" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="角色" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="openID" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" >
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="生日" :label-width="formLabelWidth">
                    <el-input v-model="form.date" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
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

    export default {
        components: {ElRow},
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎3',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎4',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                input: '',
                dialogFormVisible: false,
                form: {
                    name: '',
                    date: '',
                    address:''

                },
                index:'',
                formLabelWidth: '120px',
                update:false,
                list:'',
            }
        },
        methods: {
//            回填
            handleEdit(index, row) {
//                this.form.name = "";
//                this.form.date = "";
//                this.form.address = "";
//                console.log(index, row);
//                console.log(this.tableData[index]);
                this.index=index;
                this.dialogFormVisible = true;
                this.form.name=row.name;
                this.form.date=row.date;
                this.form.address=row.address;
//                console.log(row.name);
//                console.log(row.date);
//                console.log(row.address);
                this.update=true;
            },
            //删除
            handleDelete(index, row) {
                this.tableData.splice(index,1);
                console.log(index, row);
            },
//            修改和增加
            add(){
                if(this.update===true)
                {
                    this.list=this.form;
                    this.tableData.splice(this.index,1,this.list);
                    this.list="";
                    this.update=false;
                }
                else {
                     let namea=this.form.name;
                     let datea=this.form.date;
                     let address=this.form.address;
                    this.tableData.push({name:namea, date: datea, address: address})
                    console.log(this.form);
                    this.form.name = "";
                    this.form.date = "";
                    this.form.address = "";
                }
               this.dialogFormVisible = false
            },
//             查询
            selectuser(){
                console.log(this.input);
            },

        },
        watch: {
            tableData(newV, oldV) {
                console.log(newV);
            },
        }
//            input(newV,oldV)
//            {
//               let  newArr=[];
//
//               if(newV.name){
//
//                   console.log(newV.name);
//               }
//            }
//        }
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
