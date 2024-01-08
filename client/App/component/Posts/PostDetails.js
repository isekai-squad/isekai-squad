import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, View, FlatList, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
    Button,
    ButtonText,
    Center,
  } from "@gluestack-ui/themed"
import Post from './Post'
import CreateComment from './CreateComment'
import CommentList from './CommentList'
import { Box, Divider } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'

const PostDetails = () => {
    const flatListRef= useRef()
    const [post , setPost] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    const [comment , setComment] = useState('')
    const [isFocused , setIsFocused] = useState(null)
    const navigation = useNavigation()

    return (
        <ScrollView>
        <View as={SafeAreaView} style={styles.container}>
            <Image
             source={{uri : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/%D0%A1%D0%B2%D0%B5%D1%82_%D0%BE%D1%82_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D0%B8_-_panoramio.jpg/1200px-%D0%A1%D0%B2%D0%B5%D1%82_%D0%BE%D1%82_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D0%B8_-_panoramio.jpg'}}
             style={{width : '100%' , height : 400 }}
             resizeMode='stretch'
             />
             <Box style={{flexDirection : 'row', justifyContent : 'space-evenly', position : 'absolute' , top : 50 , right:20}}>
                <TouchableOpacity>
            <Icon name='bookmark-minus-outline' color='#674188' size={36}/>
                </TouchableOpacity>
                <TouchableOpacity>
            <Icon name='dots-horizontal-circle-outline' color='#674188' size={36} style={{marginLeft:10}} />
                </TouchableOpacity>
             </Box>
             <TouchableOpacity style={{position : 'absolute' , top : 45 , left:10}}>
             <Icon name='arrow-left-thin' size={40} color='#674188' onPress={() => navigation.navigate('Posts') }/>
             </TouchableOpacity>
             <Text style={{fontSize:25 , padding:20 , fontWeight : 'bold' , letterSpacing : 4 , lineHeight : 50}}>Lorem ipsum dolor sit amet</Text>
             <Divider />
             <Box style={{padding :10 , flexDirection: 'row'}}>
                <Avatar size = 'lg'>
                    <AvatarFallbackText>SS</AvatarFallbackText>
                    <AvatarImage source={{uri : 'https://p16-capcut-sign-va.ibyteimg.com/tos-maliva-v-be9c48-us/o8dABIU6JPBd2AJiwAAb6EZjn9NKPQ9iS3iUv~tplv-nhvfeczskr-1:250:0.webp?lk3s=44acef4b&x-expires=1735219775&x-signature=oJRko2PZ4YuOxVZy15vYlkjENcQ%3D'}}/>
                </Avatar>
                <View style={{marginLeft : 30}}>
                <Text style={{fontWeight : 'bold' , fontSize : 21, color : '#674188'}}>Nah i'd win</Text>
                <Text style={{fontWeight : 200 , fontSize : 21}}>@Nah i'd win</Text>
                </View>
                <Center style={{marginLeft : 40}}>
                <Button
                // variant='outline'
                action='primary'
                isDisabled={false}
                borderColor='#674188'
                borderRadius='$full'
                backgroundColor='#674188'
                >
                    <ButtonText color='white'>Follow</ButtonText>
                </Button>
                    </Center>
             </Box>
             <Divider/>
             <Box style={{flexDirection :'row' , padding : 15}}>
                <Button
                size = 'sm'
                variant='outline'
                borderColor='#674188'
                >
                    <ButtonText color='#674188'>Category</ButtonText>
                </Button>
                <Text style={{marginLeft:10 , fontWeight:300 , padding:10}}>3 days Ago</Text>
             </Box>
             <Text style={{padding : 20 , fontSize : 20 , lineHeight : 35}}>Lorem ipsum dolor sit amet. Et deleniti debitis aut recusandae veritatis quo sint beatae eum iusto animi. Aut accusantium minus nam consequatur tempora eos quia voluptatibus qui dicta voluptatum. Et quaerat enim ex consequatur maxime sed quia sunt eum deleniti modi.

Qui necessitatibus quae et placeat error non velit odit non galisum voluptatibus sed minima iste eos cumque tempore. Eos quod quam 33 inventore quod aut atque quidem et quibusdam quibusdam in fuga veniam aut repellat omnis. Ad repellat quae ea aliquam placeat ea necessitatibus consequuntur sed veniam consequatur.

Ex dolore animi qui dolores sint ut repellendus dolores sit dignissimos atque ut eveniet autem qui magnam ullam ad voluptates omnis! Eos repellendus accusamus qui saepe libero ex soluta laborum ea fugit temporibus.</Text>

<Divider />
        <CommentList/>
        <CreateComment/>
        <Divider />
        </View>
</ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerComponentStyle: {
      marginVertical: 7
    }
  })

  export default PostDetails