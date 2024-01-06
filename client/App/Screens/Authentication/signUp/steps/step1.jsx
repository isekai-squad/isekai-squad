import React from 'react'
import  { useState,useContext } from 'react'
import { STYLES } from '../../../../../GlobalCss'
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
const Step1 = ({setStep}) => {
    const [pressed, setPressed] = useState('')
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("../../../../../assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Bold": require("../../../../../assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Light": require("../../../../../assets/fonts/Roboto-Light.ttf"),
        "Roboto-Medium": require("../../../../../assets/fonts/Roboto-Medium.ttf"),
    });
    
  return (
    <View>
       <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop:45,
                        
                      
                    }}>

                        <TouchableOpacity onPress={() => setPressed('STUDENT')} >

                            <View style={pressed !== 'STUDENT' ? Styles.IconView : Styles.PressedIconView} >
                                <Feather
                                    style={pressed !== 'STUDENT' ? Styles.Icon : Styles.PressedIcon} name='user' size={30} />
                            </View>
                            { pressed !== 'STUDENT' ? <Text style={{ textAlign: 'center', }}>Student</Text> :  <Text style={{ textAlign: 'center', }}><FontAwesome color={STYLES.COLORS.Priamary} size={22} name='caret -up'/></Text>}
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', gap: 84,  }}>

                            <TouchableOpacity onPress={() => setPressed('COMPANY')} >

                                <View style={pressed !== 'COMPANY' ? Styles.IconView : Styles.PressedIconView} >
                                    <FontAwesome style={pressed !== 'COMPANY' ? Styles.Icon : Styles.PressedIcon} name='building-o' size={30} />
                                </View>
                                { pressed !== 'COMPANY' ? <Text style={{ textAlign: 'center', }}>Company</Text> :  <Text style={{ textAlign: 'center', }}><Feather color={STYLES.COLORS.Priamary} size={22} name='chevron-up'/></Text>}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setPressed('ADVISOR')} >

                                <View style={pressed !== 'ADVISOR' ? Styles.IconView : Styles.PressedIconView} >
                                    <FontAwesome5 style={pressed !== 'ADVISOR' ? Styles.Icon : Styles.PressedIcon} name='hands-helping' size={30} />
                                </View>
                                { pressed !== 'ADVISOR' ? <Text style={{ textAlign: 'center', }}>Advisor</Text> :  <Text style={{ textAlign: 'center', }}><Feather color={STYLES.COLORS.Priamary} size={22} name='chevron-up'/></Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                        <View style={{marginLeft:40, top:20}} >
                        <Text style={Styles.SignUp}>SignUp</Text>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: STYLES.SIZES.sizeL, fontWeight: '100' }}>SignUp And Join Us</Text>


                        <View style={{ gap: 40,      justifyContent: 'center',
                        alignItems: 'center', }}>


<View style={Styles.loginContainer}>
    <Feather style={Styles.loginIcon} name="user-plus" size={20} color={"#8244CB"} />
    <TextInput
        style={Styles.loginInput}
        placeholder="Full Name"
    />
</View>
    <View style={Styles.loginContainer}>
    <Ionicons  style={Styles.loginIcon} name="key-outline" size={20} color={"#8244CB"} />
    <TextInput

        style={Styles.loginInput}
        placeholder="Your Password"
        >

        </TextInput>
       
</View>
<TouchableOpacity
                     onPress={()=>setStep('step2')}
                
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

})

export default Step1