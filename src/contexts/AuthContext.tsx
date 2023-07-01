import { ReactNode, createContext, useState } from "react";
import { UserDTO } from "../dtos/userDTO";
import { api } from "../services/api";

export type AuthContextDataProps = {
    user: UserDTO;
    setUser: ( user: UserDTO) => void;
    signIn: (email: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = { 
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children } : AuthContextProviderProps){
    const [ user, setUser ] = useState<UserDTO>({ } as UserDTO)

    async function signIn(email: string, password: string){
        try{
            const { data } = await api.post('/sessions', {email, password})
            console.log(data, 'take all data')
            console.log(data.user, 'take data.user')
            if(data.user){
                // setUser(data)
                setUser(data.user)
            }
        }catch(error){ 
            throw error
        }
    }

    
    return (
        // compartilhando o user através da propriedade user, e por isso poderia passar {{ user }}
        <AuthContext.Provider value={{ user: user, setUser, signIn }}> 
            {children}
        </AuthContext.Provider>
    )

}