<template>
<div class="management">
    <div class="title">Account management</div>
    <span>Search by student name</span><el-input class="input" v-model="input1" placeholder="Student name..."></el-input>
    <div class="btn-box" @click="onSubmitName"><img class="search-btn" src="../../public/search.png"></div>
    <div class="account-container" v-show="showAccount">
        <el-descriptions
            class="margin-top"
            :column="3"
            border
        >
            <template #extra>
                <el-button type="primary" v-if="user.status===0" @click="onBlock">Block</el-button>
                <el-button type="primary" v-else @click="onUnblock">Unblock</el-button>
            </template>
            <el-descriptions-item label="Name">{{ user.userName }}</el-descriptions-item>
            <el-descriptions-item label="ID">{{ user.userId }}</el-descriptions-item>
            <el-descriptions-item label="Telephone">{{ user.phone }}</el-descriptions-item>
            <el-descriptions-item label="Status">
                <el-tag size="small">{{ convertAccountStatus(user.status) }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Address">{{ user.address }}</el-descriptions-item>
        </el-descriptions>
    </div>
    <el-divider></el-divider>
    <div class="title">Order management</div>
    <span>Search by order id</span><el-input class="input" v-model="input2" placeholder="Order ID..."></el-input>
    <div class="btn-box" @click="onSubmitId"><img class="search-btn" src="../../public/search.png"></div>
        <div class="account-container" v-show="showOrder">
        <el-descriptions
            class="margin-top"
            :column="3"
            border
        >
            <template #extra>
                <div class="change-order">
                    <el-select v-model="input3" placeholder="Select">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="onChangeStatus">Change status</el-button>
                </div>
            </template>
            <el-descriptions-item label="Order ID">{{ order.orderId }}</el-descriptions-item>
            <el-descriptions-item label="Buyer ID">{{ order.buyerId }}</el-descriptions-item>
            <el-descriptions-item label="Buyer Name">{{ order.buyerName }}</el-descriptions-item>
            <el-descriptions-item label="Status">
                <el-tag size="small">{{ convertOrderStatus(order.orderCondition) }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Seller ID">{{ order.sellerId }}</el-descriptions-item>
            <el-descriptions-item label="Seller Name">{{ order.sellerName }}</el-descriptions-item>
            <el-descriptions-item label="Product ID">{{ order.goodId }}</el-descriptions-item>
            <el-descriptions-item label="Product Name">{{ order.goodName }}</el-descriptions-item>
            <el-descriptions-item label="Price">{{ order.price }}</el-descriptions-item>
            <el-descriptions-item label="Date">{{ convertTimeStamp(order.date) }}</el-descriptions-item>
        </el-descriptions>
    </div>
</div>
</template>

<script>
import { toRefs, reactive, ref } from 'vue'
import { getAccountByName, getOrderById, blockAccount, unblockAccount, changeOrderStatus } from '../api/api'
import { ElMessage } from 'element-plus'
import { convertAccountStatus, convertOrderStatus, convertTimeStamp } from '../utils/utils'

export default {
    setup() {
        const state = reactive({
            user:{},
            order:{},
            showAccount:false,
            showOrder:false
        })
        const input1 = ref('')
        const input2 = ref('')
        const input3 = ref(state.order.orderCondition)
        const options = [
            {
                value:1,
                label:'Created'
            },
            {
                value:2,
                label:'Sent'
            },
            {
                value:3,
                label:'Received'
            },
            {
                value:4,
                label:'Canceled'
            },
        ]
        const onSubmitName = async () => {
            if(input1.value===''){
                ElMessage({
                    message: 'Name cannot be empty!',
                    type: 'warning',
                })
            }
            const { data } = await getAccountByName(input1.value)
            console.log("search:",data)
            if(data.code===200){
                state.user = data.message
                state.showAccount = true
            }
            else{
                ElMessage({
                    message: 'Can not find this student!',
                    type: 'warning',
                })
            }
        }
        const onSubmitId = async () => {
            if(input2.value===''){
                ElMessage({
                    message: 'Order ID cannot be empty!',
                    type: 'warning',
                })
            }
            const { data } = await getOrderById(input2.value)
            if(data.code===200){
                state.order = data.message
                state.showOrder = true
            }
            else{
                ElMessage({
                    message: 'Can not find this order!',
                    type: 'warning',
                })
            }
        }
        const onBlock = async () => {
            const { data } = await blockAccount(state.user.userId)
            if(data.code===200){
                ElMessage({
                    message: 'Blocked this account successfully!',
                    type: 'success',
                })
                state.user.status = 1
            }
            else{
                ElMessage({
                    message: 'This account has been blocked!',
                    type: 'warning',
                })
            }
        }
        const onUnblock = async () => {
            const { data } = await unblockAccount(state.user.userId)
            if(data.code===200){
                ElMessage({
                    message: 'Unblocked this account successfully!',
                    type: 'success',
                })
                state.user.status = 0
            }
            else{
                ElMessage({
                    message: 'Unblock failed!',
                    type: 'warning',
                })
            }
        }
        const onChangeStatus = async () => {
            const { data } = await changeOrderStatus(state.order.orderId,input3.value)
            if(data.code===200){
                ElMessage({
                    message: 'Order status changed successfully!',
                    type: 'success',
                })
                state.order.orderCondition = input3.value
            }
            else{
                ElMessage({
                    message: 'Change status failed!',
                    type: 'warning',
                })
            }
        }
        return {
            ...toRefs(state),
            input1,
            input2,
            input3,
            onSubmitName,
            onSubmitId,
            convertAccountStatus,
            convertOrderStatus,
            convertTimeStamp,
            onBlock,
            onUnblock,
            onChangeStatus,
            options
        }
    },
}
</script>

<style lang="scss" scoped>
.management{
    max-width: 1200px;
    margin:0 auto;
}
.title{
    font-size: 1.2rem;
    font-weight: bold;
    margin:1rem 0;
}
.input{
    width:300px;
    margin-left:2rem;
}
.btn-box{
    display:inline-block;
}
.search-btn{
    margin-left:1rem;
    width:2rem;
    height: 2rem;
    margin-bottom:-10px;
}
</style>