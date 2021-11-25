import {request} from 'umi'

export const GetCategoryList = async (params) => {
  return request('/api/admin/category',{
    params
  })
}
