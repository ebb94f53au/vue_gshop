<template>
  <!--首页外卖-->
  <div class="on">
    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
        <router-link to="/search" class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
        </router-link>
        <router-link to="/login" class="header_login" slot="right" v-show="!userInfo._id">
            <span class="header_login_text">登录|注册</span>
        </router-link>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="categorys.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys,index) in categoryArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys">
                <div class="food_container">
                  <img :src="baseImageUrl+category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img v-else src="./image/msite_back.svg" alt="">
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopList/>
      </div>
    </section>
  </div>

</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import {mapState,mapActions} from 'vuex'
    export default {
      data () {
        return {
          baseImageUrl: 'https://fuss10.elemecdn.com'
        }
      },
    computed:{
      ...mapState(['address','categorys','userInfo']),
      //将categorys变为8*n 的数据格式（二维数组）
      categoryArr(){
        const {categorys} =this
        const page=[]
        let minpage=[]
        let flag=0
        categorys.forEach(c=>{
          minpage.push(c)
          flag=flag+1
          if(minpage.length===8){
            flag=0
            page.push(minpage)
            minpage=[]
          }
        })
        return page
      }
    },

      components:{
        HeaderTop,ShopList
      },
      mounted (){
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
      },
      watch:{
        categorys(value) {
          // 界面更新就立即创建Swiper对象
          this.$nextTick(() => {// 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
            // 创建一个Swiper实例对象, 来实现轮播
            new Swiper('.swiper-container', {
              loop: true, // 可以循环轮播
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },
            })
        })

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  &.msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
