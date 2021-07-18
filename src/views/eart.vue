<template>
  <!-- <div class="tool">
      <Tool />
    </div> -->
  <div class="viewer">
    <vc-viewer
      @MOUSE_MOVE="Xy"
      @ready="ready"
      :camera="position"
      :logo="false"
      :infoBox="false"
      :selectionIndicator="false"
    >
      <!-- 线 -->
      <vc-entity>
        <vc-graphics-polyline
          :positions="line_positions"
          :material="material3"
          :width="8"
        ></vc-graphics-polyline>
      </vc-entity>
      <!-- 面 -->
      <vc-entity
        :description="description"
        v-for="(item, index) in outLinelist"
        :key="index"
      >
        <vc-graphics-polygon
          :hierarchy="item.polygonHierarchy"
          :material="item.material"
          :perPositionHeight="true"
        >
        </vc-graphics-polygon>
      </vc-entity>

      <vc-entity
        v-for="(item, index) in dataList"
        :key="index"
        :position="{ lat: item.lat, lng: item.lon }"
        :description="description"
        :point.sync="point1"
        :pixelOffset="offset"
        @click="dian(index)"
        @mouseover="move(index)"
        @mouseout="out(index)"
      >
        <!--  @mouseover="move(index,event)" -->
        <!-- 布告板 -->
        <vc-graphics-billboard
          :image="image"
          :scale="scale[index].scale"
          :show="show"
        ></vc-graphics-billboard>
      </vc-entity>
      <!-- 图片 -->
      <vc-layer-imagery
        :alpha="alpha"
        :brightness="brightness"
        :contrast="contrast"
        :sortOrder="10"
      >
        <vc-provider-imagery-urltemplate
          :url="url"
        ></vc-provider-imagery-urltemplate>
      </vc-layer-imagery>
      <!-- TODO::projectionTransforms="projectionTransforms" -->
    </vc-viewer>

    <!-- 气泡框 -->
    <lh-msg class="msgbox" v-show="showbox" :msg="msg" />
    <div id="eart">
      <!-- 左右两个大盒子容器 -->
      <!-- 左边 -->
      <div class="left-parent">
        <!-- 上下两个子盒子  放组件 -->
        <div class="top-child">
          <lh-table :data="data.data" @setParent="getChild" />
        </div>
        <div class="buttom-child">
          <lh-line />
        </div>
      </div>

      <!-- 右边 -->
      <div class="right-parent">
        <!-- 上下两个子盒子  放组件 -->
        <div class="top-child">
          <lh-right_top_Table
            :data="dataList"
            :dianID="dianId"
            :sub="sub"
            :subout="subout"
            @setParent="Child"
          />
        </div>
        <div class="bottom-child">
          <lh-imgCar :datel="datel" />
        </div>
      </div>
      <div class="top">
        <lh-top />
      </div>
      <div class="bottom">
        <lh-nav />
      </div>
    </div>
  </div>
</template>

