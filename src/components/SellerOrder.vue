<template>
    <div class="my-product">
        <el-descriptions
            class="margin-top"
            :column="3"
            border
            v-for="(item,index) in items" :key="index"
        >
            <template #extra>
                <el-button type="primary" @click="onSend(item.orderId)" v-show="item.orderCondition===1">Send</el-button>
            </template>
            <el-descriptions-item label="Order ID">{{ item.orderId }}</el-descriptions-item>
            <el-descriptions-item label="Seller ID">{{ item.sellerId }}</el-descriptions-item>
            <el-descriptions-item label="Seller Name">{{ item.sellerName }}</el-descriptions-item>
            <el-descriptions-item label="Good ID">{{ item.goodId }}</el-descriptions-item>
            <el-descriptions-item label="Good Name">{{ item.goodName }}</el-descriptions-item>
            <el-descriptions-item label="Price">{{ item.price }}</el-descriptions-item>
            <el-descriptions-item label="Date">{{ item.date }}</el-descriptions-item>
            <el-descriptions-item label="Status"><el-tag>{{ convertOrderStatus(item.orderCondition) }}</el-tag></el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
import { convertOrderStatus } from '../utils/utils'
import { sendProduct } from '../api/api'
import { ElMessage } from 'element-plus'

export default {
    props: {
        items:{
            type:Array,
            default:function(){return []}
        }
    },
    setup() {
        const onSend = async (orderId) => {
            const { data } = await sendProduct(orderId)
            if(data.code===200){
                ElMessage({
                    message: 'Send successfully!',
                    type: 'success',
                })
            }
        }
        return {
            convertOrderStatus,
            onSend
        }
    },
}
</script>

<style lang="scss" scoped>
.margin-top{
    box-shadow: 4px 4px 8px #c2c2c2;
    border:1px solid #c2c2c2;
    border-radius: 2rem;
    padding:1rem;
    margin-top:1rem;
}
</style>