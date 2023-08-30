import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { AuthContextProvider } from './src/contexts/AuthContext'
import { ProductContextProvider } from './src/contexts/ProductContext'
import { Routes } from './src/routes'

export default function App () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <StatusBar style="auto"/>
        <AuthContextProvider>
          <ProductContextProvider>
            <Routes/>
          </ProductContextProvider>
        </AuthContextProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  )
}
