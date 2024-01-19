import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import {
  ProfileContext,
  addLikeReplyCommentProject,
  formatTimeDifference,
} from "../../../../Context/ProfileContext";
import { STYLES } from "../../../../../GlobalCss";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useMutation } from "@tanstack/react-query";
import { io } from "socket.io-client";
const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`);

const AllReplyComments = ({ comment, refetchReplyComments}) => {
  const { id, content, created_at, likes, User, image } = comment;

  const { userId,ProfileData } = useContext(ProfileContext);

  // ==============================================

  const { mutateAsync: upLikeReplyComment } = useMutation({
    mutationFn: (projectCommentId) =>
      addLikeReplyCommentProject(userId, projectCommentId),
  });
  const [activeReplyLikeComment, setActiveLikeReplyComment] = useState(
    likes.some((like) => like.userid === userId)
  );

  const likeReplyComment = async () => {
    await upLikeReplyComment(id);
    // socket.emit("sendNotification", {
    //   sender: userId,
    //   receiver: User.id,
    //   content: `${ProfileData.name} has liked your Project`,
    //   type: "Project",
    //   postId: projectId,
    // });
    setActiveLikeReplyComment((prev) => !prev);
    refetchReplyComments();
  };

  useEffect(() => {
    setActiveLikeReplyComment(likes.some((like) => like.userId === userId));
  }, [likes, userId]);

  // ==============================================
  return (
    <View style={styles.replyContainer}>
      <View style={styles.userContainer}>
        {User && (
          <>
            <Image source={{ uri: User.pdp }} style={styles.userImage} />
            <Text style={styles.userName}>{User.name}</Text>
          </>
        )}
      </View>
      <View>
        <Text style={styles.commentText}>{content || "No comment"}</Text>
        {image && <Image source={{ uri: image }} width={150} height={150} />}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.metaContainer}>
          <Text style={styles.timeText}>
            {formatTimeDifference(created_at)}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
              onPress={likeReplyComment}
            >
              <AntDesign
                name={activeReplyLikeComment ? "heart" : "hearto"}
                color={"red"}
                size={STYLES.SIZES.sizeL}
              />
            </TouchableOpacity>
            <Text style={styles.likesText}>{`${
              likes?.length || 0
            } Likes`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AllReplyComments;

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
});
