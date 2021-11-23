import {request} from 'umi';

/**
 * 获取用户列表
 * @params: current  type:int   当前页
 * @params: name type:string    姓名模糊搜索
 * @params: email type:string   邮箱模糊搜索
 * */
export const GitUserList = async (params) => {
  return request('/api/admin/users',{
    method: 'get',
    params
  })
}
