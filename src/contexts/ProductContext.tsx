import { ReactNode, createContext, useState } from "react";

import { api } from "../services/api";
import { ProductDTO } from "../dtos/productDTO";
import { storageProductGet, storageProductSave, storageProductSaveDatabase } from "../storage/storageProduct";
import { IPhoto } from "../interfaces/IPhoto";

export type ProductContextDataProps = {
    isLoadingProductStorageData: boolean;
    product: ProductDTO;
    setProduct: (product: ProductDTO) => void;
    productSave: () => void;
    productSaveStorage: (product: ProductDTO) => void;
    productGet: () => Promise<void>;
    productGetStorageData: () => Promise<any>;
    setImage:  React.Dispatch<React.SetStateAction<IPhoto[]>>
    image:  IPhoto[]
}

type ProductContextProviderProps = { 
    children: ReactNode;
}

export const ProductContext = createContext<ProductContextDataProps>({} as ProductContextDataProps)

export function ProductContextProvider({ children } : ProductContextProviderProps){
    const [ product, setProduct ] = useState<ProductDTO>({ } as ProductDTO)
    const [ isLoadingProductStorageData, setIsLoadingProductStorageData ] = useState(true)
    const [image, setImage] = useState<IPhoto[]>([]);

    async function productSaveStorage(product: ProductDTO){
        try{
            await storageProductSave(product)
            setProduct(product)
        }catch(error){
            throw error
        } 
    }
    

    async function productSave(){
        try{
           const response =  await api.post('/products/',  product)
           const product_id = response.data.id
           const images = product.image

           let formData = new FormData();
            formData.append('product_id', product_id);

           images.map(( images ) => {
            formData.append('images', images as any);
            })
           
            try{
                const responseImage =  await api.post('/products/images/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(responseImage, 'takinnn$')
            }catch(error){
                console.log(error, 'error')
            }
            }catch(error){
                throw error
            } finally{

            }
    }

    async function productGet(){
        try{
            setIsLoadingProductStorageData(true)
            const response = await storageProductGet()          
            return response

        }catch(error){
            throw error

        } finally{
            setIsLoadingProductStorageData(false)
        }
    }

    async function productGetStorageData(){
        try{
            setIsLoadingProductStorageData(false)
            
            const response = await api.get('users/products/')
            await storageProductSaveDatabase(response.data)
            return response.data

        }catch(error){
            console.log('passou aqui no catch')
            throw error

        }finally{
            setIsLoadingProductStorageData(false)
        }
    }
  


 

    
    return (
        // compartilhando o user através da propriedade user, e por isso poderia passar {{ user }}
        <ProductContext.Provider value={{ 
            isLoadingProductStorageData,
            product, 
            setProduct, 
            productSave, 
            productGet,
            productSaveStorage, 
            productGetStorageData,
            image, 
            setImage
             }}> 
            {children}
        </ProductContext.Provider>
    )

}