

import React, { useEffect, useState } from 'react';
import { View, Button, Text,Alert } from 'react-native'; // Make sure to import Alert
import {useStripe} from '@stripe/stripe-react-native'
import { StripeProvider } from '@stripe/stripe-react-native';
const CheckoutScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [check,setCheck]=useState(true)
    const [loading, setLoading] = useState(false);
    const fetchPaymentSheetParams = async () => {
          const response = await fetch(`${process.env.EXPO_PUBLIC_IP_KEY}/api/payment-sheet`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const { paymentIntent, ephemeralKey, customer } = await response.json();
      console.log(await response.json());
          return {
            paymentIntent,
            ephemeralKey,
            customer,
          };
        };
        

        const initializePaymentSheet = async () => {
          const { paymentIntent, ephemeralKey, customer, publishableKey } = 
          await fetchPaymentSheetParams();
          console.log({ paymentIntent, ephemeralKey, customer, publishableKey });
          
          const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
              name: "Jane Doe",
            },
          });
          console.log(error)
          if (!error) {
            setLoading(true);
          }
        };
      

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(error);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect( () => {
     (async()=>{
      await initializePaymentSheet();
     })()
  }, []);


  return (
    <View > 
      {/* <Button
        title="Checkout"
        onPress={async ()=>{
          console.log("chekck");
          await openPaymentSheet()
        }}
        disabled={!loading}
      /> */}
       <StripeProvider publishableKey={process.env.EXPO_PUBLIC_PUBLISH_KEY}>
      <Text onPress={async ()=>{
        console.log("chekck");
        await openPaymentSheet()
      }}
      disabled={loading}
      style={{paddingBottom:30}}
      >test</Text>
      </StripeProvider>
      <Text onPress={async ()=>{
       
        setCheck(!check)
      }}
      // disabled={loading}
      >check</Text>
    </View>
  );
};

export default CheckoutScreen;
