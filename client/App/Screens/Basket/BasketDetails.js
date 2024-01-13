import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Swipeout from "react-native-swipeout";
import { formatTimeDifference } from "../../Context/ProfileContext";
import { STYLES } from "../../../GlobalCss";
import AwesomeAlert from "react-native-awesome-alerts";

const BasketItem = ({ item, onDelete }) => {
  const [swipeoutOpen, setSwipeoutOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const swipeoutBtns = () => [
    {
      text: (
        <View>
          <AntDesign name="delete" size={25} color="white" />
        </View>
      ),
      backgroundColor: "#d41f35",
      onPress: () => {
        setSwipeoutOpen(false);
        onDelete(item.Service.id);
      },
    },
  ];
  const handleRemoveItem = () => {
    onDelete(item.Service.id);
    setShowAlert(false);
  };
  return (
    <>
      <Swipeout
        right={swipeoutBtns()}
        autoClose
        onOpen={() => setSwipeoutOpen(true)}
        onClose={() => setSwipeoutOpen(false)}
        openClose={swipeoutOpen}
        style={styles.container}
      >
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={{ uri: item.Service.image }} />
          <View style={styles.textContainer}>
            <View style={styles.titlePriceContainer}>
              <Text style={styles.title}>{item.Service.title}</Text>
              <Text style={styles.price}>${item.Service.Price}</Text>
            </View>
            <Text style={styles.description} numberOfLines={1}>
              <Text style={{ fontWeight: STYLES.FONTS.Large }}>
                Description:{" "}
              </Text>
              {item.Service.description}
            </Text>
            <Text style={styles.description}>
              <Text style={{ fontWeight: STYLES.FONTS.Large }}>Quantity: </Text>
              1
            </Text>
            <TouchableOpacity
              onPress={() => setShowAlert(true)}
              style={styles.removeContainer}
            >
              <FontAwesome
                name="trash-o"
                size={20}
                color={STYLES.COLORS.Priamary}
              />
              <Text style={styles.removeText}>REMOVE</Text>
            </TouchableOpacity>
            <Text style={styles.createdAt}>
              {formatTimeDifference(item.Service.created_at)}
            </Text>
          </View>
        </View>
      </Swipeout>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Confirm Removal"
        message="Are you sure you want to remove this service?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Remove"
        confirmButtonColor={STYLES.COLORS.Priamary}
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={handleRemoveItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: STYLES.COLORS.ShadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    height: 150,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    alignSelf: "flex-start",
  },
  titlePriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1.5,
    maxWidth: 150,
  },
  price: {
    fontSize: 15,
    letterSpacing: 1.5,
    fontWeight: "bold",
    color: STYLES.COLORS.Priamary,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },
  removeContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  removeText: {
    color: STYLES.COLORS.Priamary,
    fontWeight: STYLES.FONTS.Large,
    letterSpacing: 1.5,
    fontSize: 15,
  },
  createdAt: {
    fontSize: 12,
    color: "#777",
    alignSelf: "flex-end",
  },
});

export default BasketItem;
