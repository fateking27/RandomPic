import axios from '@/utils/http'

export const wenku8Login = () => {
  return axios.get('/wenku8-login')
}

export const getNovelList = (data?: any) => {
  return axios.get('/get-novel', { params: data })
}

export const getNovelHotAnime = () => {
  return axios.get('/get-novel/hot_anime')
}

export const getNovelRanking = () => {
  return axios.get('/get-novel/rank_top')
}
