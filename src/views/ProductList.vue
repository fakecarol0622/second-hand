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
            state.title = 'Products in '+state.category+' category'
            getProducts(state.category)
        })
        const getProducts = async (category) => {
            const { data } = await getTagProducts(category)
            window.console.log(data)
            state.products = data
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