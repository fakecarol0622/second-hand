<template>
<div class="profile">   
    <secondary-header :title="'Your profile'"></secondary-header>
    <el-descriptions
        class="margin-top"
        title="Basic information"
        :column="3"
        border
    >
        <template #extra>
        <el-button type="primary" @click="onEdit">Edit</el-button>
        </template>
        <el-descriptions-item label="Name">{{ user.userName }}</el-descriptions-item>
        <el-descriptions-item label="ID">{{ user.userId }}</el-descriptions-item>
        <el-descriptions-item label="Telephone">{{ user.phone }}</el-descriptions-item>
        <el-descriptions-item label="Status">
            <el-tag size="small">{{ convertStatus(user.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address">
        {{ user.address }}
        </el-descriptions-item>
    </el-descriptions>
</div>
</template>

<script>
import SecondaryHeader from '../components/SecondaryHeader.vue'
import { getAccountById } from '../api/api'
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const state = reactive({
            user:{}
        })
        onMounted(()=>{
            getUser()
        })
        const convertStatus = (status) => {
            if(status===0){
                return 'Unlocked'
            }
            else{
                return 'Locked'
            }
        }
        const getUser = async () => {
            const id = localStorage.getItem("UserId")
            console.log(id)
            const { data } = await getAccountById(id)
            console.log(data)
            state.user = data.message
        }
        const onEdit = async () => {
            router.push({
                name:"editprofile",
                params:{
                    userName:state.user.userName
                }
            })
        }
        return {
            ...toRefs(state),
            convertStatus,
            onEdit
        }
    },
    components: {
        SecondaryHeader
    }
}
</script>

<style lang="scss" scoped>
.profile{
    max-width: 1200px;
    margin:0 auto;
}
</style>