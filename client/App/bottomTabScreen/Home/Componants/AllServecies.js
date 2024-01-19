import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
// =========================FETCH SERVECIES============================
const fetchServices = async () => {
  try {
    const response = await axios.get(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Services/`
    );
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

// =========================FETCH SERVECIES============================
const AllServecies = () => {
  const { data } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServices(),
  });

  return (
    <View>
      <Text>AllServecies</Text>
    </View>
  );
};

export default AllServecies;

const styles = StyleSheet.create({});
