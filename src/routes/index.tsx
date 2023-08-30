import { NavigationContainer } from '@react-navigation/native'

import { Loading } from '../components/loading'
import { useAuth } from '../hooks/useAuth'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes () {
  const { user, isLoadingUserStorageData } = useAuth()

  if (isLoadingUserStorageData) {
    return <Loading/>
  }

  return (
        <NavigationContainer>
            {user.id ? <AppRoutes/> : <AuthRoutes/> }
        </NavigationContainer>
  )
}
