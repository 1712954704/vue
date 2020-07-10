<template>
  <div id="app">
<!--    <el-container>-->
<!--      <el-header>-->
<!--        <router-link to="/">Home</router-link> |-->
<!--        <router-link to="/about">About</router-link> |-->
<!--        <router-link to="/hello">Hello</router-link> |-->
<!--        <router-link to="/apply">投票</router-link> |-->
<!--        <router-link to="/prize">抽奖</router-link> |-->
<!--        <router-link to="/answer">答题</router-link> |-->
<!--        <router-link to="/">用户验证</router-link> |-->
<!--      </el-header>-->
<!--    </el-container>-->
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: '',
  mounted () {
    this.$router.push('/answer')
  }
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  /*margin-top 60px*/
</style>
