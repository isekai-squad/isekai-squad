import React, { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import CheckBox from 'expo-checkbox';
import { STYLES } from '../../../../../GlobalCss';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
const Step5 = ({setStep,speciality,setTechnologies}) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [Expertise,setExpertise]=useState([])
  const handleCheckBoxChange = async(item) => {
    const isChecked = await checkedItems.includes(item);
    setCheckedItems((prevItems) =>
      isChecked
        ? prevItems.filter((prevItem) => prevItem !== item)
        : [...prevItems, item]
    );
    setTechnologies(checkedItems)
    
  };

  console.log(checkedItems,'hhhhhhhhhhhhhhhhhhhhhhhhhhhh');
  const getAllSpecialities =async ()=>{
try {
      const res = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/technologie/speciality/techno/${speciality.id}`);
setExpertise(res.data)
}catch(err){
  console.log(err);
}
  }
  useEffect(()=>{
    getAllSpecialities()
  },[])

  const {width} = useWindowDimensions()

  return (
   <View style={{width}}>
     <View style={{ justifyContent: 'center', alignItems: 'center',gap:40}}>
      <View>
        <Text style={Styles.SignUp}>Expertise</Text>
        <Text style={{ fontFamily: 'Roboto-Light', fontSize: STYLES.SIZES.sizeL, fontWeight: '100' }}>
          Please select a field of expertise
        </Text>
      </View>
      <ScrollView style={{height:400}}>

      <View style={Styles.loginContainer}>
        {Expertise.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleCheckBoxChange(item)}>
            <View style={Styles.loginInput}>
              <CheckBox  size={20} value={checkedItems.includes(item)} onValueChange={() => {}} />
              <Text style={Styles.checkboxLabel}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
        </ScrollView>
        <TouchableOpacity
                    
                onPress={()=>setStep(6)}
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

export default Step5;






// import React, { useEffect, useState } from 'react';
// import Feather from 'react-native-vector-icons/Feather';
// import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
// import CheckBox from 'expo-checkbox';
// import { STYLES } from '../../../../../GlobalCss';
// import { ScrollView } from 'react-native-gesture-handler';
// import axios from 'axios';

// const Step4ish = ({ setStep,speciality }) => {
//   const [checkedItem, setCheckedItem] = useState(null);
//   const [Expertise, setExpertise] = useState([]);

//   const handleCheckBoxChange = (item) => {
//     const isChecked = checkedItems.includes(item);
//     setCheckedItems((prevItems) =>
//       isChecked
//         ? prevItems.filter((prevItem) => prevItem !== item)
//         : [...prevItems, item]
//     );
//   };
//   const getAllSpecialities = async () => {
//     try {
//       const res = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/technologie/speciality/techno/${speciality.id}`);
//       setExpertise(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getAllSpecialities();
//   }, []);

//   const { width } = useWindowDimensions();

//   return (
//     <View style={{ width,marginTop:50 }}>
//       <View style={{ justifyContent: 'center', alignItems: 'center', gap: 40 }}>
//         <View>
//           <Text style={Styles.SignUp}>Expertiaaaase</Text>
//           <Text style={{ fontFamily: 'Roboto-Light', fontSize: STYLES.SIZES.sizeL, fontWeight: '100' }}>
//             Please select a field of expertise
//           </Text>
//         </View>
//         <ScrollView style={{ height: 400 }}>
//           <View style={Styles.loginContainer}>
//             {Expertise.map((item, index) => (
//               <TouchableOpacity key={index} onPress={() => handleCheckBoxChange(item)}>
//                 <View style={Styles.loginInput}>
//                   <CheckBox size={20} value={checkedItem === item} onValueChange={() => {}} />
//                   <Text style={Styles.checkboxLabel}>{item.name}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>
//         <TouchableOpacity
//           onPress={() => setStep(5)}
//           style={{
//             backgroundColor: STYLES.COLORS.Priamary,
//             width: 150,
//             height: 50,
//             borderRadius: 10,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text style={{ color: 'white', fontFamily: 'Roboto-bold', fontSize: STYLES.SIZES.sizeL }}>Next Step <Feather size={20} name='arrow-right' /></Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// const Styles = StyleSheet.create({
//   SignUp: {
//     color: STYLES.COLORS.Priamary,
//     fontFamily: 'Roboto-Bold',
//     fontSize: STYLES.SIZES.sizeXXL,
//     marginBottom: 10,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   checkboxLabel: {
//     marginLeft: 10,
//     fontFamily: 'Roboto-Light',
//     fontSize: STYLES.SIZES.sizeM,
//   },
//   loginContainer: {
//     // flexDirection: 'row', // Change this to 'row' if you want checkboxes in a row
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     width: '90%',
    
//     marginTop: 20,
//   }, loginInput: {
//     height: 60,
//     width: 300,
//     justifyContent: 'flex-start',
//     alignItems: 'center',

//     flexDirection: 'row',
//     borderColor: "#dbdbdb",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 40,
//     color: "#000",
// },
// });

// export default Step4ish;
