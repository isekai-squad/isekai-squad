import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  Center,
  Divider,
  GripVerticalIcon,
  HStack,
  Heading,
  Icon,
  Image,
  Menu,
  MenuItem,
  MenuItemLabel,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import React, { useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const NormalNotif = ({ data, onOpen }) => {
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

  const navigation = useNavigation();

  const exactTime = (createdAt) => {
    const postDate = new Date(createdAt);
    return postDate.toLocaleTimeString();
  };

  const {data : post , isLoading , error , refetch} = useQuery({
    queryKey : ['postType'],
    queryFn : async () => {
      if (data.type === 'Forum') {
        return await axios.get(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/forumPost/${data.postId}`).then(res => res.data).catch(err => console.log(err))
      }else if (data.type === 'Project'){
        return await axios.get(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/oneProject/${data.postId}`).then(res => res.data).catch(err => console.log(err))
      } else if (data.type === 'Posts') {
        return await axios.get(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/onePost/${data.postId}`).then(res => res.data).catch(err => console.log(err)) 
      } else if (data.type === 'Service') {
        return await axios.get(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/oneService/${data.postId}`).then(res => res.data).catch(err => console.log(err))
      }
    }
  })

  if(isLoading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#674188" />
      </Center>
    )
  }

  return (
    <HStack space="xs" alignItems="center">
      <Avatar size="lg" borderRadius="$full" mr={4}>
        <AvatarFallbackText>I</AvatarFallbackText>
        <AvatarImage
          alt="404"
          source={{
            uri: data.sender.pdp,
          }}
        />
        {data.seen === false ? (
          <AvatarBadge $dark-borderColor="$black" bgColor="#674188" />
        ) : (
          ""
        )}
      </Avatar>
      <VStack w="$1/2" space="md">
        <Heading
          size="md"
          onPress={() => navigation.navigate("ForumCategories")}
        >
          {data.content}
        </Heading>
        <HStack space="md">
          <Text>{formatTimeDifference(data.created_at)}</Text>
          <Divider orientation="vertical" />
          <Text>{exactTime(data.created_at)}</Text>
        </HStack>
      </VStack>
      <Image
        alt="404"
        source={{
          uri: post.images[0],
        }}
        size="md"
        borderRadius={10}
      />
      <TouchableOpacity onPress={() => onOpen(data.id)}>
        <MaterialCommunityIcons name="dots-vertical" size={24} />
      </TouchableOpacity>
    </HStack>
  );
};

export default NormalNotif;
