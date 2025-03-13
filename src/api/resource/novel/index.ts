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

export const getNovelSingleRanking = () => {
  return axios.get('/get-novel/single_rank_top')
}

export const getNovelHot = () => {
  return axios.get('/get-novel/hot_list')
}

export const getNovelUpdate = () => {
  return axios.get('/get-novel/lastupdate')
}

export const getNovelDayVisit = () => {
  return axios.get('/get-novel/dayvisit')
}

export const getNovelFinished = () => {
  return axios.get('/get-novel/finished')
}

export const getNovelDetail = (id: any) => {
  return axios.get('/get-novel/detail', { params: id })
}

export const getNovelChapters = (id: any) => {
  return axios.get('/get-novel/chapters', { params: id })
}

export const getNovelDownload = (data: any) => {
  return axios.get('/get-novel/novel-download', { params: data })
}

export const novelCommentAdd = (data: any) => {
  return axios.post('/novel-comment/add', data)
}

export const novelCommentList = (data: any) => {
  return axios.get('/novel-comment/get', { params: data })
}
