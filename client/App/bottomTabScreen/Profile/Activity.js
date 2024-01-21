import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";

import { STYLES } from "../../../GlobalCss";
import RenderPost from "../../component/ProfileComponants/Render_Posts_Project/RenderPost";
import {
  ProfileContext,
  useFetchStudentProjects,
  useFetchUserPosts,
} from "../../Context/ProfileContext";

const Activity = () => {
  const { userId, ProfileData, refetchPosts } = useContext(ProfileContext);

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch: refetchAllPosts,
  } = ProfileData.role !== "STUDENT"
    ? useFetchUserPosts(userId)
    : useFetchStudentProjects(userId);

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // Refetch posts on mount or when needed
  useEffect(() => {
    if (refetchPosts) {
      refetchAllPosts();
    }
  }, [refetchPosts]);

  return (
    <View style={styles.container}>
      {(!data?.pages[0]?.length || !data) && ProfileData.role === "STUDENT" && (
        <Text style={styles.infoText}>
          You don't have any projects at the moment. Feel free to start a new
          project and showcase your work!
        </Text>
      )}

      {(!data?.pages[0]?.length || !data) && ProfileData.role !== "STUDENT" && (
        <Text style={styles.infoText}>
          It appears that you don't have any posts yet. Share your thoughts,
          experiences, or updates with the community!
        </Text>
      )}

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data?.pages?.map((page) => page).flat() ?? []}
        onEndReached={loadNextPageData}
        renderItem={({ item }) => (
          <RenderPost refetchPosts={refetchAllPosts} item={item} />
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
  infoText: {
    color: STYLES.COLORS.ShadowColor,
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    top: "100%",
    letterSpacing: 1.5,
    lineHeight: 30,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default Activity;
