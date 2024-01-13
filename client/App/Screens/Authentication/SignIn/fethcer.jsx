import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignInFetch =  async (data,navigation,setToken,pre)=>{
  const {email,password}=data
    try {
     console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhh');
     var response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP}:4070/api/user/signin/`,data)
     await setToken(response.data)
      console.log(response.data.token);
      await AsyncStorage.setItem('Token',response.data.token).then(()=>{
        navigation.navigate('Home')
      })
        return 'success'
    }catch(err){
      console.log(err);
      if (err.response.status === 401) {
        return 'Invalid Credentials'
      } 
      if (err.response.status === 404) {
        return 'User not found'
      } 
      console.log(err);
    }
     
  }
