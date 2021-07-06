<template>
  <div class="tool">
    <p>绘制工具</p>
    <div>
      <input @click="test" value="绘制点" type="button">
      <input value="绘制线" type="button">
      <input value="绘制面" type="button">
      <input value="清除" type="button">
    </div>
  </div>
</template>

<script>
export default {
  name: 'tool',
  methods:{
    test(){
      const Cesium = this.Cesium
      const handler = new Cesium.ScreenSpaceEventHandler(Viewer.scene.canvas)
      handler.setInputAction(function(movement){
        tooltip.style.left = movement.endPosition.x + 10 + "px"
        tooltip.style.top = movement.endPosition.y + 20 + "px"
      },Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      handler.setInputAction(function(movement){
        position = Viewer.camera.pickEllipsoid(movement.position,viewer.scene.globe.ellipsoid)
        let point = drawPoint(position)
        tempEntities.push(point)
      },Cesium.ScreenSpaceEventType.LEFT_CLICK)
      handler.setInputAction(function () {
                handler.destroy();//关闭事件句柄
                handler = null;
            }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            handler.setInputAction(function () {
                handler.destroy();//关闭事件句柄
                handler = null;
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      
    },
    drawPoint(position, config) {
            var config = config ? config : {};
            var pointGeometry = Viewer.entities.add({
                name: "点几何对象",
                position: position,
                point: {
                    color: Cesium.Color.SKYBLUE,
                    pixelSize: 10,
                    outlineColor: Cesium.Color.YELLOW,
                    outlineWidth: 3,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                }
            });
            return pointGeometry;
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tool{
  padding: 5px;
}
</style>
