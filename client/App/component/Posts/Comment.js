import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image , Modal, ActivityIndicator } from "react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import ImageViewer from 'react-native-image-view';
import ImageLayouts from "react-native-image-layouts";
import Lightbox from 'react-native-lightbox-v2';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const layoutPattern = [1, 2 , 3 , 2 , 1];

const Comment = ({ user , comment}) => {

  const formatTimeDifference = (createdAt) => {
    const now = moment();
    const postTime = moment(createdAt, "YYYY-MM-DD HH:mm");
    const duration = moment.duration(now.diff(postTime));
    if (duration.asMinutes() < 60) {
      // Less than 60 minutes
      return moment.duration(duration).humanize(true);
    } else if (duration.asHours() < 24) {
      // Less than 24 hours
      const hours = Math.floor(duration.asHours());
      return `${hours}h`;
    } else {
      // More than 24 hours
      const days = Math.floor(duration.asDays());
      return days === 1 ? "one day" : `${days} days`;
    }
  };

  function renderItem(uri, _index) {
    return  <Image source={{ uri: uri }}    style={{width : '%full' , height : 200 , borderRadius : 20}} resizeMode="stretch" alt="404" />;
  }

  const {data , isLoading , error, refetch} = useQuery ({
    queryKey : ['CommentLikes', comment.id],
    queryFn :async () => await axios.get(`http://${process.env.EXPO_PUBLIC_API_URL}:4070/forumComment/${comment.id}/comments/likes`).then(res => res.data).catch(err => console.error(err)),
    select : (data) => {
      const Nlikes = data.filter(item => item.like === 1)
     const Ndislikes = data.filter(item => item.like === 0)
     return Nlikes?.length - Ndislikes?.length
    }
  }) 

  if(isLoading){
   return <Center>
  <ActivityIndicator size="large" color='#674188' />
</Center>
  }

  const addLike = async () => {
    return await axios.post(`http://${process.env.EXPO_PUBLIC_API_URL}:4070/forumComment/${comment.id}/${user.id}/comments/increment`).then(res => console.log("liked")).then(() => refetch()).catch(err => console.error(err))
  }


  return (
    <View style={styles.container}>
      <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style ={{flexDirection : 'row', alignItems:"center" ,gap:10}}>
          <Avatar size="lg">
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage
            alt="404"
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
        <Text style={{fontSize : 18 , lineHeight : 30}}>{comment.content}</Text>
        <Lightbox>
        <ImageLayouts
        data={comment.images}
        numberOfColumns={2}
        patterns={layoutPattern}
        renderItem={renderItem}
        dividerPadding={4}
      />
        </Lightbox>
      </VStack>
      <Box style={{flexDirection : 'row' , padding : 10 , gap : 10 , alignItems : 'center'}}>
      <TouchableOpacity>
                <Dots name='arrow-up' color='#674188' size={30} onPress={() => addLike()}/>
                </TouchableOpacity>
            <Text>{data}</Text>
            <Text style={{marginLeft : 50}}>{formatTimeDifference(comment.created_at)} ago</Text>
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
