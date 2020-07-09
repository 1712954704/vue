<template>
  <div class="answer">
    <div class="main">
      <div class="main_img" :style="contentStyleObj">
        <img class="main_img_bg" src = "../assets/types.png" alt = "">
        <img class="main_img_top" src = "../assets/title.png" alt = "">
      </div>
      <div class="begin" v-on:click="begin">
          <span>开始答题</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Answer',
  components: '',
  data () {
    return {
      contentStyleObj: {
        height: '',
        width: ''
      },
      item: ''
    }
  },
  methods: {
    // 获取浏览器高度 宽度
    getHeight () {
      // this.contentStyleObj.height=window.innerHeight-70+'px';
      this.contentStyleObj.height = document.documentElement.clientHeight * 0.8 + 'px'
    },
    begin () {
      this.$router.push('/reply')
    },
    getCode () {
      const code = window.localStorage.getItem('code')
      // const code = this.getUrlParam('code')
      // const code = this.getQueryString('code')
      if (!code) {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx00f633243d4191a7&redirect_uri=http://fast.xioabuding.top/eye/dist&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_re'
      } else {
        console.log(code)
        console.log('=========================')
        this.$axios({
          url: 'http://wq.xioabuding.top/api/wechat/infor.php?code=' + code,
          method: 'get'
        }).then(response => {
          window.console.log('请求成功')
          window.console.log(response)
          console.log(typeof response.data)
          console.log('------------------------------')
          console.log(response.data.code)
          if (response.data.code === 200) {
            localStorage.setItem('openid', response.data.openId)
            var openid = window.window.localStorage.getItem('openid')
            console.log(openid)
          } else {
            alert('用户信息获取失败')
          }
        }).catch(error => {
          window.console.log('请求失败')
          window.console.log(error)
        })
      }
    }
  },
  mounted () {
    this.getCode()
    this.getHeight()
  }
}
</script>
<style>
  html,body{
    /*overflow: hidden;*/
    margin:0;
    background: #FED51B;
    }
  .main{
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 80%;
    height: 80%;
    }
  .main_img{
    width: 100%;
    margin-top: 40px;
    position: relative;
    }
  .main_img_bg{
    width: 100%;
    height: 100%;
    object-fit:cover;
    }
  .main_img_top{
    position: absolute;
    left: 0;
    width: 80%;
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
</style>
