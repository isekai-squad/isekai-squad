import React, { useState, useRef, useEffect,useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated, FlatList, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';
import Step5 from './steps/step5';
import Step6 from './steps/step6';
import Step7 from './steps/step7';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../../FirebaseConfig';
import { useRoute } from '@react-navigation/native';

  const Signup = ({navigation}) => {
    const [step, setStep] = useState(1);
    const [email,setEmail]=useState()
    const [name,setName]=useState()
    const [userName,setUserName]=useState()
    const [password,setPassword]=useState()
    const [conPassword,setConPassword]=useState()
    const [role,setRole]=useState()
    const [pdp,setPdp]=useState()
    const [speciality,setSpeciality]=useState()
    const [technologies,setTechnologies]=useState()
    const slideAnim = useRef(new Animated.Value(0)).current;
    const route = useRoute()

    const {setToken}=route.params
useEffect( ()=>{

},[])
const saveCurrentUser =async (data)=>{
await SecureStore.setItemAsync('Token',data)
}

    const switchToStep2 = () => {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start(() => setStep(step-1));
    };

  const switchToStep1 = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start(() => setStep(step + 1));
  };

  useEffect(() => {
    slideAnim.setValue(0);
  }, [step]);

    const createCompanyAcc = async()=>{
      const companyData = {
        name,
        userName,
        email,
        password,
        pdp,
        role,
        confirmed:false
      };
      try{
         const emailSent= await axios.post(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/company/create`,{email,name,pdp,userName})
         const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/user/create`,companyData)
         await createUserWithEmailAndPassword(auth,email,password)
         saveCurrentUser(response.data.token)
         console.log(response.data.id,'IIIIIIIIIIIIIIIIIIIID');
         await setToken(response.data.token)
        
      }catch(err){
          console.log(err);
      }
  }

  const createAccount = async () => {
    if (role === "COMPANY") {
      createCompanyAcc();
    } else {
      const userData = {
        name,
        userName,
        email :email,
        password,
        pdp,
        role,
      };
      try {
        const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/user/create`,userData)
        await  createUserWithEmailAndPassword(auth,email,password)

        console.log(response.data.id,'IIIIIIIIIIIIIIIIIIIID');
       await setToken(response.data.token)
       saveCurrentUser(response.data.token).then(async() =>{
      await addTechnologies(response.data.id)
      await addSpeciality(response.data.id)

       })
      }catch(err){
console.log(err);
      }
    }
    const renderItem = ({ item }) => {
      const StepComponent = item.component;
      return <StepComponent {...item.props} />;
    };
  };

  const addSpeciality = async (id)=>{
    const obj = {
      userId:id,
      specialtyId:speciality.id
    }
    try {
      await axios.post(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/technologie/user/speciality/add`,obj)
    }catch(err){
      console.log(err);
    }
  }

  const addTechnologies = async (id) => {
    const data = technologies.map((e) => ({ technologiesId: e.id, userId: id }));
  
    try {
      console.log(data, "THIS IS DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATA");
      // Assuming the server accepts the array directly
      await axios.post(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/technologie/user/Technology/${id}`, data);
      console.log('Technologies added successfully');
    } catch (err) {
      console.error('Error adding technologies:', err);
    }
  };
  
  return (
    <SafeAreaView style={{}}>
      <View>
        {step !== 1 && (
          <TouchableOpacity style={{ top: 20 }} onPress={switchToStep2}>
            <Ionicons size={50} name="arrow-back" />
          </TouchableOpacity>
        )}

          <Animated.View
            style={{
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1,2,3,4],
                    outputRange: [0, -400,-800,-1200,1600], // Adjust the value based on your screen width
                  }),
                },
              ],
            }}
          >
             { step === 1 &&<Step1 navigation={navigation} setName={setName} name={name} userName={userName} setUserName={setUserName} role={role} setRole={setRole} setStep={setStep} />}
            { step===2 &&<Step2 password={password}  setPassword={setPassword}  setEmail={setEmail} email={email}
          setConPassword={setConPassword} conPassword={conPassword}   setStep={setStep} />}
            { step=== 3 &&<Step3 setStep={setStep} />}
            { step === 4 && <Step4 setSpeciality={setSpeciality} setStep={setStep} />}
            { step=== 5 && <Step5 speciality={speciality} technologies={technologies} setTechnologies={setTechnologies}  setStep={setStep} />}
           { step === 6 && <Step6 createAccount={createAccount} pdp={pdp} setPdp={setPdp} setStep={setStep}/>} 
          
{ step===7 &&<Step7 createAccount={createAccount} role={role}/>
}            
</Animated.View>



      
         </View>
       </SafeAreaView>
    );
  };

  export default Signup;