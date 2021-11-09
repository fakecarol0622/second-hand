<template>
    <div class="edit-profile">
        <secondary-header :title="'Edit your information'"></secondary-header>
        <div class="info-container">
            <div class="profile-info">
                <div class="form-item"><span class="form-title">User ID</span><el-tag>{{ user.userId }}</el-tag></div>
                <div class="form-item"><span class="form-title">Status </span><el-tag>{{ convertAccountStatus(user.status) }}</el-tag></div>
                <div class="form-item"><span class="form-title">User Name </span><el-input v-model="input1" size="medium" /></div>
                <div class="form-item"><span class="form-title">Password </span><el-input v-model="input2" size="medium" show-password/></div>
                <div class="form-item"><span class="form-title">Phone </span><el-input v-model="input3" size="medium" /></div>
                <div class="form-item"><span class="form-title">Address </span><el-input 
                v-model="input4" 
                size="medium" 
                :rows="2"
                type="textarea"/></div>
            </div>
            <div class="submit-btn" @click="onSubmit">Submit</div>
        </div>
    </div>
</template>

<script>
import { toRefs, reactive, ref, onMounted } from 'vue'
import SecondaryHeader from "../components/SecondaryHeader.vue"
import { ElMessage } from 'element-plus'
import { getAccountById, editAccountInfo } from '../api/api'
import { useRouter } from 'vue-router'
import { convertAccountStatus } from '../utils/utils'

export default {
    setup() {
        const input1 = ref('')
        const input2 = ref('')
        const input3 = ref('')
        const input4 = ref('')
        const router = useRouter()
        const state = reactive({
            userId:'',
            user:{}
        })
        onMounted(()=>{
            state.userId = localStorage.getItem("UserId")
            getUser()
        })
        const getUser = async () => {
            const { data } = await getAccountById(state.userId)
            console.log(data)
            state.user = data.message
            input1.value = state.user.userName
            input2.value = state.user.password
            input3.value = state.user.phone
            input4.value = state.user.address
        }
        const onSubmit = async () => {
            const params = {
                userId:state.user.userId,
                userName:input1.value,
                status:state.user.status,
                password:input2.value,
                phone:input3.value,
                address:input4.value
            }
            const { data } = await editAccountInfo(params)
            if(data.code===200){
                ElMessage({
                    message: 'Submitted successfully!',
                    type: 'success',
                })
                setTimeout(()=>{
                    router.go(-1)
                },3000)
            }
        }
        return {
            ...toRefs(state),
            onSubmit,
            input1,
            input2,
            input3,
            input4,
            convertAccountStatus
        }
    },
    components: {
        SecondaryHeader
    }
}
</script>

<style lang="scss" scoped>
.edit-profile{
    max-width: 1200px;
    margin: 0 auto;
    .info-container{
        max-width:600px;
        margin:0 auto;
        box-shadow: 4px 4px 8px #c2c2c2;
        border-radius: 2rem;
        padding:2rem;
    }
}
.submit-btn{
    padding:1rem;
    border-radius: 2rem;
    background: #99ddcc;
    max-width:200px;
    text-align: center;
    font-weight: bold;
    margin:1rem auto;
    text-align: center;
}
.profile-info{
    .form-item{
        margin:1rem;
        .form-title{
            margin-right:1rem;
        }
    }
}
</style>