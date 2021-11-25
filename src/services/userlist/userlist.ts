import {request} from 'umi';

/**
 * 获取用户列表
 * @params: current  type:int   当前页
 * @params: name type:string    姓名模糊搜索
 * @params: email type:string   邮箱模糊搜索
 * */
export const GitUserList = async (params) => {
  return request('/api/admin/users',{
    method: 'GET',
    params
  })
}
/**
 * 添加用户数据
 *@params: name type:string  用户昵称
 *@params: email type:string 用户邮箱
 *@params: password type:string 用户密码
 * */
export const AddUsers = async (params) => {
  return request('/api/admin/users',{
    method: 'POST',
    params
  })
}
/**
 * 更改用户状态 禁用和启用
 * */
export const ChangeLock = async (params) => {
  return request(`/api/admin/users/${params}/lock`,{
    method: 'PATCH'
  })
}
/**
 * 修改用户数据
 * */
export const EditUsers = async (params , userId) => {
  return request(`/api/admin/users/${userId}`,{
    method: 'PUT',
    params
  })
}
/**
 * 获取用户详情
 * */
export const ShowUserDetails = async(params) => {
  return request(`/api/admin/users/${params}`,{
    method: 'GET'
  })
}
