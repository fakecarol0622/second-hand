<template>
<div class="seller-product-list">
    <secondary-header :title="'Your buyer orders'"></secondary-header>
    <buyer-order :items="items"></buyer-order>
</div>
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
import { getBuyerOrders } from '../api/api'
import { onMounted } from '@vue/runtime-core'
import SecondaryHeader from '../components/SecondaryHeader.vue'
import BuyerOrder from '../components/BuyerOrder.vue'

export default {
    setup() {
        const state = reactive({
            items:[],
            userId:''
        })
        onMounted(()=>{
            state.userId = localStorage.getItem("UserId")
            getOrders(state.userId)
        })
        const getOrders = async (id) => {
            const { data } = await getBuyerOrders(id)
            state.items = data
            console.log(state.items)
        }
        return {
            ...toRefs(state),
        }
    },
    components: {
        SecondaryHeader,
        BuyerOrder
    }
}
</script>

<style lang="scss" scoped>
.seller-product-list{
    max-width: 1200px;
    margin:0 auto;
}
.data-container{
    border:1px solid #c2c2c2;
}
.data-title{
    padding:20px 0;
    border:1px solid #c2c2c2;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom:30px;
    background: #c2c2c2;
    .title-item{
        flex:1;
        margin-left:50px;
    }
}
.data-title,.data-row{
    display:flex;
    justify-content: space-between;
}
.row-item{
    flex:1;
    margin-left:50px;
}
</style>

