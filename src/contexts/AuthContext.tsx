import { ReactNode, createContext, useEffect, useState } from "react";
// import { UserDTO, UserTokenDTO } from "../dtos/userDTO";
import {  UserTokenDTO } from "../dtos/userDTO";
import { api } from "../services/api";
import { storageUserGet, storageUserRemove, storageUserSave, storageUserTokenSave } from "../storage/storageUser";
import { ProductDTO } from "../dtos/productDTO";

export type AuthContextDataProps = {
    user: UserTokenDTO;
    setUser: ( user: UserTokenDTO) => void;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
    product: ProductDTO;
    setProduct: (product: ProductDTO) => void;
    productSave: (product: ProductDTO) => void;
}

type AuthContextProviderProps = { 
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children } : AuthContextProviderProps){
    const [ user, setUser ] = useState<UserTokenDTO>({ } as UserTokenDTO)
    const [ product, setProduct ] = useState<ProductDTO>({ } as ProductDTO)
    const [ isLoadingUserStorageData, setIsLoadingUserStorageData ] = useState(true)

    async function signIn(email: string, password: string){
        try{
            const { data } = await api.post('/sessions', {email, password})
            console.log(data, 'take data from ')
// to do investigate change userDto
            // if(data){
            //     storageUserSave(data.user)
    
            //     setUser(data)
            // }
            if(data){
                console.log('set user')
                storageUserSave(data)
                setUser(data.user)
                // setUser(data)
            }
        }catch(error){ 
            throw error
        }
    }

    async function signOut(){
        try{
            setIsLoadingUserStorageData(true)
            setUser({} as UserTokenDTO)
            await storageUserRemove()
        }catch(error){
            throw error
        } finally{
            setIsLoadingUserStorageData(false)
        }
    }

    async function loadUserData(){
        try{

            const userLogged = await storageUserGet();
            
            if(userLogged){
                setUser(userLogged)
                setIsLoadingUserStorageData(true)
            }
        }catch(error){
            throw error
        } finally{
            setIsLoadingUserStorageData(false)
        }
    }
    
    async function productSave(product: ProductDTO){
        try{
            console.log(product, 'take before send')
            const response = await api.post('/products/',  product, 
            { headers: { 'Authorization' : `Bearer ${user.token}` },})

        }catch(error){
            throw error
        } finally{
            console.log('passou aqui')
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
            product, setProduct, productSave
             }}> 
            {children}
        </AuthContext.Provider>
    )

}