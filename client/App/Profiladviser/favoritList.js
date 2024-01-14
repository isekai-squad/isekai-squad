import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

const FavoriteList = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const API = process.env.EXPO_PUBLIC_IP_KEY;

  useEffect(() => {
    fetchBasket();
  }, []);

  const fetchFavoriteList = async () => {
    try {
      const response = await axios.get(
        `http://${API}:4070/baskets/1`
      );
      setFavoriteItems(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const deleteFromFavorites = async (itemId) => {
    try {
      await axios.delete(
        `http://${API}:4070/baskets/1/${serviceId}`
      );
      fetchBasket();
    } catch (error) {
      console.error("Error deleting from favorites:", error);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: item.Service.image }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.Service.title}</Text>
        <Text style={styles.price}>{item.Service.Price}</Text>
        <Text style={styles.description}>{item.Service.description}</Text>
        <Text style={styles.createdAt}>{item.Service.created_at}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteFromFavorites(item.id)}>
        <Ionicons name="heart-dislike-sharp" size={30} color="red" />
      </TouchableOpacity>
       
    </View>
  );

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
    
    flex: 1,
    padding: 7,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 19,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 15,
    color: "#8244CB",
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  createdAt: {
    fontSize: 12,
    color: "#777",
  },
  noItemsText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 50,
  },
  
});

export default FavoriteList













