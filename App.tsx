import { Avatar, NativeBaseProvider } from 'native-base';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <NativeBaseProvider>
        <StatusBar style="auto"/>
        <AuthContextProvider>
          <Routes/>
        </AuthContextProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}


