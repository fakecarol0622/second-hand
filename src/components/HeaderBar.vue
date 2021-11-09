<template>
    <div class="header-bar">
        <div class="header-left">
            <div class="header-title">IdleBox</div>
            <div class="header-subtitle">Campus Second-hand Trading Platform</div>
        </div>
        <div class="header-middle" v-show="!isAdmin">
            <div style="margin-top: 15px">
                <el-input v-model="input" placeholder="What do you want..." />
            </div>
            <div class="btn-box" @click="onSubmit(input)"><img class="search-btn" src="../../public/search.png"></div>
        </div>
        <div class="header-nav" v-show="!isAdmin">
            <div class="sell-btn" @click="onSell">I WANT TO SELL</div>
        </div>
        <div class="header-name" v-show="isAdmin">Hello, Administrator!</div>
        <div class="header-right">
            <div class="user-box">
                  <el-dropdown @command="handleCommand">
                    <div class="el-dropdown-link">
                        <el-avatar :src="circleUrl" @click="onAvatar"></el-avatar>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="a" v-show="!isAdmin">Profile</el-dropdown-item>
                            <el-dropdown-item command="b" v-show="!isAdmin">Buyer Orders</el-dropdown-item>
                            <el-dropdown-item command="c" v-show="!isAdmin">Seller Orders</el-dropdown-item>
                            <el-dropdown-item command="d" v-show="!isAdmin">My Products</el-dropdown-item>
                            <el-dropdown-item command="e" divided v-show="hasLogin">Log out</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
    setup() { 
        const router = useRouter()
        const input = ref('')
        const state = reactive({
            circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            hasLogin:localStorage.getItem("Flag"),
            isAdmin:false,
        })
        onMounted(()=>{
            if(localStorage.getItem("Role"===1)){
                state.isAdmin=true
            }
            else{
                state.isAdmin=false
            }
            if(localStorage.getItem("Flag")==="hasLogin"){
                state.hasLogin=true
            }
        })
        const onSubmit = (value) => {
            router.push({
                name: "productlist",
                params:{
                    category:value
                }
            })
        }
        const onSell = () => {
            router.push({
                name:"publishproduct"
            })
        }
        const onAvatar = () => {
            if(localStorage.getItem("Flag")!=="hasLogin"){
                router.push({
                    name:"login"
                })
            }
        }
        const handleCommand = (key) => {
            console.log(key)
            if(key==='a'){
                router.push({
                    name:'profile'
                })
            }
            else if(key==='b'){
                router.push({
                    name:'buyerorderlist'
                })
            }
            else if(key==='c'){
                router.push({
                    name:'sellerorderlist'
                })
            }
            else if(key==='d'){
                router.push({
                    name:'sellerproductlist'
                })
            }
            else if(key==="e"){
                localStorage.removeItem("Flag")
                localStorage.removeItem("Role")
                ElMessage({
                    message: 'You have logged out!',
                    type: 'success',
                })
                router.push({
                    path:'/'
                })
            }
        }
        return {
            onSubmit,
            onSell,
            input,
            handleCommand,
            ...toRefs(state),
            onAvatar
        }
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
.header-bar{
    background: #99ddcc;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-family: Lato;
    padding:1rem 2rem;
    box-shadow: 8px 0 16px #c2c2c2;
    margin-bottom:2rem;
    .header-left{
        flex-basis:300px;
        .header-title{
            font-size:2rem;
            font-weight: 900;
        }
        .header-subtitle{
            font-size:1rem;
            font-weight: 200;
        }
    }
    .header-middle{
        flex-basis:400px;
        display:flex;
        align-items: center;
        margin:0 50px;
        height:40px;
        .search-box{
            max-width:600px;
            min-width:200px;
        }
        .search-btn{
            margin-left:1rem;
            width:2rem;
            height: 2rem;
            margin-top:15px;
        }
    }
    .header-nav{
        flex:1;
        max-width:200px;
        .sell-btn{
            background: #384259;
            border-radius: 2rem;
            padding:10px;
            color:#FFF;
            text-align: center;
            font-weight: bold;
            box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            &:hover{
                box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
                border:2px solid #FFF;
            }
        }
    }
    .header-right{
        margin-left:2rem;
        margin-right:2rem;
    }
}
</style>