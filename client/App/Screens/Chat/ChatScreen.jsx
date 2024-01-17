import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import { GiftedChat, Bubble,Avatar } from 'react-native-gifted-chat';
import { io } from 'socket.io-client';
import axios from 'axios';
import { STYLES } from '../../../GlobalCss';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import JWT from 'expo-jwt';
import atob from 'core-js-pure/stable/atob';
global.atob= atob

const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`);

const getCurrentUser = async () => {
  try {
    const res = await SecureStore.getItemAsync('Token');
    const decoded = await jwtDecode(res);
    return decoded;
  } catch (error) {
    console.error('Error retrieving or decoding token:', error);
  }
};

const ChatRoom = ({ route }) => {
  const { roomId, userId, other } = useMemo(() => route.params, [route.params]);
  const [conversation, setConversation] = useState(() => []);
  const [currentUser, setCurrentUser] = useState();

  const retriveMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/chat/room/messages/get/${roomId}`
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
      socket.emit('newMessage', 'a message');
    } catch (err) {
      console.log(err);
    }
  }, [roomId]);

  const onSend = useCallback(
    async (newMessage) => {
      const data = {
        roomId: roomId,
        userId: userId,
        text: newMessage[0].text,
      };
      try {
        await axios.post(
          `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/chat/room/messages/post/`,
          data
        );
      } catch (err) {
        console.log(err);
      }
    },
    [roomId, userId]
  );

  useEffect(() => {
    socket.emit('joinRoom', roomId);
    retriveMessages();
    getCurrentUser().then((user) => setCurrentUser(user));

    // Listen for new messages
    socket.on('newMessage', () => {
      retriveMessages(); // Refetch messages when a new message is received
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off('newMessage');
    };
  }, [roomId, retriveMessages]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <View style={{width:'100%',backgroundColor:"#e5e5e5",height:80,justifyContent:'center'}}>
   <View style={{flexDirection:'row',gap:20,alignItems:'center',marginLeft:10}}>
    <Image source={{uri:other.pdp}} style={{height:50,width:50,borderRadius:50}}/>
    <Text>{other.name}</Text>
   </View>
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
               renderAvatar={(props) => {
                if (props.currentMessage.user._id !== userId) {
                  return <Avatar {...props} source={{ uri: other.pdp}} />;
                }
                return null; 
              }}
                           />
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;


// import React, { useState, useEffect } from 'react';
// import { Image, Text, View } from 'react-native';
// import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// import { io } from 'socket.io-client';

// import axios from 'axios';
// import { STYLES } from '../../../GlobalCss';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//  import * as SecureStore from 'expo-secure-store';
//  import { jwtDecode } from 'jwt-decode';
//  import JWT from 'expo-jwt';
//  import atob from "core-js-pure/stable/atob";
// global.atob= atob

// const ChatRoom = ({route}) => {
//   const {roomId, userId,other} = route.params
//   const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`);
//   const [conversation, setConversation] = useState([]);
// const [currentUser,setCurrentUser]=useState()
// const getCurrentUser = async () => {
//   try {
//     const res = await SecureStore.getItemAsync('Token');
//     const decoded = await jwtDecode(res);
//     setCurrentUser(decoded)
//   } catch (error) {
//     console.error('Error retrieving or decoding token:', error);
//   }
// };


//   useEffect(() => {
//     socket.emit('joinRoom', roomId);
//     retriveMessages();
//     getCurrentUser()

//     // Listen for new messages
//     socket.on('newMessage', () => {
//       retriveMessages(); // Refetch messages when a new message is received
//     });

//     // Clean up the event listener on component unmount
//     return () => {
//       socket.off('newMessage');
//     };
//   }, []);

//   const retriveMessages = async () => {
//     try {
//       const response = await axios.get(
//         `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/chat/room/messages/get/${roomId}`
//       );

//       if (response.data.length > 0) {
//         const all = response.data.map((e) => ({
//           _id: e.id,
//           createdAt: e.createdAt,
//           text: e.text,
//           user: {
//             _id: e.sender.id,
//             name: e.sender.userName,
//             image: e.sender.pdp
//           },
//         }));
//         setConversation(all.reverse());
//       }
//       socket.emit('newMessage','a message')
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const onSend = async (newMessage) => {
//     const data = {
//       roomId: roomId,
//       userId: userId,
//       text: newMessage[0].text,
//     };
//     try {
//       const postingMessage = await axios.post(
//         `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/chat/room/messages/post/`,
//         data
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };


//   return (
//     <SafeAreaView style={{flex:1}}>

//     <View  style={{flex:1}}>
// <View style={{width:'100%',backgroundColor:"#e5e5e5",height:80,justifyContent:'center'}}>
//   <View style={{flexDirection:'row',gap:20,alignItems:'center',top:13,marginLeft:10}}>
//    <Image source={{uri:other.pdp}} style={{height:50,width:50,borderRadius:50}}/>
//    <Text>{other.name}</Text>
//   </View>
//   <View style={{alignSelf:'flex-end',alignItems:'center',bottom:28,marginRight:20}}><FontAwesome name="video-camera" color={STYLES.COLORS.Priamary} size={30}/></View>
//  </View> 
//         <GiftedChat
//           messages={conversation}
//           user={{ _id: userId }}
//           onSend={(newMessages) => onSend(newMessages)}
//           renderBubble={(props) => {
//             const isCurrentUser =
//                 props.currentMessage.user._id === userId;
//               return (
//                   <Bubble
                  
//                     {...props}
                    
//                     wrapperStyle={{
//                       left: {
                          
//                             // backgroundColor: isCurrentUser
//                             //   ? STYLES.COLORS.Priamary
//                             //   : '#e5e5e5',
//                               alignSelf: isCurrentUser
//                               ? 'flex-end'
//                               : 'flex-start',
//                     right: isCurrentUser ? -52 : 0,
//                     maxWidth: '70%',
//                     justifyContent: 'space-between',
//                     marginBottom: 4,
//                     backgroundColor:'#e5e5e5'
                    
//                    },
//                    right:{
//                     backgroundColor: STYLES.COLORS.Priamary
//                    }
                   
//                  }}
//                  />
//                  );
//                }}
//                />
//                </View>
//     </SafeAreaView>
//     );
//   };
  
//   export default ChatRoom;

