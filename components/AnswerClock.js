import React, {useRef,useEffect, useState} from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  Pressable,
  Dimensions
} from 'react-native';
import { useContext } from 'react';
import {GameConfigContext, GameConfigDispatchContext} from '../context'

const isTablet = Dimensions.get('window').width >= 600; 

export default function AnswerClock() {
    const gameConfig = useContext(GameConfigContext)
    const [countTime, setCountTime] = useState(gameConfig.countTime)
    const dispatch = useContext(GameConfigDispatchContext)
    const [count, setCount] = useState(countTime)
    const [intervalId, setIntervalId] = useState(null);
    const [side, setSide] = useState(null)

    useEffect(() => {
      setCountTime(gameConfig.countTime)
      setCount(countTime)
    },[ JSON.stringify(gameConfig)])

    const gameStart = ()=> {
        dispatch({
            type:'gameStart'
        })
    }
    const gameEnd = ()=> {
        dispatch({
            type:'gameEnd'
        })
        
        if(gameConfig.autoShuffle){
            dispatch({
                type:'shuffleCards'
            })
        }
    }

    const startCounting_left = () => {
        gameStart()
        fadeIn_left()
        setTimeout(()=>{
            fadeOut_left()
        },countTime*100)
        // Clear the previous interval if it exists
        if (intervalId) {
        clearInterval(intervalId);
        }
        const newIntervalId = setInterval(() => {
            setCount((prevCount) => {
              if (prevCount <= 1) {
                clearInterval(newIntervalId); // Clear the interval when count reaches 1
                setCount(countTime);
                setSide(null); // Clean Side
                setTimeout(()=>{
                    gameEnd()
                },500)
                return countTime; // Ensure count stays at 1 or higher
              } else {
                return prevCount - 1;
              }
            });
          }, 1000);

    setIntervalId(newIntervalId); // Store the new intervalId in the state
  };

  const startCounting_right = () => {
    gameStart()
    fadeIn_right()
    setTimeout(()=>{
        fadeOut_right()
    },countTime*100)
    // Clear the previous interval if it exists
    if (intervalId) {
    clearInterval(intervalId);
    }
    const newIntervalId = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(newIntervalId); // Clear the interval when count reaches 1
            setCount(countTime);
            setSide(null); // Clean Side
            setTimeout(()=>{
                gameEnd()
            },500)
            return countTime; // Ensure count stays at 1 or higher
          } else {
            return prevCount - 1;
          }
        });
      }, 1000);

setIntervalId(newIntervalId); // Store the new intervalId in the state
};
    useEffect(() => {
        //  fadeOut()
        //  const intervalId = startCounting()
        return () => {
        //   clearInterval(intervalId); // Clean up the interval on component unmount
        };
      }, []);
    // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim_left = useRef(new Animated.Value(0)).current;
  const fadeAnim_right = useRef(new Animated.Value(0)).current;

  const fadeOut_left = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim_left, {
      toValue: 0,
      duration: countTime*900,
      useNativeDriver: true,
    }).start();
  };
  const fadeIn_left = () => {
    // Will change fadeAnim value to 1 in 3 seconds
    Animated.timing(fadeAnim_left, {
      toValue: 1, // Set to 1 to make it fully visible
      duration: 100, // The duration in milliseconds
      useNativeDriver: true,
    }).start();
  };

  const fadeOut_right = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim_right, {
      toValue: 0,
      duration: countTime*900,
      useNativeDriver: true,
    }).start();
  };
  const fadeIn_right = () => {
    // Will change fadeAnim value to 1 in 3 seconds
    Animated.timing(fadeAnim_right, {
      toValue: 1, // Set to 1 to make it fully visible
      duration: 100, // The duration in milliseconds
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <>
        <View style={{top:0, height:Dimensions.get('screen').height, width:120}} className="absolute left-0 items-center justify-center">
            <Pressable onPress={()=>
            {
                if(!side)
                {
                    setSide('left')
                    startCounting_left()
                }
            }} className="flex h-full justify-center items-center">
            <Animated.View
                style={[
                styles.fadingContainer,
                {
                    // Bind opacity to animated value
                    opacity: fadeAnim_left,
                },
                ]}>
                        <Text style={{fontSize: isTablet ? 70 : 48}} className="rotate-90  font-bold self-center">{count}</Text>
            </Animated.View>
            </Pressable>
        </View>
        <View style={{top:0, height:Dimensions.get('screen').height, width:120}} className="absolute right-0 items-center justify-center rotate-180">
            <Pressable onPress={()=>
            {
                if(!side)
                {
                    setSide('right')
                    startCounting_right()
                }
            }} className=" h-full justify-center">
            <Animated.View
                style={[
                styles.fadingContainer,
                {
                    // Bind opacity to animated value
                    opacity: fadeAnim_right,
                },
                ]}>
            <Text style={{fontSize: isTablet ? 70 : 48}} className="rotate-90  font-bold self-center">{count}</Text>
            </Animated.View>
            </Pressable>
        </View>
    </>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    fadingContainer: {
        height:'100%',
        width:isTablet ? 440 : 120,
        borderTopRightRadius:"100%",
        borderBottomRightRadius:"100%",
      backgroundColor: 'rgba(255,255,255,.8)',
      alignItems:'center',
      justifyContent:'center'
    },
    fadingText: {
      fontSize: isTablet ? 40: 28,
    },
    buttonRow: {
      flexBasis: 100,
      justifyContent: 'space-evenly',
      marginVertical: 16,
    },
  });