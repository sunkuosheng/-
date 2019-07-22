<template>
    <div class="header">
        <el-header style="padding: 0px">
        <el-row>
        <div class="top">
            <el-col :span="5" style="height: 100%">
            <img src="../image/70319f7290452f66e9cc7d236f5133d.png"style="height: 100%;width: 100%"/>
            </el-col>
            <el-col :span="16" style="height: 100%">
            </el-col>
            <el-col :span="3" style="height: 100%">
                <p>欢迎你:{{this.$route.params.name}}</p>
            </el-col>
        </div>
        </el-row>
        </el-header>
        <el-main>
        <el-row>
            <el-col :span="6">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <!--<div class="tworight">-->
            <el-col :span="18">
            <router-view></router-view>
            </el-col>

            <!--</div>-->
        </el-row>
        </el-main>
    </div>


</template>
<script>
    import ElCol from "element-ui/packages/col/src/col";
    import ElRow from "element-ui/packages/row/src/row";
    import ElHeader from "../../node_modules/element-ui/packages/header/src/main.vue";
    import ElMain from "../../node_modules/element-ui/packages/main/src/main.vue";

    export default {
        components: {
            ElMain,
            ElHeader,
            ElRow,
            ElCol},
        name: 'HelloWorld',
        data() {
            return {
                data: [{
                    id: 1,
                    label: '基础服务',

                    children: [{
                        id: 2,
                        label: '用户管理',
                        path: 'User'


                    }, {
                        id: 3,
                        label: '菜单管理',
                        path: 'Menu'

                    },
                        {
                            id: 4,
                            label: '角色权限管理',
                            path: 'Auth'
                        }
                        , {
                            id: 5,
                            label: '字典管理',
                            path: 'Dictionaries'
                        }
                        , {
                            id: 6,
                            label: '地区管理',
                            path: 'Region'
                        }
                    ]
                }, {
                    id: 7,
                    label: '数据统计',
                    children: [{
                        id: 8,
                        label: '采集数据',
                        path: 'Gather'

                    }]
                }, {
                    id: 9,
                    label: '公众号菜单管理',
                    path: 'Accounts'

                },
                    {
                        id: 10,
                        label: '采集人员管理',
                        path: 'Gatheruser'
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                name: '123',
            };
        },
        methods: {
            //路由跳转
            handleNodeClick(data) {
//                console.log(data.id);
//                if(data.id===2){
                this.$router.push({
                    name: data.path,
                    params: {
                        id: data.id
                    }
                });
//                }
//                if(data.id===3){
//                    this.$router.push({
//                        name: `Menu`,
//                        params: {
//                            id:data.id
//                        }
//                    });}
//                if(data.id===4){
//                    this.$router.push({
//                        name: `Auth`,
//                        params: {
//                            id:data.id
//                        }
//                    });}
//                if(data.id===5){
//                    this.$router.push({
//                        name: `Dictionaries`,
//                        params: {
//                            id:data.id
//                        }
//                    });}
//                if(data.id===6){
//                    this.$router.push({
//                        name: `Region`,
//                        params: {
//                            id:data.id
//                        }
//                    });}
//                if(data.id===8){
//                    this.$router.push({
//                        name: `Gather`,
//                        params: {
//                            id:data.id
//                        }
//                    });}
//                if(data.id===9){
//                    this.$router.push({
//                        name: `Accounts`,
//                        params: {
//                            id:data.id
//                        }
//                    });}
//                if(data.id===10){
//                    this.$router.push({
//                        name: `Gatheruser`,
//                        params: {
//                            id:data.id
//                        }
//                    });}
//                console.log(data);
//                console.log(this.name);
            },
            getRouterData() {
                this.name = this.$route.params.name;
//                console.log('name', this.$route.params.name)

            }
        }
    };
</script>
<style>
    .top {
        height: 60px;
        width: 100%;
        background-color: blue;
        padding: 0px;
    }

    img {
        /*width: 100px;*/
        /*height: 100px;*/
        /*float: left;*/
        /*height: 100%;*/
        /*width: 100px;*/
        /*height: 200px;*/
    }

    /*.tworight {*/
        /*position: absolute;*/
        /*top: 60px;*/
        /*left: 140px;*/

    /*}*/

    /*.top p {*/
        /*color: antiquewhite;*/
        /*text-align: center;*/
        /*line-height: 60px;*/
    /*}*/
</style>
