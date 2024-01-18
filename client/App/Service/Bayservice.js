import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";
import { ProfileContext } from "../Context/ProfileContext";

const Basket = () => {
  const { userId } = useContext(ProfileContext);

  const [BaybasketItems, setBaybasketItems] = useState([]);
  const API = process.env.EXPO_PUBLIC_IP_KEY;

  useEffect(() => {
    fetchBayBasket();
  }, []);

  const fetchBayBasket = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/baskets/${userId} `
      );
      setBaybasketItems(response.data);
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Purchases :</Text>
      <View style={styles.itemsContainer}>
        {BaybasketItems.map((item) => (
          <View style={styles.itemContainer} key={item.Service.id}>
            <Image style={styles.image} source={{ uri: item.Service.image }} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.Service.title}</Text>
              <Text style={styles.price}>{item.Service.Price}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.Service.description}
              </Text>
              <Text style={styles.createdAt}>{item.Service.created_at}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "white",
    flex: 1,
    gap: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemsContainer: {
    marginTop: 10,
    gap: 15,
  },
  itemContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 9,
    shadowColor: "#8244CB",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 19,
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
});

export default Basket;
