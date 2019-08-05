<template>
    <div class="el-main">
        <!--<el-row>-->
            <!--<li>基础服务</li>-->
            <!--<li v-for="(tops,index) in toplist" @click="topclick(index)">>{{tops.name}}</li>-->
        <!--</el-row>-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>基础服务</el-breadcrumb-item>
            <!--<el-breadcrumb-item ><a href="#" @click.prevent="go(-1, 0)" style="cursor: hand">地区管理</a></el-breadcrumb-item>-->
            <el-breadcrumb-item style="cursor: hand" v-for="(tops, index) in toplist" :key="index"><a href="#" @click.prevent="topclick(index)">{{tops.name}}</a></el-breadcrumb-item>
        </el-breadcrumb>

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
                    <span>{{scope.$index+1+(currentPage-1)*pagesize}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="地区名称"
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
        </el-table>
        <el-button type="primary" size="medium" @click="adduser">新增</el-button>
        <pages
                style="display: inline-block"
                :total=total
                :currentPage=currentPage
                :rows=pagesize
                @handleCurrentChangeSub="handleCurrentChange">
        </pages>
        <el-dialog title="创建地区" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-form :rules="rules" :model="form" ref="form">
                <el-form-item label="地区名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="callOf">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElCol from "element-ui/packages/col/src/col";
    import {queryDeptForPage} from '../api'
    import {deptInsert} from '../api'
    import {deptDelete} from '../api'
    import {queryDeptOne} from '../api'
    import {deptUpdate} from '../api'
    import storageUtil from '../util/storageUtil'
    import ElBreadcrumb from "../../node_modules/element-ui/packages/breadcrumb/src/breadcrumb.vue";

    export default {
        components: {
            ElBreadcrumb,
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
                rules:{
                    name:[
                        {required: true, message: '请输入地区的名称', trigger: 'blur'}
                    ]
                },
                toplist: [],
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
            //导航条点击事件
            topclick(index) {
                let fid = this.toplist[index].fid;
                this.fid = fid;
                this.queryDeptForPage(fid, this.currentPage, this.pagesize);
                let unmber = this.toplist.length - index;
                this.toplist.splice(index + 1, unmber);
            },
            //取消 验证清空
            callOf(){
                this.$refs.form.resetFields();
                this.dialogFormVisible=false;
            },
            //右上角关闭 验证清空
            handleClose() {
                this.$refs.form.resetFields();
                this.dialogFormVisible=false;
            },
            //回填
            handleEdit(index, row) {
                this.index = index;
                this.dialogFormVisible = true;
                this.form = row;
                //中断form和list集合的联动，list重新获取一下数据
                this.queryDeptForPage(this.fid, this.currentPage, this.pagesize);
                this.update = true;
            },
            //删除
            handleDelete(index, row) {
                this.$confirm('确定要删除该记录吗?', '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    this.deptDelete(row._id);
                }).catch(() => {
                });
            },
            adduser() {
                //清空地区名称
                this.form.name = "";
                this.dialogFormVisible = true;
            },
            //修改和增加
            add() {
                //true是修改
                if (this.update) {
                    let tableName = this.form.name;
                    let tableId = this.form._id;
                    this.deptUpdate(tableId, tableName);

                    this.update = false;
                }
                //false是添加
                else {
                    let fid = this.id;
                    //判断fid是为空
                    //初始值为空代表父级
                    //有值的话代表的是子级
                    if (fid == "") {
                        fid = 0;
                    }
                    let name = this.form.name;
                    this.deptInsert(name, fid);


                }
                this.dialogFormVisible = false
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                this.queryDeptForPage(this.fid, this.currentPage, this.pagesize);
            },
            //首页
            userfrist() {
                this.currentPage = 1;
                this.queryDeptForPage(this.fid, this.currentPage, this.pagesize);
            },
            //尾页
            userlast() {
                //向上取整，因为有时候会有小数
                this.currentPage = Math.ceil(this.total / this.pagesize);
                this.queryDeptForPage(this.fid, this.currentPage, this.pagesize);
            },
            //查看下一级
            handleEnd(index, row) {
                //把id和name放进toplist 导航条根据name显示，数据根据fid查询 下一级的fid等于上一级的id
                this.toplist.push({fid: row._id, name: row.name});
                this.fid = row._id;
                //把id存起来
                this.id = this.list[index]._id;
                this.queryDeptForPage(this.fid, this.currentPage, this.pagesize);
            },
            //分页查询数据
            async queryDeptForPage(fid, page, rows) {
                try {
                    let result = await queryDeptForPage({fid: fid, page: page, rows: rows}, "GET");
                    if (result.code == 0) {
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
            //地区增加
            async deptInsert(name, fid) {
                try {
                    let result = await deptInsert({name: name, fid: fid}, "POST");
                    if (result.code == 0) {
                        this.queryDeptForPage(this.fid, this.currentPage, this.pagesize);
                        this.$message.success('添加成功');
                    }
                    else {
                        this.$message.error('添加失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            //地区删除
            async deptDelete(id) {
                try {
                    let result = await deptDelete({id: id}, "GET");

                    if (result.code == 0) {
                        if (result.data.status === -1) {
                            this.$message.error('地区还有对应的地区，无法删除');
                        }
                        else if (result.data.status === -2){
                            this.$message.error('地区同等级，无法删除');
                        }
                        else {
                            this.queryDeptForPage(this.fid, this.currentPage, this.pagesize);
                            this.$message.success('删除成功');
                        }
                    }
                    else {
                        this.$message.error('删除失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }

            },
            //地区单条查询
            async querydeptOne(id) {
                try {
                    let result = await querydeptOne({id: id}, "GET");
                    if (result.code == 0) {
                        this.$message.success('回填成功')
                    }
                    else {
                        this.$message.error('回填失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },
            //地区修改
            async deptUpdate(id, name) {
                try {
                    let result = await deptUpdate({id: id, name: name}, "POST");
                    if (result.code == 0) {
                        this.queryDeptForPage(this.form.fid, this.currentPage, this.pagesize);
                        this.$message.success('修改成功')
                    }
                    else {
                        this.$message.error('修改失败');
                    }
                } catch (e) {
                    alert(e.message);
                    this.$message.error('系统异常，请联系管理员');
                }
            },

        },
        //在渲染成html后调用 获取地区数据
        mounted() {
            this.queryDeptForPage(this.fid, this.currentPage, this.pagesize);
        },
        created(){
            this.fid=storageUtil.read('fid');
            this.toplist.push({fid: this.fid, name: '地区管理'});
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
