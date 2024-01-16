import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Foundation from "react-native-vector-icons/Foundation";
import Fontisto from "react-native-vector-icons/Fontisto";

const AllServices = ({ navigation }) => {
  const [services, setServices] = useState([]);
const API = process.env.EXPO_PUBLIC_IP_KEY;

  const [Detail, setdetail] = useState([]);
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API}/Services/`);
      const initialLikes = response.data.reduce((acc, service) => {
        acc[service.serviceId] = service.like;
        return acc;
      }, {});
      setServices(response.data);
      setLikes(initialLikes);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleUpVote = async () => {
    try {
      const response = await axios.post(`${API}/Services/UpVote/1/2`);

      console.log('UpVote successful:', response.data);
    } catch (error) {
      console.error('Error during UpVote:', error.message);
    }
  };

  const handleDownVote = async () => {
    try {
      const response = await axios.post(`${API}/Services/DownVote/1/2`);

      console.log('DownVote successful:', response.data);
    } catch (error) {
      console.error('Error during DownVote:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Text style={styles.title} numberOfLines={2}>
      {item.title}
    </Text>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.price}> {item.Price} DT</Text>
      <Text numberOfLines={2}  style={styles.description}>{item.description}</Text>
      <View style={styles.voteContainer}>

        <TouchableOpacity onPress={() => handleUpVote(item.serviceId)}>
          <Foundation name="like" size={30} color="#8244CB" />
        </TouchableOpacity>

        <Text style={styles.likes}> {[item.serviceId]}</Text>

        <TouchableOpacity onPress={() => handleDownVote(item.serviceId)}>
          <Foundation name="dislike" size={30} color="#8244CB" />
        </TouchableOpacity>
        <View style={styles.detailsContainer} >
        <TouchableOpacity

          onPress={() =>
            navigation.navigate("serviceDetails", {
              item: item,
            })
          }

        >
          <Fontisto name="more-v-a" size={22} color="#525252" />
        </TouchableOpacity>
      </View >

      </View>
    </View>
  );

  if (services.length === 0) {
    return <ActivityIndicator size="large" color="#8244CB" />;
  }

  return (
    <FlatList
      data={services}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    elevation: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    color: "#4D4D4D",
    fontSize: 20,
    marginBottom: 8,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  likes: {
    fontSize: 16,
    marginHorizontal: 6,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 2,
  },

  detailsContainer: {
    padding: 10,
    borderRadius: 8,
    flexDirection: "right",
    justifyContent: "flex-end",
  },
  description:{
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 16

  }

});

export default AllServices;
