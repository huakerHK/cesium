<template>
  <div class="car">
      <div class="title">
          <h4>{{title}}</h4>
      </div>
      <div class="main">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" alt="" class="image"/>
          <ul>
              <li><span>名字：</span></li>
              <li><span>名字：</span></li>
              <li><span>名字：</span></li>
              <li><span>名字：</span></li>
          </ul>
      </div>
         
  </div>
</template>




<script>
export default {
    props:["title"],
  data() {
    return {
      currentDate: new Date(),
    };
  },
};
</script>

<style lang="scss" scoped="scoped">
@import '../../assets/scss/style.scss';
.car{
    @extend .box;
    .title{
        @extend .title;
        text-align: center;
    }
    .main{
        margin-top:10px;
        .image{
            width: 200px;
            height: 200px;
            border-radius: 10px;
            margin-left: 30px;
            display: block;
        }
        ul{
            list-style: none;
            li{
                font-size: 20px;
                color: white;
            }
        }
    }
}

</style>