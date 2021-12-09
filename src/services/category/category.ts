import {request} from 'umi'

export const getCategoryList = async (params) => {
  return request('/api/admin/category',{
    params
  })
}
