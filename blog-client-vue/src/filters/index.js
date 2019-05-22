import userConfig from '@/config'

const photoAddress = value => {
  return userConfig.baseURL + value;
}

export default {
  photoAddress
}