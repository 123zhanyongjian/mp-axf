import Vue from "vue";
import App from "./App";
import "./ab.js";
import {Indicator} from 'mint-ui'
import store from './pages/store/index'
Vue.prototype.$store=store;
Vue.config.productionTip = false;
Vue.use(Indicator)
App.mpType = "app";
Vue.prototype.$loading=Indicator
const app = new Vue(App);

app.$mount();
Vue.prototype.globalData = getApp().globalData

