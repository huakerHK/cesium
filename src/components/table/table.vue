 <template>
  <div class="table-container">
    <div class="title">
      <h4>{{titles}}</h4>
    </div>
    <el-table :data="tableData" style="width: 100%" class="table " id="table-style" @cell-mouse-enter="rowClass" :cell-style="cellstyle" >
      <el-table-column prop="date" label="日期" > </el-table-column>
      <el-table-column prop="name" label="姓名" > </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
 </div>
  
</template>

  <script>
export default {
  props:["title"],
  data() {
    return {
      titles:this.title.title,
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333,
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333,
          tag: '公司'
        }]
    };
  },
  mounted(){
    setInterval(() => {
  // （也可以使用`this.$ref`获得表格元素让母后`.classList.remove("el-table--enable-row-hover")`）
      document.getElementById("table-style").classList.remove("el-table--enable-row-hover")
  })
  },
  methods:{
    cellstyle(){
      return "color:white;"
      },
    rowClass(row, column, cell, event,rowIndex){
      console.log(row)
      
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/style.scss';
.table-container{
  @extend .box;
  .title{
    @extend .title;
    text-align: center;
  }
}
/*最外层透明*/
::v-deep.el-table,::v-deep.el-table__expanded-cell{
  background-color: transparent;
}
/* 表格内背景颜色 */
::v-deep.el-table th,
::v-deep.el-table tr,
::v-deep.el-table td {
  background-color: transparent;
}
/* 删除表格下最底层的横线 */
::v-deep.el-table::before {
  width: 0;

}
/* 表格表头字体颜色 */
::v-deep.el-table thead {
  color: #ffffff;
  font-weight: 500;
}
</style>


