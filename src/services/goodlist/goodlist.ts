import {request} from 'umi';

/**
 * 获取商品列表
 * */
export const GetGoodList = async (params) => {
  return await request('/api/admin/goods',{
    method:'GET',
    params
  })
}

/**
 * 商品上架下架
 * */
export const GoodsIsArrival = async (params) => {
  return await request(`/api/admin/goods/${params}/on`,{
    method:'PATCH',
  })
}


/**
 * 商品是否推荐
 * */
export const GoodsIsRecommend = async (params) => {
  return await request(`/api/admin/goods/${params}/recommend`,{
    method:'PATCH'
  })
}

/**
 * 添加商品
 * */
export const AddGoodsA = async (params) => {
  return await request('/api/admin/goods', {
    method: 'POST',
    params
  })
}

/**
 * 获取商品详情
 * */
export const GetGoodsDetail = async (id) => {
  return await request(`/api/admin/goods/${id}?include=category`,{
    method:'GET',
  })
}

/**
 * 修改商品
 * */
export const EditGoodsMessage = async (params,id) => {
  return await request(`/api/admin/goods/${id}`,{
    method:'PUT',
    params
  })
}
