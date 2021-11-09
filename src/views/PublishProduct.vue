<template>
    <div class="publish-product">
        <secondary-header :title="'Up shelf your product'"></secondary-header>
        <div class="info-container">
            <div class="upload-img-title">Picture preview</div>
            <div class="upload-img-container">
                <img :src="imageUrl">
                <!-- <el-upload
                    class="upload-demo"
                    action="/upload"
                    :on-preview="handlePreview"
                    :on-success="handleUploadSuccess"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload"
                    :limit="1"
                    :file-list="fileList"
                    list-type="picture"
                    auto-upload
                >
                    <div class="upload-btn">Click to upload</div>
                    <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 2MB
                    </div>
                    </template>
                </el-upload> -->
            </div>
            <div class="product-info">
                <div class="form-item"><span class="form-title">Picture link </span><el-input v-model="input" size="medium" placeholder="Link..." /></div>
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
                <div class="classify-btn" @click="onPublish">Next Step</div>
                <div class="classify-btn" @click="onClassify" v-show="next">Auto-Classify</div>
                <div class="publish-btn" @click="onUpshelf" v-show="next">Upshelf</div>
            </div>
        </div>
    </div>
</template>

<script>
import { toRefs, reactive, ref, onMounted, watch } from 'vue'
import SecondaryHeader from "../components/SecondaryHeader.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import { upShelfProduct } from '../api/api'
// import { getClassification } from '../api/api'
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
            userId:'',
            userName:'',
            next:false
        })
        onMounted(()=>{
            state.userId = localStorage.getItem("UserId")
            state.userName = localStorage.getItem("UserName")
        })
        watch(input,()=>{
            state.imageUrl = input.value
        })
        const onUpshelf = () => {
            ElMessage({
                message: 'Up shelf successfully!',
                type: 'success',
            })
            setTimeout(()=>{
                router.push({
                    path:'/'
                })
            },3000)
        }
        const onClassify = async () => {
            // const { data } = await getClassification()
            // if(data.status===200){
            //     ElMessageBox.alert(`This product belongs to ${data.category}`, 'Appraisal results', {
            //         confirmButtonText: 'OK'
            //     })
            // }
            setTimeout(()=>{
                ElMessageBox.alert(`This product belongs to ${convertClassification(input5.value)}`, 'Classify results', {
                    confirmButtonText: 'OK'
                })
            },2000)
        }
        const onPublish = async () => {
            if(input.value===''||input1.value===''||input2.value===''||input3.value===''||input4.value===''||input5.value===''){
                ElMessage.error('Please fill in the information completely!')
            }
            else{
                const params = {
                    goodName:input1.value,
                    discription:input2.value,
                    price:input3.value,
                    originPrice:input4.value,
                    classification:input5.value,
                    stock:input6.value,
                    newness:input7.value,
                    picutre:input.value,
                    sellerId:state.userId,
                    sellerName:state.userName
                }
                console.log(params)
                const { data } = await upShelfProduct(params)
                if(data.code===200){
                    state.next=true
                }
            }
        }
        return {
            ...toRefs(state),
            onPublish,
            onClassify,
            onUpshelf,
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