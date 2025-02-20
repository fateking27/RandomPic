import axios from '@/utils/http'

export const getPixivRank = () => {
  return axios.get('/pixiv_rank')
}

export const downloadPixivImg = (data: any) => {
  return axios.get(`/dowload_pixiv_img?title=${data.title}&file_url=${data.file_url}`, {
    responseType: 'blob'
  })
}
