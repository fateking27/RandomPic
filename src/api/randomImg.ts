import axios from '@/utils/http'

export const getRandomImg = (data?: object) => {
  return axios.get('/random_img', {
    params: data
  })
}
