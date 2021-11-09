<template>
    <div class="my-product">
        <el-descriptions
            class="margin-top"
            :column="3"
            border
            v-for="(item,index) in items" :key="index"
        >
            <template #extra>
                <el-button type="primary" @click="onEdit(index)">Edit</el-button>
                <el-button type="primary" @click="onOffShelf(item.goodId)" v-show="item.status!==2">Off shelf</el-button>
            </template>
            <el-descriptions-item label="Product ID">{{ item.goodId }}</el-descriptions-item>
            <el-descriptions-item label="Product Name">{{ item.goodName }}</el-descriptions-item>
            <el-descriptions-item label="Newness(%)">{{ item.newness }}</el-descriptions-item>
            <el-descriptions-item label="Price($)">{{ item.price }}</el-descriptions-item>
            <el-descriptions-item label="Origin price($)">{{ item.originPrice }}</el-descriptions-item>
            <el-descriptions-item label="Category">{{ item.classification }}</el-descriptions-item>
            <el-descriptions-item label="Stick">{{ item.stock }}</el-descriptions-item>
            <el-descriptions-item label="Status"><el-tag>{{ convertProductStatus(item.status) }}</el-tag></el-descriptions-item>
            <el-descriptions-item label="Description">{{ item.description }}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
import { convertProductStatus } from '../utils/utils'
import { useRouter } from 'vue-router'
import { offShelfProduct } from '../api/api'
import { ElMessage } from 'element-plus'

export default {
    props: {
        items:{
            type:Array,
            default:function(){return []}
        }
    },
    setup(props) {
        const router = useRouter()
        const onEdit = (index) => {
            router.push({
                name:'editproduct',
                params:{
                    goodId:props.items[index].goodId,
                    goodName:props.items[index].goodName,
                    description:props.items[index].description,
                    price:props.items[index].price,
                    originPrice:props.items[index].originPrice,
                    classification:props.items[index].classification,
                    stock:props.items[index].stock,
                    newness:props.items[index].newness
                }
            })
        }
        const onOffShelf = async (goodId) => {
            const res = await offShelfProduct(goodId)
            if(res.status===200){
                ElMessage({
                    message: 'Off shelf successfully!',
                    type: 'success',
                })
            }
        }
        return {
            convertProductStatus,
            onEdit,
            onOffShelf,
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