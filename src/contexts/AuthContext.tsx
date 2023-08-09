import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/userDTO";
import { api } from "../services/api";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/storageUser";
import { ProductDTO } from "../dtos/productDTO";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "../storage/storageAuthToken";
import { storageProductGet, storageProductSave, storageProductSaveDatabase } from "../storage/storageProduct";

export type AuthContextDataProps = {
    user: UserDTO;
    setUser: ( user: UserDTO) => void;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
    product: ProductDTO;
    setProduct: (product: ProductDTO) => void;
    productSave: () => void;
    productSaveStorage: (product: ProductDTO) => void;
    productGet: () => Promise<ProductDTO>;
    productGetStorageData: () => Promise<any>;
    
}

type AuthContextProviderProps = { 
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children } : AuthContextProviderProps){
    const [ user, setUser ] = useState<UserDTO>({ } as UserDTO)
    const [ product, setProduct ] = useState<ProductDTO>({ } as ProductDTO)
    const [ isLoadingUserStorageData, setIsLoadingUserStorageData ] = useState(true)

    async function userAndTokenUpdate(userData: UserDTO, token: string) {
        try{
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(userData)
        }catch(error){
            throw error
        }
    }

    async function storageUserAndTokenSave(userData: UserDTO, token: string){
        try{

            setIsLoadingUserStorageData(true)
            await storageUserSave(userData)
            await storageAuthTokenSave(token)

        }catch(error){
            throw error
        } finally{
            setIsLoadingUserStorageData(false)
        }
        
    }

    async function signIn(email: string, password: string){
        try{
            setIsLoadingUserStorageData(true)
            const { data } = await api.post('/sessions', {email, password})

            if(data.user && data.token){
                await storageUserAndTokenSave(data.user, data.token)
                userAndTokenUpdate(data.user, data.token)
            }
        }catch(error){ 
            throw error
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }

    async function signOut(){
        try{

            setIsLoadingUserStorageData(true)
            setUser({} as UserDTO)
            await storageUserRemove()
            await storageAuthTokenRemove()

        }catch(error){
            throw error
        } finally{
            setIsLoadingUserStorageData(false)
        }
    }

    async function loadUserData(){
        try{
            setIsLoadingUserStorageData(true)
            const userLogged = await storageUserGet();
            const token = await storageAuthTokenGet()
            
            if(token && userLogged){
                userAndTokenUpdate(userLogged, token)
            }
            
        }catch(error){
            throw error
        } finally{
            setIsLoadingUserStorageData(false)
        }
    }
    
    async function productSaveStorage(product: ProductDTO){
        try{
            await storageProductSave(product)
            setProduct(product)
        }catch(error){
            throw error
        } 
    }

    async function saveImageProduct(images: any, product_id: string){
        let formData = new FormData();
        // console.log(product_id)
        formData.append('product_id', product_id);

        for (const item of images) {
            const img = {
                    fieldname: 'images',
                    originalname: new Date().getTime(),
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    destination: '/Users/leandrovidal/ignite/react-native/challenges/marketspace/ignite-rn-2022-challenge-marketspace-api/tmp',
                    filename: `${new Date().getTime()}.jpg`,
                    path: item
            }
            formData.append('images', img);
        }
        
           console.log(formData, 'form data ------')

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
    }

    
    

    async function productSave(){
        try{
           console.log(product, 'take alll the product')
           const response =  await api.post('/products/',  product)
           const product_id = response.data.id
           
           
           const images = product.image

           await saveImageProduct(images, product_id)
           

        }catch(error){
            throw error
        } finally{

        }
    }

    async function productGet(){
        try{
            setIsLoadingUserStorageData(true)
            const response = await storageProductGet()          
            return response

        }catch(error){
            throw error

        } finally{
            setIsLoadingUserStorageData(false)
        }
    }

    async function productGetStorageData(){
        try{
            setIsLoadingUserStorageData(false)
            
            const response = await api.get('users/products/')
            await storageProductSaveDatabase(response.data)
            return response.data

        }catch(error){
            console.log('passou aqui no catch')
            throw error

        }finally{
            setIsLoadingUserStorageData(false)
        }
    }
  


    useEffect(() => {
        loadUserData()
    },[])

    
    return (
        // compartilhando o user através da propriedade user, e por isso poderia passar {{ user }}
        <AuthContext.Provider value={{ 
            user: user, 
            setUser, 
            signIn, 
            signOut, 
            isLoadingUserStorageData,
            product, setProduct, productSave, productGet,
            productSaveStorage, productGetStorageData
             }}> 
            {children}
        </AuthContext.Provider>
    )

}