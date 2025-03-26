import axios from 'axios'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'
import { Crypto } from '@/utils/crypto'

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dkIjoiMjAyNS0wMy0yNiAxNjo0MDozOCIsImlhdCI6MTc0Mjk3ODQzOCwiZXhwIjoxNzQzMDY0ODM4fQ.6--DgZJENpvOxR0--l4wfGKmNRVzaVvBX8w2FFsV6fk'
const key = CryptoJS.enc.Utf8.parse('1qwdfead36egamlp') // 密钥和后端保持一致

const newAxios = axios.create({
  // baseURL: '/api',
  baseURL: import.meta.env.VITE_API_PATH
  // timeout: 3000
})

//请求拦截
newAxios.interceptors.request.use((config) => {
  config.headers['Authorization'] = token
  const iv = CryptoJS.lib.WordArray.random(16)
  const { VITE_IS_ENCRYPT } = import.meta.env
  if (config.params && VITE_IS_ENCRYPT == 'true') {
    config.params = {
      encryptedData: Crypto.encrypt(JSON.stringify(config.params), key, iv),
      iv: iv.toString(CryptoJS.enc.Hex)
    }
  } else if (config.data && VITE_IS_ENCRYPT == 'true') {
    config.data = {
      encryptedData: Crypto.encrypt(JSON.stringify(config.data), key, iv),
      iv: iv.toString(CryptoJS.enc.Hex)
    }
  }
  // config.url =
  //   VITE_IS_ENCRYPT == 'true' ? Crypto.encrypt(JSON.stringify(config.url), key, iv) : config.url
  return config
})

// 响应拦截
newAxios.interceptors.response.use(
  async (res) => {
    // 解密
    const encrypted = res.data
    const iv = CryptoJS.enc.Hex.parse(encrypted.iv)
    const decrypted = Crypto.decrypt(encrypted.encryptedData, key, iv)
    res.data = decrypted

    return res.data
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      ElMessage({
        type: 'error',
        message: 'token过期，请重新验证'
      })
    }
    return Promise.reject(err)
  }
)

export default newAxios
