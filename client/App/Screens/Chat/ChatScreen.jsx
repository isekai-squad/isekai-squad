import React, { useState, useEffect, useCallback } from "react";
import { Image, Text, View } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { io } from "socket.io-client";
import axios from "axios";
import { STYLES } from "../../../GlobalCss";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import atob from "core-js-pure/stable/atob";
global.atob = atob;
const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`);

const ChatRoom = ({ route }) => {
  const { roomId, userId, other } = route.params;

  const [conversation, setConversation] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/chat/room/messages/get/${roomId}`
      );

      const all = response.data.map((e) => ({
        _id: e.id,
        createdAt: e.createdAt,
        text: e.text,
        user: {
          _id: e.sender.id,
          name: e.sender.userName,
        },
      }));

      setConversation((prevMessages) => GiftedChat.append(prevMessages, all.reverse()));
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
        // Prepend the new message to the conversation state
        setConversation((prevMessages) => GiftedChat.append(prevMessages, newMessage));
      } catch (err) {
        console.log(err);
      }
    },
    [roomId, userId]
  );

  useEffect(() => {
    const fetchDataAndJoinRoom = async () => {
      await fetchData();
      socket.emit("joinRoom", roomId);
      getCurrentUser().then((user) => setCurrentUser(user));
    };

    fetchDataAndJoinRoom();

    // Listen for new messages
    socket.on("newMessage", () => {
      fetchData();
    });

    return () => {
      socket.off("newMessage");
    };
  }, [roomId, fetchData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            backgroundColor: "#e5e5e5",
            height: 80,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              top: 13,
              marginLeft: 10,
            }}
          >
            <Image source={{ uri: other?.pdp }} style={{ height: 50, width: 50, borderRadius: 50 }} />
            <Text>{other?.name}</Text>
          </View>
          <View
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              bottom: 28,
              marginRight: 20,
            }}
          >
            <FontAwesome name="video-camera" color={STYLES.COLORS.Priamary} size={30} />
          </View>
        </View>
        <GiftedChat
          messages={conversation}
          user={{ _id: userId }}
          onSend={(newMessages) => onSend(newMessages)}
          renderBubble={(props) => {
            const isCurrentUser = props.currentMessage.user._id === userId;
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  left: {
                    alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                    right: isCurrentUser ? -52 : 0,
                    maxWidth: "70%",
                    justifyContent: "space-between",
                    marginBottom: 4,
                    backgroundColor: "#e5e5e5",
                  },
                  right: {
                    backgroundColor: STYLES.COLORS.Priamary,
                  },
                }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;
