import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { STYLES } from "../../GlobalCss";
// STEP 1
const checkout = async (data) => {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/payment/intents`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err, "eeee");
  }
};
// STEP 2

const validPayment = async (data) => {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/payment/validPayment`,
      data
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
// STEP 3

const payedBasket = async (data) => {
  try {
    const response = await axios.patch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/baskets/payedBasket`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const CheckoutScreen = ({ ORDER, refetchBasket, setCheckOurServices }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const basketData = ORDER.basketItems.map((entry) => ({
    basketId: entry.id,
    userId: entry.userId,
    serviceId: entry.serviceId,
  }));
  const paymentData = ORDER.basketItems.map((entry) => ({
    basketId: entry.id,
    userId: entry.userId,
    amount: ORDER.amount,
  }));

  const { mutateAsync: Payment } = useMutation({
    mutationFn: (data) => validPayment(data),
  });
  const { mutateAsync: updateBasket } = useMutation({
    mutationFn: (data) => payedBasket(data),
  });

  const { mutateAsync: byNow } = useMutation({
    mutationFn: (total) => checkout({ amount: Math.floor(total * 100) }),

    onSuccess: async (response) => {
      try {
        // Access the data property from the mutation result
        const paymentIntent = response;
        // 2. Initialize the Payment sheet
        const { error: paymentSheetError } = await initPaymentSheet({
          merchantDisplayName: "Ahmed Haddada",
          paymentIntentClientSecret: paymentIntent.paymentIntent,
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            name: "Ahmed Haddada",
            items: ORDER.serviceId,
          },
        });
        const { error: paymentError } = await presentPaymentSheet();

        if (!paymentError) {
          await Payment(paymentData);
          await updateBasket(basketData);
          refetchBasket();
          setCheckOurServices(true);
          setTimeout(() => {
            setCheckOurServices(false);
          }, 5000);
        }

        if (paymentSheetError) {
          Alert.alert("Something went wrong", paymentSheetError.message);
          return;
        }
      } catch (error) {
        console.error("Error during initPaymentSheet:", error);
      }
    },
    onError: (error) => {
      console.error("Error during checkout:", error);
    },
  });

  const onCheckout = async () => {
    try {
      // 1 - create payment intent
      const response = await byNow(ORDER.amount);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onCheckout}>
      <Text style={styles.buttonText}>by now</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: STYLES.COLORS.Priamary,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: "center",

    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 3,
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default CheckoutScreen;
