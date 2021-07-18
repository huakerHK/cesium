import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
const cesium = require('cesium/Cesium')
const widgets = require('cesium/Widgets/widgets.css')
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  * as echarts from 'echarts'
import VueCesium from 'vue-cesium'

//  全局引入自定义组件
import table from './components/table/table.vue'
import line from './components/echart/line.vue'
import right_top_Table from './components/table/textTable.vue'
import imgCar from './components/car/imgCar.vue'
import msg from './components/msgbBox/msg.vue'
import nav from './components/nav/nav.vue'
import top from './components/nav/top.vue'

Vue.config.productionTip = false
Vue.prototype.echarts = echarts

Vue.prototype.cesium = cesium
Vue.prototype.widgets = widgets
Vue.prototype.axios = axios
Vue.use(ElementUI)

//  中间件 兄弟组件传值
Vue.prototype.eventBus= new Vue()

//  vue-ceisum
Vue.use(VueCesium, {
  // cesiumPath 是指引用的Cesium.js路径，如
  // 项目本地的Cesium Build包，vue项目需要将Cesium Build包放static目录：
  // cesiumPath: /static/Cesium/Cesium.js
  // 个人在线Cesium Build包：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js'
  // 个人在线SuperMap Cesium Build包（在官方基础上二次开发出来的）：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
  // 官方在线Cesium Build包，有CDN加速，推荐用这个：
  cesiumPath: 'https://unpkg.com/cesium/Build/Cesium/Cesium.js',
  // 指定Cesium.Ion.defaultAccessToken，使用Cesium ion的数据源需要到https://cesium.com/ion/申请一个账户，获取Access Token。不指定的话可能导致 Cesium 在线影像加载不了
  accessToken: ''
})

Vue.component("lh-table",table)
Vue.component("lh-line",line)
Vue.component("lh-right_top_Table",right_top_Table)
Vue.component("lh-imgCar",imgCar)
Vue.component("lh-msg",msg)
Vue.component("lh-nav",nav)
Vue.component("lh-top",top)
new Vue({
  render: h => h(App),
}).$mount('#app')
