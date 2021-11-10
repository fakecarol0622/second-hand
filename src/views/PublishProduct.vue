<template>
    <div class="publish-product">
        <secondary-header :title="'Sell your product'"></secondary-header>
        <div class="info-container">
            <div class="upload-img-title">Picture preview</div>
            <div class="upload-img-container">
                <img :src="imageUrl">
            </div>
            <div class="product-info">
                <div class="form-item"><span class="form-title">Picture link </span><el-input v-model="input" size="medium" placeholder="Link..." /></div>
                <div class="form-item"><span class="form-title">Product name </span><el-input v-model="input1" size="medium" placeholder="Good name..." maxlength="20"/></div>
                <div class="form-item"><span class="form-title">Description </span><el-input v-model="input2" size="medium" placeholder="Description..."  maxlength="300"/></div>
                <div class="form-item"><span class="form-title">Selling price ($) </span><el-input v-model="input3" size="medium" placeholder="Selling price..."/></div>
                <div class="form-item"><span class="form-title">Origin price ($) </span><el-input v-model="input4" size="medium" placeholder="Origin price..." /></div>
                <div class="form-item"><span class="form-title">Category </span>
                  <el-select v-model="input5" placeholder="Select">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="form-item"><span class="form-title">Stock </span>
                    <el-input-number v-model="input6" :min="1" :max="100" />
                </div>
                <div class="form-item"><span class="form-title">Newness (%) </span>
                    <el-input-number v-model="input7" :min="1" :max="100" />
                </div>
            </div>
            <div class="next-step">
                <div class="publish-btn" @click="onPublish">Sell it now!</div>
            </div>
        </div>
    </div>
</template>

<script>
import { toRefs, reactive, ref, onMounted, watch } from 'vue'
import SecondaryHeader from "../components/SecondaryHeader.vue"
import { ElMessage } from 'element-plus'
import { upShelfProduct } from '../api/api'
import { getEvaluateResult } from '../api/api'
import { useRouter } from 'vue-router'
import { convertClassification } from '../utils/utils'

export default {
    setup() {
        const input = ref('')
        const input1 = ref('')
        const input2 = ref('')
        const input3 = ref('')
        const input4 = ref('')
        const input5 = ref('')
        const input6 = ref(1)
        const input7 = ref(100)
        const router = useRouter()
        const state = reactive({
            imageUrl:'',
            options: [
                {
                    value:'book',
                    label:'book'
                },
                {
                    value:'clothes',
                    label:'clothes'
                },
                {
                    value:'device',
                    label:'device'
                },
            ],
            userId:'',
            userName:'',
        })
        onMounted(()=>{
            state.userId = localStorage.getItem("UserId")
            state.userName = localStorage.getItem("UserName")
        })
        watch(input,()=>{
            state.imageUrl = input.value
            onEvaluate(state.imageUrl)
        })
        const onEvaluate = async (url) => {
            const { data } = await getEvaluateResult(url)
            if(data.status===200){
                setTimeout(()=>{
                    input3.value = data.price
                    input4.value = data.originPrice
                    input5.value = convertClassification(data.category)
                    input7.value = data.newness
                    ElMessage.success('We have evaluated your product and filled in the information for you!')
                },3000)
            }
        }
        const onPublish = async () => {
            if(input.value===''||input1.value===''||input2.value===''||input3.value===''||input4.value===''||input5.value===''){
                ElMessage.error('Please fill in the information completely!')
            }
            else{
                let value5 = 1;
                if(input5.value==='book'){
                    value5 = 1
                }
                else if(input5.value==='clothes'){
                    value5 = 2
                }
                else if(input5.value==='device'){
                    value5 = 3
                }
                const params = {
                    goodName:input1.value,
                    discription:input2.value,
                    price:input3.value,
                    originPrice:input4.value,
                    classification:value5,
                    stock:input6.value,
                    newness:input7.value,
                    picutre:input.value,
                    sellerId:state.userId,
                    sellerName:state.userName
                }
                console.log(params)
                const { data } = await upShelfProduct(params)
                if(data.code===200){
                    ElMessage.success('Your product is now on sale!')
                    setTimeout(()=>{
                        router.push({
                            path:'/'
                        })
                    },3000)
                }
            }
        }
        return {
            ...toRefs(state),
            onPublish,
            input,
            input1,
            input2,
            input3,
            input4,
            input5,
            input6,
            input7
        }
    },
    components: {
        SecondaryHeader
    }
}
</script>

<style lang="scss" scoped>
.publish-product{
    max-width: 1200px;
    margin: 0 auto;
    .info-container{
        max-width:600px;
        margin:0 auto;
        box-shadow: 4px 4px 8px #c2c2c2;
        border-radius: 2rem;
        padding:2rem;
    }
}
.upload-img-title{
    margin-left:1rem;
}
.upload-img-container{
    margin:1rem 0;
    text-align: center;
    img{
        max-height: 400px;
    }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  border:1px dashed #8c939d;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  &:hover{
    border-color: #409eff;
  }
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width:3rem;
        height: 3rem;
    }
}
.classify-btn,.publish-btn,.next-btn,.upload-btn{
    padding:1rem;
    border-radius: 2rem;
    background: #99ddcc;
    max-width:200px;
    text-align: center;
    font-weight: bold;
    margin:1rem auto;
    text-align: center;
}
.product-info{
    .form-item{
        margin:1rem;
        .form-title{
            margin-right:1rem;
        }
    }
}
</style>