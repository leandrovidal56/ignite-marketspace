import { type UserDTO } from '../dtos/userDTO'

import { type IPaymentMethods } from './IPaymentMethods'
import { type IPhoto } from './IPhoto'

export interface IProduct {
  id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: IPaymentMethods[]
  product_images: IPhoto[]
  is_active?: boolean
  user_id?: string
  user: UserDTO
}
