import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, useWindowDimensions, Image } from "react-native"
import { STYLES } from "../../../../../GlobalCss";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

import { storage, auth } from "../../../../../FirebaseConfig";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default Step5 = ({ setPdp, pdp, createAccount,setStep,navigation }) => {
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    console.log(pdp);
  }, [pdp]);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const source = { uri: selectedAsset.uri };
      await setPdp(source.uri)

    }
  };


  const uploadPdp = async () => {

    try {
      if (!pdp) {
        console.error("No image selected for upload.");
        return;
      }
      let r = (Math.random() + 1).toString(36).substring(7);

      setLoading(true)
      const imageRef = ref(storage, `profileImage/${r}`);
      const response = await fetch(pdp);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);

      await setPdp(downloadURL);
      setLoading(false)
      setStep(6)

    } catch (error) {
      setLoading(false)
      console.error("Error uploading image:", error);
    }
  };

  const { width } = useWindowDimensions()

  return (
    <View>
      <SafeAreaView>
        <View style={Styles.mainContainer}>
          <View>
            <Text style={Styles.SignUp}>Profile Picture</Text>
            <Text style={{ fontFamily: 'Roboto-Light', fontSize: STYLES.SIZES.sizeL, fontWeight: '100' }}>
              Express Yourself With A Picture
            </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 120 }}>
            {!pdp ? <View>

              <Feather color={STYLES.COLORS.Priamary} size={250} name='image' />
              <TouchableOpacity onPress={pickImage}>
                <Feather color={STYLES.COLORS.Priamary} style={{ position: 'absolute', bottom: -30, left: 180 }} size={100} name='plus-circle' />
              </TouchableOpacity>
            </View> :
              <Image
                style={{ width: 220, height: 220, borderRadius: 75 }}
                source={{
                  uri: pdp,
                }}
              />}
            {pdp && <View style={{justifyContent:'center',alignItems:'center',gap:20}}>
            <View style={{ flexDirection: 'row', gap: 20 }}>

              <TouchableOpacity
                onPress={uploadPdp}
                style={{
                  backgroundColor: STYLES.COLORS.Priamary,
                  width: 150,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',

                }}>
                <Text style={{ color: 'white', fontFamily: 'Roboto-Bold', fontSize: STYLES.SIZES.sizeL }}>I like it</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  backgroundColor: STYLES.COLORS.Priamary,
                  width: 150,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',

                }}>
           <Text style={{ color: 'white', fontFamily: 'Roboto-Bold', fontSize: STYLES.SIZES.sizeL }}>Change it</Text>

              </TouchableOpacity>
            </View> 
             </View>
            }
            <TouchableOpacity
                onPress={()=>setStep(6)}
                style={{
                  backgroundColor: STYLES.COLORS.Priamary,
                  width: 150,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',

                }}>
           <Text 
           style={{ color: 'white', fontFamily: 'Roboto-Bold', fontSize: STYLES.SIZES.sizeL }}>Skip</Text>

              </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const Styles = StyleSheet.create({

  mainContainer: {
    gap: 40,
    margin: 20,
  },
  SignUp: {
    color: STYLES.COLORS.Priamary,
    fontFamily: 'Roboto-Bold',
    fontSize: STYLES.SIZES.sizeXXL,
    marginBottom: 2,
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
    flexDirection: 'row', // Change this to 'row' if you want checkboxes in a row
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',

    marginTop: 20,
  }, loginInput: {
    height: 60,
    width: "100%",
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 40,
    color: "#000",
  },
});