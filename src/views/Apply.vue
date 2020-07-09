<template>
  <div class="apply">
    <el-container class="main">
      <el-header>
        <h2>立即报名</h2>
      </el-header>
      <el-main class="prime">
        <div class="import">
          <div class="import_item">
            <el-upload
              class="avatar-uploader"
              action="123"
              :http-request="uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="import_item">
            <el-button type="primary" disabled class="import_item_button">姓名:</el-button><el-input v-model="name" placeholder="请输入内容"  maxlength="30" clearable></el-input>
          </div>
          <div class="import_item">
            <el-button type="primary" disabled class="import_item_button">电话:</el-button><el-input v-model="phone" placeholder="请输入内容"  maxlength="30" clearable></el-input>
          </div>
          <div class="import_item">
            <el-button type="primary" disabled class="import_item_button">年龄:</el-button><el-input v-model="age" placeholder="请输入内容"  maxlength="30" clearable></el-input>
          </div>
          <div class="import_item">
            <span class="el-dropdown-link">
<!--              下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              <el-button type="primary" disabled class="import_item_button">近视:</el-button>
            </span>
            <el-select v-model="flash" placeholder="请选择" class="select">
              <el-option
                v-for="item in items"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="import_item">
            <span class="el-dropdown-link">
              <el-button type="primary" disabled class="import_item_button">近视:</el-button>
            </span>
            <el-select v-model="vision" placeholder="请选择" @change="obtainValue" class="select">
              <el-option
                v-for="item in items"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="import_show">
            <el-button type="primary" disabled class="import_show_button">宣言:
            </el-button>
            <el-input
            type="textarea"
            placeholder="宣言"
            v-model="show"
            maxlength="30"
            show-word-limit
          >
          </el-input>
          </div>
        </div>
      </el-main>
      <el-footer class="footer">
        <el-button type="danger"  v-on:click="commit">提交</el-button>
        <el-button type="danger"><router-link to="/hello">返回首页</router-link></el-button>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Apply',
  components: {
  },
  data () {
    return {
      items: [
        {
          id: '1',
          name: '200以下'
        },
        {
          id: '2',
          name: '400-600'
        },
        {
          id: '3',
          name: '600-800'
        },
        {
          id: '4',
          name: '800-1000'
        },
        {
          id: '5',
          name: '1000以上'
        }
      ],
      name: '',
      phone: '',
      age: '',
      vision: '',
      flash: '',
      show: '',
      imageUrl: 'http://www.fast.test/storage/uploads/vote/20200703\\b1d10f17293b85546bd62d5fe9f68b69.jpg'
    }
  },
  methods: {
    // 获取下拉框选中值
    obtainValue (value) {
      console.log(value)
      console.log(this.vision)
    },
    handleCommand (command) {
      this.vision = command
      // console.log(this.vision)
      // this.$message('click on item ' + command)
    },
    flashCommand (command) {
      this.flash = command
    },
    handleAvatarSuccess (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    uploadImg (f) {
      console.log(f)
      // this.progressFlag = true
      // let formdata = new FormData()
      const formdata = new FormData()
      formdata.append('image', f.file)
      this.$axios({
        url: 'http://www.fast.test/tool/vote/uploadImg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        var data = res.data
        if (data.code === 200) {
          this.imageUrl = data.data.header
        }
        // this.imageUrl = res.data.data
        // if (this.progressPercent === 100) {
        //   this.progressFlag = false
        //   this.progressPercent = 0
        // }
      }).then(error => {
        console.log(error)
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    commit () {
      this.$axios({
        // url: 'http://fast.xioabuding.top/api/voteAdd',
        url: 'http://www.fast.test/api/voteAdd',
        method: 'post',
        headers: { 'Content-Type': 'text/plain' },
        data: {
          openid: '3525434354sg',
          name: this.name,
          phone: this.phone,
          age: this.age,
          vision: this.vision,
          flash: this.flash,
          show_text: this.show,
          header_image: this.imageUrl
        }
      }).then(response => {
        // window.console.log('保存数据成功')
        var data = response.data
        if (data.code === 200) {
          this.$message({
            message: '报名成功',
            type: 'success'
          })
          this.$router.push('/hello')
        } else if (data.code === 201) {
          this.$message.error(data.msg)
        } else {
          this.$message.error('网络连接超时')
        }
      }).catch(error => {
        this.$message.error('网络连接超时')
        window.console.log(error)
      })
    }
  }
}
</script>
<style>
  html,body{
    margin:0;
  }
  .main{
    width: 100%;
    background-image:url('../assets/infor.jpg');
    background-repeat: no-repeat;
    background-size:100% 100%;
    /*height: 100%;*/
    padding: 0;
    /*top:0;*/
    /*z-index: -1;*/
    /*position: absolute;*/
  }
  .main img{
    display: block;
    outline: none;
    border:0;
    height: 100%;
    width: 100%;
  }
  .prime{
    padding: 10px;
    border: 2px solid darkslategray;
    margin: 20px;
    border-radius: 20px;
    border-color: #e6d0af;
    box-shadow: 10px 10px 20px 10px rgba(156, 156, 153);
  }
  .import{
    display: flex;
    flex-direction: column;
  }
  .import_item{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }
  .import_show{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .footer{
    background-color: #3EA9C5;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
/*  上传样式*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .import_show_button{
    margin-bottom: 10px;
  }
  .import_item_button{
    margin-right: 7px;
  }
  .select{
    width: 100%;
  }
</style>
