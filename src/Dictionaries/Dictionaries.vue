<template>
    <div class="el-main">
        <el-row>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        <el-row>
            <el-button type="primary" size="medium" @click="adduser">添加</el-button>
        </el-row>
        <el-table :data="tableData">
            <el-table-column
                    prop="name"
                    label="序号"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="字典[项]名称"
                    sortable>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="info" icon="el-icon-setting"
                               @click="handleselect(scope.$index, scope.row)">
                    </el-button>
                    <el-button size="mini" type="info" icon="el-icon-setting"
                               @click="handleEdit(scope.$index, scope.row)">
                    </el-button>
                    <el-button size="mini" icon="el-icon-delete" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

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
                    name: '1',
                    password: '123333',


                }, {
                    name: '2',
                    password: '123333',

                }, {
                    name: '3',
                    password: '123333',

                    openID: 1,
                }, {
                    name: '4',
                    password: '123333',

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
//
            }
        },
        methods: {
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
                this.form.openID = row.openID;
//                console.log(row.name);
//                console.log(row.date);
//                console.log(row.address);
                this.update = true;
            },
            handleDelete(index, row) {
                this.tableData.splice(index, 1);
                console.log(index, row);
            },
            adduser() {

            },
            handleselect(index, row){

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
