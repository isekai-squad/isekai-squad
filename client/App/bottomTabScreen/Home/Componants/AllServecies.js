import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { STYLES } from "../../../../GlobalCss";

// =========================FETCH SERVICES============================
const fetchServices = async () => {
  try {
    const { data } = await axios.get(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Services`
    );
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

// =========================FETCH SERVICES============================
const AllServices = () => {
  const navigation = useNavigation();
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServices(),
  });


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Services</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Services')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.servicesContainer}>
          {services &&
            services.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <Image
                  source={{ uri: service.image }}
                  style={styles.serviceImage}
                />
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceCategory}>{service.category}</Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate("ServiceDetails", { item: service })}
                  style={styles.checkButton}
                >
                  <MaterialIcons
                    name={"home-repair-service"}
                    size={17}
                    color={"white"}
                    style={styles.checkButtonIcon}
                  />
                  <Text style={styles.checkButtonText}>Check</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerText: {
    fontWeight: STYLES.FONTS.Large,
    fontSize: STYLES.SIZES.sizeL,
  },
  seeAllText: {
    color: STYLES.COLORS.Priamary,
    fontWeight: STYLES.FONTS.Large,
    fontSize: STYLES.SIZES.sizeM,
  },
  servicesContainer: {
    flexDirection: "row",
    paddingTop: 10,
    gap: 10,
  },
  serviceCard: {
    backgroundColor: "white",
    borderColor: "#eee",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    width: 180,
    elevation: 5,
    borderRadius: 10,
    shadowColor: STYLES.COLORS.ShadowColor,
  },
  serviceImage: {
    borderRadius: 50,
    width: 90,
    height: 90,
  },
  serviceTitle: {
    fontSize: STYLES.SIZES.sizeL,
    fontWeight: STYLES.FONTS.Large,
    letterSpacing: 1,
  },
  serviceCategory: {
    fontSize: 13,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  checkButton: {
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 8,
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: STYLES.COLORS.Priamary,
  },
  checkButtonIcon: {
    paddingRight: 10,
  },
  checkButtonText: {
    fontWeight: STYLES.FONTS.Large,
    letterSpacing: 1,
    color: "white",
  },
});

export default AllServices;
