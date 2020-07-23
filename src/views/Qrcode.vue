<template>
  <div class="qrcode">
    <img :src=url  alt = "" :style="styleObj">
  </div>
</template>
<script>
export default {
  name: 'qrcode',
  components: '',
  data () {
    return {
      msg: '',
      url: 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=',
      styleObj: {
        height: '',
        width: ''
      }
    }
  },
  methods: {
    getHeight () {
      // 高度
      // this.styleObj.height = document.documentElement.clientHeight * 0.6 + 'px'
      this.styleObj.width = Window.innerWidth + 'px'
      console.log(Window.innerWidth + 'px')
    },
    getCode () {
      const code = window.localStorage.getItem('code')
      const openid = window.localStorage.getItem('openid')
      // const code = this.getUrlParam('code')
      // const code = this.getQueryString('code')
      if (!code) {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx00f633243d4191a7&redirect_uri=http://fast.xioabuding.top/qrcode&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_re'
      } else if (openid) {
        this.$axios({
          url: 'http://fast.xioabuding.top/api/wechat/qrCode',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          params: {
            openid: openid
          },
          method: 'get'
        }).then(response => {
          if (response.data.code === 200) {
            this.url += response.data.data.ticket
          } else {
            this.$message.error('网络错误')
          }
        }).catch(error => {
          this.$message.error('网络错误')
          window.console.log(error)
        })
      } else {
        console.log(code)
        console.log('=========================')
        this.$axios({
          url: 'http://fast.xioabuding.top/api/wechat/infor',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          params: {
            code: code
          },
          method: 'get'
        }).then(response => {
          window.console.log('请求成功')
          // window.console.log(response)
          // console.log(typeof response.data)
          console.log('------------------------------')
          // console.log(response.data.code)
          if (response.data.code === 200) {
            localStorage.setItem('openid', response.data.data.openid)
            this.$axios({
              url: 'http://fast.xioabuding.top/api/wechat/qrCode',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              params: {
                openid: response.data.data.openid
              },
              method: 'get'
            }).then(response => {
              if (response.data.code === 200) {
                this.url += response.data.data.ticket
              } else {
                this.$message.error('网络错误')
              }
            }).catch(error => {
              this.$message.error('网络错误')
              window.console.log(error)
            })
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
</style>
