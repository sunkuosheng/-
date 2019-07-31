<template>
    <div id="app">
        <div class="coms">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import login from './Login/Login.vue'
    import HelloWorld from './components/HelloWorld'
    import User from './User/User.vue'
    import Main from './main/Main.vue'

    export default {
        name: 'app',
        components: {
            login, HelloWorld, Main
        }
    }
</script>

<style>

</style>
