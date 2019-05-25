import userConfig from '@/config'

const completeAddress = value => {
  return userConfig.baseURL + value;
}

const sliceOne = value => {
  if (value) {
    return value.slice(0, 1).toUpperCase()
  } else {
    return ''
  }
}

export default {
  completeAddress,
  sliceOne
}