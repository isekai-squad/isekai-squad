import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Image } from "@gluestack-ui/themed";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import Icon from "react-native-vector-icons/Feather";
import Dots from "react-native-vector-icons/Entypo";
import { useNavigation, useTheme } from "@react-navigation/native";

const Post = () => {
  const colors = useTheme();
  const navigation = useNavigation();
  let mobileWidth = Dimensions.get("window").width;
  console.log(mobileWidth);
  return (
    <Box h={200} style={Styles.container}>
      <Image
        size="xl"
        // style={{ marginLeft: 10 }}
        alt="404"
        source={{
          uri: "https://img.freepik.com/premium-photo/man-woman-are-working-computer-with-laptop-computer-screen-with-word-com-it_745528-1518.jpg",
        }}
        borderRadius="$lg"
      />

      <View
        style={{ display: "flex", justifyContent: "center", marginLeft: 10 }}
      >
        <TouchableOpacity style={{ width: "50%" }}>
          <Text
            style={{
              lineHeight: 30,
              fontWeight: "bold",
              fontSize: 15,
              width: 200,
            }}
            onPress={() => navigation.navigate("PostDetails")}
          >
            Lorem ipsum dolor sit amet. Est cupiditate aliquam id optio odio et
            sunt rerum.
          </Text>
        </TouchableOpacity>

        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <Avatar size="xs" borderRadius="$full">
            <AvatarFallbackText>SS</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://pbs.twimg.com/media/GAXaW5CWIAElaqj.jpg",
              }}
            />
          </Avatar>
          <Text style={{ marginLeft: 10, color: "#674188" }}>author name</Text>
        </View>

        <View>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
          >
            <Text style={{ marginLeft: 10, color: "#674188" }}>10 min ago</Text>
            <TouchableOpacity>
              <Icon name="bookmark" size={24} style={{ marginLeft: 80 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Dots
                name="dots-three-vertical"
                size={22}
                // style={{ marginLeft: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Box>
  );
};
const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    // paddingHorizontal: 5,
    flexDirection: "row",
    flex: 1,

    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 4,
    // elevation: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
    fontSize: 13,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {},
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  centerAlign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginRight: 12,
    marginTop: 6,
  },
  shadowProp: {
    shadowColor: "#171717",
    elevational: 20,
  },
  card: {
    backgroundColor: "#ebe3df",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    // marginVertical: 10,
  },
  elevation: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default Post;
