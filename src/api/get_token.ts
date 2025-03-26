import axios from '@/utils/http'

export const getToken = () => {
  return axios.get('/api/generateToken')
}
