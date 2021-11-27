import {request} from "umi";

/**
 * 登录请求api
 * params @email
 * params @password
 * */

export const login = async (params) => {
  return request('/api/auth/login',{
    method:'POST',
    data:{
      email:params.username,
      password:params.password
    }
  })
}

/**
 * 退出登录
 * */

export const  loginout = async () => {
  return request('/api/auth/logout',{
    method:'POST'
  })
}