<script>
import Tool from "../components/tool.vue";
export default {
  data() {
    return {
      polygon5: {},
      //  贴图
      url: "http://172.22.208.62:18083/jiashanImagery/sat-15/{z}/{x}/{y}.png",
      url1: "http://172.22.208.62:18083/jiashanImagery/airplane-19/{z}/{x}/{y}.png",
      // urlText:
      //   "https://wprd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&ltype=12",
      alpha: 1,
      brightness: 1,
      contrast: 1,
      //  放大区域
      position: {
        position: {
          lng: 120.936170231,
          lat: 31.011443764,
          height: 15000,
        },
        heading: 0,
        pitch: 0,
        roll: 0,
      },
      // 线
      line_positions: [],
      material3: undefined,
      //  面

      outLinelist: [
        {
          properties: "",
          polygonHierarchy: [],
          material: "BLUE",
        },
        {
          properties: "",
          polygonHierarchy: [],
          material: {},
        },
        {
          properties: "",
          polygonHierarchy: [],
          material: {},
        },
        {
          properties: "",
          polygonHierarchy: [],
          material: {},
        },
        {
          properties: "",
          polygonHierarchy: [],
          material: {},
        },
        {
          properties: "",
          polygonHierarchy: [],
          material: {},
        },
        {
          properties: "",
          polygonHierarchy: [],
          material: {},
        },
        {
          properties: "",
          polygonHierarchy: [],
          material: {},
        },
      ],

      description: "Hello Vue Cesium",
      point1: null,
      //  布告板信息
      image: "https://zouyaoji.top/vue-cesium/favicon.png",
      billboard: {},
      show: true,
      distanceDisplayCondition: { near: 0, far: 20000000 },
      horizontalOrigin: 0,
      scale: [
        { scale: 0.1 },
        { scale: 0.1 },
        { scale: 0.1 },
        { scale: 0.1 },
        { scale: 0.1 },
        { scale: 0.1 },
        { scale: 0.1 },
        { scale: 0.1 },
        { scale: 0.1 },
        { scale: 0.1 },
      ],
      offset: {
        x: null,
        y: null,
      },
      // color1: {},
      // position1: { lng: -75.59777, lat: 40.03883 },

      data: {
        data: [],
      },
      //   点位相关
      dataList: [],
      // dianlist:[],
      //  点的id
      dianId: null,
      //  详情
      datel: null,
      echart: null,
      //  气泡框
      showbox: false,
      //  传递数据给气泡框的容器
      msg: null,
      // 传递点位 样式 的容器 鼠标 进入 点位时的下标
      sub: null,
      // 传递点位 样式 的容器 鼠标 离开 点位时的下标
      subout: null,
      //  坐标点容器
      XY: [],
    };
  },
  components: {
    Tool,
  },
  created() {
    //  初始化地球
    this.init();
    //  加载 线
    this.line();
    //  加载 面
    this.poly();
  },

  mounted() {
    console.log("color:" + Math.random() * 100);
    this.getData();
    this.getList();

    this.$refs.polyline.createPromise.then(
      ({ Cesium, viewer, cesiumObject }) => {
        const boundingSphere = Cesium.BoundingSphere.fromPoints(
          cesiumObject._positions
        );
        viewer.scene.camera.flyToBoundingSphere(boundingSphere);
      }
    );
    Promise.all([this.$refs.polygon6.createPromise]).then((instances) => {
      instances[0].viewer.zoomTo(instances[0].viewer.entities);
    });
    this.$refs.entity.createPromise.then(({ Cesium, viewer, cesiumObject }) => {
      viewer.zoomTo(cesiumObject);
    });
  },
  methods: {
    poly() {
      const url = "./static/map/protect_poly.json";
      this.axios.get(url).then((res) => {
        var arr = res.data.features;
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          this.outLinelist[i].properties = arr[i].properties;
          const arrI = arr[i].geometry.coordinates[0];
          for (let j = 0; j < arrI.length; j++) {
            const obj = {};
            obj.lng = arrI[j][0];
            obj.lat = arrI[j][1];
            this.outLinelist[i].polygonHierarchy.push(obj);
          }
        }
        console.log(this.outLinelist, 111);
      });
    },
    line() {
      const url = "./static/map/protect_line.json";
      this.axios.get(url).then((data) => {
        let arr = data.data.geometries[0].coordinates;
        for (let i = 0; i < arr.length; i++) {
          var objct = {};
          objct.lng = arr[i][0];
          objct.lat = arr[i][1];
          this.line_positions.push(objct);
        }
      });
    },
    ready(cesiumInstance) {
      const { Cesium, viewer } = cesiumInstance;
      //  线
      this.material3 = new Cesium.PolylineArrowMaterialProperty(
        Cesium.Color.RED
      );
      //  蓝色
      this.outLinelist[0].material = new Cesium.Color(
        67 / 255,
        93 / 255,
        204 / 255,
        0.5
      );

      this.outLinelist[1].material = new Cesium.Color(
        131 / 255,
        151 / 255,
        224 / 255,
        0.5
      );
      // 蓝色
      this.outLinelist[2].material = new Cesium.Color(
        125 / 255,
        214 / 255,
        96 / 255,
        0.3
      );
      //  绿色
      this.outLinelist[3].material = new Cesium.Color(
        125 / 255,
        214 / 255,
        96 / 255,
        0.5
      );
      this.outLinelist[4].material = new Cesium.Color(
        67 / 255,
        93 / 255,
        204 / 255,
        0.5
      );

      this.outLinelist[5].material = new Cesium.Color(
        131 / 255,
        151 / 255,
        224 / 255,
        0.5
      );
      // 黄色
      this.outLinelist[6].material = new Cesium.Color(
        247 / 255,
        186 / 255,
        0 / 255,
        0.5
      );
      this.outLinelist[7].material = new Cesium.Color(
        247 / 255,
        186 / 255,
        0 / 255,
        0.5
      );
    },
    //  点击屏幕上的 点 传递数据
    dian(index) {
      this.datel = null;
      var id = (id = this.dataList[index].id);

      console.log(id);
      const url =
        "http://172.22.208.62:6789/api/ZooplanktonStatistic/getSurveyDetailByID?id=" +
        id +
        "&" +
        "type=zooplankton";
      this.axios.get(url).then((data) => {
        const arr = data.data.data;
        this.datel = arr;
      });
      // this.datel = this.dataList[index]
      // console.log(this.datel)
    },
    //  初始化详情
    init() {
      //  异步调用echart初始函数
      const url =
        "http://172.22.208.62:6789/api/ZooplanktonStatistic/getSurveyDetailByID?id=" +
        "45" +
        "&" +
        "type=zooplankton";
      this.axios.get(url).then((data) => {
        const arr = data.data.data;
        this.datel = arr;
      });
    },
    Xy({ endPosition, startPosition }) {
      // this.XY.push()
      return endPosition, startPosition;
    },
    //  鼠标移动
    move(index) {
      this.scale[index].scale = 0.2;
      this.msg = null;
      this.showbox = true;
      this.sub = index;
      this.msg = this.dataList[index];
      console.log("dian:" + this.Xy());
      // (this.offset.x = this.dataList[index].lon),
      //   (this.offset.y = this.dataList[index].lat);
    },
    out(index) {
      this.showbox = false;
      this.scale[index].scale = 0.1;
      this.subout = index;
    },
    getChild(val) {
      console.log(val);
    },
    Child(val) {
      this.echart = val;
    },
    //    长白荡物种多样性名录
    getData() {
      this.axios
        .get(
          "http://172.22.208.62:6789/api/ZooplanktonStatistic/getClassificationStatistic"
        )
        .then((data) => {
          const datas = data.data.data.datas;
          this.data.data = datas;
        });
    },
    //  点位列表
    getList() {
      const url =
        "http://172.22.208.62:6789/api/ZooplanktonStatistic/getPlanktonSurveyList?type=" +
        "zooplankton";
      this.axios.get(url).then((data) => {
        const datas = data.data.data.datas;
        console.log(datas);

        this.dataList = datas;
        const arr = [];
        for (let i = 0; i < datas.lenth; i++) {
          console.log(i);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.viewer {
  height: 1000px;
}
.left-parent,
.msgbox,
.right-parent,
.top,
.bottom {
  position: fixed;
  z-index: 1;
}
.left-parent {
  top: 10%;
  left: 1%;
  bottom: 10%;
}
.right-parent {
  top: 10%;
  right: 2%;
  bottom: 3%;
  .top-child,
  .bottom-child {
    margin-top: 10px;
  }
}

.msgbox {
  top: 0;
}
.top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.tool {
  position: fixed;
  z-index: 1;
  background: white;
}
</style>
