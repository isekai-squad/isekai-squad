import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

import { VisitProfileContext } from "../../../Context/VisitProfileContext";
import { STYLES } from "../../../../GlobalCss";
import RenderPost from "./components/RenderPost";
import { useContext } from "react";
import {
  useFetchStudentProjects,
  useFetchUserPosts,
} from "../../../Context/ProfileContext";

const Activity = () => {
  const { visitedProfileId, visitedProfileData } =
    useContext(VisitProfileContext);

  let data, isLoading, hasNextPage, fetchNextPage, refetchPosts;
  if (visitedProfileData.role!=="STUDENT") {
    const {
      data: posts,
      isLoading: userPostsLoading,
      hasNextPage: userPostsHasNextPage,
      fetchNextPage: userPostsFetchNextPage,
      refetch: userPostsRefetch,
    } = useFetchUserPosts(2);

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
    } = useFetchStudentProjects(visitedProfileId);

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
