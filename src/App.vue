<template>
  <div id="app" >
    <div class="apps" style="font-size:50px">webpack</div>
    <img alt="Vue logo" :src="logo">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import logo from './assets/logo.png'

export default {
    name: 'App',
    components: {
        HelloWorld
    },
    data () {
        return {
            logo
        }
    }
}
</script>

<style lang="less" scoped>
.apps {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: red;
}
</style>
