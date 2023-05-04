
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NameSetting from './pages/welcome/NameSetting';
import Greeting from './pages/process/Greeting';
import Home from './pages/Home';
import KeywordSetting from './pages/welcome/KeywordSetting';
import FloatingMode from './pages/FloatingMode';

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    console.log('start useEffect', navigationRef.isReady());
    if (!navigationRef.isReady()) return;
    console.log('navigationRef.isReady()');
    (async () => {
      const userName = await AsyncStorage.getItem('name');
      if(userName) {
        navigationRef.navigate('Greeting');
      } else {
        navigationRef.navigate('NameSetting');
      }
    })()
  } , [navigationRef])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NameSetting" component={NameSetting} />
        <Stack.Screen name="KeywordSetting" component={KeywordSetting} />
        <Stack.Screen name="FloatingMode" component={FloatingMode} />
        <Stack.Screen name="Greeting" component={Greeting} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
