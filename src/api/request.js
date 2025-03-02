import axios from "axios";

// 通用请求处理器
const createRequestHandler = (method) => {
  return (url, options = {}) => {
    // 参数解构（带默认值）
    const { data = {}, config = {}, onRequest, onResponse, onError } = options;

    // 请求前回调
    if (typeof onRequest === "function") {
      const requestData = method === "get" || method === "delete" ? null : data;
      onRequest(requestData, config);
    }

    // 构建 Axios 参数
    const axiosArgs = method === "get" || method === "delete" ? [url, config] : [url, data, config];

    // 发起请求
    return axios[method](...axiosArgs)
      .then((result) => {
        if (typeof onResponse === "function") onResponse(result);
        return result;
      })
      .catch((error) => {
        if (typeof onError === "function") onError(error);
        throw error;
      });
  };
};

// 导出各请求方法（对象参数）
export const Get = createRequestHandler("get");
export const Post = createRequestHandler("post");
export const Put = createRequestHandler("put");
export const Delete = createRequestHandler("delete");
