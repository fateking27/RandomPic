import axios from '@/utils/http'

export const getArticle = (data?: object) => {
  return axios.get('/get-novel/content', {
    params: data
  })
}
