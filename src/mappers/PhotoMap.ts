import { ProductImageDTO } from '../dtos/ProductImageDTO';
import { api } from '../services/api'
import { IPhoto } from '../interfaces/IPhoto';

class PhotoMap {
  static toIPhoto({ id, path }: ProductImageDTO): IPhoto {
    return {
      name: id,
      uri: `${api.defaults.baseURL}/images/${path}`,
      path: path,
      type: 'image',
    };
  }
}

export { PhotoMap };
