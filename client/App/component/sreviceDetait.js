import React from "react";
import axios from "axios";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
const ServiceDetaite = ({ navigation, route }) => {
  const item = route.params.item;

  const DeleteServices = async (serviceId) => {
    try {
      const response = await axios.post(
        "http://192.168.1.29:4070/Services/1/2"
      );

      console.log("Delete successful:", response.data);
    } catch (error) {
      console.error("Error during :", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>{item.Price} DT </Text>
      <View>
        <TouchableOpacity
          style={styles.deleteService}
          onPress={() => DeleteServices(item.id)}
        >
          <AntDesign name="delete" size={25} color="#FFF" />
          <Text style={styles.addToBasketButtonText}>Delete services</Text>
        </TouchableOpacity>
        <View>
          {/* <TouchableOpacity
            style={styles.addTofavorit}
            onPress={() => handleAddToFaivert(item.id)}
          >
            <Feather name="heart" size={25} color="#FFF" />
            <Text style={styles.addTofavoritText}>Add to Favorite</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  price: {
    color: "#4D4D4D",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  deleteService: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f44336",
    padding: 18,
    borderRadius: 8,
    marginBottom: 8,
  },
  addToBasketButtonText: {
    color: "#FFF",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  addTofavoritText: {
    color: "#FFF",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  addTofavorit: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3CCF8",
    padding: 18,
    borderRadius: 8,
  },
});

export default ServiceDetaite;
