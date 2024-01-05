import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import Step1 from './steps/step1';
import Step2 from './steps/step2';

const Signup = () => {
  const [step, setStep] = useState('step1');
  const slideAnim = useRef(new Animated.Value(0)).current;

  const switchToStep2 = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start(() => setStep('step2'));
  };

  const switchToStep1 = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start(() => setStep('step1'));
  };

  useEffect(() => {
    // Reset animation value when switching between steps
    slideAnim.setValue(0);
  }, [step]);

  return (
    <SafeAreaView style={{ marginTop: 40 }}>
      <View>
      {step === 'step1' && (
          <TouchableOpacity onPress={switchToStep2}>
            <Text>Go to Step 2</Text>
          </TouchableOpacity>
        )}

        {step === 'step2' && (
          <TouchableOpacity onPress={switchToStep1}>
            <Text>Go back to Step 1</Text>
          </TouchableOpacity>
        )}
        <Animated.View
          style={{
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -400], // Adjust the value based on your screen width
                }),
              },
            ],
          }}
        >
          {step === 'step1' && <Step1 setStep={setStep} />}
          {step === 'step2' && <Step2 />}
        </Animated.View>

    
      </View>
    </SafeAreaView>
  );
};

export default Signup;