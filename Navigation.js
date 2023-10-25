import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CardRows from './components/CardRows';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GameConfig from './components/GameConfig';
import CustomDrawer from './components/CustomDrawer';
import { GameConfigContext } from './context';
import { useNavigation, useRoute} from '@react-navigation/native'
import * as Icon from "react-native-feather";



export default function Navigation() {

    const Drawer = createDrawerNavigator();
    const gameConfig = useContext(GameConfigContext)
    const route = useRoute()
    const navigation = useNavigation()

    // useEffect(() => {
    //   const unsubscribe = navigation.addListener('drawerItemPress', (e) => {
    //     // Prevent default behavior
    //     // e.preventDefault();
    //     console.log(route.name);
    //     // Do something manually
    //     // ...
    //   });
    
    //   // return unsubscribe;
    // }, [navigation]);
  
  return (
        <Drawer.Navigator 
          drawerContent={props => <CustomDrawer {...props} />}
					initialRouteName="CardRows"
					screenOptions={{headerShown:false,
            drawerActiveBackgroundColor:gameConfig.initBackGroundColor,
            drawerActiveTintColor:'#000',
            drawerLabelStyle:{
              fontSize:15,
            }
          }}
          >
        <Drawer.Screen options={{
          drawerIcon: ()=> (<Icon.Box stroke={'#000'} strokeWidth={2}/>)
        }} name="Game" component={CardRows} />
        <Drawer.Screen options={{
          drawerIcon: ()=> (<Icon.Tool stroke={'#000'} strokeWidth={2}/>)
        }}  name="Configuration" component={GameConfig} />
      </Drawer.Navigator>
  )
}