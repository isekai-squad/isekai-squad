import React, { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ProfileContext, useFetchStudentProjects } from "../../../Context/ProfileContext";
import Post from "./components/Post";

const Activity = () => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage ,refetch} = useFetchStudentProjects();
  const projects = data?.pages.flatMap((page) => page.data)



  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FlashList
        keyExtractor={(item) => item.id}
        data={projects}
        renderItem={({ item }) => <Post sortedProjects={item} />}
        onEndReached={loadNextPageData}
      
        estimatedItemSize={100}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#fff",
    paddingBottom: 100,
  },
});

export default Activity;