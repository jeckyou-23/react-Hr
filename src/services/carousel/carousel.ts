import {request} from 'umi';

/**
 * 获取图片列表
 * */
export const getCarouselList = async () => {
  return await request('/api/admin/slides',{

  })
}

/**
 * 状态的启用和禁用
 * */
export const updateStatus = async (id) => {
  return await request(`/api/admin/slides/${id}/status`,{
    method:'PATCH'
  })
}

/**
 * 添加图片
 * */
export const upImageBanner = async (data) => {
  return await request('/api/admin/slides',{
    method:'POST',
    data
  })
}

/**
 * 修改轮播
 * */
export const updateBanner = async (id,data) => {
  return await request(`/api/admin/slides/${id}`,{
    method:'PUT',
    data
  })
}

/**
 * 获取轮播详情
 * */
export const bannerDetail = async (id) => {
  return await request(`/api/admin/slides/${id}`,{
    method:'GET'
  })
}

/**
 * 删除轮播图
 * */
export const deleteBanner = async (id) => {
  return await request(`/api/admin/slides/${id}`,{
    method:'DELETE'
  })
}
