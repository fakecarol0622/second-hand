<template>
    <div class="secondary">
        <el-page-header :content="title" @back="goBack" />
    </div>
    
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    props: {
        title: {
            type: String,
            default: 'Title'
        }
    },
    setup() {
        const router = useRouter()
        const goBack = () => {
            router.go(-1)
        }
        return {
            goBack
        }
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
.secondary{
    margin:30px 0;
}
.list-title{
  font-size: 1.8rem;
  text-align: center;
  margin:2rem 0;
  color:rgba(17,17,17,0.7);
}
</style>