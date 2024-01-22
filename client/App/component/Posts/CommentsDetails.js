import { Box, Center, View } from "@gluestack-ui/themed";
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import { useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";


const CommentsDetails = ({route}) => {
  const [commentId , setCommentId] = useState("")
    const { post } = route.params
    const navigation = useNavigation()

    const modalizeRef = useRef(null);

    const onOpen = (id) => {
      setCommentId(id);
      modalizeRef.current?.open();
    };
    const closeModal = () => modalizeRef.current?.close();

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
          <ScrollView>
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
              <Comment comment={comment} key={comment.id} onOpen={onOpen} />
            ))}
            <CreateComment post={post} refetch={refetch} />
          </View>
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
          <TouchableOpacity style={styles.btnTouchable}>
            <Text style={styles.btnText}>About This Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={{ paddingTop: 20 }}>
            <Text style={{ ...styles.btnText, color: "red" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
                </ScrollView>
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
    })

export default CommentsDetails;