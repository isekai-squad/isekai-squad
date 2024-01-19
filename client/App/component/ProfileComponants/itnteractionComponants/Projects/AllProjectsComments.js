import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  ProfileContext,
  addLikeCommentProject,
  formatTimeDifference,
  getAllProjectsReplyComments,
} from "../../../../Context/ProfileContext";
import CommentsInputs from "./CommentsProjectInputs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { STYLES } from "../../../../../GlobalCss";
import AllReplyComments from "./AllReplyProjectComments";
import AntDesign from "react-native-vector-icons/AntDesign";

const AllComments = ({ projectsComments, refetchProjectComments }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const visibleComments = showAllComments
    ? projectsComments
    : projectsComments?.slice(0, 2);

  const handleShowMoreComments = () => {
    setShowAllComments(true);
  };

  if (visibleComments?.length) {
    return (
      <View style={styles.container}>
        {visibleComments.map((comment, index) => (
          <CommentItem
            key={index}
            comment={comment}
            refetchProjectComments={refetchProjectComments}
          />
        ))}
        {projectsComments.length > 2 && !showAllComments && (
          <TouchableOpacity
            onPress={handleShowMoreComments}
            style={[styles.showMoreButton, { justifyContent: "flex-end" }]}
          >
            <Text style={styles.showMoreButtonText}>Show more comments</Text>
            <AntDesign name={"pluscircleo"} size={STYLES.SIZES.sizeM} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
};

const CommentItem = ({ comment, refetchProjectComments }) => {
  const { id, content, created_at, likes, User, images } = comment;
  const [replyInput, setReplyInput] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);

  const { refetchPosts, userId } = useContext(ProfileContext);

  // ================LIKE COMMENT==================
  const { data: projectsReplyComments, refetch: refetchReplyComments } =
    useQuery({
      queryKey: ["projectReplyComments", id],
      queryFn: () => getAllProjectsReplyComments(id),
    });

  const { mutateAsync: upLikeComment } = useMutation({
    mutationFn: (projectCommentId) =>
      addLikeCommentProject(userId, projectCommentId),
  });
  const [activeLikeComment, setActiveLikeComment] = useState(
    likes.some((like) => like.userid === userId)
  );

  const likeComment = async () => {
    await upLikeComment(id);
    setActiveLikeComment((prev) => !prev);
    refetchProjectComments();
  };

  useEffect(() => {
    setActiveLikeComment(likes.some((like) => like.userId === userId));
  }, [likes, userId]);

  // =================LIKE COMMENT===================

  // =================SHOW MORE COMMENTS===================
  if (refetchPosts) {
    refetchReplyComments();
  }
  const visibleReplies = showAllReplies
    ? projectsReplyComments
    : projectsReplyComments?.slice(0, 2);

  const handleReplyClick = useCallback(() => {
    setReplyInput(!replyInput);
    refetchReplyComments();
  });

  const handleShowMoreReplies = () => {
    setShowAllReplies(true);
    refetchReplyComments();
  };
  // ================SHOW MORE COMMENTS======================================

  return (
    <View style={styles.commentContainer}>
      {/* ====================== */}
      <View style={styles.userContainer}>
        {User && (
          <>
            <Image source={{ uri: User.pdp }} style={styles.userImage} />
            <Text style={styles.userName}>{User.name}</Text>
          </>
        )}
      </View>
      {/* ====================== */}
      <View>
        <Text style={styles.commentText}>{content || "No comment"}</Text>
        {images && <Image source={{ uri: images }} width={150} height={150} />}
      </View>
      {/* ====================== */}
      <View style={{ flex: 1 }}>
        <View style={styles.metaContainer}>
          <Text style={styles.timeText}>
            {formatTimeDifference(created_at)}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
              onPress={likeComment}
            >
              <AntDesign
                name={activeLikeComment ? "heart" : "hearto"}
                color={"red"}
                size={STYLES.SIZES.sizeL}
              />
            </TouchableOpacity>
            <Text style={styles.likesText}>{`${
              likes?.length || 0
            } Likes`}</Text>
            <TouchableOpacity onPress={handleReplyClick}>
              <Text>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
        {replyInput && (
          <CommentsInputs
            commentType={"reply"}
            replyCommentId={id}
            showReplyInput={setReplyInput}
          />
        )}
      </View>
      {/* ====================== */}
      {Array.isArray(visibleReplies) &&
        visibleReplies.map((replyComment, index) => (
          <AllReplyComments
            key={index}
            comment={replyComment}
            refetchReplyComments={refetchReplyComments}
            
          />
        ))}
      {/* ===================== */}
      {projectsReplyComments?.length > 2 && !showAllReplies && (
        <TouchableOpacity
          onPress={handleShowMoreReplies}
          style={styles.showMoreButton}
        >
          <Text style={styles.showMoreButtonText}>Show more Reply</Text>
          <AntDesign name={"pluscircleo"} size={STYLES.SIZES.sizeM} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "90%",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 2,
    elevation: 2,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  userImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  commentContainer: {
    marginTop: 5,
    overflow: "hidden",
    paddingVertical: 2,
  },
  replyContainer: {
    marginTop: 5,
    borderLeftColor: STYLES.COLORS.ShadowColor,
    borderLeftWidth: 1,
    overflow: "hidden",
    backgroundColor: "#fffbfb",
    padding: 10,
    paddingLeft: 20,
    paddingVertical: 2,
    borderBottomLeftRadius: 15,
  },
  commentText: {
    fontSize: 14,
    color: "#555",
    overflow: "hidden",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  timeText: {
    fontSize: 12,
    color: "#888",
  },
  likesText: {
    fontSize: 12,
    color: "#333",
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
  },
  showMoreButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default AllComments;
