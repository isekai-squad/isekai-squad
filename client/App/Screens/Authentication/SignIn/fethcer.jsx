import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";

export const SignInFetch =  async (data,navigation,setToken,pre)=>{
    try {
  
      var response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP}:4070/api/user/signin/`,data)
       await setToken(response.data)
        navigation.navigate('Home')
        return 'success'
    }catch(err){
      if (err.response.status === 401) {
        return 'Invalid Credentials'
      } 
      if (err.response.status === 404) {
        return 'User not found'
      } 
      
    }
     
  }
