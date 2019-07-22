<template>
    <div id="app">

        <!--<login></login>-->
       <!--<hello-world></hello-world>-->
        <!--<main></main>-->
       <div class="coms">
        <router-view></router-view>
       </div>
    </div>
</template>

<script>
   import login from './Login/Login.vue'
   import HelloWorld from './components/HelloWorld'
   import User from './User/User.vue'
//   import  Header from './components/Header.vue'
//   import head from './components/login.vue'
   import Main from './main/Main.vue'
    export default {
        name: 'app',
        components: {
//            login,HelloWorld
        }
    }
</script>

<style>
    /*.top {*/
        /*width: 100%;*/
        /*height: 200px;*/
        /*!*background-image: url("./image/70319f7290452f66e9cc7d236f5133d.png");*!*/
        /*!*background-repeat:no-repeat;*!*/
        /*!*background-color: blue;*!*/
        /*!*border: 1px red solid;*!*/
    /*}*/
    /*.top img{*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*background-size: cover;*/
    /*}*/
    /*.hear img {*/
        /*background-color: blue;*/
        /*color: red;*/
    /*}*/

    /*#app {*/
        /*text-align: center;*/
    /*}*/
</style>
