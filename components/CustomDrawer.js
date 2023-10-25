import { View, Text, Image} from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import {GameConfigContext, GameConfigDispatchContext} from '../context'


export default function CustomDrawer(props) {
    const gameConfig = useContext(GameConfigContext)

  return (
    <View style={{flex:1}}>
        <View 
        className="w-full relative rounded-b-full"
        style={{
          backgroundColor:gameConfig.initBackGroundColor,
          height:'35%'
        }}>
          <View className='flex-1 t-2' >
            <Image resizeMode='cover'  style={{ width: '100%', height: '70%', top:'20%' }}  source={require('../assets/logo.png')} />
          </View>
          
        </View>
        <DrawerContentScrollView {...props}  
        contentContainerStyle={{
          overflow:'visible'
        }}>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    </View>
  )
}