import React, { useEffect, useState ,useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfileContext } from "../Context/ProfileContext";

const FavoriteList = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const API = process.env.EXPO_PUBLIC_IP_KEY;
  const { userId } = useContext(ProfileContext);
  const fetchFavoriteList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://${API}:4070/favorit/${userId}`);
      setFavoriteItems(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFromFavorites = async (serviceId) => {
    try {
      await axios.delete(`http://${API}:4070/favorit/${userId}/${serviceId}`);
      fetchFavoriteList();
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
        
        <Text style={styles.createdAt}>{item.Service.created_at}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteFromFavorites(item.serviceId)}>
        <Ionicons name="heart-dislike-sharp" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );

  
  useFocusEffect(
    React.useCallback(() => {
      fetchFavoriteList();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.refetchButton}
        onPress={fetchFavoriteList}
        disabled={loading}
      ></TouchableOpacity>
      {loading ? (
        <Text style={styles.noItemsText}>Loading...</Text>
      ) : favoriteItems.length > 0 ? (
        favoriteItems.map((item) => renderFavoriteItem({ item }))
      ) : (
        <Text style={styles.noItemsText}>No favorite items found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    backgroundColor: "white",
  },
  refetchButton: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  refetchButtonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
  
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

export default FavoriteList;
