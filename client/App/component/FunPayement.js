import { useStripe } from "@stripe/stripe-react-native";

const FunPayement = {
  openPaymentSheet: async () => {
    const { presentPaymentSheet } = useStripe();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  },
};

export default FunPayement;