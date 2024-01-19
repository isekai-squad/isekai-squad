import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { VisitProfileContext } from '../Context/VisitProfileContext';
const Searched = ({ name, role,id,pdp}) =>{ 
    const navigation = useNavigation()
    const {setVisitedProfileId    } = useContext(VisitProfileContext)
    return(
    <TouchableOpacity onPress={()=>
      {  setVisitedProfileId(id)
    navigation.navigate("Visited Profile",{id: id});}
    } >

  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBlockColor: '#d3d3d3', alignContent: 'center', alignItems: 'center', gap: 10, width: '100%', paddingHorizontal: 20,height:80 }}>
    <Image source={{ uri: pdp }} style={{ width: 50, height: 50,borderRadius:50 }} />
    <Text>{name}</Text>
    <Text style={{ left: 270,position:'absolute', }}>{role}</Text>
  </View>
    </TouchableOpacity>
)}

const SearchResults = ({ searched }) => {
  const [users, setUsers] = useState([]);

  const getSearched = async () => {
    try {
      const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/user/find/`, { searched: searched });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSearched();
    console.log(searched);
  }, [searched]);

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()} // Replace 'id' with your item's unique identifier
      renderItem={({ item }) => <Searched name={item.name} role={item.role} pdp={item.pdp} id={item.id}  />} // Pass individual item properties to the component
    />
  );
};

export default SearchResults;
