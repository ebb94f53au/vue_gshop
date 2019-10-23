/**
 * 通过state的计算方法
 */
export default{
  //计算商品总数
  totalCount(state){
    const foodArr=state.cartFoods
    if(foodArr.length!==0){
      const res= foodArr.reduce((num,food)=>num+food.count,0)
      return res
    }else{
      return 0
    }
  },
  //计算商品总价
  totalPrice(state){
    const foodArr=state.cartFoods
    if(foodArr.length!==0){
      const res= foodArr.reduce((num,food)=>num+food.count*food.price,0)
      return res
    }else{
      return 0
    }

  },
  //计算满意评论的个数
  positiveSize(state){
    const ratings=state.ratings
    if(ratings.length!==0){
      return ratings.reduce((num,rating)=>num+(rating.rateType===0 ? 1: 0),0)

    }else{
      return 0
    }


  }

}
