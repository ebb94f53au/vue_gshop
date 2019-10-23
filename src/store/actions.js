/*
通过mutation间接更新state的多个方法的对象
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShop
}
from '../api'

export default {
  // 异步获取地址
  async getAddress({commit,state}){
    const geosh =state.latitude+","+state.longitude
    // 发送异步ajax请求
    const result=await reqAddress(geosh)
    // 提交一个mutation
    if(result.code === 0){
      const address =result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  // 异步获取食品分类列表
  async getCategorys({commit,state}){
    // 发送异步ajax请求
    const result=await reqFoodCategorys()
    // 提交一个mutation

    if(result.code === 0){
      const categorys =result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  // 异步获取商家列表
  async getShops({commit,state}){
    const latitude =state.latitude
    const longitude =state.longitude
    // 发送异步ajax请求
    const result=await reqShops(latitude,longitude)
    // 提交一个mutation
    if(result.code === 0){
      const shops =result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  // 同步记录用户信息
  async recordUser({commit},userInfo){
      commit(RECEIVE_USER_INFO,{userInfo})
  },
  // 异步获取用户信息
  async getUserInfo({commit}){
    const result=await reqUserInfo()
    if(result.code===0){
      const userInfo=result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  // 异步退出登录
  async logout({commit}){
    const result=await reqLogout()
    if(result.code===0){
      commit(RESET_USER_INFO)
    }
  },

  // 异步得到商家商品
  async getShopGoods({commit},callBack){
    const result=await reqShopGoods()
    if(result.code===0){
      const goods=result.data
      commit(RECEIVE_GOODS,{goods})
      //数据更新了，通知组件
      callBack && callBack() //callBack可以为空
    }
  },
  // 异步得到商家评价
  async getShopRating({commit},callBack){
    const result=await reqShopRatings()
    if(result.code===0){
      const ratings=result.data
      commit(RECEIVE_RATINGS,{ratings})
      callBack && callBack() //callBack可以为空
    }
  },
  // 异步得到商家信息
  async getShopInfo({commit}){
    const result=await reqShopInfo()
    if(result.code===0){
      const info=result.data
      commit(RECEIVE_INFO,{info})

    }
  },
  // 同步更新food中的count值
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  //清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  },
  //搜索
  async searchShops({commit,state},{keyword}){
    const geosh =state.latitude+","+state.longitude
    // 发送异步ajax请求

    const result=await reqSearchShop(geosh,keyword)
    // 提交一个mutation

    if(result.code === 0){
      const shops =result.data
      console.log(shops)
      commit(RECEIVE_SEARCH_SHOPS,{shops})
    }
  }
}
