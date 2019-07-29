<template>
    <div class="el-main">
        <el-row>
            <p>基础服务>菜单管理</p>
        </el-row>
        <el-row>
            <em>菜单名称</em>
            <el-input placeholder="菜单名称" v-model="input" clearable style="width: 200px!important">用户名</el-input>
            <el-button type="primary" size="medium" @click="selectuser">查询</el-button>
        </el-row>
        <el-table :data="list">
            <el-table-column
                    label="序号"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="菜单管理"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="访问地址"
                    sortable>
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
    </div>
</template>
<script>
    import axios from 'axios'
    import ElRow from "element-ui/packages/row/src/row";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElCol from "element-ui/packages/col/src/col";
    import {queryMenuForPage} from '../api'
    export default {
        components: {
            ElCol,
            ElButton,
            ElRow
        },
        data() {
            return {
                input: '',
                index: '',
                list: [],
                total: 1000,
                pagesize: 5,
                currentPage: 1,
                id: '',
            }
        },
        methods: {
       //查询
            selectuser() {
                console.log(this.input);
                this.currentPage = 1;
                this.queryMenuForPage(this.input);
            },
            filterHandle(value, row) {
                return this.input === row.name;
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage)
                this.queryMenuForPage(this.input);
            },
            //首页
            userfrist() {
                this.currentPage = 1;
                this.queryMenuForPage(this.input);
            },
            //尾页
            userlast() {
                this.currentPage = (this.total / this.pagesize);
                this.queryMenuForPage(this.input);
            },
            //菜单查询
            async queryMenuForPage(queryName) {
                try {
                    let result = await queryMenuForPage({
                        queryName: queryName,
                        page: this.currentPage,
                        rows: this.pagesize
                    }, "GET");
                    if (result.code == 0) {
                        console.log(result.data.list);
                        this.list = result.data.list;
                        this.total = result.data.count;
                        console.log(result.data.count);
                    }
                    else {
                        this.$message.error('获取列表失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
        },
        mounted() {
            this.queryMenuForPage(this.input);
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

    /*.el-table td,el-table th{*/
    /*text-align: center!important;*/
    /*}*/

</style>
