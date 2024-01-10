import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { STYLES } from "../../../../../GlobalCss";
import Interaction from "./Interaction";
import { ProfileContext } from "../../../../Context/ProfileContext";
import moment from "moment";

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

const Post = ({ sortedProjects }) => {
  const { profileImage, ProfileData } = useContext(ProfileContext);
  console.log(sortedProjects);
  return (
    <>
      {sortedProjects ? (
        <View key={sortedProjects.id} style={styles.postContainer}>
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
                {formatTimeDifference(sortedProjects.created_at)}
              </Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => handleDelete(sortedProjects.id)}>
                <AntDesign name={"delete"} size={STYLES.SIZES.sizeL} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUpdate(sortedProjects.id)}>
                <AntDesign name={"edit"} size={STYLES.SIZES.sizeL} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.postInfoContainer}>
            <Text style={styles.postTitle}>{sortedProjects.title}</Text>
            <Text style={styles.projectDescription}>
              {sortedProjects.description}
            </Text>
          </View>
          <View style={styles.fileContainer}>
            {sortedProjects.content.map((fileUrl, index) => (
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
            {sortedProjects.images.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={styles.postImage}
              />
            ))}
          </Swiper>
          <Interaction
            projectId={sortedProjects.id}
            comments={sortedProjects.comment}
          />
        </View>
      ) : (
        <Text style={styles.noPostsText}>No posts available</Text>
      )}
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
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
});
