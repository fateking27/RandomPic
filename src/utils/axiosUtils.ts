import axios from "axios";

// console.log(import.meta.env);

const newAxios = axios.create({
    // baseURL: '/api',
    baseURL: import.meta.env.VITE_API_PATH,
    // timeout: 3000
})

//请求拦截
newAxios.interceptors.request.use((req) => {
    // 配置前端发给后端的数据格式
    req.headers["Content-Type"] = 'application/json';
    return req;
})

//响应拦截
// newAxios.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     (err) => {
//         if (err.response && err.response.status === 401) {
//             location.href = '/login'
//         }
//         return Promise.reject(err);
//     }
// )

export default newAxios