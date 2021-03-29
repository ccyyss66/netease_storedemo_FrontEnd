<template>
  <div>
      <HeaderNavi/>
      <div class="publicContainer" v-show="isSeller">
          <div class="title">内容发布</div>
          <el-divider class="divider"></el-divider>
          <el-form class="form" :model="form" :rules="rules" ref="form">
            <el-form-item label="名称:" prop="goodname">
                <el-input v-model="form.goodname" placeholder="2-80字符" class="short-input"></el-input>
            </el-form-item>
            <el-form-item label="摘要:" prop="abstracts">
                <el-input v-model="form.abstracts" placeholder="2-140字符" class="short-input"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-radio-group v-model="resource" @change="changeClick">
                <el-radio label="图片地址"></el-radio>
                <el-radio label="本地上传"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-input 
                v-model="form.pic" 
                placeholder="图片地址" 
                class="pic" 
                v-show="resource === '图片地址'">
              </el-input>
              <el-upload
                class="upload-demo"
                :action="uploadApi"
                list-type="picture"
                :limit="1"
                :on-success="uploadSuccess"
                v-show="resource === '本地上传'">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="正文:" prop="description">
              <el-input type="textarea" v-model="form.description" placeholder="2-1000字符" class="detail-input">
              </el-input>
            </el-form-item>
            <el-form-item label="价格:" prop="price">
                <el-input v-model.number="form.price" style="width:140px;float:left"></el-input>
                <div class="yuan">元</div>
            </el-form-item>
            <el-button class="publicBtn" type="primary"  @click="submitForm('form')">发 布</el-button>
          </el-form>
      </div>
  </div>
</template>

<script>
import HeaderNavi from '../components/HeaderNavi'
export default {
  name: 'HomePage',
  data () {
    return {
        form:{
            goodname:'',
            abstracts:'',
            pic:'',
            description:'',
            price:null
        },
        filepath:'',
        isSeller:false,
        resource:'图片地址',
        uploadApi: "http://localhost:8084/sys/addImg",
        rules: {
          goodname:[
            {required: true, message:'请输入标题', trigger: blur},
            {min: 2, max: 80, message:'长度在2-80个字符', trigger: blur}
          ],
          abstracts:[
            {required: true, message: '请输入摘要', trigger: blur},
            {min: 2, max: 140, message:'长度在2-140个字符', trigger: blur}
          ],
          description:[
            {required: true, message: '请输入正文', trigger: blur},
            {min: 2, max: 1000, message:'长度在2-1000字符', trigger: blur}
          ],
          price:[
            {required: true, message:'请输入价格', trigger: blur},
            {type: 'number', message: '必须为数字'}
          ]
        }
    }
  },
  components: {
    HeaderNavi,
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.form.pic===''){
            this.form.pic=this.filepath;
          }
          let params=this.form
          console.log(this.form)
          console.log(this.filepath)
          console.log(this.form.pic)
          console.log(JSON.stringify(params))
          this.$axios.post('/good',JSON.stringify(params),{headers: {'Content-Type': 'application/json'}},)
          .then(res=>{
              console.log("res=>",res)
              if(res.data.status==='success'){
                  this.$alert('上架成功', '提示', {
                  confirmButtonText: '确定',   
                }).then(()=>{
                    this.$router.push({path: '/'})
                });
              }else{
                this.$alert('操作失败，请稍后再试', '提示', {
                  confirmButtonText: '确定',   
                })
              }
              this.form={goodname:'',abstracts:'',pic:'',description:'',price:''}
              // this.$router.push({path: '/'})

          })
        } else {
          console.log('请按要求填写商品信息');
          return false;
        }
      });
     
    },
    uploadSuccess(response, file, fileList) {
            this.filepath=response
            // response：即为后端传来的数据，这里我返回的是图片的路径
    },
    changeClick(){
      this.form.description=''
      this.form.price=''
    }
  },
  created(){
        if(!localStorage.getItem('isSeller')){
            localStorage.setItem('isSeller',false)
        }    
       
        
        this.isSeller=JSON.parse(localStorage.getItem('isSeller'))
        

  },

}
</script>

<style scoped>
.publicContainer{
    width: 970px;
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
.short-input{
  width: 720px;
  float: left;
}
.pic{
  width: 720px;
  float: left;
  margin-left: 55px;
}
.detail-input{
  float: left;
  width: 720px;
}
.yuan{
  float: left;
  margin-left: 5px;
}
.publicBtn{
    height: 40px;
    width: 75px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    padding: 0;
    
}
</style>
