import {
  Avatar,
  AvatarFallbackText,
  Button,
  Center,
  Divider,
  Heading,
} from "@gluestack-ui/themed";
import { AvatarImage } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { ButtonText } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const YourInterviews = () => {
  const [user, setUser] = useState("");
  const navigation = useNavigation();

  const getCurrentUser = async () => {
    const res = await SecureStore.getItemAsync("Token");
    const decodeResult = jwtDecode(res);
    setUser(decodeResult);
  };
  const formatTimeDifference = (createdAt) => {
    const now = moment();
    const postTime = moment(createdAt, "YYYY-MM-DD HH:mm");
    const duration = moment.duration(now.diff(postTime));
    if (duration.asMinutes() < 60) {
      // Less than 60 minutes
      return moment.duration(duration).humanize(true);
    } else if (duration.asHours() < 24) {
      // Less than 24 hours
      const hours = Math.floor(duration.asHours());
      return `${hours}h`;
    } else {
      // More than 24 hours
      const days = Math.floor(duration.asDays());
      return days === 1 ? "one day" : `${days} days`;
    }
  };
  const exactTime = (createdAt) => {
    const postDate = new Date(createdAt);
    return postDate.toLocaleTimeString();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["YourInterviews", user.id],
    queryFn: async () => {
      getCurrentUser();
      return await axios
        .get(
          `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Interviews/Requests/${user.id}`
        )
        .then((res) => res.data)
        .then(data => data.sort((a, b) => {
            if (a.state === "Accepted" && b.state !== "Accepted") {
                return -1; 
              } else if (a.state !== "Accepted" && b.state === "Accepted") {
                return 1;
              }
              return 0
        }))
        .catch((err) => console.log(err));
    },
    refetchOnMount : true,
  });

  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#674188" />
      </Center>
    );
  }

  return (
    <ScrollView as={SafeAreaView}>
      <HStack padding={30} paddingVertical={40} space="4xl" alignItems="center">
        <Ionicons
          name="arrow-back"
          size={30}
          color="#674188"
          onPress={() => navigation.goBack()}
        />
        <Text bold fontSize={22}>
          Your Interviews
        </Text>
      </HStack>
      <Divider/>
      <VStack space="4xl" paddingHorizontal={30} paddingVertical={20}>
        {data?.length === 0 ? (
          <Center h="$96">
            <VStack space="lg" alignItems="center">
              <Ionicons name="briefcase" size={150} color="#674188" />
              <Heading size="xl">Empty</Heading>
              <Text>You have no interviews requests currently</Text>
            </VStack>
          </Center>
        ) : (
          <>
            {data?.map((interview) => (
              <Pressable>
                <VStack space="md">
                  <HStack alignItems="center" space="sm">
                    <Avatar size="lg" borderRadius="$full">
                      <AvatarFallbackText>s</AvatarFallbackText>
                      <AvatarImage
                        alt="404"
                        source={{ uri: interview.from.pdp }}
                      />
                    </Avatar>
                    <VStack w="$56" space="sm">
                      <Heading size="md">
                        A new interview request has been initiated
                      </Heading>
                      <HStack space="md" alignItems="center">
                        <Text>
                          {formatTimeDifference(interview.created_at)}
                        </Text>
                        <Divider orientation="vertical" />
                        <Text>{exactTime(interview.created_at)}</Text>
                        <Button w={100} bgColor="#674188" borderRadius={8}>
                          <ButtonText fontSize={12}>
                            {interview.state}
                          </ButtonText>
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                  <Text>{interview.message}</Text>
                </VStack>
              </Pressable>
            ))}
          </>
        )}
      </VStack>
    </ScrollView>
  );
};

export default YourInterviews;
