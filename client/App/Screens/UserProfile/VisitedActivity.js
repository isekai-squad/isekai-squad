import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import { STYLES } from "../../../GlobalCss";
import RenderPost from "../../component/ProfileComponants/Render_Posts_Project/RenderPost";

import {
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
      {data?.pages[0]?.length <= 0 && visitedProfileData.role === "STUDENT" && (
        <Text
          style={{
            color: STYLES.COLORS.ShadowColor,
            width: "90%",
            textAlign: "center",
            alignSelf: "center",
            top: "20%",
            letterSpacing: 1.5,
            lineHeight: 30,
          }}
        >
          <Text>
            Currently, there are no active projects associated with this
            student.
          </Text>
          <Text>
            We encourage initiating a new project to showcase and highlight
            their valuable work!
          </Text>
        </Text>
      )}

      {data?.pages[0]?.length <= 0 && visitedProfileData.role !== "STUDENT" && (
        <Text
          style={{
            color: STYLES.COLORS.ShadowColor,
            width: "90%",
            textAlign: "center",
            alignSelf: "center",
            top: "50%",
            letterSpacing: 1.5,
            lineHeight: 30,
          }}
        >
          {visitedProfileData.role === "ADVISOR" ? (
            <>
              <Text>
                Regrettably, there are currently no published posts by this
                advisor.
              </Text>
              <Text>
                We encourage sharing insights and experiences to enhance
                community engagement.
              </Text>
            </>
          ) : (
            <>
              <Text>
                Apologies, but this company has not posted any content yet.
              </Text>
              <Text>
                We invite you to contribute by sharing valuable updates or
                insights with the community.
              </Text>
            </>
          )}
        </Text>
      )}

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
