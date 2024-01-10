import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { Image } from '@gluestack-ui/themed';
import Post from "./Post";
import { Box } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

const Posts = () => {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const navigation = useNavigation();
  return (
    <ScrollView style={{backgroundColor : 'white'}}>
      <View style={{backgroundColor : 'white'}}>
        <ImageBackground
          source={{
            uri: "https://img.freepik.com/premium-photo/man-woman-are-working-computer-with-laptop-computer-screen-with-word-com-it_745528-1518.jpg",
          }}
          alt="404"
          style={{ width: 400, height: 200 }}
        >
                <Icon name='arrow-left-thin' size={50} style={{position : 'absolute' , top : 30 , left : 10}} color="#674188" onPress={() => navigation.navigate('Community')}/>
        </ImageBackground>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 20,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Sort By</Text>
          <TouchableOpacity>
            <Box style={{ flexDirection: "row" }}>
              <Text> Most Popular</Text>
              <Icon name="arrow-up-down" size={20} />
            </Box>
          </TouchableOpacity>
        </View>
        {arr.map((post) => {
          return <Post key={Math.random()} />;
        })}
      </View>
    </ScrollView>
  );
};

export default Posts;
