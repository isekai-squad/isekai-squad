import React from "react";
import { View, Text, ScrollView } from "react-native";
import Post from "./Post";

const Posts = () => {
    const arr = [1,1,1,1,1,1,1,1,1,1,1,1,1,]
    return (
        <ScrollView>
            <View >
                {arr.map(post => {
                    return <Post/>
                })}
            </View>
        </ScrollView>
    )
}

export default Posts