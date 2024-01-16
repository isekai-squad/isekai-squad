import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {
  ProfileContext,
  downVotePost,
  getAllLikesPosts,
  getAllPostsComments,
  getUserLikes,
  upVotePost,
} from "../../../../Context/ProfileContext";

import { useQuery, useMutation } from "@tanstack/react-query";
import { STYLES } from "../../../../../GlobalCss";
import CommentsInputs from "./CommentsPostsInputs";
import AllComments from "./AllPostsComments";

const CompanyAdvisorPostsInteraction = ({ postId }) => {
  const { userId, refetchPosts } = useContext(ProfileContext);

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const { mutateAsync: upVote } = useMutation({
    mutationFn: () => upVotePost(userId, postId),
  });
  const { mutateAsync: downVote } = useMutation({
    mutationFn: () => downVotePost(userId, postId),
  });

  const { data: postLikes, refetch: refetchPostsLikes } = useQuery({
    queryKey: ["postLikes", postId],
    queryFn: () => getAllLikesPosts(postId),
    select: (data) => {
      const oneLikeArray = data.filter((item) => item.like === 1);
      const zeroLikesArray = data.filter((item) => item.like === 0);
      const totalLikes = oneLikeArray?.length - zeroLikesArray?.length;
      return totalLikes;
    },
  });

  const { data: UserPostLikes, refetch: refetchUserPostLikes } = useQuery({
    queryKey: ["userLikes", userId],
    queryFn: () => getUserLikes(userId),
  });

  const { data: postsComments, refetch: refetchPostsComments } = useQuery({
    queryKey: ["projectComments", postId],
    queryFn: () => getAllPostsComments(postId),
  });

  const upVoteHandle = async () => {
    await upVote();
    refetchPostsLikes();
    refetchUserPostLikes();
    if (!upvoted) {
      setUpvoted(true);
      setDownvoted(false);
    } else {
      setUpvoted(false);
    }
  };

  const downVoteHandle = async () => {
    await downVote();
    refetchPostsLikes();
    refetchUserPostLikes();
    if (!downvoted) {
      setUpvoted(false);
      setDownvoted(true);
    } else {
      setDownvoted(false);
    }
  };

  if (refetchPosts) {
    refetchPostsLikes();
    refetchUserPostLikes();
    refetchPostsComments();
  }
  useEffect(() => {
    const likedPosts = UserPostLikes?.find((item) => item.postId === postId);
    setUpvoted(likedPosts?.like === 1);
    setDownvoted(likedPosts?.like === 0);
  }, [UserPostLikes, postId]);

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
            <Text style={{ fontWeight: STYLES.FONTS.bold }}>{postLikes}</Text>
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
          postsCommentsId={postId}
          refetchPostsComments={refetchPostsComments}
        />
      </View>
      <AllComments
        postComments={postsComments}
        refetchPostsComments={refetchPostsComments}
      />
    </View>
  );
};

export default CompanyAdvisorPostsInteraction;

const styles = StyleSheet.create({
  voteButtons: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
});
