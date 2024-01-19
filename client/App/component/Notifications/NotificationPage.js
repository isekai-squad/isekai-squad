import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NormalNotif from "./NormalNotif";
import InterviewNotif from "./InterviewNotif";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { Modalize } from "react-native-modalize";

const Notification = () => {
  const [focused, setFocused] = useState("General");
  // const [data, setData] = useState([]);
  const [user , setUser] = useState({})
  const [notificationId , setNotificationId] = useState("")
  const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`)

  const retreiveNotifications =  async () => {
    return await axios.get(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/notification/${user.id}`).then(res => res.data) 
  }

  const markAsRead = async () => {
    await axios.put(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/notification/${notificationId}`).then(() => console.log('updated')).catch((err) => console.log(err))
  }

  const modalizeRef = useRef(null)

  const onOpen = (id) =>{
    setNotificationId(id)
     modalizeRef.current?.open()
    }
  const closeModal = () => modalizeRef.current?.close()

  const getCurrentUser = async () => {
    try {
      const res = await SecureStore.getItemAsync("Token");
      const decodeResult = jwtDecode(res);
      setUser(decodeResult);
    }catch (err) {
      console.log(err)
    }
  }
  
  const mutation = useMutation({
    mutationFn : async () => {
      markAsRead()
    },
    onSuccess : () => refetch()
  })
    
    const {data , isLoading  , refetch} = useQuery({
      queryKey: ["notifications", user.id],
      queryFn: async () => {
        try {
          getCurrentUser()
          return retreiveNotifications()
        }catch(err) {
          console.log(err)
        }
      },
    })
    
    if(isLoading) {
         return (
      <Center>
        <ActivityIndicator size="large" color="#674188" />
      </Center>
    )
  }

  
  return (
    <View style={{ height : '100%'}}>
    <ScrollView style={{ backgroundColor: "white", marginBottom: 40  }}>
      <View
        as={SafeAreaView}
        style={{ flex: 1, paddingVertical: 40, paddingHorizontal: 20  }}
        >
        {/* <Box alignItems="center" flexDirection="row" justifyContent="space-between">
        <Text style={{ fontSize: 26, fontWeight: "600" }}>Notification</Text>
        <Ionicons name="settings-outline" size={26} />
        </Box> */}
        <HStack paddingHorizontal={30} paddingVertical={10}>
          <Center w="$1/2">
            <Text
              style={[
                { fontSize: 22 },
                focused === "General"
                ? { color: "#674188" }
                : { color: "#d3d3d3" },
              ]}
              onPress={() => setFocused("General")}
              >
              General
            </Text>
            <Divider
              w="$full"
              h={5}
              marginTop={15}
              bg={focused === "General" ? "#674188" : "#d3d3d3"}
              borderRadius="$xs"
              />
          </Center>
          <Center w="$1/2">
            <Text
              style={[
                { fontSize: 22 },
                focused === "Interviews"
                ? { color: "#674188" }
                : { color: "#D3D3D3" },
              ]}
              onPress={() => setFocused("Interviews")}
              >
              Interviews
            </Text>
            <Divider
              w="$full"
              h={5}
              marginTop={15}
              bg={focused === "Interviews" ? "#674188" : "#d3d3d3"}
              borderRadius="$xs"
              />
          </Center>
        </HStack>
        {data?.length === 0 ? (
          <Center h="$96">
            <VStack space="lg" alignItems="center">
              <MaterialCommunityIcons
                name="bell-off-outline"
                size={150}
                color="#674188"
                />
              <Heading size="xl">Empty</Heading>
              <Text>You have no notifications currently</Text>
            </VStack>
          </Center>
        ) : focused === "General" ? (
          <VStack space="4xl" paddingVertical={20}>
            {data?.map((notif) => {
              return (
                <>
                  <NormalNotif data={notif} key={notif.id} onOpen={onOpen} />
                  <Divider />
                </>
              );
            })}
          </VStack>
        ) : (
          <VStack space="4xl">
            {data.map(() => (
              <>
              <InterviewNotif key={2} />
              <Divider />
                </>
            ))}
          </VStack>
        )}
        </View>
  </ScrollView>
          <Modalize
      ref={modalizeRef}
      modalHeight={600}
      snapPoint={300}
      closeSnapPointStraightEnabled={false}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
      <View
        style={{
          paddingTop: 50,
          alignContent: "center",
          justifyContent: "center",
        }}
        >
        <TouchableOpacity style={styles.btnTouchable}>
          <Text style={{ ...styles.btnText, color: "red" }}>Block</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTouchable}>
          <Text style={{ ...styles.btnText, color: "red" }}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTouchable}>
          <Text style={{ ...styles.btnText, color: "red" }}>Restrict</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTouchable} onPress={() => mutation.mutate()}>
          <Text style={styles.btnText}>Mark As Read</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTouchable}>
          <Text style={styles.btnText}>About This Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal} style={{ paddingTop: 20 }}>
          <Text style={{ ...styles.btnText, color: "red" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
</View>
  );
}

const styles = StyleSheet.create({
  btnTouchable: {
    width: "100%",
    paddingVertical: 15,
  },
  btnText: {
    fontSize: 18,
    letterSpacing: 2,
    textAlign: "center",
    color: "black",
  },
});

export default Notification;
