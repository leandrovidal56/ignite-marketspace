import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import { NativeBaseProvider } from 'native-base';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';

export default function App() {
  return (
    <NativeBaseProvider>
      {/* <Home/> */}
      {/* <SignIn/> */}
      <SignUp/>
    </NativeBaseProvider>
  );
}


