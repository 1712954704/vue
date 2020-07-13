<template>
  <div calss="structure">
    <el-container class="structure_bg" :style="styleObj">
      <el-header :style="{height:'10%'}">
        <h3>还差最后一步,查看结果</h3>
      </el-header>
      <el-main>
        <div :style="{height:'40%'}">
          <div class="main_radio">
            <span>您的性别是:</span>
          </div>
          <div>
            <el-radio-group v-model="sex" class="main_radio_option">
              <el-radio-button label="1">男</el-radio-button>
              <el-radio-button label="0">女</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div :style="{height:'40%'}">
          <div class="main_radio">
            <span>您的年龄是:</span>
          </div>
          <div>
            <el-radio-group v-model="age" class="main_radio_option">
              <el-radio-button label="1">不到25</el-radio-button>
              <el-radio-button label="2">25到45之间</el-radio-button>
              <el-radio-button label="3">超过45</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="obtain" v-on:click="result">
          <span>查看结果</span>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  naem: 'strctre',
  components: '',
  data () {
    return {
      styleObj: {
        height: ''
      },
      sex: '',
      age: ''
    }
  },
  methods: {
    // 获取浏览器高度 宽度
    getHeight () {
      // this.contentStyleObj.height=window.innerHeight-70+'px';
      this.styleObj.height = document.documentElement.clientHeight + 'px'
      // $('.structure_bg').height = document.documentElement.clientHeight + 'px'
    },
    result () {
      var openid = window.window.localStorage.getItem('openid')
      var sum = window.window.localStorage.getItem('sum')
      sum = parseInt(sum) + parseInt(this.sex) + parseInt(this.age)
      this.$axios({
        url: 'http://fast.xioabuding.top/api/question/counter',
        // url: 'http://www.fast.test/api/question/counter',
        headers: { 'Content-Type': 'text/plain' },
        // headers: { 'Content-Type': 'multipart/form-data' },
        params: {
          openId: openid,
          paperId: 2,
          sum: sum
        },
        method: 'post'
      }).then(response => {
        window.console.log('请求成功')
        console.log(response)
        if (response.data.code === 200) {
          // localStorage.setItem('sum', 0)
          this.$router.push('/result')
        } else {
          this.$router.push('/result')
          // this.$message.error('网络错误')
        }
      }).catch(error => {
        this.$message.error('网络错误')
        window.console.log(error)
      })
    }
  },
  mounted () {
    this.getHeight()
  }
}
</script>
<style>
  .structure_bg{
    width: 100%;
    background-image:url('../assets/structure.png');
    background-repeat: no-repeat;
    background-size:100% 100%;
  }
  .main_radio{
    display: flex;
    flex-direction: row;
  }
  .main_radio_option{
    display: flex;
    flex-direction: column;
  }
  .main_radio_option label{
    margin-top: 10px;
  }
  .el-radio-button__inner{
    width: 80%;
  }
  .obtain{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 36px;
    color: #FFFF;
    background: #00EC00;
    width: 50%;
    margin: 0 auto;
    border: 2px solid #00EC00;
    border-radius: 25px;
    box-shadow: 2px 6px 0px #299e29;
  }
</style>
