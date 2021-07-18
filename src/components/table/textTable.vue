 <template>
  <div class="table-container">
    <div class="title">
      <h4>调查点位列表</h4>
    </div>
    <div>
      <ul>
        <li v-for="(item, index) in data" :key="index" @click="datel(item)">
          {{ item.name + "-" + item.id }}
        </li>
      </ul>
    </div>
  </div>
</template>

  <script>
export default {
  props: ["data", "dianID", "sub", "subout"],
  data() {
    return {
      datas: this.data,
      dianId: this.dianID,
      // 传递点位 样式 的容器 鼠标 进入 点位时的下标
      sub: null,
      // 传递点位 样式 的容器 鼠标 离开 点位时的下标
      subout: null,
    };
  },
  watch: {
    sub: function (newsub, oldsub) {
      const subStyle = document.querySelector(
        ".right-parent .table-container ul > li"
      );
      const t = subStyle.childNodes;
      t[this.sub].style.backgroundColor = "rgba(23, 32, 21, 0.5)";
      this.subout = null;
    },
    subout: function (newsubout, oldsubout) {
      const subStyle = document.querySelector(
        ".right-parent .table-container ul > li"
      );
      const t = subStyle.childNodes;
      t[this.subout].style.backgroundColor = "transparent";
      this.sub = null;
    },
  },
  mounted() {
  },
  methods: {
    datel(val){
      console.log(val)
    },
    toParent(row) {
      this.eventBus.$emit("setBrother", row);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/style.scss";
.table-container {
  @extend .box;
  width: 300px;
  .title {
    // @extend .title;
    text-align: center;
  }
  div {
    ul {
      list-style: none;
      height: 300px;
      border-right: none;
      overflow-y:scroll;
      li {
        margin: 5px;
        padding: 10px 30px;
        line-height: 20px;
        text-align: center;
        background: url("/img/newPro/liebiao2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;

      }
      
      li:hover{
        color: yellow;
      }
    }
    ul::-webkit-scrollbar{
      width: 0;
    }
  }
}

</style>


