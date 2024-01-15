import React, { useContext, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { STYLES } from "../../../../../GlobalCss";
import Swiper from "react-native-swiper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Interaction from "./Interaction";
import AwesomeAlert from "react-native-awesome-alerts";

import {
  ProfileContext,
  deleteProject,
  formatTimeDifference,
} from "../../../../Context/ProfileContext";
import { useMutation } from "@tanstack/react-query";

const RenderPost = ({ item, refetchProject }) => {
  const { profileImage, ProfileData, refetchProfile, setRefetchProject } =
    useContext(ProfileContext);
  const [confirmAlert, setConfirmAlert] = useState(false);

  const { mutateAsync: deleteProjectMutate } = useMutation({
    mutationFn: (projectId) => deleteProject(ProfileData.id, projectId),
  });

  const openFileUrl = useCallback((fileUrl) => {
    Linking.openURL(fileUrl);
    setRefetchProject(refetchProject);
  }, []);

  const showConfirmAlert = () => setConfirmAlert(true);
  const hideConfirmAlert = () => setConfirmAlert(false);

  const confirmDelete = async (projectId) => {
    try {
      await deleteProjectMutate(projectId);
      refetchProject();
      refetchProfile();
      hideConfirmAlert();
    } catch (error) {
      console.error("Error deleting project:", error);
      hideConfirmAlert();
    }
  };

  return (
    <View key={item.id} style={styles.postContainer}>
      <View style={styles.userContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.footerContainer}>
            <Image source={{ uri: profileImage }} style={styles.userImage} />
            <Text style={styles.userName}>{ProfileData.name}</Text>
          </View>
          <Text style={styles.createdAt}>
            {formatTimeDifference(item.created_at)}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={showConfirmAlert}>
            <AntDesign name={"delete"} size={STYLES.SIZES.sizeL} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postInfoContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.projectDescription}>{item.description}</Text>
      </View>
      <View style={styles.fileContainer}>
        {item.content.map((fileUrl, index) => (
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
      <Swiper
        style={styles.swiperContainer}
        showsButtons={false}
        autoplayTimeout={3}
        autoplay
      >
        {item.images.map((imageUrl, index) => (
          <Image
            key={index}
            source={{ uri: imageUrl }}
            style={styles.postImage}
          />
        ))}
      </Swiper>
      <Interaction projectId={item.id} />

      <AwesomeAlert
        show={confirmAlert}
        showProgress={false}
        title="Confirm Delete"
        message="Are you sure you want to delete this project?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Delete"
        confirmButtonColor="#DD6B55"
        onCancelPressed={hideConfirmAlert}
        onConfirmPressed={() => confirmDelete(item.id)}
      />
    </View>
  );
};

export default RenderPost;

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
