import { type ReactNode, createContext, useEffect, useState } from 'react'

import { type UserDTO } from '../dtos/userDTO'
import { api } from '../services/api'
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '../storage/storageAuthToken'
import { storageUserGet, storageUserRemove, storageUserSave } from '../storage/storageUser'

export interface AuthContextDataProps {
  user: UserDTO
  setUser: (user: UserDTO) => void
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider ({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({ } as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function userAndTokenUpdate (userData: UserDTO, token: string) {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      setUser(userData)
    } catch (error) {
      throw error
    }
  }

  async function storageUserAndTokenSave (userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true)
      await storageUserSave(userData)
      await storageAuthTokenSave(token)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn (email: string, password: string) {
    try {
      setIsLoadingUserStorageData(true)
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut () {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData () {
    try {
      setIsLoadingUserStorageData(true)
      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
        // compartilhando o user através da propriedade user, e por isso poderia passar {{ user }}
        <AuthContext.Provider value={{
          user,
          setUser,
          signIn,
          signOut,
          isLoadingUserStorageData
        }}>
            {children}
        </AuthContext.Provider>
  )
}
