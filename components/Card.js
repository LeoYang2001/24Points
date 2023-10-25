import React, {useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
const isTablet = Dimensions.get('window').width >= 600; 

const Component = (props) => {


  useEffect(() => {
    setTimeout(()=>{
      handleFlip()
    },props.delayTime)
  }, [])
  
  const handleFlip = () => (spin.value = spin.value ? 0 : 1)

  const spin = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  });

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  });

  return (
    <TouchableOpacity 
    // onPress={handleFlip}
     className = "self-center w-full h-20 mt-24 " style={isTablet ? {marginTop:'5%', marginBottom:'14%'} : {}}>
      <View className="rotate-90">
        <Animated.View   style={[Styles.front, rStyle]}>
          <Image style={Styles.img} 
            source={require('../assets/pokerCards/2B.png')}/>
        </Animated.View>
        <Animated.View  style={[Styles.back, bStyle]}>
          {/* cardValue */}
        <Image style={Styles.img} 
         source={props.imagePath} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default Component;

const sizeScale = isTablet ? 2 : 1.4;

const Styles = StyleSheet.create({
  img:{
    flex: 1,
    resizeMode: 'contain'
    },
  front: {
    height: 158 * sizeScale,
    width: 101 * sizeScale,
    backgroundColor: "#D8D9CF",
    borderRadius: 16,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  back: {
    height: 158 * sizeScale,
    width: 101 * sizeScale,
    backgroundColor: "#FF8787",
    borderRadius: 16,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
