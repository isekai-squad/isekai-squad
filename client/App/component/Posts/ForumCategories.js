import { Image } from "@gluestack-ui/themed";
import { Box, Center } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather'
import  { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const ForumCategories = () => {
    let arr = [1,1,1,1,1,1,]
    const navigation = useNavigation()
    // const {data , isLoading , error} = useQuery({
    //     queryKey: ['forumCategories'],
    //     queryFn: async () => {
    //      return axios.get('http://172.20.0.74:4070/Category/').then((res) => res.data).catch((err) =>{ throw(err)});
    //     }
    // })

    // if(isLoading) {
    //     return (
    //         <View style={[styles.loadingContainer , styles.horizontal]}>
    //             <ActivityIndicator size='large' color='#674188'/>
    //         </View>
    //     )
    // }
    // if(error) <Text>{error.message}</Text>
    
    return (
        <ScrollView>
         <View as={SafeAreaView} style = {styles.container}>
         <Center style={{flexDirection : 'row', justifyContent : 'space-between' , padding : 20}}>
             <Text style={{fontSize : 24 , fontWeight : 'bold'}}>Explore by categories</Text>
             <TouchableOpacity>
             <Icon name='search' size={24}/>
             </TouchableOpacity>
         </Center>
         <Box style={{padding : 20 , display : 'flex', flexDirection : 'row' , flexWrap : 'wrap' , gap: 20}}>
            {arr.map(() => 
                <ImageBackground 
                    source={{uri : 'https://img.freepik.com/premium-photo/man-woman-are-working-computer-with-laptop-computer-screen-with-word-com-it_745528-1518.jpg'}}
                    style={{
                        height : 150,
                        width : 160,
                        position : 'relative',
                    }}
                    imageStyle={{borderRadius : 20}}
                    resizeMode="cover"
                >
                    <Text style={{color : 'white', fontWeight : '900', fontSize : 18 , position:'absolute' , bottom : 30 , left : 10}} onPress= {() => navigation.navigate('Posts')}>Technology</Text>
                    <Text style= {{color : 'white' , fontWeight : '300' , position : 'absolute' , bottom : 5 , left : 8}}>20.000 Articles</Text>
                </ImageBackground>
            )}
         </Box>
            </View>
     </ScrollView>
)
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
});

export default ForumCategories