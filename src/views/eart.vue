<template>
  <div id="eart">
    <div class="tool">
      <Tool />
    </div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import Tool from "../components/tool.vue";
export default {
  components: {
    Tool,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const Cesium = this.cesium;
      let Viewer = new Cesium.Viewer("cesiumContainer", {
        geocoder: false, // 位置查找工具
        sceneModePicker: false, // 选择视角的模式（球体、平铺、斜视平铺）
        baseLayerPicker: false, // 图层选择器（地形影像服务）
        navigationHelpButton: false, // 导航帮助(手势，鼠标)
        homeButton: false, // 视角返回初始位置
        animation: false, // 左下角仪表盘（动画器件）
        timeline: false, // 底部时间线
        fullscreenButton: false, // 全屏
      });
      Viewer._cesiumWidget._creditContainer.style.display = "none"; //去掉版权信息
      //绘制点
      var point_option = {
        show: true, //是否展示
        pixelSize: 20, //点的大小
        color: Cesium.Color.RED, //点的颜色
        outlineColor: Cesium.Color.SKYBLUE, //边框颜色
        outlineWidth: 5, //边框大小
      };
      Viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(113.27, 23.13),
        point: point_option,
      });

      //绘制线
      Viewer.entities.add({
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            120.9677706, 30.7985748, 110.2, 34.55,
          ]),
          material: Cesium.Color.RED,
          width: 3,
          show: true,
        },
      });
      Viewer.entities.add({
        polygon: {
          // 获取指定属性（positions，holes（图形内需要挖空的区域））
          hierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray([
              120.9677706, 30.7985748, 110.2, 34.55, 120.2, 50.55
            ]),
            holes: [
              {
                positions: Cesium.Cartesian3.fromDegreesArray([
                  119, 32, 115, 34, 119, 40,
                ]),
              },
            ],
          },
          // 边框
          outline: true,
          // 边框颜色
          outlineColor: Cesium.Color.WHITE,
          // 边框尺寸
          outlineWidth: 2,
          // 填充的颜色，withAlpha透明度
          material: Cesium.Color.GREEN,
          // 是否被提供的材质填充
          fill: true,
          // 恒定高度
          height: 5000,
          // 显示在距相机的距离处的属性，多少区间内是可以显示的
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            1000,
            10000000
          ),
          // 是否显示
          show: true,
          // 顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
          zIndex: 10,
        },
      });
    },
  },
};
</script>

<style scoped>
.tool {
  position: fixed;
  z-index: 1;
  background: white;
}
</style>
