import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
  ActivityIndicator,
  ToastAndroid,
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
import CommentList from "./CommentList";
import { Box, Divider } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import Dots from "react-native-vector-icons/Entypo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swiper from "react-native-swiper";
import io from 'socket.io-client';

const socket = io(`http://${process.env.EXPO_PUBLIC_API_URL}:4070`)

const PostDetails = ({ route }) => {
  const [liked , setLiked] = useState(false)
  const [disliked , setDisliked] = useState(false)
  const navigation = useNavigation();
  const { post, user, posts, category } = route.params;

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

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["likes"],
    queryFn: async () =>
      await axios
        .get(
          `http://${process.env.EXPO_PUBLIC_API_URL}:4070/forumPost/likes/${post.id}`
        )
        .then((res) => res.data)
        .catch((err) => console.error(err)),
    select: (data) => {
      const Nlikes = data.filter((item) => item.like === 1);
      const Ndislikes = data.filter((item) => item.like === 0);
      return Nlikes?.length - Ndislikes?.length;
    },
  });

  // if (isLoading){

  //   return (
  //     <Center>
  //       <ActivityIndicator size="large" color="#674188" />
  //     </Center>
  //   )
  // }

  const mutation = useMutation({
    mutationFn: async () =>
      await axios
        .post(
          `http://${process.env.EXPO_PUBLIC_API_URL}:4070/forumPost/increment/${post.id}/${user.id}`
        )
        .then((res) => console.log("liked"))
        .then(() => socket.emit('') )
        .catch((err) => console.error(err)),
    onSuccess: () => refetch(),
  });

  return (
    <ScrollView>
      <View as={SafeAreaView} style={styles.container}>
        <Swiper height={400}>
          {post.images.map((image) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                alt="404"
                source={{ uri: image }}
                style={{ width: "100%", height: 400 }}
                resizeMode="stretch"
              />
            </View>
          ))}
        </Swiper>
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
            <Icon name="bookmark-minus" color="#674188" size={36} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="dots-horizontal-circle"
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
        <HStack style={{ padding: 10 }} space="4xl">
          <HStack>
            <Avatar size="lg">
              <AvatarFallbackText>SS</AvatarFallbackText>
              <AvatarImage source={{ uri: user.pdp }} alt="404" />
            </Avatar>
            <View style={{ marginLeft: 30 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 21, color: "#674188" }}
                onPress={() => navigation.navigate("UserProfile")}
              >
                {user.name}
              </Text>
              <Text style={{ fontWeight: 200, fontSize: 19 }}>
                @{user.userName}
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
              onPress={() => ToastAndroid.show("followed." , ToastAndroid.SHORT)}
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
            justifyContent : 'space-between'
          }}
        >
          <HStack flexDirection="row" alignItems="center" space="xl">
            <Button size="sm" variant="outline" borderColor="#674188">
              <ButtonText color="#674188">{category.name}</ButtonText>
            </Button>
            <Text style={{ marginLeft: 10, fontWeight: 300 }}>
              {formatTimeDifference(post.created_at)} ago
            </Text>
          </HStack>
          <Center>
            <TouchableOpacity>
              <Icon
                name={liked ? 'arrow-up-bold' : 'arrow-up-bold-outline'}
                color="#674188"
                size={36}
                onPress={() =>{ mutation.mutate() ; setLiked(true)}}
              />
            </TouchableOpacity>
            <Text>{data}</Text>
            <TouchableOpacity>
              <Icon name={disliked ? 'arrow-down-bold' : 'arrow-down-bold-outline'} color="#674188" size={36} />
            </TouchableOpacity>
          </Center>
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
          <CommentList post={post} user={user} />
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
          {posts?.map((post) => (
            <Box style={{ padding: 10 }} key={post.id}>
              <HStack space="md">
                <Center w="$64">
                  <VStack space="lg">
                    <Image
                      size="2xl"
                      borderRadius="$2xl"
                      source={{
                        uri: post.images[0],
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
                      onPress={() =>
                        navigation.navigate("PostDetails", {
                          post,
                          user,
                          posts,
                        })
                      }
                    >
                      {post.content}
                    </Text>
                    <HStack space="sm" style={{ alignItems: "center" }}>
                      <Avatar size="sm">
                        <AvatarFallbackText>SS</AvatarFallbackText>
                        <AvatarImage source={{ uri: user.pdp }} alt="404" />
                      </Avatar>
                      <Text style={{ color: "#674188" }}>{user.name}</Text>
                      <Text>.</Text>
                      <Text>{formatTimeDifference(post.created_at)}</Text>
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
