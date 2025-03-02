import axios from 'axios'

// 测试不同的HTTP状态码
const testStatusCodes = [
  200, // 成功
  400, // 错误的请求
  401, // 未授权
  403, // 禁止访问
  404, // 未找到
  500, // 服务器内部错误
  502, // 网关错误
  503, // 服务不可用
]

testStatusCodes.forEach((statusCode) => {
  axios
    .get(`https://httpbin.org/status/${statusCode}`)
    .then((response) => {
      console.log(`Success: ${response.status} ${response.statusText}`)
      console.log('Response Data:', response.data)
    })
    .catch((error) => {
      if (error.response) {
        console.error(`Error: ${error.response.status} ${error.response.statusText}`)
        console.error('Response Data:', error.response.data)
      } else {
        console.error('Network Error:', error.message)
      }
    })
})
