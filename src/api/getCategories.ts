import requestService from './requestService'

const getCategories = async () => {
  return await requestService('categories')
}

export default getCategories
