import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

import { STYLES } from "../../../GlobalCss";
import RenderPost from "../../component/ProfileComponants/RenderPosts/RenderPost";
import { useContext, useEffect } from "react";
import {
  ProfileContext,
  useFetchStudentProjects,
  useFetchUserPosts,
} from "../../Context/ProfileContext";
import { VisitProfileContext } from "../../Context/VisitProfileContext";

const Activity = () => {
  const { userId, ProfileData } = useContext(ProfileContext);

  let data, isLoading, hasNextPage, fetchNextPage, refetchPosts;

  if (ProfileData.role !== "STUDENT") {
    const {
      data: posts,
      isLoading: userPostsLoading,
      hasNextPage: userPostsHasNextPage,
      fetchNextPage: userPostsFetchNextPage,
      refetch: userPostsRefetch,
    } = useFetchUserPosts(userId);

    data = posts;
    isLoading = userPostsLoading;
    hasNextPage = userPostsHasNextPage;
    fetchNextPage = userPostsFetchNextPage;
    refetchPosts = userPostsRefetch;
  } else {
    const {
      data: projects,
      isLoading: projectsLoading,
      hasNextPage: projectsHasNextPage,
      fetchNextPage: projectsFetchNextPage,
      refetch: projectsRefetch,
    } = useFetchStudentProjects(userId);

    data = projects;
    isLoading = projectsLoading;
    hasNextPage = projectsHasNextPage;
    fetchNextPage = projectsFetchNextPage;
    refetchPosts = projectsRefetch;
  }

  const posts = data?.pages?.map((page) => page).flat();

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // render componants

  const keyExtractor = (_, index) => index.toString();

  //map into data
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={posts}
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
});

export default Activity;
