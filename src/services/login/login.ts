import {request} from "umi";

/**
 * 登录请求api
 * params @email
 * params @password
 * */

export const login = async (params) => {
  return request('/api/auth/login',{
    method:'post',
    data:{
      email:params.username,
      password:params.password
    }
  })
}
