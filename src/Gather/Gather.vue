<template>
    <div class="el-main">
        <el-row>
            <p>数据统计>采集数据</p>
        </el-row>
        <el-table :data="list">
            <el-table-column
                    label="序号"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="olds[0].name"
                    label="老人姓名"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="年龄"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="olds[0].idNumber"
                    label="身份证号"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="olds[0].phone"
                    label="常用联系电话"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="olds[0].address"
                    label="居住地址"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="采集时间"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="shorts[0].name"
                    label="采集员"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    :formatter="stateFormatter"
                    sortable>
            </el-table-column>
        </el-table>
        <pages
                style="display: inline-block"
                :total=total
                :currentPage=currentPage
                :rows=pagesize
                @handleCurrentChangeSub="handleCurrentChange">
        </pages>
    </div>
</template>
<script>
    import axios from 'axios'
    import ElRow from "element-ui/packages/row/src/row";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElCol from "element-ui/packages/col/src/col";
    import {queryDictForPage} from '../api'
    import {dictInsert} from '../api'
    import {dictDelete} from '../api'
    import {queryDictOne} from '../api'
    import {dictUpdate} from '../api'
    //
    import {queryInfoForPage} from '../api'

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
                    _id: ''
                },
                toplist: [{
                    fid: '0',
                    name: '字典管理'
                }
                ],
                index: '',
                formLabelWidth: '120px',
                update: false,
                list: [],
                total: 1000,//默认数据总数
                pagesize: 10,//每页的数据条数
                currentPage: 1,//默认开始页面
                id: '',
                fid: 0,
            }
        },
        methods: {
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                this.queryInfoForPage(this.currentPage, this.pagesize);
            },
            //状态显示的变化
            stateFormatter(row) {
                return row.status == 1 ? '已完成' : '未完成';
            },
            //分页查询数据
            async queryInfoForPage(page, rows) {
                try {
                    let result = await queryInfoForPage({queryName: '', page: page, rows: rows}, "GET");
                    if (result.code == 0) {
                        console.log(result);
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

            //在渲染成html后调用 获取字典数据
            mounted() {
                this.queryInfoForPage(this.currentPage, this.pagesize);
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

    li {
        display: inline-grid;
    }
</style>
