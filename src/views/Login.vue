<template>
    <div class="login">
        <div class="login-form">
            <div class="title">Login</div>
            <div class="form-item"><span class="form-title">User ID </span><el-input v-model="input1" size="medium" placeholder="Username..." /></div>
            <div class="form-item"><span class="form-title">Password </span><el-input v-model="input2" size="medium" placeholder="Password..."  show-password/></div>
            <el-radio-group 
            v-model="radio"
            class="radio-group">
                <el-radio :label="0">Student</el-radio>
                <el-radio :label="1">Administrator</el-radio>
            </el-radio-group>
            <div class="form-btn" @click="onLogin">Login</div>
        </div>
        <div class="vertical-divider"></div>
        <div class="register-form">
            <div class="title">Register</div>
            <div class="form-item"><span class="form-title">User name </span><el-input v-model="input3" size="medium" placeholder="Username..." /></div>
            <div class="form-item"><span class="form-title">Password </span><el-input v-model="input4" size="medium" placeholder="Password..."  show-password/></div>
            <div class="form-item"><span class="form-title">Phone number </span><el-input v-model="input5" size="medium" placeholder="Phone number..." /></div>
            <div class="form-item"><span class="form-title">Address </span><el-input v-model="input6" size="medium" placeholder="Address..." /></div>
            <div class="form-btn" @click="onRegister">Register</div>
        </div>
    </div>
</template>

<script>
import { login, register } from "../api/api"
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
    setup() {
        const router = useRouter()
        const store = useStore()
        const input1 = ref('')
        const input2 = ref('')
        const input3 = ref('')
        const input4 = ref('')
        const input5 = ref('')
        const input6 = ref('')
        const radio = ref(0)
        const onLogin = async () => {
            if(input1.value===''||input2.value===''){
                ElMessage({
                    message: 'Username or password cannot be empty!',
                    type: 'warning',
                })
            }
            else{
                const params = {
                    id:input1.value,
                    password:input2.value,
                    role:radio.value
                }
                const data = await login(params) 
                console.log(data)
                if(data.status===200){
                    ElMessage({
                        message: 'Login successfully!',
                        type: 'success',
                    })
                    store.commit('userLogin',true)
                    localStorage.setItem("UserId",input1.value)
                    localStorage.setItem("Role",radio.value)
                    console.log("Role:"+localStorage.getItem("Role"))
                    localStorage.setItem("Flag","hasLogin")
                    if(radio.value===1){
                        setTimeout(()=>{
                            router.push({
                                path:'/management'
                            })
                        },3000)
                    }
                    else{
                        setTimeout(()=>{
                            router.push({
                                path:'/'
                            })
                        },3000)
                    }
                }
                else if(data.status===400){
                    ElMessage.error('Id or password error!')
                }
                else{
                    ElMessage.error('Login failed!')
                }
            }
        }
        const onRegister = async () => {
            if(input3.value===''||input4.value===''||input5.value===''||input6.value===''){
                ElMessage({
                    message: 'Please fill in the information completely!',
                    type: 'warning',
                })
            }
            else{
                const params = {
                    userName:input3.value,
                    password:input4.value,
                    phone:input5.value,
                    address:input6.value
                }
                const data = await register(params)
                console.log(data)
                if(data.status===200){
                    ElMessage({
                        message: 'Register successfully!',
                        type: 'success',
                    })
                    setTimeout(()=>{
                        router.push({
                            path:'/'
                        })
                    },3000)
                }
                else if(data.status===400){
                    ElMessage.error('Please fill in the information completely!')
                }
                else{
                    ElMessage.error('Register failed!')
                }
            }
            await register()
        }
        // const validateName = (input) => {
        //     const reg = /^[a-zA-Z0-9_]{4,16}$/
            
        // }
        // const validatePassword = (input) => {
        //     const pwdReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z]).*$/
        // }
        return {
            input1,
            input2,
            input3,
            input4,
            input5,
            input6,
            radio,
            onLogin,
            onRegister
        }
    },
}
</script>

<style lang="scss" scoped>
.login{
    max-width: 1200px;
    margin:0 auto;
    display:flex;
    .vertical-divider{
        border:1px solid rgba(17,17,17,0.4);
    }
    .radio-group{
        margin-left:1rem;
    }
    .login-form, .register-form{
        flex:1;
        margin:2rem;
        .title{
            font-size: 2rem;
            text-align: center;
            margin:0.5rem;
            color:rgba(17,17,17,0.8)
        }
        .form-item{
            margin:1rem;
        }
        .form-btn{
            margin:1rem auto;
            text-align: center;
            background: #99ddcc;
            border-radius: 2rem;
            box-shadow: 2px 2px 4px #c2c2c2;
            padding:1rem 2rem;
            max-width:100px;
            font-weight: bold;
            color:rgba(17,17,17,0.8);
            &:hover{
                box-shadow: 6px 6px 10px #c2c2c2;
            }
        }
    }
}
</style>