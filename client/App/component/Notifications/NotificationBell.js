import { Badge, BadgeText, Box, VStack } from '@gluestack-ui/themed'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { io } from 'socket.io-client'
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from 'jwt-decode'

const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`)

const NotificationBell = ({focused , iconColor , size}) => {
    let iconName = focused ? "bell" : "bell-outline"
    const [notificationCount , setNotificationCount] = useState(0)
    const [user , setUser] = useState('')

    const getCurrentUser = async () => {
      try {
        const res = await SecureStore.getItemAsync("Token");
        const decodeResult = jwtDecode(res);
        setUser(decodeResult);
      }catch (err) {
        console.log(err)  
          }
      }

    useEffect(() => {
      getCurrentUser();
      // console.log(user)
      socket.on('newNotification', ({notifications , receiver}) => {
        if(user.id === receiver)
        setNotificationCount(notifications)
      })
      socket.on('updateNotification' , ({receiver , count}) => {
        if(user.id === receiver) {
          setNotificationCount(count)
        }
      })
      return () => {
        socket.off('disconnect')
      }
    })

  return (
    <Box alignItems="center">
   {notificationCount ?
    <VStack>
      <Badge
           h={22}
           w={22}
           bg="$red600"
           borderRadius="$full"
           mb={-12}
           mr={-12}
           zIndex={1}
           variant="solid"
           alignSelf="flex-end"
           >
    <BadgeText color="$white">{notificationCount}</BadgeText>
      </Badge>
  <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
  </VStack>
  : 
  <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
  }
  </Box>
  )
  
}

export default NotificationBell