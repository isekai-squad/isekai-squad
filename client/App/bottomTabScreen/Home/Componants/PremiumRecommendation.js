import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";

import React, { useCallback, useContext } from "react";
import { STYLES } from "../../../../GlobalCss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Interaction from "../../../component/ProfileComponants/itnteractionComponants/Interaction";
import {
  ProfileContext,
  formatTimeDifference,
} from "../../../Context/ProfileContext";
import Swiper from "react-native-swiper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
const fetchMostLikedProject = async () => {
  try {
    const { data } = await axios.get(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/Projects/likes/mostLikedProject`
    );

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const PremiumRecommendation = ({ showAlert, setShowAlert }) => {
  const { ProfileData } = useContext(ProfileContext);
  const navigation = useNavigation();
  const openFileUrl = useCallback((fileUrl) => {
    Linking.openURL(fileUrl);
  }, []);

  const { data } = useQuery({
    queryKey: ["projectMostLiked"],
    queryFn: () => fetchMostLikedProject(),
  });

  const showPremiumAlert = () => {
    setShowAlert(true);
  };

  return (
    data && (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{
              fontWeight: STYLES.FONTS.Large,
              fontSize: STYLES.SIZES.sizeL,
            }}
          >
            Recommendation
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("UpgradeAccount")}
          >
            <Text
              style={{
                color: STYLES.COLORS.Priamary,
                fontWeight: STYLES.FONTS.Large,
                fontSize: STYLES.SIZES.sizeM,
              }}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <View key={data.id} style={styles.postContainer}>
          <View style={styles.userContainer}>
            <View style={styles.userInfoContainer}>
              <View style={styles.footerContainer}>
                <Image
                  source={{ uri: data.User.pdp }}
                  style={styles.userImage}
                />
                <Text style={styles.userName}>{data.User.name}</Text>
              </View>
              <Text style={styles.createdAt}>
                {formatTimeDifference(data.created_at)}
              </Text>
            </View>
          </View>

          <View style={styles.postInfoContainer}>
            <Text style={styles.postTitle}>{data.title}</Text>
            <Text style={styles.projectDescription}>{data.description}</Text>
          </View>

          {data.content.length > 0 && (
            <View style={styles.fileContainer}>
              {data.content.map((fileUrl, index) => (
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

          {data.images.length > 0 && (
            <Swiper
              style={styles.swiperContainer}
              showsButtons={false}
              autoplayTimeout={3}
              autoplay
            >
              {data.images.map((imageUrl, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={styles.postImage}
                />
              ))}
            </Swiper>
          )}
          <Interaction postId={data.id} postOwner={data.User.id} />
        </View>
        {/* <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Upgrade Your Account to Premium!"
          message="Unlock the best projects from students and enjoy exclusive features and benefits as a premium member. Upgrade your account now!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Explore Premium Features"
          confirmButtonColor="#3498db"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            navigation.navigate("Upgrade Account");
            hideAlert();
          }}
        /> */}
      </View>
    )
  );
};

export default PremiumRecommendation;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
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
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
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
