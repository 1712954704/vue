<template>
  <div class="hello">
    <div class="top" v-on:click="setScrollTop">
      <i class="el-icon-upload2"></i>
    </div>
    <el-container>
      <el-main class="bg" :style="bgStyleObj">
        <img alt="Vue logo" src="../assets/vote.jpg" :width="fullWidth">
        <div id="nav_fromsearch">
          <input type="text" placeholder="请输入" v-model="search" @keyup.enter="getData">
          <el-button type="primary" icon="el-icon-search" v-on:click="getData">搜索</el-button>
        </div>
        <div class="main_vote">
          <article class="item" v-for="(value, key) in items" :key="key">
<!--            <div :style="'background-image:url(\''+item.url+'\')'">-->
            <div class="item_border">
              <img :src=value.url alt = "">
              <span>查看详情</span>
            </div>
            <div class="main_vote_param">
              <h2>{{ value=value.name }}</h2>
              <h3>票数</h3>
              <h3>宣言</h3>
              <span>xxxxxxxxxxxxx</span>
            </div>
          </article>
        </div>
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
      },
      scrollHandle: '',
      top: 0,
      limit: 10,
      page: 0,
      search: '',
      items: [
        {
          id: '1',
          name: '200以下',
          url: 'http://www.fast.test/storage/uploads/vote/20200703/b1d10f17293b85546bd62d5fe9f68b69.jpg'
        },
        {
          id: '2',
          name: '400-600',
          url: 'http://www.fast.test/storage/uploads/vote/20200703/b1d10f17293b85546bd62d5fe9f68b69.jpg'
        },
        {
          id: '3',
          name: '600-800',
          url: 'http://www.fast.test/storage/uploads/vote/20200703/b1d10f17293b85546bd62d5fe9f68b69.jpg'
        },
        {
          id: '4',
          name: '800-1000',
          url: 'http://www.fast.test/storage/uploads/vote/20200703/b1d10f17293b85546bd62d5fe9f68b69.jpg'
        },
        {
          id: '5',
          name: '1000以上',
          url: 'http://www.fast.test/storage/uploads/vote/20200703/b1d10f17293b85546bd62d5fe9f68b69.jpg'
        }
      ]
    }
  },
  methods: {
    getData () {
      this.page += 1
      this.$axios({
        url: 'http://www.fast.test/api/voteInfor',
        method: 'get',
        headers: { 'Content-Type': 'text/plain' },
        data: {
          openid: '3443223',
          limit: this.limit,
          page: this.page,
          like: this.search
        },
        dataType: 'json'
      }).then(response => {
        console.log(response)
        var data = response.data
        this.data = data.data
        console.log(this.data)
        // this.items.push(this.data)
        // window.console.log('请求中奖成功')
        // console.log(response.data.index)
      }).catch(error => {
        window.console.log('请求失败')
        window.console.log(error)
      })
    },
    handleResize (event) {
      // this.fullWidth = document.documentElement.clientWidth
      this.bgStyleObj.height = document.documentElement.clientHeight + 'px'
    },
    // scrollheight (e) {
    //   // 滚动条高度
    //   var top = document.documentElement.scrollTop
    //   // 浏览器高度
    //   var height = document.documentElement.clientHeight
    //   console.log(top)
    //   console.log(height)
    // },
    setScrollTop () {
      document.documentElement.scrollTop = top
      // document.body.scrollTop = top
      console.log(top)
      console.log('top')
    },
    windowScroll () {
      // 滚动条距离底部的距离scrollBottom
      var scrollBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight
      console.log(scrollBottom)
      if (scrollBottom < 100) {
        this.items.push({
          id: '6',
          name: '2000以上',
          url: 'http://www.fast.test/storage/uploads/vote/20200703/b1d10f17293b85546bd62d5fe9f68b69.jpg'
        })
        // this.setScrollTop()
        // this.$set(this.items, 5, {
        //   id: '6',
        //   name: '2000以上',
        //   url: 'http://www.fast.test/storage/uploads/vote/20200703/b1d10f17293b85546bd62d5fe9f68b69.jpg'
        // })
      }
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      // var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      // console.log('------------------------------------------------------------')
    }
  },
  mounted () {
    window.addEventListener('scroll', this.windowScroll)
    this.getData()
    // 先给页面注册滚动事件
    // document.addEventListener('scroll', this.scrollheight(), true)
    // window.addEventListener('scroll', this.scrollheight())
  },
  created () {
    // this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.windowScroll)
  }
}
</script>
<style>
  html,body{
    /*overflow: hidden;*/
    margin:0;
  }
  input {
    background: none;
    outline: none;
    border: none;
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
  #nav_fromsearch{
    background: #F4F4F4;
    border: 1px solid #E7E7E7;
    display: block;
    padding: 0 38px 0 16px;
    display: flex;
  }
  #nav_fromsearch input{
    height: 34px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #99afe2;
    margin-right: 10px;
  }
  .main_vote{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between
  }
  .item{
    display: flex;
    flex-direction: column;
    /*flex-wrap: wrap;*/
    /*align-content: flex-start;*/
    height: 100%;
    width: 50%;
  }
  .item_border{
    padding: 7px;
  }
  .main_vote_param{
    display: flex;
    flex-direction: column;
  }
  .top{
    position: fixed;
    right: 0;
    bottom: 0;
    padding: 16px;
  }
</style>
