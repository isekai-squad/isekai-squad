import React from "react";
import { View, StyleSheet, Text } from "react-native";
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
} from "@gluestack-ui/themed";
import Dots from "react-native-vector-icons/Entypo";
import Heart from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from "react-native-gesture-handler";

const Comment = () => {
  return (
    <View style={styles.container}>
      <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style ={{flexDirection : 'row', alignItems:"center" ,gap:10}}>
          <Avatar size="lg">
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://p16-capcut-sign-va.ibyteimg.com/tos-maliva-v-be9c48-us/o8dABIU6JPBd2AJiwAAb6EZjn9NKPQ9iS3iUv~tplv-nhvfeczskr-1:250:0.webp?lk3s=44acef4b&x-expires=1735219775&x-signature=oJRko2PZ4YuOxVZy15vYlkjENcQ%3D",
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
            Bababoeey
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
      <Box style={{padding : 10}}>
        <Text style={{fontSize : 18 , lineHeight : 30}}>Lorem ipsum dolor sit amet. Eum blanditiis veritatis est nihil eligendi id dolores totam hic internos voluptas eos nemo quia est quia laudantium. Qui unde quos in veritatis neque sit sapiente deleniti.</Text>
      </Box>
      <Box style={{flexDirection : 'row' , padding : 10 , gap : 10 , alignItems : 'center'}}>
        <TouchableOpacity>
            <Heart name="cards-heart-outline" size={24}  color="#674188"/>
        </TouchableOpacity>
            <Text>360</Text>
            <Text style={{marginLeft : 50}}>1 day ago</Text>
      </Box>
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
