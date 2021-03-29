<template>
  <div>
    <HeaderNavi/>
    <div class="login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')" class="loginBtn">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import HeaderNavi from '../components/HeaderNavi'
import md5 from 'js-md5'
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: '',
        rememberMe: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最少为6位', trigger: 'blur' }
        ]
      }
    }
  },
  components:{
    HeaderNavi,
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.ruleForm.password=md5(this.ruleForm.password);
          console.log(this.ruleForm)
          
          this.$axios({
            method: 'post',
            url: '/user',
            data: this.$qs.stringify(this.ruleForm) // 这里是发送给后台的数据
          }).then((response) => { // 这里使用了ES6的语法
            console.log(response.data) // 请求成功返回的数据
            if(response.data!=='fall'){
                localStorage.setItem('isLogin',true);
                if(response.data==='buyer'){
                  localStorage.setItem('username','buyer')
                  localStorage.setItem('isBuyer',true)
                }else{
                  localStorage.setItem('username','seller')
                  localStorage.setItem('isSeller',true)
                }
                this.$router.push({path: '/'})
            }else{
                this.$alert('密码或用户名错误', '提示', {
                  confirmButtonText: '确定',   
                });
                this.ruleForm.username=''
                this.ruleForm.password=''
            }
          }).catch((error) => {
            console.log(error)// 请求失败返回的数据
          })
        } else {
          this.$message.error('请重新填写标红字段')
        }
      })
    },
  },
}
</script>

<style scoped>
  .login {
    width: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
    font-size: 14px;
  }

  .loginBtn{
    height: 40px;
    margin-left: 30px;
    width: 240px;
  }
</style>
