/**
 *路由设置
 *
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// import Msite from '../pages/Msite/Msite'
// import Search from '../pages/Search/Search'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'

const Msite = () => import('../pages/MSite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')




export default new VueRouter({
  routes:[
    {
      path:'/msite',
      component:Msite,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/login',
      component:Login,
      meta:{
        showFooter:false
      }
    },
    {
      path:'/',
      redirect:'/msite'
    },
    {
      path:'/shop/:id',
      component:Shop,
      children:[
        {
          path:'/shop/:id/goods',
          component:ShopGoods
        },
        {
          path:'/shop/:id/info',
          component:ShopInfo
        },
        {
          path:'/shop/:id/ratings',
          component:ShopRating
        },
        {
          path:'/shop/:id/',
          redirect: '/shop/:id/goods'
        }
      ]
    }
  ]
})
