import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Box, Center } from "@gluestack-ui/themed";
import Comment from "./Comment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ForumContext } from "../../Context/ForumContext";
import CreateComment from "./CreateComment";

const CommentList = ({ post, user }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Comments", post],
    queryFn: async () =>
      axios
        .get(
          `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/forumComment/${post.id}`
        )
        .then((res) => res.data),
  });
  if (isLoading) {
    // setRefetch(refetch)
    return (
      <Center>
        <ActivityIndicator size="large" color="#674188" />
      </Center>
    );
  }

  return (
    <View style={styles.container}>
      <Box
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Comments ({data.length})</Text>
        <Icon name="arrow-right-thin" size={24} color="#674188" />
      </Box>
      {data.map((comment) => (
        <Comment comment={comment} user={user} key={comment.id} />
      ))}
      <CreateComment post={post} user={user} refetch={refetch} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    color: "#2a2263",
    padding: 5,
    marginBottom: 7,
    elevation: 1,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#ebe3df",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#664087",
  },
  headerRight: {
    flexDirection: "row",
  },
  body: {
    marginTop: 5,
    padding: 5,
  },
  authorName: {
    marginRight: 10,
    fontFamily: "OpenSans-Bold",
  },
  trash: {
    marginLeft: 10,
  },
  regularFont: {
    fontFamily: "OpenSans-Regular",
  },
  dateText: {
    //   fontFamily: 'OpenSans-Italic',
    fontSize: 12,
  },
});

export default CommentList;
