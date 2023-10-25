import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'


export default function Welcome() {
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(()=>{
            navigation.replace('Navigation')
        },2600)
    }, [])

  return (
    <View style={{backgroundColor:"#FFD87B"}} className="flex-1 justify-center items-center">
        <Image source={require('../assets/Welcome.gif')} className="h-80 w-80" />
    </View>
  )
}