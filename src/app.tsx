import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history , RequestConfig} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import  {notification} from 'antd';
// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // @ts-ignore
      if (initialState.loading) return <PageLoading />;
      return children;
    },
    ...initialState?.settings,
  };
};

//请求拦截器
// @ts-ignore
const requestInterceptors = (url: string,options: RequestOptionsInit) => {
  //判断域名中是否有//,如果有说明请求的事非服务器域名
  const urlStatus: boolean =  url.indexOf('//') == -1 ? true : false

  const baseurl: string =  urlStatus ? [API_URL] + url : url;
  const c_token = localStorage.getItem('token') ?? '';
  if(c_token){
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ c_token,
  };
    return {
      url: baseurl,
      options: { ...options, interceptors: true,headers: headers},
    };
  }
  return {
    url: baseurl,
    options: { ...options, interceptors: true},
  };
}

//错误处理
const errorHandler = (error: any) => {
  const { response,data } = error;
  if (response && response.status) {
    let errorText  ='';
    switch(response.status){
      case 401:
        errorText  = '请重新登录';
        return;
        break
      case 403:
        errorText  = data.message;
        break
      case 422:
        for(let v in data.errors){
          errorText = data.errors[v][0]
          break;
        }
        break
      case 400:
        errorText = data.message
        break
      default:
        errorText  = '发生了意想不到的错误';
    }
    notification.error({
      message: errorText,
    });
  }
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

export const request: RequestConfig = {
  timeout: 5000,
  errorHandler,
  middlewares:[],
  requestInterceptors: [requestInterceptors],
}

