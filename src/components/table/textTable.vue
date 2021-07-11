<template>
    <div class="textTable">
        <div class="title"><h4>{{title}}</h4></div>
        <ul>
            <li><b>地名：</b></li>
            <li><b>地名：</b></li>
            <li><b>地名：</b></li>
        </ul>
    </div>
</template>

<script>

export default {
    props:["title"]
}
</script>

<style lang="scss" scoped>
.textTable{
    width: 400px;
  background: url("/img/newPro/home/jctxright.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 10px;
  .title {
    background: url("/img/newPro/titleTwo.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
  }
}
</style>
