import React, { useContext, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import axios from "axios";
import { ProfileContext } from "../../Context/ProfileContext";
import CheckoutScreen from "../../component/Stripe";
import { STYLES } from "../../../GlobalCss";
import { useQuery } from "@tanstack/react-query";
import BasketItem from "./BasketDetails";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Basket = () => {
  const { userId, checkOurServices, setCheckOurServices } =
    useContext(ProfileContext);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../../../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
  });
  const {
    data: basketItems,
    refetch: refetchBasket,
    isLoading,
  } = useQuery({
    queryKey: ["basket"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/baskets/${userId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching basket:", error);
      }
    },
  });

  const deleteFromBasket = async (serviceId) => {
    try {
      await axios.delete(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/baskets/${userId}/${serviceId}`
      );
      refetchBasket();
    } catch (error) {
      console.error("Error deleting from basket:", error);
    }
  };

  const calculateTotalPrice = () => {
    return Number(
      basketItems?.reduce((total, item) => total + item.Service.Price, 0)
    );
  };

  const ORDER = {
    amount: calculateTotalPrice(),
    basketItems,
  };

  // Animation

  const bounceValue = useRef(new Animated.Value(0)).current;

  const bounceArrow = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    if (checkOurServices) {
      bounceArrow();
    }
  }, [checkOurServices]);

  const translateY = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <SafeAreaView style={styles.container}>
      {checkOurServices && (
        <Animated.View
          style={{
            transform: [{ translateY }, { rotate: "-90deg" }],
            left: 55,
            top: -9,
            position: "absolute",
            zIndex: 100,
          }}
        >
          <FontAwesome
            name="location-arrow"
            size={50}
            color={STYLES.COLORS.Priamary}
          />
        </Animated.View>
      )}

      {!checkOurServices && <Text style={styles.heading}>YOUR CART </Text>}
      {isLoading ? (
        <ActivityIndicator size="large" color={STYLES.COLORS.Priamary} />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <>
              {basketItems?.length === 0 ? (
                <View style={{ height: 200 }}>
                  {checkOurServices && (
                    <Text
                      style={{
                        color: STYLES.COLORS.Priamary,
                        fontWeight: STYLES.FONTS.bold,
                        letterSpacing: 2,
                        fontSize: 18,
                        top: 100,
                        textAlign: "center",
                      }}
                    >
                      Check Your Services
                    </Text>
                  )}
                  {!checkOurServices && (
                    <Text style={styles.emptyBasketText}>
                      Your CART is currently empty. Please visit our Services
                      section to explore and improve yourself.
                    </Text>
                  )}
                </View>
              ) : (
                <>
                  <View style={styles.itemsContainer}>
                    {basketItems?.map((item) => (
                      <BasketItem
                        key={item.id}
                        item={item}
                        onDelete={deleteFromBasket}
                      />
                    ))}
                  </View>
                </>
              )}
            </>
          </ScrollView>
          {basketItems.length > 0 && (
            <View
              style={{
                backgroundColor: "#f5d0f5",
                height: 100,
                flexDirection: "row",
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                justifyContent: "space-evenly",
                paddingTop: 20,
                paddingVertical: 15,
                position: "absolute",
                bottom: 0,
                width: "100%",
              }}
            >
              <View style={{ gap: 5 }}>
                <Text
                  style={{
                    fontWeight: STYLES.FONTS.bold,
                    fontSize: 15,
                  }}
                >
                  Total Price For {basketItems?.length} Service(s)
                </Text>
                <Text
                  style={{
                    color: STYLES.COLORS.Priamary,
                    fontWeight: STYLES.FONTS.bold,
                    fontSize: 25,
                    letterSpacing: 1,
                  }}
                >
                  $ {calculateTotalPrice().toFixed(2)}
                </Text>
              </View>
              <CheckoutScreen
                ORDER={ORDER}
                refetchBasket={refetchBasket}
                setCheckOurServices={setCheckOurServices}
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "white",
    justifyContent: "center",
    fontFamily: "Roboto-Regular",
    flex: 1,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 10,
    // marginTop: 25,
    textAlign: "center",
    letterSpacing: 2,
    fontFamily: "Roboto-Regular",
  },
  itemsContainer: {
    borderRadius: 10,
    gap: 20,
    paddingHorizontal: 10,
    paddingBottom: 120,
    paddingTop: 30,
  },

  buyButton: {
    backgroundColor: "#8244CB",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontWeight: "bold",
  },
  emptyBasketText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 25,
    paddingHorizontal: 10,
    height: "100%",
    color: "#777",
  },
});

export default Basket;
