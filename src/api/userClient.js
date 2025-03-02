import axios from 'axios'
import { tokenManager } from './token'

// 创建一个Axios实例
const userClient = axios.create({

})

const postUsersAccessToken = () => {
  return myPost('/users/access_token', { refresh_token: tokenManager.getRefreshToken() }, false)
}

userClient.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    //刷新访问令牌后重试一次
    return handleTokenRefresh(response.config)
  }
  return response
})

// 处理Token刷新逻辑
let isRefreshingToken = false;

async function handleTokenRefresh(config) {
  if (isRefreshingToken) {
    return new Promise((resolve, reject) => {
      // 等待Token刷新完成
      const interval = setInterval(() => {
        if (!isRefreshingToken) {
          clearInterval(interval);
          resolve(userClient(config));
        }
      }, 100);
    });
  }

  isRefreshingToken = true;
  try {
    const response = await postUsersAccessToken();
    if (response && response.data.code === 200) {
      const access_token = response.data.data.access_token;
      tokenManager.setAccessToken(access_token);
      config.headers.Authorization = `${access_token}`;
      isRefreshingToken = false;
      return userClient(config);
    } else {
      throw new Error('AUTHENTICATION_FAILED');
    }
  } catch (error) {
    isRefreshingToken = false;
    throw error;
  }
}


// 给请求头添加 access_token
const setHeaderToken = (isNeedToken) => {
  const accessToken = isNeedToken ? tokenManager.getAccessToken() : null
  if (isNeedToken) {
    userClient.defaults.headers.common.Authorization = `${accessToken}`
  }
}

export const myGet = (url, params = {}, isNeedToken = false) => {
  setHeaderToken(isNeedToken)
  return userClient({
    method: 'get',
    url,
    params,
  })
}

export const myPost = (url, params = {}, isNeedToken = false) => {
  setHeaderToken(isNeedToken)
  return userClient({
    method: 'post',
    url,
    data: params,
  })
}

// 封装delete请求
export const myDelete = (url, params = {}, isNeedToken = false) => {
  setHeaderToken(isNeedToken)
  return userClient({
    method: 'delete',
    url,
    params,
  })
}

// 封装put请求
export const myPut = (url, params = {}, isNeedToken = false) => {
  setHeaderToken(isNeedToken)
  return userClient({
    method: 'put',
    url,
    data: params,
  })
}
