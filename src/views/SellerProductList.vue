<template>
<div class="seller-product-list">
    <secondary-header :title="'Your products'"></secondary-header>
    <my-product :items="items"></my-product>
</div>
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
import { getMyProducts } from '../api/api'
import { onMounted } from '@vue/runtime-core'
import SecondaryHeader from '../components/SecondaryHeader.vue'
import MyProduct from '../components/MyProduct.vue'

export default {
    setup() {
        const state = reactive({
            items:[],
            userId:''
        })
        onMounted(()=>{
            state.userId = localStorage.getItem("UserId")
            getProducts()
        })
        const getProducts = async () => {
            const { data } = await getMyProducts(state.userId)
            state.items = data.message
        }
        return {
            ...toRefs(state),
        }
    },
    components: {
        SecondaryHeader,
        MyProduct
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

