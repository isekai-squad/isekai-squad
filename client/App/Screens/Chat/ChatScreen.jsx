import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { io } from 'socket.io-client';
import axios from 'axios';
import { STYLES } from '../../../GlobalCss';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserChatRoom from './UserChatRoom';

const roomId = 'aig1n';
const userId = 'e0e2d7aa-f256-4fa1-b1e1-614a63651409';

const ChatRoom = () => {
  const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', roomId);
    retriveMessages();

    // Listen for new messages
    socket.on('newMessage', () => {
      retriveMessages(); // Refetch messages when a new message is received
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off('newMessage');
    };
  }, []);

  const retriveMessages = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/chat/room/messages/get/aig1n`
      );

      if (response.data.length > 0) {
        const all = response.data.map((e) => ({
          _id: e.id,
          createdAt: e.createdAt,
          text: e.text,
          user: {
            _id: e.sender.id,
            name: e.sender.userName,
          },
        }));
        setConversation(all.reverse());
      }
      socket.emit('newMessage','a message')
    } catch (err) {
      console.log(err);
    }
  };

  const onSend = async (newMessage) => {
    const data = {
      roomId: roomId,
      userId: userId,
      text: newMessage[0].text,
    };
    try {
      const postingMessage = await axios.post(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/chat/room/messages/post/`,
        data
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>

    <View style={{flex:1}}>
<View style={{width:'100%',backgroundColor:"#e5e5e5",height:80,justifyContent:'center'}}>
  <View style={{flexDirection:'row',gap:20,alignItems:'center',top:13,marginLeft:10}}>
   <Image style={{backgroundColor:'black',height:50,width:50,borderRadius:50}}/>
   <Text>Hello</Text>
  </View>
  <View style={{alignSelf:'flex-end',alignItems:'center',bottom:28,marginRight:20}}><FontAwesome name="video-camera" color={STYLES.COLORS.Priamary} size={30}/></View>
 </View> 
        <GiftedChat
          messages={conversation}
          user={{ _id: userId }}
          onSend={(newMessages) => onSend(newMessages)}
          renderBubble={(props) => {
            const isCurrentUser =
                props.currentMessage.user._id === userId;
              return (
                  <Bubble
                    {...props}
                    wrapperStyle={{
                      left: {
                          
                            // backgroundColor: isCurrentUser
                            //   ? STYLES.COLORS.Priamary
                            //   : '#e5e5e5',
                              alignSelf: isCurrentUser
                              ? 'flex-end'
                              : 'flex-start',
                    right: isCurrentUser ? -52 : 0,
                    maxWidth: '70%',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                    backgroundColor:'#e5e5e5'
                    
                   },
                   right:{
                    backgroundColor: STYLES.COLORS.Priamary
                   }
                 }}
                 />
                 );
               }}
               />
               </View>
               {/* <UserChatRoom/> */}
    </SafeAreaView>
    );
  };

  export default ChatRoom;

  //     <SafeAreaView>
  //       <View>
  
  // <View style={{width:'100%',backgroundColor:STYLES.COLORS.Secondry,height:80,justifyContent:'center'}}>
  //  <View style={{flexDirection:'row',gap:20,alignItems:'center',top:13,marginLeft:10}}>
  //   <Image style={{backgroundColor:'black',height:50,width:50,borderRadius:50}}/>
  //   <Text>Hello</Text>
  //  </View>
  //  <View style={{alignSelf:'flex-end',alignItems:'center',bottom:28,marginRight:20}}><FontAwesome name="video-camera" color={STYLES.COLORS.Priamary} size={30}/></View>
  // </View>
  // <View style={{flex:1,backgroundColor:'red',width:400,height:400}}>
  
  //        <GiftedChat
  //          messages={conversation}
  //          user={{ _id: userId }}
  //          onSend={(newMessages) => onSend(newMessages)}
  //          renderBubble={(props) => {
  //            const isCurrentUser =
  //                props.currentMessage.user._id === userId;
  //              return (
  //                  <Bubble
  //                    {...props}
  //                    wrapperStyle={{
  //                      left: {
  //                            backgroundColor: isCurrentUser
  //                              ? STYLES.COLORS.Priamary
  //                              : '#e5e5e5',
  //                              alignSelf: isCurrentUser
  //                              ? 'flex-end'
  //                              : 'flex-start',
  //                    right: isCurrentUser ? -52 : 0,
  //                    maxWidth: '70%',
  //                    justifyContent: 'space-between',
  //                    marginBottom: 4,
  //                   },
  //                 }}
  //                 />
  //                 );
  //               }}
  //               />
  //               </View>
  
  //          </View>
  //     </SafeAreaView>