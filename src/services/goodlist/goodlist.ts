import {request} from 'umi';

/**
 * 获取商品列表
 * */
export const getGoodList = async () => {
  return await request('/api/admin/goods',{
    method:'GET'
  })
}

/**
 * 商品上架下架
 * */
export const goodsIsArrival = async (params) => {
  return await request(`/api/admin/goods/${params}/on`,{
    method:'PATCH',
  })
}


/**
 * 商品是否推荐
 * */
export const goodsIsRecommend = async (params) => {
  return await request(`/api/admin/goods/${params}/recommend`,{
    method:'PATCH'
  })
}

/**
 * 添加商品
 * */
export const addGoodsA = async (data) => {
  return await request('/api/admin/goods', {
    method: 'POST',
    data,
  })
}

/**
 * 获取商品详情
 * */
export const getGoodsDetail = async (id) => {
  return await request(`/api/admin/goods/${id}?include=category`,{
    method:'GET',
  })
}

/**
 * 修改商品
 * */
export const editGoods = async (data,id) => {
  return await request(`/api/admin/goods/${id}`,{
    method:'PUT',
    data,
    useStatus: true
  })
}
