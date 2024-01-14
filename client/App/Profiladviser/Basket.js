import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import CheckoutScreen from "./Stripe"
import Swipeout from "react-native-swipeout";
import axios from "axios";

import AntDesign from "react-native-vector-icons/AntDesign";

const Basket = () => {
  const API = process.env.EXPO_PUBLIC_IP_KEY;
  const [basketItems, setBasketItems] = useState([]);
  const [swipeoutOpen, setSwipeoutOpen] = useState(false);

  useEffect(() => {
    fetchBasket();
  }, []);

  const fetchBasket = async () => {
    try {
      const response = await axios.get(`${API}/baskets/1`);
      setBasketItems(response.data);
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  const deleteFromBasket = async (serviceId) => {
    try {
      await axios.delete(`${API}/1/${serviceId}`);
      fetchBasket();
    } catch (error) {
      console.error("Error deleting from basket:", error);
    }
  };

  const calculateTotalPrice = () => {
    return basketItems.reduce((total, item) => total + item.Service.Price, 0);
  };

  const swipeoutBtns = (serviceId) => [
    {
      text: (
        <View>
          <AntDesign name="delete" size={25} color="white" />
        </View>
      ),
      backgroundColor: "#d41f35",
      onPress: () => {
        setSwipeoutOpen(false);
        deleteFromBasket(serviceId);
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Basket </Text>
      <View style={styles.itemsContainer}>
        {basketItems.map((item) => (
          <Swipeout
            key={item.id}
            right={swipeoutBtns(item.Service.id)}
            autoClose={true}
            onOpen={() => setSwipeoutOpen(true)}
            onClose={() => setSwipeoutOpen(false)}
            openClose={swipeoutOpen}
          >
            <Animated.View style={{ opacity: swipeoutOpen ? 0.5 : 1 }}>
              <View style={styles.itemContainer}>
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
                    <Text style={styles.createdAt}>
                      {item.Service.created_at}
                    </Text>
                  </View>
                  <View style={styles.container}>
                    <TouchableOpacity
                      style={styles.buyButton}
                      onPress={async () => await  openPaymentSheet()}
                    >
                      <Text style={styles.buttonText}>Buy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Animated.View>
          </Swipeout>

          ))}

      </View>
      <Text style={styles.totalPrice}>
        Total Price: ${calculateTotalPrice()}
      </Text>
          <CheckoutScreen/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },

  heading: {
    alignItems: "ce",
    fontSize: 30,
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
    shadowColor: "#d41f35",
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
    backgroundColor: "#8244CB",
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
