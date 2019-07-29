<template>
    <div class="el-main">
        <el-row>
            <p>基础服务>角色权限管理</p>
        </el-row>
        <el-row>
            <em>角色名称</em>
            <el-input placeholder="角色权限管理" v-model="input" clearable style="width: 200px!important">用户名</el-input>
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
                    label="角色名称"
                    sortable>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" title="设置权限" icon="el-icon-setting"
                               @click="handleEdit(scope.$index, scope.row)"></el-button>
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
        <el-dialog title="设置权限" :visible.sync="dialogTableVisible">
            //树
            <el-tree :data="label" :props="defaultProps"></el-tree>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogTableVisible = false">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'
    import ElRow from "element-ui/packages/row/src/row";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElCol from "element-ui/packages/col/src/col";
    import {queryRoleForPage} from '../api'
    import {queryMenuForList} from '../api'
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
                total: 5,
                pagesize: 5,
                currentPage: 1,
                id: '',
                dialogTableVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                name: '',
                deptname: '',
                listTree:'',
                label:[{
                }]
            }
        },
        methods: {
//            loadNode(node, resolve){
//                if (node.level === 0) {
//                    //初始第一层节点，初始化数据，根节点配置
//                    return resolve([{ label: '1' }, { label: '2' }, { label: '3' },]);
//                }
//            },
            //设置权限
            handleEdit(index, row) {
                this.queryMenuForList();
//                console.log(row.roleMenu);
                this.dialogTableVisible = true;
                console.log('我是树',this.defaultProps);
//                for(var i=0;i< this.listTree.length;i++)
//                {
//                    console.log(this.listTree[i].name);
//                    this.label.push({label:this.listTree[i].name});

//                }
            },
            // 查询
            selectuser() {
                console.log(this.input);
                this.currentPage = 1;
                this.queryRoleForPage(this.input);
            },
            filterHandle(value, row) {
                return this.input === row.name;
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                this.queryRoleForPage(this.input);
            },
            //首页
            userfrist() {
                this.currentPage = 1;
                this.queryRoleForPage(this.input);
            },
            //尾页
            userlast() {
                this.currentPage = (this.total / this.pagesize);
                this.queryRoleForPage(this.input);
            },
            //角色查询
            async queryRoleForPage(queryName) {
                try {
                    let result = await queryRoleForPage({
                        queryName: queryName,
                        page: this.currentPage,
                        rows: this.pagesize
                    }, "GET");
                    if (result.code == 0) {
//                        console.log(result.data.list);
                        this.list = result.data.list;
                    }
                    else {
                        this.$message.error('获取列表失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            async queryMenuForList(){
                try {
                    let result = await queryMenuForList("GET");
                    if (result.code == 0) {
                        for(var i=0;i<result.data.length;i++)
                        {
                            if(result.data[i].fid==0)
                            this.label.push({label:result.data[i].name,children:""})
                        }
//                       console.log(result.data);
//                       this.listTree=result.data;
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
            this.queryRoleForPage(this.input);
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
