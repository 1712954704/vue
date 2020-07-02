<template>
  <div class="hello">
    <el-container>
<!--      <el-header>Header</el-header>-->
      <el-main class="bg" :style="bgStyleObj">
<!--        <h2>Main</h2>-->
        <img alt="Vue logo" src="../assets/vote.jpg" :width="fullWidth">
      </el-main>
      <el-footer class="footer">
        <el-main>
          <el-button type="danger"><router-link to="/apply">我要报名</router-link></el-button>
          <el-button type="danger">个人中心</el-button>
        </el-main>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Hello',
  components: {
  },
  data () {
    return {
      fullWidth: '',
      bgStyleObj: {
        height: ''
      }
    }
  },
  methods: {
    handleResize (event) {
      // this.fullWidth = document.documentElement.clientWidth
      this.bgStyleObj.height = document.documentElement.clientHeight + 'px'
    }
  },
  created () {
    // this.handleResize()
  }
}
</script>
<style>
  html,body{
    overflow: hidden;
    margin:0;
  }
  .bg{
    width: 100%;
    /*height: 100%;*/
    padding: 0;
    /*top:0;*/
    /*z-index: -1;*/
    /*position: absolute;*/
  }
  .bg img{
    display: block;
    outline: none;
    border:0;
    height: 100%;
    width: 100%;
  }
  .footer{
    background-color: #3EA9C5;
  }
</style>
