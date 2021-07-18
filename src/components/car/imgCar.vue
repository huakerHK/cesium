<template>
  <div class="car">
    <div class="title">
      <h4>详情</h4>
    </div>
    <div class="main">
      <ul>
        <li v-for="(item, index) in this.datel.species" :key="index">
          <img :src="item.imagePath" alt="" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <!-- <el-table :data="this.datel.species" height="200" width="30%">
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.imagePath" alt="图片">
          </template>
        </el-table-column>
        <el-table-column label="名字">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>




<script>
export default {
  props: ["datel"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped="scoped">
@import "../../assets/scss/style.scss";
.car {
  @extend .box;
  width: 300px;
  .title {
    @extend .title;
    text-align: center;
  }
  .main {
    ul {
      list-style: none;
      height: 300px;
      overflow-y: scroll;
      li {
        margin: 5px;
        padding: 5px;
        height: 50px;
        margin-top: 2px;
        display: flex;
        justify-content: start;
        img {
          width: 50px;
          height: 50px;
          border-radius: 25px;
          margin-right: 10px;
        }
        span{
          line-height: 50px;
        }
      }
    }
    ul::-webkit-scrollbar{
      width: 0;
    }

    ::v-deep.el-table {
      padding: auto 20px;
    }
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
  }
}
// 去滚动条
::v-deep .el-table__body-wrapper {
  height: 200px; /* 滚动条整体高 必须项 */
  border-right: none;
  overflow-y: scroll; /* overflow-y为了不出现水平滚动条*/
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 0; /* 滚动条的宽高 必须项 */
  height: 0;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #bfcbd9; /* 滚动条的宽 */
  border-radius: 3px;
}
</style>