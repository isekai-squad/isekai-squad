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
import axios from "axios";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

let arr = [1, 1, 1, 1, 1, 1];

const InterviewRequest = () => {
  const sendRequest = () => {
    axios.post(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Interviews/1/2`, {
      message: `"A new interview request has arrived! [User Name] wants to chat about [Topic/Opportunity]. Don't miss out, take action now!"`,
    }).then(() => console.log('notification sent')).catch((err) => console.log(err))
  };


  
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
        />
        <Center borderWidth={0.3} borderColor="#AEAEAE" borderRadius={30}>
          <VStack alignItems="center" paddingVertical={15} space="md">
            <Image
              size="xl"
              source={{
                uri: "https://i.ytimg.com/vi/P-3GOo_nWoc/maxresdefault.jpg",
              }}
              borderRadius={20}
            />
            <Heading>Mohamed Hasan Bouhlel</Heading>
            <Text color="#674188" fontSize={24} fontWeight="$normal">
              Yen
            </Text>
            <Text fontSize={18} fontWeight="$normal">
              Web Developement
            </Text>
            <Divider my="$2" w={300} />
            <Text color="#674188">hasanbouhlel@gmail.com</Text>
            <Text>Sousse , Tunisia</Text>
            <Text>50202120</Text>
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
          <Text paddingHorizontal={10}>
            Lorem ipsum dolor sit amet. Sit quasi explicabo eum quia laudantium
            ea explicabo iste ad dolores sequi rem eius maxime. Qui voluptas
            sint a similique magni eos pariatur eius quo optio doloribus qui
            voluptatem voluptatibus a perferendis galisum.
          </Text>
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
              <Text>GithubLink</Text>
            </HStack>
            <HStack alignItems="center" space="sm">
              <MaterialCommunityIcons
                name="linkedin"
                color="#0077b5"
                size={30}
              />
              <Text>LinkedIN</Text>
            </HStack>
          </VStack>
        </VStack>

        <Box paddingVertical={20} alignItems="center">
          <TouchableOpacity>
            <Button
              borderRadius={30}
              h={50}
              w={250}
              bgColor="#674188"
              action="primary"
            >
              <ButtonText>Apply</ButtonText>
            </Button>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </View>
  );
};

export default InterviewRequest;
