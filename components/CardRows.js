import { View, Text, ScrollView,  TouchableOpacity, StyleSheet, Animated, Dimensions, Image} from 'react-native'
import React, {useEffect, useState, useRef, useContext} from 'react'
import Card from './Card'
import TotalCards from '../constants'
import AnswerClock from './AnswerClock'
import { StatusBar } from 'expo-status-bar'
import { GameConfigContext, GameConfigDispatchContext } from '../context'



export default function CardRows() {

  const [ifShuffling, setIfShuffling] = useState(false)
  const [shuffleKey, setShuffleKey] = useState(Date.now())
  const dispatch = useContext(GameConfigDispatchContext)
  const gameConfig = useContext(GameConfigContext)
  const allCards = gameConfig.allCards
  const isTablet = Dimensions.get('window').width >= 600; 
  
  
  
 
  const handleShuffle = ()=>{
    setIfShuffling(true)
    dispatch({
      type:'shuffleCards'
    })
    setShuffleKey(Date.now())
    setTimeout(()=>{
      setIfShuffling(false)
    },2500)
  }


  return (
    <View className="justify-center" style={{backgroundColor:gameConfig.gameBackGroundColor, display:'flex', height: Dimensions.get('window').height  , width:Dimensions.get('window').width}} >
      <StatusBar hidden={gameConfig.statusBarHidden}/>
       {
        (ifShuffling && !gameConfig.simotaneousCardDisplay)  && (
          <View  className="absolute z-50 self-center">
            <Image style={{width:350}} resizeMode='contain' source={require('../assets/shuffleAni.gif')} />
          </View>
        )
       }
        <View style={{ position: 'relative', height: Dimensions.get('window').height, paddingTop:isTablet ? '40%': '15%'}} className="flex-1 items-center ">
          <Card key={shuffleKey + '0'} imagePath = {allCards[0]} delayTime = {gameConfig.simotaneousCardDisplay ? 0 : 0}/>
          <Card key={shuffleKey + '1'} imagePath = {allCards[1]} delayTime = {gameConfig.simotaneousCardDisplay ? 0 : 600}/>
          <Card key={shuffleKey + '2'} imagePath = {allCards[2]} delayTime = {gameConfig.simotaneousCardDisplay ? 0 : 1200}/>
          <Card key={shuffleKey + '3'} imagePath = {allCards[3]} delayTime = {gameConfig.simotaneousCardDisplay ? 0 : 1800}/>
         {
          (!gameConfig.statusBarHidden && !gameConfig.autoShuffle) && (
            <TouchableOpacity style={{backgroundColor: gameConfig.gameThemeColor , position : "absolute", bottom:isTablet ? '5%': '5%'}} className="z-10 px-10 py-2 rounded-md " onPress={()=>{
              handleShuffle()
            }}>
              <Text
              style={{
                color:gameConfig.initBackGroundColor
              }}
                className="text-lg  font-bold"
                >Shuffle</Text>
          </TouchableOpacity>
          )
         }
        </View>
            <AnswerClock/>
    </View>
  )
}

