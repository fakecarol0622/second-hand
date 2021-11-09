<template>
    <div class="my-product">
        <el-descriptions
            class="margin-top"
            :column="3"
            border
            v-for="(item,index) in items" :key="index"
        >
            <template #extra>
                <el-button type="primary" @click="onReceive(item.orderId)" v-show="item.orderCondition===1">Receive</el-button>
                <el-button type="primary" @click="onCancel(item.orderId)" v-show="item.orderCondition===0||item.orderCondition===1">Cancel</el-button>
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
import { receiveOrder, cancelOrder } from '../api/api'
import { ElMessage } from 'element-plus'

export default {
    props: {
        items:{
            type:Array,
            default:function(){return []}
        }
    },
    setup() {
        const onReceive = async (orderId) => {
            const res = await receiveOrder(orderId)
            if(res.status===200){
                ElMessage({
                    message: 'Receive successfully!',
                    type: 'success',
                })
            }
        }
        const onCancel = async (orderId) => {
            const res = await cancelOrder(orderId)
            if(res.status===200){
                ElMessage({
                    message: 'Cancel successfully!',
                    type: 'success',
                })
            }
        }
        return {
            convertOrderStatus,
            onReceive,
            onCancel,
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