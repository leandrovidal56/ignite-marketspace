import { NativeBaseProvider } from 'native-base';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <NativeBaseProvider>
        <Routes/>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}


