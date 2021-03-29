<template>
<div>
  <div class="product">
    <ul>
     <li class="right-li" v-for="(pinfo) in productInfo" :key="pinfo.id" @click="productdetail(pinfo.id)" v-show="pinfo.isSold===0"> 
      <div class="pro-img">
        <img v-bind:src="pinfo.pic" v-bind:alt="pinfo.goodname">
      </div>
      <h3>{{pinfo.goodname}}</h3>
      <p class="desc">{{pinfo.abstracts}}</p>
      <p class="price">
      <span>{{pinfo.price}}</span>元
      </p>
    </li>
    </ul>
  </div>
</div>
</template>

<script>

export default {
  name: 'ProductSelling',
  data () {
        return {
        isSeller:false,
        isBuyer: false,
        isLogin: false,
        productInfo: [],
        
        }
    },
  methods:{
      productdetail(index){
        localStorage.setItem('goodid',JSON.stringify(index));
        this.$router.push({path: '/productdetail'})
      }
  },
  mounted () {
        this.$axios
        .get('/goods')
        .then(response=> {
          this.productInfo = response.data
          for(var i in this.productInfo){
            if(this.productInfo[i].pic[0]!=="h"){
                this.productInfo[i].pic = require("../assets/"+this.productInfo[i].pic)
            }
          }
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
.product{
  margin:0 auto;
  width:1000px;}
* {
	margin: 0;
	padding: 0;
}

ul, ol {
	list-style: none;
}

input, button {
	outline: none;
	border: none;
}

.product li {
    float: left;
    width: 234px;
	  height: 246px;
    padding: 34px 0 20px;
    z-index: 1;
    margin-left: 14px;
    margin-bottom: 14px;
    background: #fff;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
	position: relative;
}

.pro-img {
	width: 150px;
	height: 150px;
	margin: 0 auto 18px;
}

.pro-img img {
	display: block;
	width: 100%;
	height: 100%;
}

.product li h3 {
	margin: 0 10px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: #333;
}

.desc {
	margin: 0 10px 10px;
    height: 18px;
    font-size: 12px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #b0b0b0;
}

.price {
	font-size: 14px;
	margin: 0 10px 10px;
    text-align: center;
    color: #d22147;
}

.review {
	position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    width: 234px;
    height: 0;
    overflow: hidden;
    font-size: 12px;
    background:#d22147;
    opacity: 0;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
}

.review {
	color: #757575;
	display: block;
    padding: 8px 30px;
    outline: 0;
}

.review span {
	display: block;
	margin-top: 20px;
    color: #fff;
}

.product li:hover {
	-webkit-box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
}

.product li:hover .review {
	opacity: 1;
	height: 76px;
}
</style>
