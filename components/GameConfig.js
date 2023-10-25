import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native'
import React, { useContext, useEffect, useState,  } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icon from "react-native-feather";
import { GameConfigContext, GameConfigDispatchContext } from '../context';
import { useNavigation, useRoute } from '@react-navigation/native'



export default function GameConfig() {
  const gameConfig = useContext(GameConfigContext)
  const dispatch = useContext(GameConfigDispatchContext)
  const [configId, setConfigId] = useState(null)
  const [shuffleConfig, setShuffleConfig] = useState({
    autoShuffle : false,
    simotaneousCardDisplay : false
  })
  const [gameLevel, setGameLevel] = useState('intermediate');

  const navigation = useNavigation()

  


  const toggleSwitch = (level) =>{
    if(gameLevel == level)
    {
      setGameLevel(null)
    }
    else{
      setGameLevel(level)
    }
  }
  const handleAutoShuffle = () => {
    setShuffleConfig({
      ...shuffleConfig,
      autoShuffle: !shuffleConfig.autoShuffle,
      simotaneousCardDisplay: !shuffleConfig.autoShuffle ? true : shuffleConfig.simotaneousCardDisplay
    })
    
  }
  const handleCardDisplay = ()=>{
    setShuffleConfig({
      ...shuffleConfig,
      simotaneousCardDisplay: !shuffleConfig.simotaneousCardDisplay
    })
  }

  

  const handleSubmitConfig = ()=>{
    Alert.alert('settings applied!')
    let countTime = 10;
    switch(gameLevel){
      case 'easy' : break;
      case 'intermediate' : countTime = 6; break;
      case 'hard' : countTime = 3; break;
    }
    const config = {
      countTime,
      autoShuffle: shuffleConfig.autoShuffle,
      simotaneousCardDisplay: shuffleConfig.simotaneousCardDisplay
    }
    dispatch({
      type:'setGameConfig',
      ...config
    })
    // navigation.navigate('CardRows')
  }

  return (
    <SafeAreaView className = "p-5 flex-col  h-full">
        <TouchableOpacity onPress={()=>{
          navigation.openDrawer()
        }}>
           <Icon.ArrowLeft strokeWidth={3} width={36} height={36}  stroke={gameConfig.initBackGroundColor}/>
        </TouchableOpacity>
        <View className="shadow-md bg-white px-3 py-5 rounded-2xl mt-5">
           <TouchableOpacity onPress={()=>{
              if(!configId || configId !== 1)
              {
                setConfigId(1)
              }
              else{
                setConfigId(null)
              }
           }} className='flex-row justify-between items-center'>
              <Text className="text-lg text-gray-500">
                  Speed Level
              </Text>
              {
                configId === 1 ? (
                  <Icon.Edit2 strokeWidth={2} width={28} height={28}  stroke={gameConfig.initBackGroundColor} />
                ) : (
                  <Icon.Settings strokeWidth={2} width={28} height={28}  stroke={gameConfig.initBackGroundColor} />
                )
              }
           </TouchableOpacity>
           {
            configId === 1 && (
              <View>
              <View className='flex-row justify-between items-center mt-4'>
                <Text className="text-md text-gray-500">Easy</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#ccc'}}
                  thumbColor={gameLevel === "easy" ? gameConfig.initBackGroundColor : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={()=>{toggleSwitch('easy')}}
                  value={gameLevel === "easy" }
                />
              </View>
              <View className='flex-row justify-between items-center mt-4'>
                <Text className="text-md text-gray-500">Intermediate</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#ccc'}}
                  thumbColor={gameLevel === "intermediate" ? gameConfig.initBackGroundColor : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={()=>{toggleSwitch('intermediate')}}
                  value={gameLevel === "intermediate" }
                />
              </View>
              <View className='flex-row justify-between items-center mt-4'>
                <Text className="text-md text-gray-500">Hard</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#ccc'}}
                  thumbColor={gameLevel === "hard" ? gameConfig.initBackGroundColor : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={()=>{toggleSwitch('hard')}}
                  value={gameLevel === "hard" }
                />
              </View>
           </View>
            )
           }
           
        </View>
        <View className="shadow-md  bg-white px-3 py-5 rounded-2xl mt-5">
           <TouchableOpacity onPress={()=>{
              if(!configId || configId !== 2)
              {
                setConfigId(2)
              }
              else{
                setConfigId(null)
              }
           }} className='flex-row justify-between items-center'>
              <Text className="text-lg text-gray-500">
                  Shuffling Configuration
              </Text>
              {
                configId === 2 ? (
                  <Icon.Edit2 strokeWidth={2} width={28} height={28}  stroke={gameConfig.initBackGroundColor} />
                ) : (
                  <Icon.Settings strokeWidth={2} width={28} height={28}  stroke={gameConfig.initBackGroundColor} />
                )
              }
           </TouchableOpacity>
           {
            configId === 2 && (
              <View>
              <View className='flex-row justify-between items-center mt-4'>
                <Text className="text-md text-gray-500">Auto Shuffle</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#ccc'}}
                  thumbColor={shuffleConfig.autoShuffle ? gameConfig.initBackGroundColor : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleAutoShuffle}
                  value={shuffleConfig.autoShuffle}
                />
              </View>
              <View className='flex-row justify-between items-center mt-4'>
                <Text className="text-md text-gray-500">Simotaneous Card Display</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#ccc'}}
                  thumbColor={shuffleConfig.simotaneousCardDisplay ? gameConfig.initBackGroundColor : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleCardDisplay}
                  disabled={shuffleConfig.autoShuffle}
                  value={shuffleConfig.simotaneousCardDisplay}
                />
              </View>
              
           </View>
            )
           }
           
        </View>
        
        <TouchableOpacity 
        
        onPress={handleSubmitConfig}
        style={{backgroundColor:gameConfig.initBackGroundColor}} className="mt-auto self-center w-full rounded-lg">
           <View className="self-center py-4">
            <Text className="text-lg font-bold">
                Done 
            </Text>
           </View>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

