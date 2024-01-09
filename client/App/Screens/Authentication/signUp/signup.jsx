import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated, FlatList, useWindowDimensions } from 'react-native';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';
import Step5 from './steps/step5';
import Ionicons from 'react-native-vector-icons/Ionicons';

// const Signup = () => {
//   const steps = [Step1, Step2, Step3, Step4, Step5];
//   const [currentStep, setCurrentStep] = useState(0);

//   const renderItem = ({ item }) => {
//     const StepComponent = item;
//     return <StepComponent setStep={setCurrentStep} />;
//   };

//   return (
//     <View>
//       <FlatList
//         data={steps}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         initialNumToRender={1}
//         getItemLayout={(data, index) => ({ length: 360, offset: 360 * index, index })}
//         onViewableItemsChanged={({ viewableItems }) => {
//           if (viewableItems.length > 0) {
//             setCurrentStep(viewableItems[0].index);
//           }
//         }}
//       />
//     </View>
//   );
// };

// export default Signup;

  const Signup = () => {
    const [step, setStep] = useState(1);
    const [email,setEmail]=useState()
    const [name,setName]=useState()
    const [userName,setUserName]=useState()
    const [password,setPassword]=useState()
    const [conPassword,setConPassword]=useState()
    const [role,setRole]=useState()
    const [pdp,setPdp]=useState()
    const slideAnim = useRef(new Animated.Value(0)).current;

  
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
      }).start(() => setStep(step +1));
    };

    useEffect(() => {
      slideAnim.setValue(0);
    }, [step]);


    const createAccount =  async()=>{
      const userData = {
        name,
        userName,
        email,
        password,
        pdp,
        role,
      };
      try {

        const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP}:4070/api/user/create`,userData)
        console.log(response);
      }catch(err){
        console.log(err);
      }
    }
    const renderItem = ({ item }) => {
      const StepComponent = item.component;
      return <StepComponent {...item.props} />;
    };
    return (
     
      <SafeAreaView style={{ marginTop: 40 }}>
        <View>
        {step !==1 && (
            <TouchableOpacity style={{top:20,}} onPress={switchToStep2}>
              <Ionicons size={50} name='arrow-back'/>
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
            {step === 1 && <Step1 setName={setName} name={name} userName={userName} setUserName={setUserName} role={role} setRole={setRole} setStep={setStep} />}
            {step === 2 && <Step2 password={password}  setPassword={setPassword}  setEmail={setEmail} email={email}
          setConPassword={setConPassword} conPassword={conPassword}   setStep={setStep} />}
            {step === 3 && <Step3 setStep={setStep} />}
            {step===4 && <Step4 setStep={setStep} />}
          {step=== 5 &&  <Step5 createAccount={createAccount} pdp={pdp} setPdp={setPdp}/>}

        
          </Animated.View>

      
         </View>
       </SafeAreaView>
    );
  };

  export default Signup;