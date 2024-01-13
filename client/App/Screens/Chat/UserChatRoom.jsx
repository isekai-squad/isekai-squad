import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, useWindowDimensions, SafeAreaView } from 'react-native'

export default Calls = () => {
    const [convos, setConvos] = useState([])
  const userId="e0e2d7aa-f256-4fa1-b1e1-614a63651409"
useEffect(()=>{
 const getConvos= async()=>{
    try{
        const response = await axios.get(
            `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/chat/room/get/e0e2d7aa-f256-4fa1-b1e1-614a63651409`
          )
          setConvos(response.data);
        const obj = {
            Messages: 'ds',
            users1: 'dsd',
            users2: 'dsd',
        }
        
        // console.log(response.data,'heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    }catch(err){
        console.log(err);
    }
 }
 getConvos()
},[])

const renderItem = ({ item }) => {
    let other
    var callIcon = 'https://img.icons8.com/color/48/000000/phone.png'
    if (item.video == true) {
        callIcon = 'https://img.icons8.com/color/48/000000/video-call.png'
    }
     if (item.user1.id === userId){
        other = item.user2
     } else {
        other = item.user1
     }
    return (
      <TouchableOpacity >
        <View style={styles.row}>
          <Image source={{ uri: other.pdp}} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}> {other.userName}</Text>
            </View>
            <View style={styles.nameContainer}>
                {item.lastMessage !== null ? <Text>{item.lastMessage.sender.id === userId ? "You: " : item.lastMessage.sender.name}{item.lastMessage.text}</Text> : <Text>No Messages yet</Text>}
              {/* <Text style={{top:10,marginLeft:10}} > {item.lastMessage !== null ?  item.lastMessage.text : "no Message yet"}</Text> */}
            </View>
            <View style={styles.end}>
              <View style={{ width:'100%'}}>

              <Text style={styles.time}>
                {item.date} {item.time}
              </Text>
              </View>
              
            </View>
          </View>
          {/* <Image style={[styles.icon, { marginRight: 50 }]} source={{ uri: callIcon }} /> */}
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        extraData={convos}
        data={convos}
        keyExtractor={item => {
            // console.log(item.sender.pdp,'fffffffffffffffffffffffffffffffffffffffffffffffffffff')
          return item.id
        }}
        renderItem={renderItem}
      />
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
    alignSelf:'flex-end',
    marginRight:50,
    bottom:20
  },
  icon: {
    height: 28,
    width: 28,
  },
})

                                        