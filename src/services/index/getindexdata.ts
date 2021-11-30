import {request} from "umi";

export const GetIndex = async () => {
  return await request('/api/admin/index',{
    method:'GET'
  })
}
