<template>
    <div class="header">
        <div class="top">
            <img src="../image/70319f7290452f66e9cc7d236f5133d.png"/>
        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>


</template>
<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                data: [{
                    label: '基础服务',
                    children: [{
                        label: '用户管理',


                    }, {
                        label: '菜单管理',
                    },
                        {label: '角色权限管理',}
                        , {label: '字典管理',}
                        , {label: '用户管理',}
                    ]
                }, {
                    label: '数据统计',
                    children: [{
                        label: '采集数据',

                    }]
                }, {
                    label: '公众号菜单管理',

                },
                    {
                        label: '采集人员管理',
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            }
        }
    };
</script>
<style>
    .top {
        height: 60px;
        width: 100%;
        background-color: blue;
    }

    img {
        width: 100px;
        height: 30px;
        float: left;
    }
</style>
