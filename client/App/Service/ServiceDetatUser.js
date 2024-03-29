import React, { useContext } from "react";
import axios from "axios";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import { ProfileContext } from "../Context/ProfileContext";


const ServiceDetaite = ({ navigation, route }) => {
  const {userId}=useContext(ProfileContext)
  const item = route.params.item;
 

  const handleAddToBasket = async (serviceId) => {
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Baybaskets/${userId}/${serviceId}`
      );

      console.log("post successful:", response.data);
    } catch (error) {
      console.error("Error during UpVote:", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Services")}>
        <Entypo name="arrow-with-circle-left" size={30} color="#8244CB" />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>{item.Price} DT </Text>
      <View>
        <TouchableOpacity
          style={styles.addToBasketButton}
          onPress={() => handleAddToBasket(item.id)}
        >
          <Fontisto name="shopping-basket-add" size={25} color="#FFF" />
          <Text style={styles.addToBasketButtonText}>Add to Basket</Text>
        </TouchableOpacity>

        <View></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
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
  addToBasketButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8244CB",
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
