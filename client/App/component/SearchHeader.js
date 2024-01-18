import React, { useContext, useRef, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
} from "react-native";
import { STYLES } from "../../GlobalCss";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext } from "../Context/ProfileContext";
import { Modalize } from "react-native-modalize";
import Searched from "./searched";
const SearchHeader = ({ value, onChangeText }) => {
  const { checkOurServices } = useContext(ProfileContext);
  const [searched,setSearched]=useState()
  const navigation = useNavigation();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (checkOurServices) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [checkOurServices]);

  useEffect(()=>{
    if (searched){
      modalizeRef.current?.open();

    } else {
      modalizeRef.current?.close();

    }
  },[searched])
  const startAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopAnimation = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue).stop();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });
  const handleMenuPress = () => {
    navigation.openDrawer();
  };
  const modalizeRef = useRef(true);

  const onOpen = () => {
    modalizeRef.current?.open('top');
  };
  return (
    <View>

      <View style={{   position:"absolute",top:65,width:400,height:'30%'}}>
  
    
      <Modalize 
   
  modalHeight={580}
 handleStyle={{backgroundColor:STYLES.COLORS.Priamary}}
  modalStyle={{position:'absolute',width:370,right:44}}  ref={modalizeRef}>
        <Searched searched={searched}/>
        </Modalize>

      </View>
    <View style={styles.searchContainer}>

      <TouchableOpacity style={styles.iconContainer} onPress={handleMenuPress}>
        {checkOurServices ? (
          <Animated.View style={{ transform: [{ scale: spin }] }}>
            <Ionicons name="menu" size={25} color={STYLES.COLORS.Priamary} />
          </Animated.View>
        ) : (
          <Ionicons name="menu" size={25} color={STYLES.COLORS.Priamary} />
          )}
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={STYLES.COLORS.Priamary}
          style={styles.searchIcon}
          />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Company Student..."
          value={value}
          onChangeText={(text)=>setSearched(text)}
          />
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("AboutScreen")}
        >
        <Ionicons name="qr-code" size={25} color={STYLES.COLORS.Priamary} />
      </TouchableOpacity>
    </View>
</View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 40,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#000",
  },
  searchIcon: {
    marginLeft: 10,
  },
  iconContainer: {
    marginHorizontal: 10,
  },
});

export default SearchHeader