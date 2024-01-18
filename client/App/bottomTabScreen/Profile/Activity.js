import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

import { STYLES } from "../../../GlobalCss";
import RenderPost from "../../component/ProfileComponants/Render_Posts_Project/RenderPost";
import { useContext, useEffect } from "react";
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

  // render componants
  if (refetchPosts) {
    refetchAllPosts();
  }

  //map into data
  return (
    <View style={styles.container}>
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
});

export default Activity;
