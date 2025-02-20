import axios from '@/utils/http'

export const getAnimeCalendar = () => {
  return axios.get('/anime-calendar')
}

export const getBgmHotAnimeData = () => {
  return axios.get('/hot-animelist')
}
