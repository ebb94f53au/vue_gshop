<template>
  <div class="star" :class="`star-`+size">
    <span class="star-item" v-for="(sc,index) in starArr" :class="sc"></span>
  </div>
</template>

<script>
    export default {
      props:{
        score:Number,
        size:Number
      },
      computed:{
        starArr(){
          const {score}=this
          const arr=[]
          //添加N个 on
          let n=parseInt(score);
          for(let i=0;i<n;i++){
            arr.push("on")
          }
          //添加0或1个 half
          if(Math.ceil(score)>n){//代表有小数部分
            arr.push("half")
            const l=5-n-1
            //添加5-n-0或1个 off
            for(let i=0;i<l;i++){
              arr.push("off")
            }
          }else{//代表没有小数部分
            const l=5-n
            //添加5-n-0或1个 off
            for(let i=0;i<l;i++){
              arr.push("off")
            }
          }

          return arr
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &last-child
          margin-right 0
        &.on
          bg-image('./image/star48_on')
        &.half
          bg-image('./image/star48_half')
        &.off
          bg-image('./image/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &last-child
          margin-right 0
        &.on
          bg-image('./image/star36_on')
        &.half
          bg-image('./image/star36_half')
        &.off
          bg-image('./image/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &last-child
          margin-right 0
        &.on
          bg-image('./image/star24_on')
        &.half
          bg-image('./image/star24_half')
        &.off
          bg-image('./image/star24_off')
</style>
