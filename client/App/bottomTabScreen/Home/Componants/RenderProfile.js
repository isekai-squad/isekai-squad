import React, { useContext, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { STYLES } from "../../../../GlobalCss";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { VisitProfileContext } from "../../../Context/VisitProfileContext";
import axios from "axios";
import { ProfileContext } from "../../../Context/ProfileContext";

const RenderProfile = ({ AllProfiles }) => {
  const [followedProfile, setFollowedProfile] = useState(null);
  const { setVisitedProfileId } = useContext(VisitProfileContext);
  const { userId } = useContext(ProfileContext);
  const navigation = useNavigation();
  const [other,setOther]=useState()
  const handleFollowPress = (profile) => {
    setFollowedProfile(profile.id === followedProfile ? null : profile.id);
  };

  const submit = async (id) => {
    setVisitedProfileId(id);
    navigation.navigate("Visited Profile", { id: id });
  };


  const CreateRoom = async (user2Id) => {
    try {
      const { data } = await axios.post(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/chat/room/create`,
        {
          user1Id: userId,
          user2Id: user2Id,
        }
      );

   
     
      const other = data.users.find((user) => user.id !== userId);


      navigation.navigate("chat", {
        userId:userId,
        roomId: data.rooms[0].roomId,
        other: other,
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: "row", paddingTop: 10, gap: 10 }}>
        {AllProfiles &&
          AllProfiles.map((profile) => (
            <TouchableOpacity
              key={profile.id}
              style={{
                backgroundColor: "white",
                borderColor: "#eee",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 250,
                width: 180,
                elevation: 5,
                borderRadius: 10,
                shadowColor: STYLES.COLORS.ShadowColor,
              }}
              onPress={() => submit(profile.id)}
            >
              <Image
                source={{ uri: profile.pdp }}
                style={{ borderRadius: 50, width: 90, height: 90 }}
              />
              <Text
                style={{
                  fontSize: STYLES.SIZES.sizeL,
                  fontWeight: STYLES.FONTS.Large,
                  letterSpacing: 1,
                }}
              >
                {profile.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                {profile.Specialty.name}
              </Text>

              {profile.role !== "COMPANY" && (
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    backgroundColor: STYLES.COLORS.Priamary,
                    paddingHorizontal: 25,
                    paddingVertical: 8,
                    flexDirection: "row",
                    marginTop: 20,
                  }}
                  onPress={() => CreateRoom(profile.id)}
                >
                  <AntDesign
                    name="message1"
                    size={20}
                    color={"white"}
                    style={{ paddingRight: 10 }}
                  />
                  <Text
                    style={{
                      fontWeight: STYLES.FONTS.Large,
                      letterSpacing: 1,
                      color: "white",
                    }}
                  >
                    Contact
                  </Text>
                </TouchableOpacity>
              )}

              {profile.role === "COMPANY" && (
                <TouchableOpacity
                  onPress={() => handleFollowPress(profile)}
                  style={{
                    borderRadius: 20,
                    paddingHorizontal: 25,
                    paddingVertical: 8,
                    flexDirection: "row",
                    marginTop: 20,
                    backgroundColor:
                      followedProfile === profile.id
                        ? "#eee"
                        : STYLES.COLORS.Priamary,
                  }}
                >
                  <SimpleLineIcons
                    name={
                      followedProfile === profile.id
                        ? "user-unfollow"
                        : "user-follow"
                    }
                    size={17}
                    color={
                      followedProfile === profile.id
                        ? STYLES.COLORS.Priamary
                        : "white"
                    }
                    style={{ paddingRight: 10 }}
                  />
                  <Text
                    style={{
                      fontWeight: STYLES.FONTS.Large,
                      letterSpacing: 1,
                      color:
                        followedProfile === profile.id
                          ? STYLES.COLORS.Priamary
                          : "white",
                    }}
                  >
                    {followedProfile === profile.id ? "Unfollow" : "Follow"}
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

export default RenderProfile;
