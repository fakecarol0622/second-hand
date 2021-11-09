<template>
    <div id="product-card">
        <div class="card-container">
            <div class="card-item" v-for="(product,index) in products" :key="index" @click="onSelect(product.goodId)">
                <div class="card-img"><img class="img" :src="product.picutre"></div>
                <div class="card-title"><span class="title-text">{{ product.goodName }}</span></div>
                <div class="card-origin-price"><span>$</span><span class="origin-price-value">{{ product.originPrice }}</span></div>
                <div class="card-price">${{ product.price }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    props:{
        products:{
            type: Array,
            default: function() { return [] }
        }
    },
    setup() {
        const router = useRouter()
        const onSelect = (productId) => {
            router.push({
                name:'productdetail',
                params:{
                    productId:productId
                }
            })
        }
        return {
            onSelect
        }
    }
}
</script>

<style lang="scss" scoped>
.card-container {
    display:flex;
    flex-wrap: wrap;
}
.card-item{
    border-radius: 1rem;
    box-shadow: 4px 4px 8px #c2c2c2;
    width:22%;
    margin:0.8rem;
    .card-img{
        margin:0.5rem 0.5rem 0 0.5rem;
        vertical-align: middle;
        .img{
            width:250px;
            height:200px;
            border-radius: 0.5rem;
        }
    }
    .card-title{
        font-size:1.2rem;
        font-weight: bold;
        color:rgba(17,17,17,0.8);
        margin-left:0.5rem;
    }
    .card-origin-price{
        margin-left:0.5rem;
        margin-bottom:0.5rem;
        display:inline-block;
        color:rgba(17,17,17,0.5);
        .origin-price-value{
            text-decoration: line-through;
        }
    }
    .card-price{
        margin-left:0.5rem;
        margin-bottom:0.5rem;
        display:inline-block;
        font-size:1.2rem;
        font-weight: bold;
        color:#e76f51;
    }
    &:hover{
        box-shadow: 12px 12px 18px #c2c2c2;
        transform: translateY(-5px);
        transition: all 0.3s ease-in-out;
    }
}


</style>