import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  Center,
  HStack,
  Image,
  VStack,
} from "@gluestack-ui/themed";
import Post from "./Post";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";
import { Box, Divider } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import Dots from "react-native-vector-icons/Entypo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PostDetails = ({ route }) => {
  const flatListRef = useRef();
  // const [post , setPost] = useState(null)
  // const [isLoading , setIsLoading] = useState(false)
  // const [comment , setComment] = useState('')
  // const [isFocused , setIsFocused] = useState(null)
  const navigation = useNavigation();
  const { post, data } = route.params;
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <ScrollView>
      <View as={SafeAreaView} style={styles.container}>
        <Image
          source={{ uri: post.images[0] }}
          style={{ width: "100%", height: 400 }}
          resizeMode="stretch"
        />
        <Box
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            position: "absolute",
            top: 50,
            right: 20,
          }}
        >
          <TouchableOpacity>
            <Icon name="bookmark-minus-outline" color="#674188" size={36} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="dots-horizontal-circle-outline"
              color="#674188"
              size={36}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </Box>
        <TouchableOpacity style={{ position: "absolute", top: 45, left: 10 }}>
          <Icon
            name="arrow-left-thin"
            size={40}
            color="#674188"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            padding: 20,
            fontWeight: "bold",
            letterSpacing: 4,
            lineHeight: 50,
          }}
        >
          {post.title}
        </Text>
        <Divider />
        <HStack style={{ padding: 10}} space="4xl">
            <HStack>
          <Avatar size="lg">
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage source={{ uri: data.pdp }} />
          </Avatar>
          <View style={{ marginLeft: 30 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 21, color: "#674188" }}
              onPress={() => navigation.navigate("UserProfile")}
              >
              {data.name}
            </Text>
            <Text style={{ fontWeight: 200, fontSize: 19 }}>
              @{data.userName}
            </Text>
          </View>
                </HStack>
          <Center style={{ marginLeft: 40 }}>
            <Button
              // variant='outline'
              action="primary"
              isDisabled={false}
              borderColor="#674188"
              borderRadius="$full"
              backgroundColor="#674188"
            >
              <ButtonText color="white">Follow</ButtonText>
            </Button>
          </Center>
        </HStack>
        <Divider />
        <Box
          style={{
            flexDirection: "row",
            padding: 15,
            alignItems: "center",
            gap: 20,
          }}
        >
          <Button size="sm" variant="outline" borderColor="#674188">
            <ButtonText color="#674188">Category</ButtonText>
          </Button>
          <Text style={{ marginLeft: 10, fontWeight: 300 }}>3 days Ago</Text>
          <TouchableOpacity>
            <Dots name="arrow-up" color="#674188" size={36} />
          </TouchableOpacity>
          <Text>208</Text>
          <TouchableOpacity>
            <Dots name="arrow-down" color="#674188" size={36} />
          </TouchableOpacity>
        </Box>
        <Text style={{ padding: 20, fontSize: 20, lineHeight: 35 }}>
          {post.content}
        </Text>

        <Divider />
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <CommentList post={post} user={data} />
          <CreateComment post={post} user={data} />
        <Divider />
        </KeyboardAwareScrollView>
        <View
          style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
            }}
            >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            More Blogs like this
          </Text>
          <Icon name="arrow-right-thin" size={36} color="#674188" />
        </View>
        <ScrollView horizontal={true} style={{ padding: 10, marginTop: 10 }}>
          {arr.map(() => (
            <Box style={{ padding: 10 }}>
              <HStack space="md">
                <Center w="$64">
                  <VStack space="lg">
                    <Image
                      size="2xl"
                      borderRadius="$2xl"
                      source={{
                        uri: "https://i1.sndcdn.com/artworks-abCh030JyxQIQ6i6-Jb86lg-t500x500.png",
                      }}
                      alt="404"
                    />
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        letterSpacing: 4,
                        lineHeight: 40,
                      }}
                      numberOfLines={2}
                    >
                      24 h Cinderella Goro majima
                    </Text>
                    <HStack space="sm" style={{ alignItems: "center" }}>
                      <Avatar size="sm">
                        <AvatarFallbackText>SS</AvatarFallbackText>
                        <AvatarImage source={{ uri: data.pdp }} alt="404" />
                      </Avatar>
                      <Text style={{ color: "#674188" }}>Author name</Text>
                      <Text>.</Text>
                      <Text>8 days ago</Text>
                      <TouchableOpacity>
                        <Dots
                          name="dots-three-vertical"
                          size={16}
                          style={{ color: "#674188" }}
                        />
                      </TouchableOpacity>
                    </HStack>
                  </VStack>
                </Center>
              </HStack>
            </Box>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
  },
  headerComponentStyle: {
    marginVertical: 7,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default PostDetails;
