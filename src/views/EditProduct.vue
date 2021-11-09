<template>
    <div class="publish-product">
        <secondary-header :title="'Edit your product'"></secondary-header>
        <div class="info-container">
            <div class="upload-img-title">Picture</div>
            <div class="upload-img-container">
                <img :src="imageUrl">
            </div>
            <div class="product-info">
                <div class="form-item"><span class="form-title">Picture link </span><el-input v-model="input">{{ item.picutre }}</el-input></div>
                <div class="form-item"><span class="form-title">Product ID </span><el-tag>{{ item.goodId }}</el-tag></div>
                <div class="form-item"><span class="form-title">Product name </span><el-input v-model="input1" size="medium" placeholder="Good name..." /></div>
                <div class="form-item"><span class="form-title">Description </span><el-input v-model="input2" size="medium" placeholder="Description..." /></div>
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
                <div class="submit-btn" @click="onSubmit">Submit</div>
            </div>
        </div>
    </div>
</template>

<script>
import { toRefs, reactive, ref, onMounted, watch } from 'vue'
import SecondaryHeader from "../components/SecondaryHeader.vue"
import { ElMessage } from 'element-plus'
import { editProduct } from '../api/api'
import { useRouter, useRoute } from 'vue-router'

export default {
    setup() {
        const input = ref('')
        const input1 = ref('')
        const input2 = ref('')
        const input3 = ref('')
        const input4 = ref('')
        const input5 = ref(0)
        const input6 = ref(1)
        const input7 = ref(100)
        const router = useRouter()
        const route = useRoute()
        onMounted(()=>{
            state.item.picture = route.params.picture
            state.item.goodId = route.params.goodId
            state.item.goodName = route.params.goodName
            state.item.description = route.params.description
            state.item.price = route.params.price
            state.item.originPrice = route.params.originPrice
            state.item.classification = route.params.classification
            state.item.stock = route.params.stock
            state.item.newness = route.params.newness
            state.userId = localStorage.getItem("UserId")
            state.userName = localStorage.getItem("UserName")
            initialValue()
        })
        watch(input,()=>{
            state.imageUrl = input.value
        })
        const state = reactive({
            imageUrl:'',
            options: [
                {
                    value:1,
                    label:'Book'
                },
                {
                    value:2,
                    label:'Clothes'
                },
                {
                    value:3,
                    label:'Device'
                },
            ],
            item:{},
            userId:'',
            userName:''
        })
        const initialValue = () => {
            input.value = state.item.picture
            input1.value = state.item.goodName
            input2.value = state.item.description
            input3.value = state.item.price
            input4.value = state.item.originPrice
            input5.value = state.item.classification
            input6.value = state.item.stock
            input7.value = state.item.newness
        }
        const onSubmit = async () => {
            if(input.value===''||input1.value===''||input2.value===''||input3.value===''||input4.value===''){
                ElMessage.error('Please fill in the information completely!')
            }
            else{
                const params = {
                    goodId:state.item.goodId,
                    picutre:input.value,
                    goodName:input1.value,
                    discription:input2.value,
                    price:input3.value,
                    originPrice:input4.value,
                    classification:input5.value,
                    stock:input6.value,
                    newness:input7.value,
                    sellerId:state.userId,
                    sellerName:state.userName
                }
                console.log("send:",params)
                const { data } = await editProduct(params)
                if(data.code===200){
                    ElMessage({
                        message: 'Submitted successfully!',
                        type: 'success',
                    })
                    setTimeout(()=>{
                        router.go(-1)
                    },3000)
                }
            }
        }
        return {
            ...toRefs(state),
            onSubmit,
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
.classify-btn,.upload-btn,.submit-btn{
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