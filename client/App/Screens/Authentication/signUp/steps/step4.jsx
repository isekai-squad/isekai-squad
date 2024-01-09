import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import CheckBox from 'expo-checkbox';
import { STYLES } from '../../../../../GlobalCss';
import { Expertises } from './expertises';
import { ScrollView } from 'react-native-gesture-handler';
const Step4 = ({setStep}) => {
  const [checkedItems, setCheckedItems] = useState([]);
  
  const handleCheckBoxChange = (item) => {
    const isChecked = checkedItems.includes(item);
    setCheckedItems((prevItems) =>
      isChecked
        ? prevItems.filter((prevItem) => prevItem !== item)
        : [...prevItems, item]
    );
  };

  const expertiseData = ['Item 1', 'Item 2', 'Item 3']; // Replace this with your actual data
  const {width} = useWindowDimensions()

  return (
   <View style={{width}}>
     <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40,gap:40,top:20}}>
      <View>
        <Text style={Styles.SignUp}>Expertise</Text>
        <Text style={{ fontFamily: 'Roboto-Light', fontSize: STYLES.SIZES.sizeL, fontWeight: '100' }}>
          Please select a field of expertise
        </Text>
      </View>
      <ScrollView style={{height:400}}>

      <View style={Styles.loginContainer}>
        {Expertises.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleCheckBoxChange(item)}>
            <View style={Styles.loginInput}>
              <CheckBox  size={20} value={checkedItems.includes(item)} onValueChange={() => {}} />
              <Text style={Styles.checkboxLabel}>{item}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
        </ScrollView>
        <TouchableOpacity
                    
                onPress={()=>setStep(5)}
                     style={{
                        backgroundColor: STYLES.COLORS.Priamary,
                        width: 150,
                        height: 50,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      //  top:40,
                      //  right:18
                        
                    }}>
                   <Text style={{color:'white', fontFamily:'Roboto-bold', fontSize: STYLES.SIZES.sizeL}}>Next Step <Feather size={20} name='arrow-right'/></Text>
                    </TouchableOpacity>
    
    </View>
   </View>
  );
};

const Styles = StyleSheet.create({
  SignUp: {
    color: STYLES.COLORS.Priamary,
    fontFamily: 'Roboto-Bold',
    fontSize: STYLES.SIZES.sizeXXL,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontFamily: 'Roboto-Light',
    fontSize: STYLES.SIZES.sizeM,
  },
  loginContainer: {
    // flexDirection: 'row', // Change this to 'row' if you want checkboxes in a row
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    
    marginTop: 20,
  }, loginInput: {
    height: 60,
    width: 300,
    justifyContent: 'flex-start',
    alignItems: 'center',

    flexDirection: 'row',
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 40,
    color: "#000",
},
});

export default Step4;
