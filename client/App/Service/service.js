import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

const AllServices = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [likes, setLikes] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const handleAddToFavorite = async (serviceId) => {
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/favorit`,
        {
          userId: "1",
          serviceId: "1",
        }
      );
      console.log("successful:", response.data);
    } catch (error) {
      console.error("Error during :", error.message);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);

    const filteredProducts = category
      ? services.filter(
          (product) =>
            (product.category || "").replace(/['"]+/g, "") === category
        )
      : services;

    setFilteredData(filteredProducts);
  };

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
   <View style={styles.heart}>
      <Ionicons
        name={likes[item.serviceId]? "heart" : "heart-outline"}
        size={32}
        color={likes[item.item] ? "red" : "black"}
        onPress={() => handleAddToFavorite(item.serviceId)}
      />
    </View>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.title}>{item.category}</Text>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.price}> {item.Price} DT</Text>
      <Text
        numberOfLines={3}
        style={styles.descriptionText}
        onPress={() =>
          navigation.navigate("ServiceDetails", {
            item: item,
          })
        }
      >
        {item.description}
      </Text>
    </View>
  );

  if (services.length === 0) {
    return <ActivityIndicator size="large" color="#A77CDA" />;
  }

  return (
    <ScrollView>
      <View>
        <View >
        <View style={{flexDirection:'row'}}>

          <TouchableOpacity
            style={{
              backgroundColor: selectedCategory === "" ? "#8244CB" : "white",
              padding: 8,
              borderRadius: 90,
              width: 90,
              alignItems: "center",
              marginLeft: 10,
            }}
            onPress={() => handleCategoryPress("")}
          >
            <Text
              style={{
                color: selectedCategory === "All Services" ? "white" : "#8244CB",
              }}
            >
              All Services
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: selectedCategory === "AAA" ? "#A77CDA" : "white",
              padding: 8,
              borderRadius: 90,
              width: 90,
              alignItems: "center",
              marginLeft: 4,
            }}
            onPress={() => handleCategoryPress("AAA")}
          >
            <Text
              style={{
                color: selectedCategory === "AAA" ? "white" : "#A77CDA",
              }}
            >
              AAA
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: selectedCategory === "BBB" ? "#A77CDA" : "white",
              padding: 8,
              borderRadius: 90,
              width: 90,
              alignItems: "center",
              marginLeft: 4,
            }}
            onPress={() => handleCategoryPress("BBB")}
          >
            <Text
              style={{
                color: selectedCategory === "BBB" ? "white" : "#A77CDA",
              }}
            >
              BBB
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: selectedCategory === "ccc" ? "#A77CDA" : "white",
              padding: 8,
              borderRadius: 90,
              width: 90,
              alignItems: "center",
              marginLeft: 4,
            }}
            onPress={() => handleCategoryPress("ccc")}
          >
            <Text
              style={{
                color: selectedCategory === "ccc" ? "white" : "#A77CDA",
              }}
            >
              ccc
            </Text>
          </TouchableOpacity>

          </View>
          <FlatList
            data={filteredData.length > 0 ? filteredData : services}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
          />
        </View>
      </View>
    </ScrollView>
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
    padding: 16,
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
    marginTop: 8,
    paddingHorizontal: 16,
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
  heart: {
    alignSelf: "flex-end",
  },
});

export default AllServices;
