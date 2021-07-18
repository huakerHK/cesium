<template>
    <div class="box">
        <div class="title">
            <h4>{{msg.name}}</h4>
        </div>
        <ul>
                <li><span>ID:</span>{{msg.id}}</li>
                <li><span>地名:</span>{{msg.name}}</li>
                <li><span>经度:</span>{{msg.lon}}</li>
                <li><span>纬度:</span>{{msg.lat}}</li>
                <li><span>总密度:</span>{{msg.density}}</li>
                <li><span>多样性指数:</span>{{msg.shannon}}</li>
                <li><span>物种数:</span>{{msg.speciesNumber}}</li>
            </ul>
    </div>
</template>

<script>


export default {
    props:["msg"]

}
</script>


<style scoped lang="scss">
@import "../../assets/scss/style.scss";
.box{
    @extend .box;
    position: absolute;
    width: 200px;
    height: 200px;
    top: 30%;
    left: 65%;
    transform: translate(-30%,-65%);
    .title{
        @extend .title;
        text-align: center;
    }
    ul {
        list-style: none;
        font-size: .5rem;
        color: white;
        li{
            padding: 5px;
            span{
                margin-right: 5px;
            }
        }
    }
}
</style>