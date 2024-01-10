import { Box, Button, ButtonText, Center, Input, InputField, Textarea, TextareaInput, VStack } from '@gluestack-ui/themed';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import File from 'react-native-vector-icons/MaterialCommunityIcons'
import { MultiSelect , Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const Expertise = [
    { label: 'Web Dev', value: '1' },
    { label: 'Data Science', value: '2' },
    { label: 'Economics', value: '3' },
    { label: 'Mechanics', value: '4' },
    { label: 'Electrics', value: '5' },
    { label: 'Music', value: '6' },
    { label: 'Chimics', value: '7' },
    { label: 'Art', value: '8' },
  ]

const CreatePost = () => {
    const [selected, setSelected] = useState([]);
    const [value, setValue] = useState(null);
    const [fileResponse , setFileResponse] = useState([])
    const [Images , setImages] = useState([])
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <AntDesign style={styles.icon} color="black" name="tagso" size={20} />
        </View>
      );
    };


    const handleImageSelection = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.All,
        aspect : [4, 3],
        quality : 1,
        allowsMultipleSelection : true
      })
      if (!result.canceled) {
        result.assets.map(image => setImages((prev) => [...prev , image.uri]));
      }
    }

    const addPost = async () => {
      await axios.post('http://172.19.0.189:4070/Posts/Projects/1' , {title , description, content : fileResponse , images : Images}).then(res => console.log("added successfully")).catch(err => console.log(err))    
    }

return (
    <ScrollView>
        <View style={{paddingVertical : 40 , backgroundColor : 'white'}}>
            <Box style={{display : 'flex' , flexDirection:'row', justifyContent : "space-around" , alignItems : 'center' }}>    
                <TouchableOpacity>
                <Icon name='close' size={24}/>
                </TouchableOpacity>
                <Text style={{fontSize : 20 , fontWeight : 'bold'}}>Create Post</Text>
                <Button
                borderRadius={50}
                bgColor='#674188'
                >
                    <ButtonText>Save</ButtonText>
                </Button>
                <Button
                borderRadius={50}
                variant = "outline"
                borderColor='#674188'
                onPress={() => addPost()}
                >
                    <ButtonText color='#674188'>Publish</ButtonText>
                </Button>
            </Box>
            
            <View style={{alignItems : 'center' , paddingVertical : 30}}>
            <Center bgColor='#fafafa' h={300} w={300} borderRadius={15} borderWidth={0.5} borderColor='#ede6f0'>
                <Icon name='image-outline' size={50} color='#dbcde2' onPress={handleImageSelection}/>
                
                <Text style={{color : "#dbcde2" , paddingVertical : 10 , fontWeight : 600 }}>Add Article Cover Image</Text>
            </Center>
            </View>
            <Box style={{paddingHorizontal: 20 , padding : 20}}>
                <VStack space='lg'>
                <Text style={{fontSize : 22 , fontWeight : 600}}>Title</Text>
                <Input
                variant='outline'
                borderRadius={15}
                borderWidth={0}
                bgColor='#f5f5f5'
                h={45}
                >
                <InputField placeholder='Article Title' onChangeText={(text) => setTitle(text)}/>
                </Input>
            <Text style={{fontSize : 22, fontWeight : 600}}>Project Files</Text>
            <Text style={{fontSize : 22, fontWeight : 600}}>Content</Text>
            <Textarea
            variant='outline'
            borderRadius={15}
            borderWidth={0}
            bgColor='#fafafa'
            h={400}
            >
            <TextareaInput placeholder='Write your artice here' onChangeText={(text) => setDescription(text)} />
            </Textarea>
            <Text  style={{fontSize : 22, fontWeight : 600}}>Select Area Of Expertise</Text>
            <View style={styles.container}>
            <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={Expertise}
        search
        itemTextStyle={{color : '#674188'}}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Expertise"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
            setValue(item.value);
        }}
        renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
            />
            </View>
            <Text style={{fontSize : 22, fontWeight : 600}}>Select Technologies</Text>
            <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          itemContainerStyle={{color : '#674188'}}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select Technology"
          value={selected}
          search
          searchPlaceholder="Search..."
          onChange={item => {
            setSelected(item);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
                <AntDesign color="black" name="delete" size={17} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
                </VStack>
            </Box>
        </View>
    </ScrollView>
)
}

const styles = StyleSheet.create({
    container: {
         padding: 16,
         },
    dropdown: {
      height: 50,
    //   width: '80%',
      backgroundColor: '#fafafa',
      borderRadius: 12,
      padding: 12,
        color : '#674188'
    },
    placeholderStyle: {
      fontSize: 16,
      color : '#674188'
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    item: {
        width : '80%',
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectedStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      backgroundColor: '#f5f5f5',
      shadowColor: '#674188',
      marginTop: 8,
      marginRight: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    textSelectedStyle: {
        color : '#674188',
      marginRight: 5,
      fontSize: 16,
    },
});

export default CreatePost;