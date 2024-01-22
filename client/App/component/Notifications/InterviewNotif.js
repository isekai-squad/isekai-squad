import { Avatar, AvatarFallbackText, AvatarImage, Button, ButtonText, Center, Divider, HStack, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import * as SecureStore from "expo-secure-store";


const InterviewNotif = ({data , user , refetch}) => {
    
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



  return (
    <Pressable onPress={() => {
        if(data.from.role === "STUDENT"){
            navigation.navigate('RequestReviewStudent' , {student : user , company : data.from , refetch , id : data.id})
        }else if (data.from.role === "COMPANY") {
            navigation.navigate('RequestReviewCompany' , {student: user , company: data.from , refetch , id : data.id })
        }
        }}> 
    <VStack space='md'>
        <HStack alignItems='center' space='sm'>
            <Avatar size='lg' borderRadius='$full'>
                <AvatarFallbackText>s</AvatarFallbackText>
                <AvatarImage
                alt='404'
                source={{uri : data.from.pdp}}
                />
            </Avatar>
            <VStack w='$56' space='sm'>
                <Heading size="md">A new interview request has been initiated</Heading>
                <HStack space="md" alignItems='center'>
                    <Text>{formatTimeDifference(data.created_at)}</Text>
                    <Divider orientation="vertical" />
                    <Text>{exactTime(data.created_at)}</Text>
            <Button w={100} bgColor='#674188' borderRadius={8}>
                <ButtonText  fontSize={12}>{data.state}</ButtonText>
            </Button>
                </HStack>
            </VStack>
        </HStack>
        <Text>{data.message}</Text>
    </VStack>
                </Pressable>
  )
}

export default InterviewNotif