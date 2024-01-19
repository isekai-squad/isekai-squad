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
} from "../../../../Context/ProfileContext";
import { io } from "socket.io-client";
const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`);

import { useQuery, useMutation } from "@tanstack/react-query";
import { STYLES } from "../../../../../GlobalCss";
import CommentsInputs from "./CommentsProjectInputs";
import AllComments from "./AllProjectsComments";

const StudentPostsInteraction = ({ projectId, postOwner }) => {
  const { userId, refetchPosts, ProfileData } = useContext(ProfileContext);
  console.log("====================================");
  console.log(postOwner);
  console.log("====================================");
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const { mutateAsync: upVote } = useMutation({
    mutationFn: () => upVoteProject(userId, projectId),
  });

  const { mutateAsync: downVote } = useMutation({
    mutationFn: () => downVoteProject(userId, projectId),
  });

  const { data: projectLikes, refetch: refetchAllLikes } = useQuery({
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

    socket.emit("sendNotification", {
      sender: userId,
      receiver: postOwner,
      content: `${ProfileData.name} has liked your Project`,
      type: "Project",
      postId: projectId,
    });

    refetchAllLikes();
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
    refetchAllLikes();
    refetchUserLikes();

    if (!downvoted) {
      setUpvoted(false);
      setDownvoted(true);
    } else {
      setDownvoted(false);
    }
  };
  if (refetchPosts) {
    refetchProjectComments();
    refetchUserLikes();
    refetchAllLikes();
  }

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
          postOwner={postOwner}
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
