import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/userDTO";
import { api } from "../services/api";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/storageUser";
import { ProductDTO } from "../dtos/productDTO";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "../storage/storageAuthToken";
import { storageProductGet, storageProductSave } from "../storage/storageProduct";

export type AuthContextDataProps = {
    user: UserDTO;
    setUser: ( user: UserDTO) => void;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
    product: ProductDTO;
    setProduct: (product: ProductDTO) => void;
    productSave: (product: ProductDTO) => void;
    productGet: () => Promise<ProductDTO>;
    
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
    
    async function productSave(product: ProductDTO){
        try{
            await storageProductSave(product)
            setProduct(product)
            const response = await api.post('/products/',  product)
            
        }catch(error){
            throw error
        } finally{

        }
    }

    async function productGet(){
        try{
            setIsLoadingUserStorageData(true)
            const response = await storageProductGet()
            console.log(response, '$$$$$')
            return response

        }catch(error){
            throw error

        } finally{
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
            product, setProduct, productSave, productGet
             }}> 
            {children}
        </AuthContext.Provider>
    )

}