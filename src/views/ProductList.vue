<template>
    <div class="product-list">
        <secondary-header :title="title"></secondary-header>
        <product-card :products="products"></product-card>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { getTagProducts } from '../api/api'
import { useRoute } from 'vue-router'
import { onMounted, toRefs, reactive } from 'vue'
import SecondaryHeader from '../components/SecondaryHeader.vue'

export default {
    setup() {
        const route = useRoute()
        const state = reactive({
            products:[],
            isLoading: false,
            category:'',
            title:''
        })
        onMounted(()=>{
            state.category = route.params.category
            console.log("category:",state.category)
            state.title = convertCategory(state.category)
            getProducts(state.category)
        })
        const convertCategory = (category) => {
            if(category==1){
                return 'Products in book category'
            }
            else if(category==2){
                return 'Products in clothes category'
            }
            else if(category==3){
                return 'Products in device category'
            }
            else{
                return 'No product found'
            }
        }
        const getProducts = async (category) => {
            const { data } = await getTagProducts(category)
            window.console.log(data)
            state.products = data.message
        }
        return {
            ...toRefs(state)
        }
    },
    components: {
        ProductCard,
        SecondaryHeader
    }
}
</script>

<style lang="scss" scoped>
.product-list{
  max-width:1200px;
  margin:0 auto;
}
</style>