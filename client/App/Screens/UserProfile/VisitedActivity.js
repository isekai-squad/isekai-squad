import React, { useContext } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";

import { STYLES } from "../../../GlobalCss";
import RenderPost from "../../component/ProfileComponants/Render_Posts_Project/RenderPost";

import {
  ProfileContext,
  useFetchStudentProjects,
  useFetchUserPosts,
} from "../../Context/ProfileContext";
import { VisitProfileContext } from "../../Context/VisitProfileContext";

const Activity = () => {
  const { visitedProfileData, refetchVisitedPosts } =
    useContext(VisitProfileContext);
  const route = useRoute();
  const id = route.params.id;

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch: refetchPosts,
  } = visitedProfileData.role !== "STUDENT"
    ? useFetchUserPosts(id)
    : useFetchStudentProjects(id);

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  if (refetchVisitedPosts) {
    refetchPosts();
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data?.pages?.map((page) => page).flat() ?? []}
        onEndReached={loadNextPageData}
        renderItem={({ item }) => (
          <RenderPost refetchPosts={refetchPosts} item={item} />
        )}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasNextPage && (
            <ActivityIndicator
              size="large"
              color={STYLES.COLORS.Priamary}
              style={styles.loadingIndicator}
            />
          )
        }
      />
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={STYLES.COLORS.Priamary}
          style={styles.loadingIndicator}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 100,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default Activity;
