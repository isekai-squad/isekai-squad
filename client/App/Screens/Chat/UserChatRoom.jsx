import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default UserChatRoom = ({navigation}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [convos, setConvos] = useState([]);

  const getCurrentUser = async () => {
    try {
      const res = await SecureStore.getItemAsync('Token');
      const decoded = await jwtDecode(res);
      setCurrentUser(decoded);
    } catch (error) {
      console.error('Error retrieving or decoding token:', error);
    }
  };

  const getConvos = async () => {
    try {
      if (currentUser) {
        const response = await axios.get(
          `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/chat/room/get/${currentUser.id}`
        );
        setConvos(response.data,);
    
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      getConvos();
    }
  }, [currentUser]);
 


  const renderItem = ({ item }) => {
    
    if (item.user1.id === currentUser.id){
              other = item.user2
           } else {
              other = item.user1
           }
    return (
      <TouchableOpacity 
      onPress={()=>navigation.navigate('chat',{userId:currentUser.id,roomId:item.roomId,other:other})}
      >
        <View style={styles.row}>
          <Image source={{ uri: other.pdp }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{other.name}</Text>
            </View>
            <View style={styles.end}>
            {item.lastMessage !== null ? <Text>{item.lastMessage.sender.id === currentUser.id ? "You:" : item.lastMessage.sender.name} {item.lastMessage.text}</Text> : <Text>No Messages yet</Text>}
            {/* <Text style={{top:10,marginLeft:10}} > {item.lastMessage !== null ?  item.lastMessage.text : "no Message yet"}</Text>            */}
               <Text style={styles.time}>
                {item.date} {item.time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
<TouchableOpacity onPress={()=>navigation.goBack()}><Ionicons size={50} name="arrow-back"/></TouchableOpacity>
    <View style={{ flex: 1 }}>
      {convos.length> 0 ? <FlatList
        extraData={convos}
        data={convos}
        keyExtractor={item => {
          return item.id
        }}
        renderItem={renderItem}
        /> : 
        <View style={{width:"100%",height:"100%", backgroundColor:"white", justifyContent:"center",alignItems:"center"}}>
          <Image width={500} height={300} source={{uri:"https://cdn.dribbble.com/users/99954/screenshots/6669081/no_messages_blank_state.png?resize=800x600&vertical=center"}}/>
          </View>}
    </View>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
    right:20,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
})


