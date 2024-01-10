import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  Center,
  Divider,
  VStack,
} from "@gluestack-ui/themed";
import Dots from "react-native-vector-icons/Entypo";
import Heart from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from "react-native-gesture-handler";

const Comment = ({post , user , data}) => {
  console.log(data)
  return (
    <View style={styles.container}>
      <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style ={{flexDirection : 'row', alignItems:"center" ,gap:10}}>
          <Avatar size="lg">
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: user.pdp,
              }}
            />
          </Avatar>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 21,
              // marginLeft: 10,
              // padding: 15,
            }}
          >
            {" "}
            {user.name}
          </Text>
        </View>

        <TouchableOpacity>
          <Dots
            name="dots-three-vertical"
            size={20}
            style={{ padding: 20, color: "#674188" }}
          />
        </TouchableOpacity>
      </Box>
      <VStack space="md" style={{padding : 10}}>
        <Text style={{fontSize : 18 , lineHeight : 30}}>{data.content}</Text>
        <Image
        style={{width : '%full' , height : 200 , borderRadius : 20}}
        source={{uri : data.images[0]}}
        resizeMode="stretch"
        />
      </VStack>
      <Box style={{flexDirection : 'row' , padding : 10 , gap : 10 , alignItems : 'center'}}>
      <TouchableOpacity>
                <Dots name='arrow-up' color='#674188' size={30}/>
                </TouchableOpacity>
            <Text>360</Text>
                <TouchableOpacity>
                <Dots name='arrow-down' color='#674188' size={30}/>
                </TouchableOpacity>
            <Text style={{marginLeft : 50}}>1 day ago</Text>
      </Box>
      <Divider/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 10,
  },
});

export default Comment;
