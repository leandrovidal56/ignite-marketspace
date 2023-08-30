import { type ProductImageDTO } from '../dtos/ProductImageDTO'
import { type IPhoto } from '../interfaces/IPhoto'
import { api } from '../services/api'

class PhotoMap {
  static toIPhoto ({ id, path }: ProductImageDTO): IPhoto {
    return {
      name: id,
      uri: `${api.defaults.baseURL}/images/${path}`,
      path,
      type: 'image'
    }
  }
}

export { PhotoMap }
