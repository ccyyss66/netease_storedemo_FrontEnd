<template>
    <div>
        <HeaderNavi/>
        <div class="orders">
        <div class="title">订单</div>
        <span v-show="!isLogin">请登录</span>

          <el-divider class="divider" content-position="center"></el-divider>
            <el-table class="table" :data="orderinfo" style="width: 70%" v-show="isBuyer">

                <el-table-column prop="pic" label="商品图片" width="150">
                    <template slot-scope="scope">
　　　　                <img :src="scope.row.pic" class="orderimg" @click="productdetail(scope.row.goodid)"/>
　　                </template>
                </el-table-column>
                <el-table-column
                    prop="goodname"
                    label="商品名称"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="购买时间"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="购买数量"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="boughtprice"
                    label="购买价格/元">
                </el-table-column>
            </el-table>
            <span v-show="isBuyer">总价：{{money}}元</span>
        </div>
    </div>
</template>

<script>
import HeaderNavi from '../components/HeaderNavi'
export default {
  name: 'OrderList',
  data () {
        return {
        isSeller:false,
        isBuyer: false,
        isLogin: false,
        orderinfo: [],
        money:0,
        }
    },
  methods:{
        productdetail(index){
            localStorage.setItem('goodid',JSON.stringify(index));
            this.$router.push({path: '/productdetail'})
      }

  },
  created(){
        this.$axios
        .get('/orders')
        .then(response=> {
            this.orderinfo=response.data
            console.log(this.orderinfo)
            for(var i in this.orderinfo){
                this.money=this.money+this.orderinfo[i].boughtprice*this.orderinfo[i].number;
                // this.orderinfo[i].boughtprice="￥"+this.orderinfo[i].boughtprice
                if(this.orderinfo[i].pic[0]!=="h"){
                    this.orderinfo[i].pic = require("@/assets/"+this.orderinfo[i].pic)
                }
            }

        })
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
        

  },
  mounted () {
        console.log(this.orderinfo)
       
  },
  components: {
    HeaderNavi
  },

}

 
</script>

<style scoped>

.orders{
    text-align: center;
}
.title{
    text-align:center;
    margin-right: 20px;
    margin-bottom: 5px;
    padding-bottom: 1px;
    font-size: 18px;
}
.divider{
    margin: 0;
    width: 70%;
    margin-left: 15%;
}
.table{
    margin: 0 auto;
    margin-top: 2%;
}
.orders span{
    float:right;
    margin-right:15% ;
    text-align: right;
    font-size:x-large;
    color: #d22147;
}

.orderimg{
    width: 50px;
    height:50px;
}
</style>
