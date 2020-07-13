<template>
  <div>
    <h2>用户授权</h2>
    <h2> code : {{ num }}</h2>
  </div>
</template>
<script>
export default {
  name: 'verify',
  data () {
    return {
      num: '',
      str: "{'code':201,'msg':'error','openId':null}"
    }
  },
  methods: {
    // url获取参数值
    getUrlParam (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var rrr = decodeURIComponent(window.location.search)
      var r = rrr.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    // 截取code
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2]); return null
    }
  },
  created: function () {
    console.log('进')
    const code = window.localStorage.getItem('code')
    const openid = window.localStorage.getItem('openid')
    console.log(openid)
    // const code = this.getUrlParam('code')
    // const code = this.getQueryString('code')
    if (!code) {
      console.log('1')
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx00f633243d4191a7&redirect_uri=http://wq.xioabuding.top/web/dist&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_re'
    } else if (openid) {
      console.log('2')
      return false
    } else {
      console.log('3')
      // console.log(code)
      console.log('=========================')
      this.$axios({
        url: 'http://fast.xioabuding.top/api/wechat/infor',
        params: {
          code: code
        },
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
}
</script>
<style>
</style>
