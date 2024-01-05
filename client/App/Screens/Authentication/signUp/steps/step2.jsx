import React from 'react'
import  { useState,useContext } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather
    from 'react-native-vector-icons/Feather'
import {
    View,
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Vibration

} from 'react-native'
import { useFonts } from 'expo-font'
import { STYLES } from '../../../../../GlobalCss'
import { axios } from 'axios'
function Step2() {
    const [shown,setShown]=useState(true)
    const [shown2,setShown2]=useState(true)


    
  return (
    <View>
           <View style={{marginLeft:40, marginTop:100}} >
                        <Text style={Styles.SignUp}>SignUp</Text>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: STYLES.SIZES.sizeL, fontWeight: '100' }}>SignUp And Join Us</Text>


                        <View style={{ gap: 40,      justifyContent: 'center',
                        alignItems: 'center', }}>


<View style={Styles.loginContainer}>
<Fontisto style={Styles.loginIcon} name="email" size={20} color={"#8244CB"} />
    <TextInput
        style={Styles.loginInput}
        placeholder="Your Email"
    />
</View>
<View style={Styles.loginContainer2}>
                            <Ionicons  style={Styles.loginIcon} name="key-outline" size={20} color={"#8244CB"} />
                            <TextInput
                                
                            secureTextEntry={shown}
                                style={Styles.loginInput}
                                placeholder="Your Password"
                                >

                                </TextInput>
                                <TouchableOpacity style={{right:28, }} onPress={()=>setShown(!shown)}>

                               { shown ? <Feather size={20} name="eye" /> :
                                <Feather size={20} name="eye-off" />}
                                </TouchableOpacity>
                        </View>
<View style={Styles.loginContainer2}>
                            <Ionicons  style={Styles.loginIcon} name="key-outline" size={20} color={"#8244CB"} />
                            <TextInput
                                                       secureTextEntry={shown2}

                                style={Styles.loginInput}
                                placeholder="Your Password"
                                >

                                </TextInput>
                                <TouchableOpacity style={{right:28, }} onPress={()=>setShown2(!shown2)}>

                               { shown2 ? <Feather size={20} name="eye" /> :
                                <Feather size={20} name="eye-off" />}
                                </TouchableOpacity>
                        </View>

<TouchableOpacity
                    
                
                     style={{
                        backgroundColor: STYLES.COLORS.Priamary,
                        width: 150,
                        height: 50,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                       top:40,
                       right:18
                        
                    }}>
                   <Text style={{color:'white', fontFamily:'Roboto-bold', fontSize: STYLES.SIZES.sizeL}}>Next Step <Feather size={20} name='arrow-right'/></Text>
                    </TouchableOpacity>
</View>

                        </View>
    </View>
  )
}
const Styles = StyleSheet.create({
    Icon: {
        color: 'white'
    },
    IconView: {
        backgroundColor: STYLES.COLORS.Priamary,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    PressedIcon: {
        color: STYLES.COLORS.Priamary
    },
    PressedIconView: {
        backgroundColor: 'white',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    SignUp: {
        color: STYLES.COLORS.Priamary,
        fontFamily: 'Roboto-Bold',
        fontSize: STYLES.SIZES.sizeXXL
    },
    loginInput: {
        height: 60,
        width: "100%",
        borderColor: "#dbdbdb",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 40,
        color: "#000",
    },
    loginIcon: {
        left: 30,
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        right:34,
        top:40,
    },
    loginContainer2: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        right:24,
        top:40,
    },

})
export default Step2