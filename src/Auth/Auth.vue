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
        <pages
                style="display: inline-block"
                :total=total
                :currentPage=currentPage
                :pageSize=pagesize
                @handleCurrentChangeSub="handleCurrentChange">
        </pages>
        <el-dialog title="设置权限" :visible.sync="dialogTableVisible">
            <el-tree
                    :data="label"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    ref="tree"
                    :props="defaultProps"
                    :default-checked-keys="defaultCheckKeys"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button type="primary" @click="primary()">提 交</el-button>
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
    import {roleUpdate} from '../api'
    export default {
        components: {
            ElCol,
            ElButton,
            ElRow
        },
        data() {
            return {
                defaultCheckKeys: ["5d02fc7a2e700a29c027399d"],
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
                    label: 'name'
                },
                name: '',
                deptname: '',
                label: [],
                listType: []
            }
        },
        methods: {
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },
            //提交
            primary(){
                var rad='';
                var ridsa = this.$refs.tree.getCheckedKeys().join(',');// 获取当前的选中的数据[数组] -id, 把数组转换成字符串
                var ridsb = this.$refs.tree.getCheckedNodes();// 获取当前的选中的数据{对象}
                ridsb.forEach(ids=>{//获取选中的所有的父级id
                    rad+=','+ids.pid
                });
                let  nodeId=[];
                for (var i=0;i<ridsb.length;i++)
                {      let rid=ridsb[i];
                    nodeId.push({id:rid.id,type:"Checked"});
                }
                var jsonStr11 = JSON.stringify(nodeId);//json数组转化成json字符串
                this.roleUpdate(this.id,jsonStr11);
                this.dialogTableVisible = false;
            },
            //设置权限
            handleEdit(index, row) {
                this.id=row._id;
                this.queryMenuForList(index, row);
            },
            // 查询
            selectuser() {
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
            //角色权限修改
            async roleUpdate(id,roleMenu) {
                try {
                    let result = await roleUpdate({
                        id:id,
                        roleMenu:roleMenu
                    }, "POST");
                    if (result.code == 0) {
                        this.queryRoleForPage(this.input);
                        this.$message.success('修改成功');
                    }
                    else {
                        this.$message.error('获取列表失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
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
            //查询并把数据回显在树上
            async queryMenuForList(index, row) {
                try {
                    this.label = [];
                    let listTree = [];
                    let result = await queryMenuForList("GET");
                    if (result.code == 0) {
                        for (var i = 0; i < result.data.length; i++) {
                            listTree.push({
                                name: result.data[i].name,
                                id: result.data[i]._id,
                                fid: result.data[i].fid
                            });
                        }
                        //把JSON字符串转换成对象
                        let roleList = JSON.parse(row.roleMenu);
                        let tlist = [];
                        for (var i = 0; i < roleList.length; i++)  // 遍历角色拥有的菜单
                        {
                            for (var j = 0; j < listTree.length; j++)//遍历全部菜单
                            {
                                if (roleList[i].id == listTree[j].id) {
                                    listTree[j].type = roleList[i].type;
//                                    上面语句的另一种写法
//                            Vue.set(this.listTree[j],"type",roleList[i].type);
                                }

                            }
                        }

                        for (var j = 0; j < listTree.length; j++)//遍历全部菜单
                        {
                            let item = listTree[j];
                            if (listTree[j].fid == '0') {
                                //添加到finalList里
                                tlist.push(item);
                            } else {
                                //遍历finalList找到fid和finalList里面面元素的id相等的那个对象
                                for (var k = 0; k < tlist.length; k++) {
                                    let tItem = tlist[k];
                                    if (tItem.id == item.fid) {
                                        //判断是否有子级，有填到父级里面，没有子级为空
                                        if (tItem.children) {
                                            tItem.children.push(item);

                                        } else {
                                            tItem.children = [];
                                            tItem.children.push(item);
                                        }
                                    }
                                }
                            }

                        }
                        //把数据放在组件树上
                        this.label = tlist;
                        this.dialogTableVisible = true;
                        //默认选中的另一种方法
//                        this.defaultCheckKeys = roleList.map((a,b)=>{
//                            return a.id;
//                        });
                        //把id存到tkeyLsit的集合
                        let tkeyLsit = [];
                        for (let k = 0; k < roleList.length; k++) {
                            tkeyLsit.push(roleList[k].id);
                        }
                        //返回默认选中的id
                        this.defaultCheckKeys = tkeyLsit;
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
