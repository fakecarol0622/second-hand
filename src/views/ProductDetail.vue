<template>
    <div class="order-detail">
        <secondary-header :title="'Product detail'"></secondary-header>
        <div class="info-container">
            <div class="info-img"><img :src="product.picutre"></div>
            <el-descriptions
                class="margin-top"
                :column="3"
                border
            >
                <template #extra>
                    <el-button @click="onBuy(product.goodId)" v-show="!isOwner" type="primary">Buy</el-button>
                </template>
                <el-descriptions-item label="Product ID">{{ product.goodId }}</el-descriptions-item>
                <el-descriptions-item label="Product Name">{{ product.goodName }}</el-descriptions-item>
                <el-descriptions-item label="Newness(%)">{{ product.newness }}</el-descriptions-item>
                <el-descriptions-item label="Price($)">{{ product.price }}</el-descriptions-item>
                <el-descriptions-item label="Origin price($)">{{ product.originPrice }}</el-descriptions-item>
                <el-descriptions-item label="Category">{{ convertClassification(product.classification) }}</el-descriptions-item>
                <el-descriptions-item label="Stock">{{ product.stock }}</el-descriptions-item>
                <el-descriptions-item label="Status"><el-tag>{{ convertProductStatus(product.status) }}</el-tag></el-descriptions-item>
                <el-descriptions-item label="Description">{{ product.discription }}</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>

</template>

<script>
import { toRefs, reactive, onMounted } from 'vue'
import SecondaryHeader from '../components/SecondaryHeader.vue'
import { createNewOrder, getProductDetail } from '../api/api'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { convertProductStatus, convertClassification } from '../utils/utils'

export default {
    setup() {
        const router = useRouter()
        const route = useRoute()
        const state = reactive({
            product:{},
            userId:'',
            productId:'',
            isOwner:false
        })
        onMounted(()=>{
            state.productId = route.params.productId
            getProduct(state.productId)
            state.userId = localStorage.getItem("UserId")
            if(localStorage.getItem("UserId")===state.product.sellerId){
                state.isOwner=true
            }
        })
        const onBuy = async (id) => {
            const { data } = await createNewOrder(state.userId,id)
            console.log("buy:",data)
            if(data.code===200){
                ElMessage({
                    message: 'Buy successfully!',
                    type: 'success',
                })
                setTimeout(()=>{
                    router.go(-1)
                },3000)
            }
            else{
                ElMessage({
                    message: 'Failed to buy this product!',
                    type: 'success',
                })
            }
        }
        const getProduct = async (productId) => {
            const { data } = await getProductDetail(productId)
            console.log("product:",data)
            state.product = data.message; 
        }
        const convertStatus = (value) => {
            if(value===0){
                return 'Created'
            }
            else if(value===1) {
                return 'Sent'
            }
            else if(value===2) {
                return 'Received'
            }
            else if(value===3) {
                return 'Canceled'
            }
        }
        return {
            ...toRefs(state),
            convertStatus,
            onBuy,
            convertProductStatus,
            convertClassification,
        }
    },
    components: {
        SecondaryHeader,
    }
}
</script>

<style lang="scss" scoped>
.order-detail{
    max-width: 1200px;
    margin: 0 auto;
}
.info-container{
    padding:20px;
    border:1px solid #c2c2c2;
    border-radius: 3rem;
    box-shadow: 8px 8px 12px #c2c2c2;
    .info-img{
        margin-left:1rem;
    }
    .info-img img{
        max-width:600px;
        max-height: 400px;
    }
    .info-item{
        margin-left:2rem;
        padding:5px;
    }
    .info-status{
        margin-right:1rem;
        font-size: 1.2rem;
        .status{
            display:inline-block;
            margin-right:1rem;
            .status-value{
                color:#00b8a9;
            }
        }
        .price-value{
            color:#e76f51;
            font-weight: bold;
        }
    }
}
.action-btn{
    margin:0 auto;
}
</style>