<template>
    <div id="eart">
        <div class="tool">
            <Tool/>
        </div>
        <div id="cesiumContainer"></div>
    </div>
    
</template>

<script>
import Tool from '../components/tool.vue'
export default {
    components:{
        Tool
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            const Cesium = this.cesium
            let Viewer = new Cesium.Viewer("cesiumContainer",{
                    geocoder: false,   // 位置查找工具
                    sceneModePicker: false,   // 选择视角的模式（球体、平铺、斜视平铺）
                    baseLayerPicker: false,    // 图层选择器（地形影像服务）
                    navigationHelpButton: false,   // 导航帮助(手势，鼠标)
                    homeButton: false,  // 视角返回初始位置
                    animation: false,   // 左下角仪表盘（动画器件）
                    timeline: false,   // 底部时间线
                    fullscreenButton: false,   // 全屏

            })
            Viewer._cesiumWidget._creditContainer.style.display = "none";   //去掉版权信息

        }
    }

}
</script>

<style scoped>
.tool{
    position: fixed;
    z-index: 1;
    background: white;
}
</style>
