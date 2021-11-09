<template>
  <div id="app">
    <header-bar></header-bar>
    <router-view v-slot="{ Component }">
        <component :is="Component"/>
    </router-view>
    <el-backtop />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  setup() {
      const store = useStore()
      const router = useRouter()
      const state = reactive({
        transitionName: ''
      })
      router.beforeEach((to, from, next) => {
        let getFlag = localStorage.getItem("Flag")
        if(getFlag==="hasLogin"){
          store.state.isLogin = true
          next()
        }
        else{
          if(to.meta.isLogin){
            next({
              path:'/login'
            })
            ElMessage({
                message: 'Please login first!',
                type: 'warning',
            })
          }
          else{
            next()
          }
        }
      })

      return {
        ...toRefs(state)
      }
  },
  components: {
    HeaderBar,
  }
}
</script>

<style lang="scss">
#app {
  font-family: Lato, HelveticaNeue,"Helvetica Neue",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
// Routing transition effect
.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}
.scale-leave-from,
.scale-enter-to {
  transform: scale(1);
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s;
}
</style>
