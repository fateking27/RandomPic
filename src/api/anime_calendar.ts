import axios from '@/utils/http'

export const getAnimeCalendar = () => {
  return axios.get('/anime-calendar')
}
