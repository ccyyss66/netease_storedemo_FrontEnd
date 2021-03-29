
<template>
  <div>
      <HeaderNavi/>
      <div class="publicContainer">
          <div class="title">商品详情</div>
          <el-divider class="divider"></el-divider>
            <div class="detail">
                <div class="block" :key="productinfo.id">
                    <img class="image" :src="productinfo.pic">
                </div>
                <div class="case_box">
                    <h2>{{ productinfo.goodname }}</h2>
                    <p>
                        {{productinfo.description }}
                    </p>
                    <span>{{productinfo.abstracts}}</span>
                    <span class="price"><strong>￥{{productinfo.price}}</strong></span>
                    <!-- <span class="boughtprice" v-show="isBuyer && productinfo.isSold===1">上次购买价格<strong>￥{{productinfo.boughtprice}}</strong></span> -->
                    <!-- <span class="selling" v-if="productinfo.isSelling===0" style="color:grey"><strong>该商品已下架</strong></span> -->

                    <br>
                    <el-input-number v-model="number" size="mini" @change="handleChange" :min="1" :max="10000" label="描述文字" v-show="isBuyer && productinfo.isSold===0"></el-input-number>
                    <br>
                    <el-button class="shop" type="primary"  v-show="isBuyer " @click="buy(productinfo.id,productinfo.goodname,productinfo.price,number,productinfo.pic)">加入购物车</el-button>
                    <el-button class="edit" type="primary"  v-show="isSeller" @click="edit(productinfo.id)">编辑</el-button>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import HeaderNavi from '../components/HeaderNavi'
export default {
  name: 'HomePage',
  data () {
    return {
       productinfo: {},
       orderinfo:{},
       number:1,
       isSeller: false,
       isBuyer: false,
       isLogin: false,
       goodid:JSON.parse(localStorage.getItem('goodid'))
    }
  },
  components: {
    HeaderNavi,
  },
  methods:{
       handleChange() {
        console.log(this.number);
      },
      buy(goodid,goodname,goodprice,num,pic_path){
        // localStorage.setItem("shop_data", "[]")

        if (!localStorage.getItem("shop_data")) {
            localStorage.setItem("shop_data", "[]")
        }
        let shopdata={
            id:goodid,
            pic:pic_path,
            name:goodname,
            price:goodprice,
            number:num
        }
        let str = localStorage.getItem("shop_data")
        //将数据转换为数组对象
        var same=0
        let arr = JSON.parse(str)
        for(var i in arr){
            // console.log(arr[i])
            if(arr[i].id===goodid && arr[i].price===goodprice){
                arr[i].number+=num
                same=1
                localStorage.setItem("shop_data", JSON.stringify(arr))
            }
        }
        if(same===0){
        //将对象添加入数组
            arr.push(shopdata)
            //将数组转化为字符串然后在存入localstorage
            localStorage.setItem("shop_data", JSON.stringify(arr))
        }
        this.$alert('加入购物车成功', '提示', {
            confirmButtonText: '确定',   
        });
    

      },
      edit(goodid){
        localStorage.setItem('goodid',JSON.stringify(goodid));
        this.$router.push({path: '/publicedit'})
      }

    
  },
  mounted(){
        let params={id:this.goodid}
        this.$axios
        .get('/good',{
            params:{
                id:this.goodid
            }
        })
        .then(response=> {
            this.productinfo = response.data
            if(this.productinfo.pic[0]!=="h"){
                this.productinfo.pic = require("../assets/"+this.productinfo.pic)

            }
            // console.log(this.productinfo.pic)
  })

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
.publicContainer{
    width: 1000px;
    margin: 0 auto;
}
.title{
    text-align:left;
    margin-right: 20px;
    margin-bottom: 5px;
    padding-bottom: 1px;
    font-size: 18px;
}
.divider{
    margin: 0;
}
.form{
  margin-top: 30px;
}

.image {
	width: 280px;
	height: 280px;

}
.case_box{
    width: 580px;
    height: 300px;
    margin-left: 2%;
}
.case_box h2{
    font-size: 30px;
    margin: 0 auto;
}
.case_box p{
    font-size: 14px;
    line-height: 28px;
    color: #b0b0b0;
}
.case_box span{
    display: block;
    font-size: 14px;
    color: #d22147;
    margin-top: 20px;
}

.price{
    font-size:14px;
}

.case_box a:hover{
    background:#d22300;
}
.detail{
    margin-top: 1%;
    display: flex;
}

.shop{
    margin-top:2%;
    
}



</style>
