import { View , Text, StyleSheet, TouchableOpacity,ActivityIndicator, useWindowDimensions} from "react-native"
import { STYLES } from "../../../../../GlobalCss";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

  import { storage, auth } from "../../../../../FirebaseConfig";
import { useEffect,useState } from "react";
export default  Step5 = ({setPdp,pdp,createAccount})=>{
    const [loading,setLoading]=useState(false)
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
          await setPdp(source.uri).then(()=>uploadPdp())
          
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

        } catch (error) {
          setLoading(false)
          console.error("Error uploading image:", error);
        }
      };

      const {width} = useWindowDimensions()

    return (
      <View style={{width}}>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40, gap:40, top:80 }}>
            <View>
            <Text style={Styles.SignUp}>Profile Picture</Text>
        <Text style={{ fontFamily: 'Roboto-Light', fontSize: STYLES.SIZES.sizeL, fontWeight: '100' }}>
          Express Yourself With A Picture
        </Text>
            </View>
            {loading ? (
              <View>
    <ActivityIndicator size="large" color={STYLES.COLORS.Priamary} />
  </View>
) : (
  <View>
    <Feather color={STYLES.COLORS.Priamary} size={250} name='image' />
    <TouchableOpacity onPress={pickImage}>
      <Feather color={STYLES.COLORS.Priamary} style={{ left: 180, bottom: 80 }} size={100} name='plus-circle' />
    </TouchableOpacity>
  </View>
)}
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
            <Text style={{ color: 'white', fontFamily: 'Roboto-Bold', fontSize: STYLES.SIZES.sizeL }}>Create Account</Text>
          </TouchableOpacity>
        </View>
              </View>
    )
}

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