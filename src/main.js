import Vue from 'vue'
import App from './App.vue'
const cesium = require('cesium/Cesium')
const widgets = require('cesium/Widgets/widgets.css')

Vue.config.productionTip = false

Vue.prototype.cesium = cesium
Vue.prototype.widgets = widgets

new Vue({
  render: h => h(App),
}).$mount('#app')
