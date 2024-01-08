import React, { useRef } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
    Box,
    Button,
    ButtonText,
    Center,
    Input,
    InputField,
    InputIcon,
    InputSlot,
  } from "@gluestack-ui/themed";
//   import { Icon } from '@gluestack-ui/themed';
import { useTheme } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather'

const CreateComment = () => {
    const {colors} = useTheme()
    const textInputRef = useRef()
    
    return (
        <View style ={styles.container}>
            <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style ={{flexDirection : 'row', alignItems:"center" ,gap:20}}>

            <Avatar size="md">
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage
              source={{
                  uri: "https://p16-capcut-sign-va.ibyteimg.com/tos-maliva-v-be9c48-us/o8dABIU6JPBd2AJiwAAb6EZjn9NKPQ9iS3iUv~tplv-nhvfeczskr-1:250:0.webp?lk3s=44acef4b&x-expires=1735219775&x-signature=oJRko2PZ4YuOxVZy15vYlkjENcQ%3D",
                }}
                />
          </Avatar>
          <Input size='xl' borderRadius={50} style={{width : 250}}>
          <InputField placeholder="Add a comment"/>
          </Input>
          <TouchableOpacity>
          <Icon name="send" size={24} style={{right : 10}} color='#674188'/>
          </TouchableOpacity>
                </View>
                </Box>
        </View>
    )
}
const styles = StyleSheet.create({
container: {
    paddingHorizontal: 15,
    // paddingVertical: 7,
    paddingBottom : 10,
    marginTop: 10,
    },
    textInput: {
        backgroundColor: '#C3ACD0',
      flex: 1,
      margin: 5,
      height: 40,
      borderRadius: 10,
      paddingHorizontal: 15
    }
  })

  export default CreateComment;

