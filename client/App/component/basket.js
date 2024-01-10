import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Swipeout from "react-native-swipeout";
import axios from "axios";
import { openPaymentSheet } from "./FunPayement";

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    fetchBasket();
  }, []);

  const fetchBasket = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/baskets/1`
      );
      setBasketItems(response.data);
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  const deleteFromBasket = async (serviceId) => {
    try {
      await axios.delete(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/baskets/1/${serviceId}`
      );
      fetchBasket();
    } catch (error) {
      console.error("Error deleting from basket:", error);
    }
  };

  const swipeoutBtns = (serviceId) => [
    {
      text: "Delete",
      backgroundColor: "#FF4F4F",
      onPress: () => deleteFromBasket(serviceId),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Basket Items:</Text>
      <View style={styles.itemsContainer}>
        {basketItems.map((item) => (
          <Swipeout
            key={item.id}
            right={swipeoutBtns(item.Service.id)}
            autoClose={true}
          >
            <View style={styles.itemContainer}>
              <Image
                style={styles.image}
                source={{ uri: item.Service.image }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.Service.title}</Text>
                <Text style={styles.price}>{item.Service.Price}</Text>
                <Text style={styles.description}>
                  {item.Service.description}
                </Text>
                <Text style={styles.createdAt}>{item.Service.created_at}</Text>
              </View>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => openPaymentSheet()}
              >
                <Text style={styles.buttonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </Swipeout>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemsContainer: {
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#8244CB",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  createdAt: {
    fontSize: 12,
    color: "#777",
  },
  buyButton: {
    backgroundColor: "#6DBE45",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Basket;
