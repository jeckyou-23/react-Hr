import {request} from "umi";

export interface OssDataType {
  [k: string]: any
}

/*
* 封装获取阿里云秘钥网络请求
* */
export const GetOss = async () => {
  return request('/api/auth/oss/token')
}
