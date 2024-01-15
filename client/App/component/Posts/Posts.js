import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { Image } from '@gluestack-ui/themed';
import Post from "./Post";
import { Box, Center, Divider, HStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Ionicons from 'react-native-vector-icons/Ionicons'

const Posts = ({route}) => {
  // const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const navigation = useNavigation();
  const {category} = route.params
console.log(category)
  const {data , isLoading , error , refetch} = useQuery({
    queryKey:["forumPosts" , category],
    queryFn : () => axios.get(`http://${process.env.EXPO_PUBLIC_API_URL}:4070/Category/${category.id}`).then((res) => res.data),
    
  })

  if(isLoading) return <Center>
  <ActivityIndicator size="large" color='#674188' />
</Center>

  return (
    <ScrollView style={{backgroundColor : 'white'}}>
      <View style={{backgroundColor : 'white'}}>
        <ImageBackground
          source={{
            uri: category.image,
          }}
          alt="404"
          style={{ width: 400, height: 230 }}
        >
          <View style={styles.shadowOverlay}/>
                <Icon name='arrow-left-thin' size={50} style={{position : 'absolute' , top : 30 , left : 10}} color="#674188" onPress={() => {
                  navigation.navigate('Community')
                  }}/>
                <Text style={{position : 'absolute' , bottom : 30 , left : 15 , fontSize : 20 , fontWeight : 'bold' , color : 'white'}}>{category.name}</Text>
        </ImageBackground>
        <TouchableOpacity onPress={() => navigation.navigate("CreateForumPost" , {category , refetch})}>
        <HStack space="sm" style={{alignItems : 'center'}}>
        <Text style={{fontSize : 24 , padding : 20 , fontWeight : 'bold'}}>Create Post</Text>
        <Ionicons name="add" size={24} color='#674188' />
        </HStack>
        </TouchableOpacity>
        <Divider my='$2' w={100}/>
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
        {data?.map((post) => {
          return <Post post={post} key={post.id} posts={data} category={category} />;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shadowOverlay : {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
})

export default Posts;
