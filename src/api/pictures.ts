import axios from '@/utils/http'

export const imagePageGet = (data: any) => {
  return axios.get('/random_imglist', {
    params: data
  })
}

export const getImgById = (id: any) => {
  return axios.get('/get_img', {
    params: id
  })
}

export const addImgTag = (data: any) => {
  return axios.post('/img/add_tag', data)
}

export const odImageFun = (data: any) => {
  return axios.get('/od-imagefun', {
    params: data
  })
}

export const odUploadFile = (file: any) => {
  return axios.post('/onedrive-upload', file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const easyUpload = (file: any) => {
  return axios.post('/easy-upload', file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const editImg = (data: object) => {
  return axios.post('/img/edit', data)
}
