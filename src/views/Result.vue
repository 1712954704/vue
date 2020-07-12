<template>
  <div class="result">
    <el-container>
      <el-header>
        <h2>普瑞眼科</h2>
      </el-header>
      <el-main>
        <div class="result_main_bg" :style="styleObj">
          <div class="result_main_bg_index">
            <span>干眼指数13</span>
          </div>
          <div class="result_main_bg_ruler" :style="rulerStyleObj"></div>
          <div class="result_main_bg_level">
            <div class="main_line">
              <span>您的干眼</span>
              <span>程度超过</span>
            </div>
            <span class="percent">{{ percent }}</span>
            <div class="main_line">
              <span :style="{color:'#F15D41'}">%</span>
              <span>的人</span>
            </div>
          </div>
        </div>
        <div class="remind">
            <span>{{remind}}</span>
        </div>
      </el-main>
      <el-footer>
        <div class="result_footer">
          <div class="obtain_left" v-on:click="refer">
            <span>点我咨询</span>
          </div>
          <div class="obtain_right" v-on:click="weal">
            <span>干眼福利</span>
          </div>
        </div>
        <div>
          <div>
            <el-dialog width="100%" fullscreen="true" title="获取福利" :visible.sync="dialogFormVisible">
              <el-form :model="form" :style="formStyle">
                <div class="import_item">
                  <el-button type="primary" disabled class="import_item_button">姓名:</el-button><el-input v-model="form.name" placeholder="请输入内容"  maxlength="30" clearable></el-input>
                </div>
                <div class="import_item">
                  <el-button type="primary" disabled class="import_item_button">联系方式:</el-button><el-input v-model="form.phone" placeholder="请输入内容"  maxlength="30" clearable></el-input>
                </div>
                <div class="import_item">
                  <el-button type="primary" disabled class="import_item_button">年龄:</el-button><el-input v-model="form.age" placeholder="请输入内容"  maxlength="30" clearable></el-input>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogForm">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'result',
  components: '',
  data () {
    return {
      percent: '',
      sex: '',
      styleObj: {
        height: ''
      },
      rulerStyleObj: {
        height: ''
      },
      remind: '',
      formStyle: {
        height: ''
      },
      // dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        phone: '',
        age: ''
      },
      formLabelWidth: '414px'
    }
  },
  methods: {
    // 获取浏览器高度 宽度
    getHeight () {
      // this.contentStyleObj.height=window.innerHeight-70+'px';
      // 表单高度
      this.formStyle.height = document.documentElement.clientHeight + 'px'
      this.styleObj.height = document.documentElement.clientHeight * 0.6 + 'px'
      this.rulerStyleObj.height = document.documentElement.clientHeight * 0.6 * 0.2 + 'px'
      // $('.structure_bg').height = document.documentElement.clientHeight + 'px'
    },
    remindStatus (status) {
      if (status === 1) {
        this.remind = 'good'
      } else {
        this.remind = 'bad'
      }
    },
    // 咨询
    refer () {
      this.$message('咨询')
    },
    // 福利
    weal () {
      this.$message('福利')
      this.dialogFormVisible = true
    },
    pay () {
      // this.percent = window.window.localStorage.getItem('sum') / window.window.localStorage.getItem('countScore') * 100
      this.percent = Math.round(window.window.localStorage.getItem('sum') / window.window.localStorage.getItem('countScore') * 10000) / 100
    },
    dialogForm () {
      var openid = window.window.localStorage.getItem('openid')
      this.$axios({
        url: 'http://fast.xioabuding.top/api/question/userUP',
        // url: 'http://www.fast.test/api/question/userUP',
        headers: { 'Content-Type': 'text/plain' },
        // headers: { 'Content-Type': 'multipart/form-data' },
        params: {
          openId: openid,
          name: this.form.name,
          phone: this.form.phone,
          age: this.form.age
        },
        method: 'post'
      }).then(response => {
        window.console.log('请求成功')
        console.log(response)
        if (response.data.code === 200) {
          this.dialogFormVisible = false
        } else {
          this.dialogFormVisible = false
        }
      }).catch(error => {
        this.$message.error('网络错误')
        window.console.log(error)
      })
    }
  },
  mounted () {
    this.getHeight()
    this.pay()
  }
}
</script>
<style>
  .result_main_bg{
    width: 100%;
    background-image:url('../assets/types1.png');
    background-repeat: no-repeat;
    background-size:100% 100%;
  }
  .result_main_bg_ruler{
    width: 80%;
    background-image:url('../assets/ruler.png');
    background-repeat: no-repeat;
    background-size:100% 100%;
    position: relative;
    top: 20%;
    left: 6%;
  }
  .result_main_bg_index{
    display: flex;
    flex-direction: row;
    position: relative;
    top: 16%;
    left: 6%;
    color: #FFE002;
  }
  .result_main_bg_level{
    display: flex;
    flex-direction: row;
    position: relative;
    top: 26%;
    left: 6%;
    border: 1px dashed #000;
    width: 80%;
    border-radius: 5px;
    justify-content: space-between;
  }
  .main_line{
    display: flex;
    flex-direction: column;
    font-size: 36px;
  }
  .main_line span {
    display: flex;
    height: 50%;
    font-size: 26px;
  }
  .percent{
    line-height: 101px;
    font-size: 21px;
    max-height: 100%;
    transform: scaleY(1.18);
  }
  .remind{
    display: flex;
    flex-direction: row;
    font-size: 20px;
    font-weight: bold;
  }
  .result_footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between
  }
  .obtain_left{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 36px;
    color: #FFFF;
    background: #FFC10C;
    width: 50%;
    /*margin: 0 auto;*/
    border: 2px solid #FFC10C;
    border-radius: 25px;
    box-shadow: 2px 6px 0px #b7932b;
    margin-right: 20px;
  }
  .obtain_right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 36px;
    color: #FFFF;
    background: #F36A3A;
    width: 50%;
    /*margin: 0 auto;*/
    border: 2px solid #F36A3A;
    border-radius: 25px;
    box-shadow: 2px 6px 0px #b76245;
    margin-right: 20px;
  }
  .import_item{
    display: flex;
  }
  .dialog >>>.el-dialog__wrapper {
    background-color:rgba(0,0,0,0.8);
  }
</style>
