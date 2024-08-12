import requestService from './requestService'

const getProducts = async () => {
  return await requestService('products')
}

export default getProducts
