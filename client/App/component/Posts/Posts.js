import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { Image } from '@gluestack-ui/themed';
import Post from "./Post";
import { Box } from "@gluestack-ui/themed";

const Posts = () => {
    const arr = [1,1,1,1,1,1,1,1,1,1,1,1,1,]
    return (
        <ScrollView>
            <View >
                <Image source={{uri : 'https://i.ytimg.com/vi/Iy_O_k688jc/maxresdefault.jpg'}} alt="404" style = {{width : 400 , height : 200}}/>
                <View style ={{display : 'flex' , flexDirection : 'row'  , paddingHorizontal : 20 ,paddingVertical : 20,justifyContent : 'space-between' }} >
                <Text style={{ fontWeight : 'bold' , fontSize: 20 }}>Sort By</Text>
                    <TouchableOpacity>
                <Box style={{flexDirection : 'row'}}>
                <Text> Most Popular</Text>
                <Icon name="arrow-up-down" size={20}/>
                </Box>
                    </TouchableOpacity>
                </View>
                {arr.map(post => {
                    return <Post key={Math.random()}/>
                })}
            </View>
        </ScrollView>
    )
}

export default Posts