import { type PaymentMethodsDTO } from '../dtos/PaymentMethodsDTO'
import { type IPaymentMethods } from '../interfaces/IPaymentMethods'

class PaymentMethodsMap {
  static toIPaymentMethods ({ key, name }: PaymentMethodsDTO): IPaymentMethods {
    return key as IPaymentMethods
  }
}

export { PaymentMethodsMap }
