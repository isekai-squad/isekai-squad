import React, { useContext, useEffect, useState } from "react";
import { Text, Alert, TouchableOpacity, StyleSheet, View } from "react-native";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { STYLES } from "../../../GlobalCss";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext } from "../../Context/ProfileContext";
// STEP 1
const checkout = async (data) => {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/payment/intents`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
// STEP 2

const PremiumCompany = async (companyId) => {
  try {
    const response = await axios.patch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/Company/UpgradeAccount/${companyId}`
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const PaymentUpgrade = () => {
  const { userId, setWelcome } = useContext(ProfileContext);

  const navigation = useNavigation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const { mutateAsync: UpgradeCompany } = useMutation({
    mutationFn: () => PremiumCompany(userId),
  });
  const { mutateAsync: UpgradeAccount } = useMutation({
    mutationFn: (total) => checkout({ amount: Math.ceil(total * 100) }),

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
          },
        });
        const { error: paymentError } = await presentPaymentSheet();

        if (!paymentError) {
          await UpgradeCompany();
          navigation.navigate("Home");
          setWelcome(true);
          setTimeout(() => {
            setWelcome(false);
          }, 2000);
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

  const onCheckout = async (Price) => {
    try {
      // 1 - create payment intent
      const response = await UpgradeAccount(Price);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <View style={{ gap: 8, marginTop: 40 }}>
      <TouchableOpacity onPress={() => onCheckout(1)}>
        <View
          style={{
            backgroundColor: STYLES.COLORS.Priamary,
            paddingVertical: 10,
            borderRadius: 50,
            paddingVertical: 15,
            width: 280,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: STYLES.FONTS.Large,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Start a 1-Week Free Trial
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onCheckout(1.9)}>
        <View
          style={{
            backgroundColor: "#9466d3",
            paddingVertical: 10,
            borderRadius: 50,
            paddingVertical: 15,
            width: 280,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: STYLES.FONTS.Large,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            $1.9/week
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          fontWeight: "700",
          width: 300,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        Subscribe now to unlock a world of premium features and exclusive
        content. Experience the best of ISEKAI with our Premium subscription.
      </Text>
    </View>
  );
};

export default PaymentUpgrade;
