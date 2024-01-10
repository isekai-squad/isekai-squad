import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  ProfileContext,
  downVoteProject,
  getAllLikesProject,
  getUserLikes,
  upVoteProject,
} from "../../../../Context/ProfileContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { STYLES } from "../../../../../GlobalCss";

const Interaction = ({ projectId }) => {
  const { userId } = useContext(ProfileContext);

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

  const { data: UserProjectsLikes } = useQuery({
    queryKey: ["userLikes", userId],
    queryFn: () => getUserLikes(userId),
  });

  useEffect(() => {
    const likedProject = UserProjectsLikes?.find(
      (item) => item.projectId === projectId
    );
    setUpvoted(likedProject?.like === 1);
    setDownvoted(likedProject?.like === 0);
  }, [UserProjectsLikes, projectId]);

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const { mutateAsync: upVote } = useMutation({
    mutationFn: () => upVoteProject(userId, projectId),
  });
  const { mutateAsync: downVote } = useMutation({
    mutationFn: () => downVoteProject(userId, projectId),
  });

  const upVoteHandle = async () => {
    if (!upvoted) {
      await upVote();
      setUpvoted(true);
      setDownvoted(false);
      refetchLikes();
    } else {
      setUpvoted(false);
    }
  };

  const downVoteHandle = async () => {
    if (!downvoted) {
      await downVote();
      setUpvoted(false);
      setDownvoted(true);
      refetchLikes();
    } else {
      setDownvoted(false);
    }
  };

  return (
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
            color={upvoted ? "#00f" : "#e5e4e4"}
            size={STYLES.SIZES.sizeXL}
          />
          <Text style={{ fontWeight: STYLES.FONTS.bold }}>{projectLikes}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={downVoteHandle}>
          <Entypo
            name={"arrow-bold-down"}
            color={downvoted ? "#f00" : "#e5e4e4"}
            size={STYLES.SIZES.sizeXL}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.commentContainer}>
        <TextInput placeholder="Add a comment..." style={styles.commentInput} />
        <TouchableOpacity style={styles.commentButton}>
          <AntDesign name={"arrowright"} size={STYLES.SIZES.sizeL} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interaction;

const styles = StyleSheet.create({
  voteButtons: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  commentInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  commentButton: {
    borderRadius: 20,
    padding: 10,
    position: "absolute",
    right: 0,
  },
});
