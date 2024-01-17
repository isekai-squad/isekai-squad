import { Badge, BadgeText, Box, VStack } from '@gluestack-ui/themed'
import React from 'react'
import { Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const NotificationBell = ({focused , iconColor , size}) => {
    let iconName = focused ? "bell" : "bell-outline"

  return (
    <Box alignItems="center">
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
    <BadgeText color="$white">0</BadgeText>
      </Badge>
  <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
  </VStack>
  </Box>
  )
  
}

export default NotificationBell