import React, { useCallback } from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Swiper from "react-native-swiper";
import Interaction from "../../../component/ProfileComponants/itnteractionComponants/Interaction";
import { STYLES } from "../../../../GlobalCss";
import { formatTimeDifference } from "../../../Context/ProfileContext";

const HomeRenderPosts = ({ item }) => {
  const openFileUrl = useCallback((fileUrl) => {
    Linking.openURL(fileUrl);
  }, []);

  return (
    <View key={item?.id} style={styles.postContainer}>
      <View style={styles.userContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.footerContainer}>
            <Image source={{ uri: item.pdp }} style={styles.userImage} />
            <Text style={styles.userName}>{item.name}</Text>
          </View>
          <Text style={styles.createdAt}>
            {formatTimeDifference(item.project[0]?.created_at)}
          </Text>
        </View>
      </View>

      <View style={styles.postInfoContainer}>
        <Text style={styles.postTitle}>{item.project[0]?.title}</Text>
        <Text style={styles.projectDescription}>
          {item.project[0]?.description}
        </Text>
      </View>

      {item.project && item.project[0]?.content?.length && (
        <View style={styles.fileContainer}>
          {item.project[0].content.map((fileUrl, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openFileUrl(fileUrl)}
              style={styles.filebtn}
            >
              <AntDesign name={"filetext1"} size={STYLES.SIZES.sizeL} />
              <Text style={styles.fileLink}>
                {fileUrl.split("/").reverse()[0].split(".").pop()} File
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {item.project && item.project[0]?.images?.length && (
        <Swiper
          style={styles.swiperContainer}
          showsButtons={false}
          autoplayTimeout={3}
          autoplay
        >
          {item.project[0]?.images.map((imageUrl, index) => (
            <Image
              key={index}
              source={{ uri: imageUrl }}
              style={styles.postImage}
              placeholder={<ActivityIndicator />}
            />
          ))}
        </Swiper>
      )}
      <Interaction postId={item.project[0]?.id} />
    </View>
  );
};

export default HomeRenderPosts;

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
  postContainer: {
    marginBottom: 20,
    elevation: 5,
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
});
