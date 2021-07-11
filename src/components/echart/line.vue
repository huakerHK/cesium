<template>
  <div class="line-echart">
    <div class="table-container">
      <div class="title">
        <h4>{{ title }}</h4>
      </div>
      <div id="main"></div>
    </div>
  </div>
</template>

<script>

export default {
    props:["title"],
    mounted(){
        this.initEchart()
    },
    methods:{
        initEchart(){
            var myChart = this.echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
    
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {
       
    },
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    },{
        name: '销量',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
    }
    ]
});
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';
.line-echart {
  @extend .box;
  padding: 10px;
  .title {
    @extend .title;
    text-align: center;
  }
  #main{
      width: 400px;
      height: 400px;
  }
}
</style>
