import { Image } from "@gluestack-ui/themed";
import { Box, Center } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ActivityIndicator } from "react-native";
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
  const {data , isLoading , error} = useQuery({
    queryKey: ["Category"],
    queryFn: async () => axios.get(`http://172.19.0.189:4070/Category/`).then((res) => res.data)
  })

  if(isLoading) return <Center>
    <ActivityIndicator size="large" color='#674188' />
  </Center>
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
          {data?.map((category) => (
            <TouchableOpacity onPress={() => navigation.navigate("Posts", {category})}>
              <ImageBackground
                source={{
                  uri : category.image,
                }}
                style={{
                  height: 150,
                  width: 160,
                  position: "relative",
                  
                }}
                imageStyle={{ borderRadius: 20 }}
                resizeMode="cover"
                >
                <View style={styles.darkOverlay}/>
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
                  {category.name}
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
  darkOverlay : {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius : 20
  }
});

export default ForumCategories;
