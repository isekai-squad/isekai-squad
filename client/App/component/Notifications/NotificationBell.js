import React from 'react'
import { Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const NotificationBell = ({focused , iconColor , size}) => {
    let iconName = focused ? "bell" : "bell-outline"

  return <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
  
}

export default NotificationBell