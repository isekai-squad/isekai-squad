import { Image } from "@gluestack-ui/themed";
import { Box, Center } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather'


const ForumCategories = () => {
    let arr = [1,1,1,1,1,1,]
    const navigation = useNavigation()

    return (
        <ScrollView>
         <View as={SafeAreaView} style = {styles.container}>
         <Center style={{flexDirection : 'row', justifyContent : 'space-between' , padding : 20}}>
         {/* <TouchableOpacity style={{position : 'absolute' , top : 45 , left:10}}>
             <Icon name='arrow-left-thin' size={40} color='#674188' onPress={() => navigation.navigate('Posts') }/>
            </TouchableOpacity> */}
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
    }
});

export default ForumCategories