import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  VirtualizedList,
} from "react-native";
import {
  ProfileContext,
  useFetchStudentProjects,
} from "../../../Context/ProfileContext";

import { STYLES } from "../../../../GlobalCss";
import RenderPost from "./components/RenderPost";
import { useContext, useEffect } from "react";

const Activity = () => {
  const { userId } = useContext(ProfileContext);
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch: refetchProject,
  } = useFetchStudentProjects(userId);

  const projects = data?.pages?.map((page) => page).flat();

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
        data={projects}
        onEndReached={loadNextPageData}
        renderItem={({ item }) => (
          <RenderPost refetchProject={refetchProject} item={item} />
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
