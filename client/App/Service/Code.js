import React, { useEffect, useState,useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import axios from "axios";
import { ProfileContext } from "../Context/ProfileContext";

export default function Code() {
  const [authenticationResult, setAuthenticationResult] = useState(null);

  const { userId } = useContext(ProfileContext);

  const [BaybasketItems, setBaybasketItems] = useState([]);
  const API = process.env.EXPO_PUBLIC_IP_KEY;

  // useEffect(() => {
  //   fetchBayBasket();
  // }, []);

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
  useEffect(() => {
    async function authenticate() {
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate to access your data",
          cancelLabel: "Cancel",
        });

        setAuthenticationResult(result);
        if (result.success) {
          console.log("Authentication successful");
        } else {
          console.log("Authentication failed");
        }
      } catch (error) {
        console.error("Authentication error:", error.message);
      }
    }
    fetchBayBasket();
    authenticate();
  }, []);

  return (
    <View style={styles.container}>
      {authenticationResult && (
        <Text style={styles.resultText}>
          {authenticationResult.success
            ? "Authentication successful"
            : "Authentication failed"}
        </Text>
      )}
      <View style={styles.container}>
        <Text style={styles.heading}>Purchases :</Text>
        <View style={styles.itemsContainer}>
          {BaybasketItems.map((item) => (
            <View style={styles.itemContainer} key={item.Service.id}>
              <Image
                style={styles.image}
                source={{ uri: item.Service.image }}
              />
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
      <StatusBar style="auto" />
    </View>
  );
}

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
