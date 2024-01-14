import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Box, Button, ButtonText, Center } from "@gluestack-ui/themed";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const AllServices = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Services/`
      );
      const initialLikes = response.data.reduce((acc, service) => {
        acc[service.serviceId] = service.like;
        return acc;
      }, {});
      setServices(response.data);
      setLikes(initialLikes);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.price}> {item.Price} DT</Text>
      <Text
        numberOfLines={3}
        style={styles.descriptionText}
        onPress={() =>
          navigation.navigate("serviceDetails", {
            item: item,
          })
        }
      >
        {item.description}
      </Text>
    </View>
  );
  <View style={styles.voteContainer}></View>;

  if (services.length === 0) {
    return <ActivityIndicator size="large" color="#8244CB" />;
  }

  return (
    <View>
      <View style={{ paddingVertical: 20, backgroundColor: "white" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <AntDesign name="leftcircleo" size={20} />
          </TouchableOpacity>

          <Button borderRadius={50} bgColor="#674188">
            <ButtonText onPress={() => navigation.navigate("PostService", {})}>
              Create Post
            </ButtonText>
          </Button>
        </Box>
      </View>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("PostService", {})}
        style={styles.addButton}
      >
        <MaterialIcons name="add-box" size={100} color="#525252" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    elevation: 8,
    padding: 40,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
    resizeMode: "cover",
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    color: "#4D4D4D",
    fontSize: 20,
    marginBottom: 8,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  title: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 2,
  },
  detailsContainer: {
    padding: 10,
    borderRadius: 8,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});

export default AllServices;
