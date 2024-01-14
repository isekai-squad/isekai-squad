import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {
  ProfileContext,
  downVoteProject,
  getAllLikesProject,
  getAllProjectsComments,
  getUserLikes,
  upVoteProject,
} from "../../../../../Context/ProfileContext";

import { useQuery, useMutation } from "@tanstack/react-query";
import { STYLES } from "../../../../../../GlobalCss";
import CommentsInputs from "./CommentsProjectInputs";
import AllComments from "./AllProjectsComments";

const StudentPostsInteraction = ({ projectId }) => {
  const { userId } = useContext(ProfileContext);

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const { mutateAsync: upVote } = useMutation({
    mutationFn: () => upVoteProject(userId, projectId),
  });

  const { mutateAsync: downVote } = useMutation({
    mutationFn: () => downVoteProject(userId, projectId),
  });

  const { data: projectLikes, refetch: refetchLikes } = useQuery({
    queryKey: ["projectLikes", projectId],
    queryFn: () => getAllLikesProject(projectId),
    select: (data) => {
      const oneLikeArray = data.filter((item) => item.like === 1);
      const zeroLikesArray = data.filter((item) => item.like === 0);
      const totalLikes = oneLikeArray?.length - zeroLikesArray?.length;
      return totalLikes;
    },
  });

  const { data: UserProjectsLikes, refetch: refetchUserLikes } = useQuery({
    queryKey: ["userLikes", userId],
    queryFn: () => getUserLikes(userId),
  });

  const { data: projectsComments, refetch: refetchProjectComments } = useQuery({
    queryKey: ["projectComments", projectId],
    queryFn: () => getAllProjectsComments(projectId),
  });

  const upVoteHandle = async () => {
    await upVote();
    refetchLikes();
    refetchUserLikes();
    if (!upvoted) {
      setUpvoted(true);
      setDownvoted(false);
    } else {
      setUpvoted(false);
    }
  };

  const downVoteHandle = async () => {
    await downVote();
    refetchLikes();
    refetchUserLikes();
    if (!downvoted) {
      setUpvoted(false);
      setDownvoted(true);
    } else {
      setDownvoted(false);
    }
  };

  useEffect(() => {
    const likedProject = UserProjectsLikes?.find(
      (item) => item.projectId === projectId
    );
    setUpvoted(likedProject?.like === 1);
    setDownvoted(likedProject?.like === 0);
  }, [UserProjectsLikes, projectId]);

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginTop: 10,
        }}
      >
        <View style={styles.voteButtons}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={upVoteHandle}
          >
            <Entypo
              name={"arrow-bold-up"}
              color={upvoted ? STYLES.COLORS.Priamary : "#e5e4e4"}
              size={STYLES.SIZES.sizeXL}
            />
            <Text style={{ fontWeight: STYLES.FONTS.bold }}>
              {projectLikes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={downVoteHandle}>
            <Entypo
              name={"arrow-bold-down"}
              color={downvoted ? "tomato" : "#e5e4e4"}
              size={STYLES.SIZES.sizeXL}
            />
          </TouchableOpacity>
        </View>

        <CommentsInputs
          projectId={projectId}
          refetchProjectComments={refetchProjectComments}
        />
      </View>
      <AllComments
        projectsComments={projectsComments}
        refetchProjectComments={refetchProjectComments}
      />
    </View>
  );
};

export default StudentPostsInteraction;

const styles = StyleSheet.create({
  voteButtons: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
});
