import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import { Search } from '@element-plus/icons'
import 'element-plus/dist/index.css'
import 'vfonts/Lato.css'
require('./api/mock')

const app = createApp(App);

app.use(ElementPlus)
.use(Search)

app.use(store).use(router).mount("#app");
