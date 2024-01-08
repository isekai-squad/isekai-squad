import { Box } from '@gluestack-ui/themed';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from'react-native';
import Icon from 'react-native-vector-icons/Ionicons'


const CreatePost = () => {
return (
    <ScrollView>
        <View style={{flex:1}}>
            <Box style={{display : 'flex' , flexDirection:'row' }}>
                <Icon name='close'/>
                <Text>Create Post</Text>
                
            </Box>
        </View>
    </ScrollView>
)
}

export default CreatePost;