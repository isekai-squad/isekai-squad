import {
  Box,
  Button,
  ButtonText,
  Center,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { ActivityIndicator, Linking, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { io } from "socket.io-client";

let arr = [1, 1, 1, 1, 1, 1];
const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`);

const InterviewReviewStudent = ({ route }) => {
  const [technology, setTechnology] = useState([]);

  const { student, company, refetch, id } = route.params;
  const navigation = useNavigation();

  const acceptRequest = async () => {
    await axios
      .put(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Interviews/${id}`, {
        state: "Accepted",
      })
      .then((res) => refetch())
      .then(() => navigation.navigate("Home"))
      .catch((err) => console.log(err));
  };

  const declineRequest = async () => {
    await axios
      .put(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Interviews/${id}`, {
        state: "Declined",
      })
      .then((res) => refetch())
      .then(() => navigation.navigate("Home"))
      .catch((err) => console.log(err));
  };

  const getTechnoligies = async () => {
    await axios
      .get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Expertise/9d3602be-bbaa-4db0-a8bf-efcac909f056`
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["StudentData"],
    queryFn: async () => {
      getTechnoligies();
      return await axios
        .get(
          `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/user/${student.id}`
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  });

  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#674188" />
      </Center>
    );
  }

  console.log(data);

  return (
    <View
      as={SafeAreaView}
      style={{ paddingVertical: 40, paddingHorizontal: 15 }}
    >
      <ScrollView>
        <MaterialCommunityIcons
          name="arrow-left-thin"
          size={46}
          color="#674188"
          onPress={() => navigation.goBack()}
        />
        <Center borderWidth={0.3} borderColor="#AEAEAE" borderRadius={30}>
          <VStack alignItems="center" paddingVertical={15} space="md">
            <Image
              size="xl"
              source={{
                uri: data.pdp,
              }}
              borderRadius={20}
            />
            <Heading>{data.name}</Heading>
            <Text color="#674188" fontSize={22} fontWeight="$normal">
              {data.userName}
            </Text>
            <Text fontSize={18} fontWeight="$normal">
              {data.Specialty.name}
            </Text>
            <Divider my="$2" w={300} />
            <Text color="#674188">{data.email}</Text>
            <Text>{data.location}</Text>
            <Text>{data.number}</Text>
          </VStack>
        </Center>
        <Center paddingVertical={30}>
          <HStack>
            <Center>
              <Text fontSize={20} color="#674188" marginBottom={10}>
                About
              </Text>
              <Divider w={100} h={5} borderRadius={30} bgColor="#674188" />
            </Center>
          </HStack>
        </Center>

        <VStack paddingHorizontal={10} space="lg">
          <Heading>Bio:</Heading>
          <Text paddingHorizontal={10}>{data.bio}</Text>
          <Heading>Technologies:</Heading>
          <Box flexDirection="row" flexWrap="wrap">
            {arr.map(() => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 14,
                  backgroundColor: "#f5f5f5",
                  shadowColor: "#674188",
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
                }}
              >
                <Text
                  style={{ color: "#674188", marginRight: 5, fontSize: 16 }}
                >
                  React
                </Text>
              </View>
            ))}
          </Box>
          <VStack space="md">
            <Heading>Links:</Heading>
            <HStack alignItems="center" space="sm">
              <MaterialCommunityIcons name="github" size={30} />
              <Text onPress={() => Linking.openURL(data.GitHub)}>
                {data.GitHub}
              </Text>
            </HStack>
            <HStack alignItems="center" space="sm">
              <MaterialCommunityIcons
                name="linkedin"
                color="#0077b5"
                size={30}
              />
              <Text onPress={() => Linking.openURL(data.Linkedin)}>
                {data.Linkedin}
              </Text>
            </HStack>
          </VStack>
        </VStack>

        <Center paddingVertical={20} alignItems="center">
          <HStack space="md">
            <TouchableOpacity onPress={() => acceptRequest()}>
              <Button
                borderRadius={30}
                h={50}
                w={150}
                bgColor="$green500"
                action="primary"
              >
                <ButtonText>Accept</ButtonText>
              </Button>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => declineRequest()}>
              <Button
                borderRadius={30}
                h={50}
                w={150}
                bgColor="$red500"
                action="primary"
              >
                <ButtonText>Decline</ButtonText>
              </Button>
            </TouchableOpacity>
          </HStack>
        </Center>
      </ScrollView>
    </View>
  );
};

export default InterviewReviewStudent;
