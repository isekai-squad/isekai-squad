import React, { useState, useRef, useEffect,useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated, FlatList, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';
import Step5 from './steps/step5';
import Step6 from './steps/step6';
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
    const slideAnim = useRef(new Animated.Value(0)).current;
    // const {token,setToken} = useContext(AuthContext)
    const route = useRoute()
    const {setToken}=route.params
useEffect( ()=>{
  const tst = async ()=>{
  
  }
  tst()
},[])
  // console.log(setToken,token);
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
         await AsyncStorage.setItem("Token",response.data)

        await setToken(response.data)
        await AsyncStorage.setItem('Token',response.data).then(()=>{
          navigation.navigate('Home')
         })
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
        email :email+"qsdqsd",
        password,
        pdp,
        role,
      };
      try {
        const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/user/create`,userData)
        await  createUserWithEmailAndPassword(auth,email,password)
        await setToken(response.data)
       await AsyncStorage.setItem('Token',response.data).then(()=>{
        navigation.navigate('Home')
       })
      }catch(err){
console.log(err);
      }finally{
      }
    }
    const renderItem = ({ item }) => {
      const StepComponent = item.component;
      return <StepComponent {...item.props} />;
    };
  };
  return (
    <SafeAreaView style={{ marginTop: 40 }}>
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
             { step === 1 && <Step1 navigation={navigation} setName={setName} name={name} userName={userName} setUserName={setUserName} role={role} setRole={setRole} setStep={setStep} />}
            {step === 2 && <Step2 password={password}  setPassword={setPassword}  setEmail={setEmail} email={email}
          setConPassword={setConPassword} conPassword={conPassword}   setStep={setStep} />}
            {step === 3 && <Step3 setStep={setStep} />}
            { step === 4 &&<Step4 setStep={setStep} />}
          { step === 5 && <Step5 createAccount={createAccount} pdp={pdp} setPdp={setPdp} setStep={setStep}/>}
          
{ step===6 &&<Step6 createAccount={createAccount} role={role}/>
}           
</Animated.View>



      
         </View>
       </SafeAreaView>
    );
  };

  export default Signup;