import { Get, Post, Put, Delete } from "./request";

import { useTokenStore } from "@/stores/token";

function createUrlFactory(baseUrl) {
  let currentPath = ""; // 当前路径部分
  let currentQuery = ""; // 当前查询参数部分
  return {
    addPath(part) {
      if (part) {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
      }
      return this;
    },
    addQuery(key, value) {
      const newQuery = `${key}=${encodeURIComponent(value)}`;
      currentQuery = currentQuery ? `${currentQuery}&${newQuery}` : newQuery;
      return this;
    },
    toString() {
      const queryPart = currentQuery ? `?${currentQuery}` : "";
      return `${baseUrl}/${currentPath}${queryPart}`;
    },
    reset() {
      currentPath = "";
      currentQuery = "";
      return this;
    },
  };
}

function createOptionsFactory(data = {}, config = {}, onRequest, onResponse, onError) {
  return {
    data,
    config,
    onRequest,
    onResponse,
    onError,
  };
}

const UrlFactory = createUrlFactory("https://httpbin.org/");

import pinia from "@/stores/pinia.js";
const TokenStore = useTokenStore(pinia);

export const getDemo = () => {
  console.log(UrlFactory.reset().addPath(404).addQuery("a", 1).toString());
  const config = createOptionsFactory({}, {}, (config) => {
    config.token = TokenStore.accessToken;
  });
};
