import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { formatTimeDifference } from "../../../../Context/ProfileContext";
import CommentsInputs from "./CommentsInputs";
const AllComments = ({ projectsComments }) => {
  return (
    projectsComments?.length > 0 && (
      <View style={styles.container}>
        {projectsComments.map((comment, index) => (
          <CommentItem key={index} comment={comment} />
        ))}
      </View>
    )
  );
};

const CommentItem = ({ comment }) => {
  const { content, created_at, likes, User, images } = comment;
  const [replyInput, setReplyInput] = useState(false);

  const handleReplyClick = () => {
    setReplyInput(!replyInput);
  };

  return (
    <View style={styles.commentContainer}>
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
        {images && <Image source={{ uri: images }} width={150} height={150} />}
      </View>
      <View style={{flex:1}}>
        <View style={styles.metaContainer}>
          <Text style={styles.timeText}>
            {formatTimeDifference(created_at)}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.likesText}>{`${
              likes?.length || 0
            } Likes`}</Text>
            <TouchableOpacity onPress={handleReplyClick}>
              <Text>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
        {replyInput && <CommentsInputs />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "80%",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
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
  },
  commentText: {
    fontSize: 14,
    color: "#555",
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

export default AllComments;
