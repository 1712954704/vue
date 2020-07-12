<template>
  <div class="reply">
    <h2>回答</h2>
    <div class="reply_main">
      <div>
        {{ this.item[this.index].question_name }}
      </div>
      <img src = "../assets/1.png" alt = "">
      <div>
        <el-radio-group v-model="score" v-for="(value, key) in item[index].select" :key="key" class="reply_main_radio">
<!--        <el-radio-group v-model="score">-->
          <el-radio-button  :label="value.score">{{ value.option_name }}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="begin" v-on:click="next">
        <span>下一题</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Reply',
  components: '',
  data () {
    return {
      index: 0,
      score: false,
      sum: 0,
      item: [
        {
          question_name: ''
        }
      ]
    }
  },
  methods: {
    next () {
      // 计数
      // this.sum = parseInt(this.sum) + parseInt(this.score)
      // console.log(typeof (this.sum))
      // console.log(this.sum)
      // console.log(this.score)
      if (this.item.length <= this.index) {
        console.log(this.sum)
        localStorage.setItem('sum', this.sum)
        this.$router.push('/structure')
      } else {
        console.log(this.score)
        if (this.score === false) {
          this.$message('请选择')
        } else {
          this.sum = parseInt(this.sum) + parseInt(this.score)
          this.score = false
          this.index++
        }
      }
      console.log('下一题')
      // console.log(this.score)
      console.log(this.item)
      // console.log(this.item.length)
      // console.log(this.item[this.index].tiMu)
    },
    getData () {
      this.$axios({
        url: 'http://fast.xioabuding.top/api/question/infor',
        // url: 'http://www.fast.test/api/question/infor',
        method: 'get',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // headers: { 'Content-Type': 'text/plain' },
        params: {
          paperId: 2
        },
        dataType: 'json'
      }).then(response => {
        // console.log(response)
        // var data = response.data
        this.item = response.data.data
        localStorage.setItem('countScore', response.data.count)
        // console.log(this.item)
      }).catch(error => {
        window.console.log('请求失败')
        window.console.log(error)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style>
  html,body{
    /*overflow: hidden;*/
    margin:0;
    }
  .begin{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 36px;
    color: #FFFF;
    background: #F15D41;
    width: 50%;
    margin: 0 auto;
    border: 2px solid #F15D41;
    border-radius: 25px;
    box-shadow: 2px 6px 0px #BD2508;
    }
  .reply_main_radio{
    display: flex;
    flex-direction: column;
    }
  .reply_main_radio label{
    margin-top: 10px;
    }
</style>
