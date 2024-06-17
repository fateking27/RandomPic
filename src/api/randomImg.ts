import axios from '@/utils/axiosUtils'

export const getRandomImg = (data?: object) => {
  return axios.get('/random_img', {
    params: data
  })
}
