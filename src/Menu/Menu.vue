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
            <!--<el-table-column-->
                    <!--label="序号"-->
                    <!--type="index"-->
                    <!--width="50">-->
            <!--</el-table-column>-->
            <el-table-column
                    fixed
                    label="序号"
                    width="50">
                <template slot-scope="scope">
                    <span>{{scope.$index+1+(Pages-1)*pagesize}}</span>
                </template>
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
        <pages
                style="display: inline-block"
                :total=total
                :currentPage=Pages
                :pageSize=pagesize
                @handleCurrentChangeSub="handleCurrentChange">
        </pages>
    </div>
</template>
<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElCol from "element-ui/packages/col/src/col";
    import {queryMenuForPage} from '../api'

    export default {
        components: {
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
                Pages: 1,
                id: '',
            }
        },
        methods: {
            //查询
            selectuser() {
                this.Pages = 1;
                console.log('我是pages',this.Pages);
                this.queryMenuForPage(this.input);
            },
            filterHandle(value, row) {
                return this.input === row.name;
            },
            handleCurrentChange: function (Pages) {
                this.Pages = Pages;
                this.queryMenuForPage(this.input);
            },
            //首页
            userfrist() {
                this.Pages = 1;
                this.queryMenuForPage(this.input);
            },
            //尾页
            userlast() {
                this.Pages = (this.total / this.pagesize);
                this.queryMenuForPage(this.input);
            },
            //菜单查询
            async queryMenuForPage(queryName) {
                try {
                    let result = await queryMenuForPage({
                        queryName: queryName,
                        page: this.Pages,
                        rows: this.pagesize
                    }, "GET");
                    if (result.code == 0) {
                        console.log('我是pages2',this.Pages);
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
