import { type PaymentMethodsDTO } from '../dtos/PaymentMethodsDTO'
import { type ProductImageDTO } from '../dtos/ProductImageDTO'
import { type UserDTO } from '../dtos/userDTO'
import { type IPhoto } from '../interfaces/IPhoto'

export interface ProductDTO {
  name: string
  description: string
  is_new: boolean
  price: number
  image: IPhoto[]
  accept_trade: boolean
  id: string
  user_id?: string
  is_active?: boolean
  payment_methods: PaymentMethodsDTO[]
  product_images: ProductImageDTO[]
  user: UserDTO

}
