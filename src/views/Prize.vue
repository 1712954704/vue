<template>
  <div class="Prize">
    <h2>抽奖</h2>
    <h2>{{ msg }}</h2>
    <LuckDraw
      ref="luckDraw"
      v-model="currIndex"
      :awards="awards"
      :async="true"
      @before-start="handleBeforeStart"
      @start="handleStart"
      @end="handleEnd"
    />
  </div>
</template>
<script>
export default {
  name: 'Prize',
  data () {
    return {
      currIndex: 0, // 奖品的索引
      awards: [
        { name: '价值5988元华为 P30pro', color: '#f9e3bb' },
        { name: '价值398元车载空气净化器', color: '#f8d384' },
        { name: '价值25元百叶帘遮阳挡', color: '#f9e3bb' },
        { name: '16元油卡套餐红包', color: '#f8d384' },
        { name: '5元油卡直冲红包', color: '#f9e3bb' },
        { name: '3元话费直冲红包', color: '#f8d384' },
        { name: '价值32元重力感应手机支架', color: '#f9e3bb' },
        { name: '价值198元手提迷你车在保温冷藏箱', color: '#f8d384' }
      ],
      msg: '',
      data: [],
      index: 6,
      id: 0
    }
  },
  methods: {
    handleBeforeStart () { // 新增异步抽奖
      setTimeout(() => {
        console.log('异步抽奖')
        this.prize()
        // console.log(this.data)
        // console.log(data)
        // this.$refs.luckDraw.play(data.index)
        // this.$refs.luckDraw.play(3)
        this.$refs.luckDraw.play(this.currIndex)
      }, 3000)
    },
    handleStart () {
      console.log('开始抽奖')
    },
    handleEnd (index) {
      this.$axios({
        url: 'http://wq.xioabuding.top/web/api/Gain.php',
        method: 'post',
        data: {
          openid: window.window.localStorage.getItem('openid'),
          prize_id: this.id
        }
      }).then(response => {
        window.console.log('保存中奖信息成功')
        // console.log(response.data.index)
        // this.index = response.data.index
        // this.id = response.data.id
      }).catch(error => {
        window.console.log('请求失败')
        window.console.log(error)
      })
      alert('恭喜您抽到大奖, 奖品为' + this.awards[this.currIndex].name)
    },
    userInfo () {
      this.$axios({
        // url: 'http://wq.xioabuding.top/web/index.php?c=site&a=entry&do=time&m=lab',
        url: 'http://wq.xioabuding.top/web/api/Test.php',
        method: 'get'
      }).then(response => {
        window.console.log('请求成功')
        window.console.log(response.data)
      }).catch(error => {
        window.console.log('请求失败')
        window.console.log(error)
      })
    },
    // 获取奖品数据
    getPrize () {
      this.$axios({
        url: 'http://wq.xioabuding.top/web/api/getPrize.php',
        method: 'get'
      }).then(response => {
        window.console.log('请求奖品数据成功')
        // window.console.log(response.data)
        // window.console.log(typeof response.data)
        // window.console.log('-----------------------------')
        this.awards = response.data
        // window.console.log(this.awards)
        // window.console.log(typeof this.awards)
      }).catch(error => {
        window.console.log('请求失败')
        window.console.log(error)
      })
    },
    // 获取奖品数据
    prize () {
      this.$axios({
        url: 'http://wq.xioabuding.top/web/api/Prize.php',
        method: 'get'
      }).then(response => {
        // window.console.log('请求中奖成功')
        // console.log(response.data.index)
        this.currIndex = response.data.index
        this.id = response.data.id
      }).catch(error => {
        window.console.log('请求失败')
        window.console.log(error)
      })
    }
  },
  mounted () {
    console.log('mouted')
    // this.userInfo()
    // this.getPrize()
  },
  created () {
    console.log('created')
  }
}
</script>
<style>
</style>
