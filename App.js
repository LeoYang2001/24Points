import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';
import Navigation from './Navigation';
import { GameConfigProvider } from './context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from './components/Welcome';
import { useEffect } from 'react';



export default function App() {

  const Stack = createNativeStackNavigator();

 

  return (
    <GameConfigProvider>
       <NavigationContainer>
          <Stack.Navigator initialRouteName='Welcome'
            screenOptions={{headerShown:false}}
          >
            <Stack.Screen name="Welcome" component={Welcome}/>
            <Stack.Screen name="Navigation" component={Navigation}/>
          </Stack.Navigator>
       </NavigationContainer>
    </GameConfigProvider>
    );
}

