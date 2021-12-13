import {request} from 'umi'

export const getCategoryList = async () => {
  return request('/api/admin/category', {
    methods: 'GET'
    }
  )
}
