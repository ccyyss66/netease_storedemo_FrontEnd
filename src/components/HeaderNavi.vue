<template>
  <div class="headnavi-container">
      <div class="header-title">
          <div class="user">
            {{isLogin ? (isBuyer ? '买家你好, ' + userName + '！' : '卖家你好, ' + userName + '！') : '请'}}
                        <!-- {{isLogin ? (isBuyer ? '买家你好,buyer！' : '卖家你好seller！') : '请'}} -->

              <span @click="login" style="cursor:pointer" v-if="!isLogin">登录
              </span>
              <span style="cursor:pointer" @click="logout" v-if="isLogin" >退出
              </span>
          </div>
          <div class="nav">
              <router-link to="/">
                首页
              </router-link>
              <router-link to="/public" v-show="isSeller">
                发布
              </router-link>
              <router-link to="/orderlist" v-show="isBuyer">
                账务
              </router-link>
              <router-link to="/cartlist" v-show="isBuyer">
                购物车
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        isSeller:false,
        isBuyer:false,
        isLogin: false,
        userName: 'test',
    }
  },
  methods:{
    login(){
      this.$router.push({path:'/login'})
    },
    logout(){
      localStorage.setItem('isSeller',false)
      localStorage.setItem('isBuyer',false)
      localStorage.setItem('isLogin',false)
      localStorage.setItem('username','')
      this.$router.push({path:'/login'})
    }
  },
  created(){
    if(!localStorage.getItem('isSeller')){
      localStorage.setItem('isSeller',false)
    }    
    if(!localStorage.getItem('isBuyer')){
      localStorage.setItem('isBuyer',false)
    }
    if(!localStorage.getItem('isLogin')){
      localStorage.setItem('isLogin',false)
    }
    // if(!localStorage.getItem('username')){
    //   localStorage.setItem('username','seller')
    // }
    
    this.isSeller=JSON.parse(localStorage.getItem('isSeller'))
    this.isBuyer=JSON.parse(localStorage.getItem('isBuyer'))
    this.isLogin=JSON.parse(localStorage.getItem('isLogin'))
    this.userName=JSON.stringify(localStorage.getItem('username')).replace('"','').replace('"','')
    // console.log(this.userName)
    // console.log(this.isLogin)
    // console.log(this.isSeller)
    // console.log(this.isBuyer)



  }

}
</script>

<style scpoed>

.headnavi-container {
    padding: 10px 15px;
    margin: 0 0 30px;
    background: #d22147;
    line-height: 30px;
    color: #fff;
}
.header-title{
    width: 970px;
    margin: 0 auto;
}
.header-title:after{
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    content: ".";
}
.user{
    float: left;
}
.user a{
    color: #fff;
    text-decoration: none;
    margin-left: 5px;
}
.nav{
    float: right;
    display: flex;
    justify-content: space-between;
}
.nav a{
    color: #fff;
    text-decoration: none;
    display: block;
    padding: 0 15px;
    font-size: 16px;
    border-radius: 2px;
    transition: background-color 0.2s;
}
.nav a:hover{
    background: rgba(255,255,255,0.2);
}
</style>
