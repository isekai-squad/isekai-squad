import { Box, Center, View } from "@gluestack-ui/themed";
import React from "react";
import { ScrollView } from "react-native-virtualized-view";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import { useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";


const CommentsDetails = ({route}) => {
    const { post } = route.params
    const navigation = useNavigation()
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
            <Icon name="arrow-left-thin" size={50} color="#674188" onPress={() => navigation.goBack()}/>
            <Box
              style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Comments ({data.length})</Text>
            </Box>
            {data.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
            <CreateComment post={post} refetch={refetch} />
          </View>
        );
      }
      const styles = StyleSheet.create({
        container: {
          color: "#2a2263",
          padding: 5,
          marginBottom: 7,
          elevation: 1,
          paddingHorizontal: 10,
          paddingVertical : 40
        },
    })

export default CommentsDetails;