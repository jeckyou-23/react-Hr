import {request} from 'umi';

/**
 * 获取图片列表
 * */
export const getCarouselList = async (params) => {
  return await request('/api/admin/slides',{
    params
  })
}

/**
 * 状态的启用和禁用
 * */
export const updateStatus = async (id) => {
  return await request(`/api/admin/slides/${id}/status`)
}

/**
 * 添加图片
 * */
export const upImageBanner = async (params) => {
  return await request('/api/admin/slides',{
    method:'POST',
    params
  })
}

/**
 * 修改轮播
 * */
export const updateBanner = async (id,params) => {
  return await request(`/api/admin/slides/${id}`,{
    method:'PUT',
    params
  })
}

/**
 * 获取轮播详情
 * */
export const BannerDetail = async (id) => {
  return await request(`/api/admin/slides/${id}`,{
    method:'GET'
  })
}
