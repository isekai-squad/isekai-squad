import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Swiper from "react-native-swiper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";
import { STYLES } from "../../../../GlobalCss";
import { ProfileContext } from "../../../Context/ProfileContext";

const formatTimeDifference = (createdAt) => {
  const now = moment();
  const postTime = moment(createdAt, "YYYY-MM-DD HH:mm");
  const duration = moment.duration(now.diff(postTime));
  if (duration.asMinutes() < 60) {
    // Less than 60 minutes
    return moment.duration(duration).humanize(true);
  } else if (duration.asHours() < 24) {
    // Less than 24 hours
    const hours = Math.floor(duration.asHours());
    return `${hours}h`;
  } else {
    // More than 24 hours
    const days = Math.floor(duration.asDays());
    return days === 1 ? "one day" : `${days} days`;
  }
};

const Activity = () => {
  const { profilePosts, profileImage, ProfileData } =
    useContext(ProfileContext);


  const sortedPosts = profilePosts
    ? profilePosts.sort((post1, post2) => {
        const date1 = moment(post1.created_at, "YYYY-MM-DD HH:mm");
        const date2 = moment(post2.created_at, "YYYY-MM-DD HH:mm");
        return date2 - date1;
      })
    : [];

  return (
    <ScrollView style={styles.container}>
      {sortedPosts.length ? (
        sortedPosts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <View style={styles.userContainer}>
              <View style={styles.userInfoContainer}>
                <View style={styles.footerContainer}>
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.userImage}
                  />
                  <Text style={styles.userName}>{ProfileData.name}</Text>
                </View>
                <Text style={styles.createdAt}>
                  {formatTimeDifference(post.created_at)}
                </Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleDelete(post.id)}>
                  <AntDesign name={"delete"} size={STYLES.SIZES.sizeL} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleUpdate(post.id)}>
                  <AntDesign name={"edit"} size={STYLES.SIZES.sizeL} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.postInfoContainer}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.projectDescription}>{post.description}</Text>
            </View>
            <View style={styles.fileContainer}>
              {post.content.map((fileUrl, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => Linking.openURL(fileUrl)}
                  style={styles.filebtn}
                >
                  <AntDesign name={"filetext1"} size={STYLES.SIZES.sizeL} />
                  <Text style={styles.fileLink}>
                    {fileUrl.split("/").reverse()[0].split(".").pop()} File
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Swiper
              style={styles.swiperContainer}
              showsButtons={false}
              autoplayTimeout={3}
              autoplay
            >
              {post.images.map((imageUrl, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={styles.postImage}
                />
              ))}
            </Swiper>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: 10,
              }}
            >
              <View style={styles.voteButtons}>
                <TouchableOpacity style={{ alignItems: "center" }}>
                  <Entypo
                    name={"arrow-bold-up"}
                    color={"#e5e4e4"}
                    size={STYLES.SIZES.sizeXL}
                  />
                  <Text style={{ fontWeight: STYLES.FONTS.bold }}>212</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo
                    name={"arrow-bold-down"}
                    color={"#e5e4e4"}
                    size={STYLES.SIZES.sizeXL}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.commentContainer}>
                <TextInput
                  placeholder="Add a comment..."
                  style={styles.commentInput}
                />
                <TouchableOpacity style={styles.commentButton}>
                  <AntDesign name={"arrowright"} size={STYLES.SIZES.sizeL} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noPostsText}>No posts available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  swiperContainer: {
    height: 300,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 15,
    marginRight: 20,
  },
  postContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    elevation: 3,
    shadowColor: STYLES.COLORS.ShadowColor,
  },
  postImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  postInfoContainer: {
    paddingHorizontal: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  projectDescription: {
    fontSize: 14,
    color: "#555",
  },
  fileLink: {
    fontSize: 14,
    color: "black",
    textTransform: "uppercase",
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingVertical: 10,
  },
  filebtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: "#eee",
    marginLeft: 15,
    gap: 4,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  createdAt: {
    fontSize: 12,
    color: "#888",
  },
  noPostsText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
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

export default Activity;
