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

const AllServices = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [Detail, setdetail] = useState([]);
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://172.29.0.73:4070/Services/");
      setServices(response.data.map((service) => ({ ...service, likes:0  })));
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleUpVote = async () => {
    try {
      const response = await axios.post('http://172.29.0.73:4070/Services/UpVote/1/2');
      
      console.log('UpVote successful:', response.data);
    } catch (error) {
      console.error('Error during UpVote:', error.message);
    }
  };

  const handleDownVote = async () => {
    try {
      const response = await axios.post('http://172.29.0.73:4070/Services/DownVote/1/2');
    
      console.log('DownVote successful:', response.data);
    } catch (error) {
      console.error('Error during DownVote:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Text
        style={styles.title}
        onPress={() =>
          navigation.navigate("serviceDetails", {
            item: item,
          })
        }
      >
        {item.title}
      </Text>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.price}>Price: {item.Price}</Text>
      <View style={styles.voteContainer}>
        <TouchableOpacity onPress={() => handleUpVote(item.serviceId)}>
          <Foundation name="like" size={30} color="#8244CB" />
        </TouchableOpacity>
        
        <Text style={styles.likes}>{item.likes}</Text>

        <TouchableOpacity onPress={() => handleDownVote(item.serviceId)}>
          <Foundation name="dislike" size={30} color="#8244CB" />
        </TouchableOpacity>
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
    margin: 4,
    padding:56 ,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    elevation: 8,

  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    marginBottom: 8,
  },
  createdAt: {
    fontSize: 14,
    marginBottom: 8,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
   
  },
  likes: {
    fontSize: 16,
    marginHorizontal: 6,
  },
  deleteText: {
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default AllServices;
