import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Center, Image } from "@gluestack-ui/themed";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import Icon from "react-native-vector-icons/Feather";
import Dots from "react-native-vector-icons/Entypo";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";

const Post = ({ post, posts, category }) => {
  const navigation = useNavigation();
  const id = post.userId;

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

  const { data, isLoading, error } = useQuery({
    queryKey: ["forumUser", post.userId],
    queryFn: async () =>
      axios
        .get(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/user/${id}`)
        .then((res) => res.data),
  });
  if (isLoading)
    return (
      <Center>
        <ActivityIndicator size="large" color="#674188" />
      </Center>
    );

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("PostDetails", {
          post,
          user: data,
          posts,
          category,
        });
      }}
    >
      <Box h={200} style={Styles.container}>
        <Image
          size="xl"
          // style={{ marginLeft: 10 }}
          alt="404"
          source={{
            uri: post.images[0],
          }}
          borderRadius="$lg"
        />

        <View
          style={{ display: "flex", justifyContent: "center", marginLeft: 10 }}
        >
          <TouchableOpacity style={{ width: "50%" }}>
            <Text
              style={{
                lineHeight: 30,
                fontWeight: "bold",
                fontSize: 15,
                width: 200,
              }}
              numberOfLines={2}
              onPress={() => {
                navigation.navigate("PostDetails", {
                  post,
                  user: data,
                  posts,
                  category,
                });
              }}
            >
              {post.content}
            </Text>
          </TouchableOpacity>

          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
          >
            <Avatar size="xs" borderRadius="$full">
              <AvatarFallbackText>SS</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: data.pdp,
                }}
                alt="404"
              />
            </Avatar>
            <Text
              style={{ marginLeft: 10, color: "#674188" }}
              onPress={() => navigation.navigate("UserProfile")}
            >
              {data.name}
            </Text>
          </View>

          <View>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
            >
              <Text style={{ marginLeft: 10, color: "#674188" }}>
                {formatTimeDifference(post.created_at)} ago
              </Text>
              <TouchableOpacity>
                <Icon name="bookmark" size={24} style={{ marginLeft: 80 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Dots
                  name="dots-three-vertical"
                  size={22}
                  // style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Box>
    </Pressable>
  );
};
const Styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // paddingHorizontal: 5,
    flexDirection: "row",
    flex: 1,

    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 12,
    elevation: 5,
    shadowColor: "#52006A",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
    fontSize: 13,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {},
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  centerAlign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginRight: 12,
    marginTop: 6,
  },
  shadowProp: {
    shadowColor: "#171717",
    elevational: 20,
  },
  card: {
    backgroundColor: "#ebe3df",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    // marginVertical: 10,
  },
  elevation: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default Post;
