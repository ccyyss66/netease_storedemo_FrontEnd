<template>
    <div>
        <HeaderNavi/>
        <div class="orders">
        <div class="title">购物车</div>
        <span v-show="!isLogin">请登录</span>
          <el-divider class="divider" content-position="center" ></el-divider>
            <el-table class="table" :data="shopdata" style="width: 70%" v-show="isBuyer">

                <el-table-column prop="pic" label="商品图片" width="200">
                    <template slot-scope="scope">
　　　　                <img :src="scope.row.pic" class="orderimg" @click="productdetail(scope.row.id)"/>
　　                </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称"
                    width="200">
                </el-table-column>
                <!-- <el-table-column
                    prop="time"
                    label="购买时间"
                    width="200">
                </el-table-column> -->
                <el-table-column
                    prop="number"
                    label="购买数量"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="购买价格/元">
                </el-table-column>
            </el-table>
            <span v-show="isBuyer">总价：{{money}}元</span>
            <br>
            <el-button class="shop" type="primary"  v-show="isBuyer" @click="buy()">结算</el-button>
            
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
        shopdata:JSON.parse(localStorage.getItem("shop_data")),
        money:0,
        }
    },
  methods:{
        productdetail(index){
            localStorage.setItem('goodid',JSON.stringify(index));
            this.$router.push({path: '/productdetail'})
        },
        //获取当前日期 时间
        todayTime() {
            var date = new Date();
            var curYear = date.getFullYear();
            var curMonth = date.getMonth() + 1;
            var curDate = date.getDate();
            if(curMonth<10){
                    curMonth = '0' + curMonth;
            }
            if(curDate<10){
                    curDate = '0' + curDate;
            }    
            var curHours = date.getHours();
            var curMinutes = date.getMinutes();
            var curSenconds=date.getSeconds();
            if(curHours<10){curHours='0'+curHours}
            if(curMinutes<10){curMinutes='0'+curMinutes}
            if(curSenconds<10){curSenconds='0'+curSenconds}
            var curtime = curYear + '-' + curMonth + '-' + curDate +' ' + curHours + ':' + curMinutes + ':'+curSenconds;
            return curtime;
        },
        buy(){
            if(localStorage.getItem("shop_data")==="[]"){
                this.$alert('购物车为空！', '提示', {
                    confirmButtonText: '确定',   
                }).then(()=>{
                    this.$router.push({path: '/'})
                });
            }else{
                let str = localStorage.getItem("shop_data")
                var boughttime=this.todayTime()
                let infos = []
                console.log(this.shopdata)
                for (let i in this.shopdata){
                    let temp = {}
                    temp.goodid = this.shopdata[i].id
                    temp.time = boughttime
                    temp.number = this.shopdata[i].number
                    temp.boughtprice = this.shopdata[i].price
                    infos.push(temp)
                    console.log(infos)
                }
                    // 将数据转换为数组对象
                let arr = JSON.parse(str)
                let success=0
                console.log(JSON.stringify(arr))
                    this.$axios.post('/orders',JSON.stringify(infos),{headers: {'Content-Type': 'application/json'}},)
                                .then(res=>{
                                    if(res.data.status==='success'){
                                        success+=1
                                    }
                            })

                // for(var i in arr){
                //     let params={goodid:arr[i].id,time:boughttime,number:arr[i].number,boughtprice:arr[i].boughyprice}
                //         // console.log(params)
                //     this.$axios.post('/goods',this.$qs.stringify(params))
                //                 .then(res=>{
                //                     if(res.data==='success'){
                //                         success+=1
                //                     }
                //             })
                //     }

                localStorage.setItem("shop_data", "[]")
                this.shopdata=JSON.parse(localStorage.getItem("shop_data"))
                this.money=0
                this.$alert('购买成功', '提示', {
                    confirmButtonText: '确定',   
                }).then(()=>{
                    this.$router.push({path: '/'})
                });
            }
        }
  },
  created(){
    //   localStorage.setItem('shop_data',[])
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
      console.log(this.shopdata)
        for(let i in this.shopdata){
            console.log(this.shopdata[i].price)
            this.money=this.money+this.shopdata[i].price*this.shopdata[i].number;
            if(this.shopdata[i].pic[i]!=="h"){
                //   this.shopdata[i].pic = require("@/assets/"+this.shopdata[i].pic)
            }
        }
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
.shop{
    float:right;
    margin-top:2%;
    margin-right:-8%;
    display:flex;
    text-align: right;

}

.orderimg{
    width: 50px;
    height:50px;
}
</style>
