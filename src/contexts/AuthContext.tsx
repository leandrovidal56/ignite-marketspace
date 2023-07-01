import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/userDTO";
import { api } from "../services/api";
import { storageUserGet, storageUserSave } from "../storage/storageUser";

export type AuthContextDataProps = {
    user: UserDTO;
    setUser: ( user: UserDTO) => void;
    signIn: (email: string, password: string) => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = { 
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children } : AuthContextProviderProps){
    const [ user, setUser ] = useState<UserDTO>({ } as UserDTO)
    const [ isLoadingUserStorageData, setIsLoadingUserStorage ] = useState(true)

    async function signIn(email: string, password: string){
        try{
            const { data } = await api.post('/sessions', {email, password})
            console.log(data, 'take all data')
            console.log(data.user, 'take data.user')
            if(data.user){
                storageUserSave(data.user)
                setUser(data.user)
            }
        }catch(error){ 
            throw error
        }
    }

    async function loadUserData(){
        try{

            const userLogged = await storageUserGet();
            
            if(userLogged){
                setUser(userLogged)
                setIsLoadingUserStorage(true)
            }
        }catch(error){
            throw error
        } finally{
            setIsLoadingUserStorage(false)
        }
    }

    useEffect(() => {
        loadUserData()
    },[])

    
    return (
        // compartilhando o user através da propriedade user, e por isso poderia passar {{ user }}
        <AuthContext.Provider value={{ user: user, setUser, signIn, isLoadingUserStorageData }}> 
            {children}
        </AuthContext.Provider>
    )

}