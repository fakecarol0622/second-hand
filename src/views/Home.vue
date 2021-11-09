<template>
  <div class="home">
    <el-divider class="divider"><span class="divider-title">Browse by category</span></el-divider>
    <div class="category">
      <div class="category-item" @click="onSelect('books')">
        <div class="img-box"><img class="category-img" src="../../public/books.png"></div>
        <div class="category-title">Books</div>
      </div>
      <div m class="category-item" @click="onSelect('devices')">
        <div class="img-box"><img class="category-img" src="../../public/phone.png"></div>
        <div class="category-title">Devices</div>
      </div>
      <div class="category-item" @click="onSelect('clothes')">
        <div class="img-box"><img class="category-img" src="../../public/clothes.png"></div>
        <div class="category-title">Clothes</div>
      </div>
    </div>
    <el-divider class="divider"><span class="divider-title">You might be interested</span></el-divider>
    <div class="products">
      <product-card :products="products"></product-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard.vue'
import { getAllProducts } from '../api/api'
import { useRouter } from 'vue-router'
import { onMounted, toRefs, reactive } from 'vue'

export default {
  name: "Home",
  setup() {
    const router = useRouter()
    const state = reactive({
      products:[],
      isLoading: false
    })
    onMounted(()=>{
      getProducts()
    })
    const getProducts = async () => {
      const { data } = await getAllProducts()
      window.console.log(data)
      state.products = data
    }
    const onSelect = (category) => {
      router.push({
        name: "productlist",
        params:{
          category:category
        }
      })
    }
    return {
      ...toRefs(state),
      onSelect
    }
  },
  components: {
    ProductCard,
  }
};
</script>

<style lang="scss" scoped>
.home{
  max-width:1200px;
  margin:0 auto;
}
.swiper-box{
  margin:20px 0;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}
.carousel-img {
  width:100%;
  height: 400px;
  object-fit: cover;
}
.divider {
  margin:3rem 0;
}
.divider-title{
  font-size: 2rem !important;
  text-align: center;
  margin:2rem 0;
  color:rgba(17,17,17,0.7)
}
.category{
  display:flex;
  justify-content: center;
}
.category-item {
  background-color: #e4f9f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin:0 2rem;
  .img-box{
    margin-top:2rem;
    text-align: center;
  }
  .category-img{
    width: 40%;
  }
  .category-title{
    margin:1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color:rgba(17,17,17,0.7);
    text-shadow:2px 2px #c2c2c2;
  }
  &:hover{
    box-shadow: 12px 12px 18px #c2c2c2;
    border:2px solid #2a9d8f;
    transform: translateY(-5px);
    transition: all 0.3s ease-in-out;
  }
}
</style>
