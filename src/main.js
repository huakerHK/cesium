import Vue from 'vue'
import App from './App.vue'
const cesium = require('cesium/Cesium')
const widgets = require('cesium/Widgets/widgets.css')
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'

//  全局引入自定义组件
import table from './components/table/table.vue'
import line from './components/echart/line.vue'
import textTable from './components/table/textTable.vue'
import imgCar from './components/car/imgCar.vue'

Vue.config.productionTip = false
Vue.prototype.echarts = echarts

Vue.prototype.cesium = cesium
Vue.prototype.widgets = widgets
Vue.use(ElementUI)

Vue.component("lh-table",table)
Vue.component("lh-line",line)
Vue.component("lh-textTable",textTable)
Vue.component("lh-imgCar",imgCar)

new Vue({
  render: h => h(App),
}).$mount('#app')
