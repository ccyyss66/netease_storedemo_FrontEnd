<template>
  <div>
      <HeaderNavi/>
      <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="所有内容" name="0">
            <ProductList/>
          </el-tab-pane>
          <el-tab-pane label="未购买内容" name="1" v-if="isBuyer">
            <ProductSelling/>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import HeaderNavi from '../components/HeaderNavi'
import ProductList from './ProductList'
import ProductSelling from './ProductSelling'


export default {
  name: 'HomePage',
  data () {
    return {
      activeName: 0,
      isSeller: false,
      isBuyer: false,
      isLogin: false,

    }
  },
  components: {
    HeaderNavi,
    ProductList,
    ProductSelling
  },
  methods: {
    handleClick(tab, event){
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
    this.isSeller=JSON.parse(localStorage.getItem('isSeller'))
    this.isBuyer=JSON.parse(localStorage.getItem('isBuyer'))
    this.isLogin=JSON.parse(localStorage.getItem('isLogin'))
  }

}
</script>

<style scoped>
.container{
  width: 1010px;
  margin: 0 auto;
}
</style>
