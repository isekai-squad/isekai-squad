import { View, Text, SafeAreaView, useWindowDimensions } from 'react-native'
import React ,{useState} from 'react'
import Pass1 from './step1'
import Pass2 from './step2'
import Pass3 from './step3'
const ForgotPassword = ({navigation}) => {
    const {width,height}=useWindowDimensions()
    const [email,setEmail]=useState()

    const [step,setStep]=useState(1)
  return (
      
      <View >
        <SafeAreaView>
      {step === 1 &&  <Pass1 setStep={setStep} setEmail={setEmail} email={email}/>}
      {step === 2 &&  <Pass2 setStep={setStep}setEmail={setEmail} email={email}/>}
      { step === 3 &&  <Pass3 navigation={navigation} setStep={setStep}setEmail={setEmail} email={email}/>}
    </SafeAreaView>
    </View>
  )
}

export default ForgotPassword