import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/userDTO";
import { api } from "../services/api";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/storageUser";

export type AuthContextDataProps = {
    user: UserDTO;
    setUser: ( user: UserDTO) => void;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = { 
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children } : AuthContextProviderProps){
    const [ user, setUser ] = useState<UserDTO>({ } as UserDTO)
    const [ isLoadingUserStorageData, setIsLoadingUserStorageData ] = useState(true)

    async function signIn(email: string, password: string){
        try{
            const { data } = await api.post('/sessions', {email, password})

            if(data.user){
                storageUserSave(data.user)
                setUser(data.user)
            }
        }catch(error){ 
            throw error
        }
    }

    async function signOut(){
        try{
            setIsLoadingUserStorageData(true)
            setUser({} as UserDTO)
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

    useEffect(() => {
        loadUserData()
    },[])

    
    return (
        // compartilhando o user através da propriedade user, e por isso poderia passar {{ user }}
        <AuthContext.Provider value={{ user: user, setUser, signIn, signOut, isLoadingUserStorageData }}> 
            {children}
        </AuthContext.Provider>
    )

}