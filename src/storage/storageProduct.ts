import AsyncStorage from '@react-native-async-storage/async-storage'

import { type ProductDTO } from '../dtos/productDTO'

import { PRODUCT_STORAGE } from './storageConfig'

export async function storageProductSave (product: ProductDTO) {
  await AsyncStorage.setItem(PRODUCT_STORAGE, JSON.stringify(product))
}

export async function storageProductGet () {
  const storage = await AsyncStorage.getItem(PRODUCT_STORAGE)

  const product: ProductDTO = storage ? JSON.parse(storage) : { }

  return product
}

export async function storageProductSaveDatabase (product: never[]) {
  await AsyncStorage.setItem(PRODUCT_STORAGE, JSON.stringify(product))
}

export async function storageProductGetDatabase () {
  const storage = await AsyncStorage.getItem(PRODUCT_STORAGE)

  const product: ProductDTO = storage ? JSON.parse(storage) : { }

  return product
}
