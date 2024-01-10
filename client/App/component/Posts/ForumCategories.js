import { Image } from "@gluestack-ui/themed";
import { Box, Center } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import Arrow from "react-native-vector-icons/MaterialCommunityIcons";

const ForumCategories = () => {
  let arr = [1, 1, 1, 1, 1, 1];
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View as={SafeAreaView} style={styles.container}>
        <Center
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <TouchableOpacity>
             <Arrow name='arrow-left-thin' size={30} color='#674188' onPress={() => navigation.navigate('Home') }/>
            </TouchableOpacity>

          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Explore by categories
          </Text>
          <TouchableOpacity>
            <Icon name="search" size={24} />
          </TouchableOpacity>
        </Center>
        <Box
          style={{
            paddingHorizontal: 10,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {arr.map(() => (
            <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <ImageBackground
                source={{
                  uri: "https://img.freepik.com/premium-photo/man-woman-are-working-computer-with-laptop-computer-screen-with-word-com-it_745528-1518.jpg",
                }}
                style={{
                  height: 150,
                  width: 160,
                  position: "relative",
                }}
                imageStyle={{ borderRadius: 20 }}
                resizeMode="cover"
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "900",
                    fontSize: 18,
                    position: "absolute",
                    bottom: 30,
                    left: 10,
                  }}
                >
                  Technology
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "300",
                    position: "absolute",
                    bottom: 5,
                    left: 8,
                  }}
                >
                  20.000 Articles
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </Box>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical : 40,
    backgroundColor : 'white',
  },
});

export default ForumCategories;
