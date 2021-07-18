<template>
  <div class="line-echart">
    <div class="title">
      <h4>种群密度图</h4>
    </div>
    <div id="main"></div>
  </div>
</template>

<script>
export default {
  props: ["echart"],
  data() {
    return {
      echartData: this.echart,
    };
  },
  watch: {
    //  监听echart数据变化
    echartData(newdata, olddata) {
      this.initEchart();
    },
  },
  methods: {
    init() {
      var myChart = this.echarts.init(document.getElementById("main"));
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "种群", "多样性浓度", "总数量"],
          source: [
            { product: "11", 种群: 43.3, 多样性浓度: 85.8, 总数量: 93.7 },
            { product: "21", 种群: 83.1, 多样性浓度: 73.4, 总数量: 55.1 },
            { product: "31", 种群: 86.4, 多样性浓度: 65.2, 总数量: 82.5 },
            { product: "41", 种群: 72.4, 多样性浓度: 53.9, 总数量: 39.1 },
            { product: "51", 种群: 72.4, 多样性浓度: 53.9, 总数量: 39.1 },
            { product: "61", 种群: 72.4, 多样性浓度: 53.9, 总数量: 39.1 },
            { product: "71", 种群: 72.4, 多样性浓度: 53.9, 总数量: 39.1 },
            { product: "81", 种群: 72.4, 多样性浓度: 53.9, 总数量: 39.1 },
            {
              product: "91",
              种群: 72.4,
              多样性浓度: 53.9,
              总数量: 39.1,
            },
            { product: "10", 种群: 72.4, 多样性浓度: 53.9, 总数量: 39.1 },
          ],
        },
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };
      myChart.setOption(option);
    },
    // init() {
    //   let newPromise = new Promise((resolve) => {
    //     resolve();
    //   });
    //   //然后异步执行echarts的初始化函数
    //   newPromise.then(() => {
    //     //  异步调用echart初始函数
    //     this.initEchart();
    //   });
    // },
    // initEchart() {
    //   // density == "undefined" & shannon == "undefined" & speciesNumber == "undefined"
    //   var myChart = this.echarts.init(document.getElementById("main"));
    //   var echartData = this.echartData;
    //   var density = null;
    //   var shannon = null;
    //   var speciesNumber = null;
    //   if (echartData == undefined) {
    //     density = 9.2;
    //     shannon = 2.491;
    //     speciesNumber = 9;
    //   } else {
    //     density = this.echartData.density;
    //     shannon = this.echartData.shannon;
    //     speciesNumber = this.echartData.speciesNumber;
    //   }
    //   // 指定图表的配置项和数据
    //   var option = {
    //     tooltip: {},
    //     legend: {
    //       // data: ["种群密度"],
    //     },
    //     xAxis: {
    //       data: ["总密度", "多样性指数", "物种数"],
    //       axisLabel: {
    //         textStyle: {
    //           color: "#fff",
    //         },
    //       },
    //     },
    //     yAxis: {
    //       axisLabel: {
    //         textStyle: {
    //           color: "#fff",
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         name: "种群密度",
    //         type: "line",
    //         color: ["white"],
    //         data: [density, shannon, speciesNumber],
    //       },
    //     ],
    //   };
    //   myChart.setOption(option);
    // },
  },
  beforeCreate() {
    this.eventBus.$on("setBrother", (msg) => {
      this.echartData = msg;
    });
  },
  created() {
    this.init();
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";
.line-echart {
  @extend .box;
  margin-top: 10px;
  .title {
    @extend .title;
    text-align: center;
  }
  #main {
    width: 300px;
    height: 300px;
  }
}
</style>
