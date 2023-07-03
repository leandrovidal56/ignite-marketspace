import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRODUCT_STORAGE } from "./storageConfig";
import { ProductDTO } from "../dtos/productDTO";


export async function storageProductSave(product: ProductDTO){
    await AsyncStorage.setItem(PRODUCT_STORAGE, JSON.stringify(product));
}