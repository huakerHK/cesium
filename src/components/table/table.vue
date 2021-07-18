 <template>
  <div class="table-container">
    <div class="title">
      <h4>物种名录</h4>
    </div>
    <nav>
      <ul>
        <li 
        v-for="(item,index) in navList" 
        :key="index" 
        :class="{active:navList[index].isActive}"
        @click="navqh(index)"
        >
        <button>{{item.name}}</button>
        
        </li>
      </ul>
    </nav>
    <el-table
      :data="data"
      style="width: 100%"
      class="table"
      id="table-style"
      :cell-style="cellstyle"
      @row-click="setParent"
    >
      <el-table-column prop="name" label="多样性"> </el-table-column>
      <el-table-column prop="orderNumber" label="科"> </el-table-column>
      <el-table-column prop="familyNumber" label="目"> </el-table-column>
      <el-table-column prop="genusNumber" label="属"> </el-table-column>
    </el-table>
  </div>
</template>

  <script>
export default {
  props: ["data"],
  data() {
    return {
      navList:[
        {
          name:'长白荡',
          isActive:false,
        },
        {
          name:'盛家湾',
          isActive:false,
        }
      ],
      
    };
  },
  mounted() {
    console.log(this.data);
    setInterval(() => {
      // （也可以使用`this.$ref`获得表格元素让母后`.classList.remove("el-table--enable-row-hover")`）
      document
        .getElementById("table-style")
        .classList.remove("el-table--enable-row-hover");
    });
  },
  methods: {
    navqh(index){
      this.navList[index].isActive = true
      console.log(index)
    },
    cellstyle() {
      return "color:white;";
    },
    rowClass(row, column, cell, event, rowIndex) {
      console.log(row);
    },
    setParent(row) {
      const name = row.name;
      this.$emit("setParent", name);
    },
  },
};
</script>

<style lang="scss" scoped="scoped">
@import "../../assets/scss/style.scss";
.table-container {
  @extend .box;
  .title {
    @extend .title;
    text-align: center;
  }
  nav {
    ul {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-around;
      li {
        margin: 5px;
        flex: 1;
        text-align: center;
        button{
          width: 100%;
          color: white;
          border: none;
          background: transparent;
        }
      }
    }
  }
}
.active{
  border-bottom: 1px solid white;
}
// element-ui组件样式
/*最外层透明*/
::v-deep.el-table,
::v-deep.el-table__expanded-cell {
  background-color: transparent;
}
/* 表格内背景颜色 */
::v-deep.el-table th,
::v-deep.el-table tr,
::v-deep.el-table td {
  background-color: transparent;
}
/* 删除表格下最底层的横线 */
::v-deep.el-table .el-table__row > td {
  border: none;
}
::v-deep.el-table::before {
  left: 0;
  bottom: 0;
  width: 0px;
  height: 0px;
}
/* 表格表头字体颜色 */
::v-deep.el-table thead {
  color: #ffffff;
  font-weight: 500;
}
</style>


