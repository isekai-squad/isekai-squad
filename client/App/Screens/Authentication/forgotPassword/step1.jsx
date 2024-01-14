import { View, Text, useWindowDimensions, Image,StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { STYLES } from '../../../../GlobalCss'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
const Pass1 = ({setStep,setEmail,email}) => {
    const {width,height}=useWindowDimensions()
    const [sent,setSent]=useState(false)
    const [error,setError]=useState()
    const submit = async()=>{
        if (!email){setError('no email')}
        const data = {email:email}
        try {

           const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IP}:4070/api/user/forgotPassword`,data)
            setError('')
            setSent(true)
        }catch(err){
            if (err.response.status === 404){
                setError('no user found')
            }
            console.log(err);
        }
    }
  return (
    <View style={{justifyContent:'center',alignItems:'center',width,height,gap:40}}>
        <Image style={{width:200,height:200}} source={{uri:'https://i.imgur.com/KyAazUD.png'}}/>
        <View style={{justifyContent:'center',alignItems:'center'}}>

        <Text style={Styles.Login}>Forgot Your Password ?</Text>
                        <Text style={{ fontFamily: "Roboto-Light", fontSize: STYLES.SIZES.sizeL, fontWeight: '100' }}>Enter Your Email Down Below</Text>
        </View>
                        

<View>

<View style={Styles.loginContainer}>
    <Fontisto style={Styles.loginIcon} name="email" size={20} color={"#8244CB"} />
    <TextInput
        style={Styles.loginInput}
        placeholder="Your Email"
        onChangeText={(email)=>setEmail(email)}
        />
</View>
{error === "no user found" && <Text style={{alignSelf: 'flex-end',color:'red'}}>x User not found</Text>}

        </View>
{!sent ?<TouchableOpacity
                    onPress={()=> submit()
                }
                     style={{
                        backgroundColor: STYLES.COLORS.Priamary,
                        width: 150,
                        height: 50,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                     
                        
                    }}>
                   <Text style={{color:'white', fontFamily:'Roboto-bold', fontSize: STYLES.SIZES.sizeL}}>Contuniue</Text>
                    </TouchableOpacity> : <View style={{flexDirection:'row', gap:20}}>
                    <TouchableOpacity
                    onPress={()=> submit()
                }
                     style={{
                        backgroundColor: STYLES.COLORS.Priamary,
                        width: 150,
                        height: 50,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                     
                        
                    }}>
                   <Text style={{color:'white', fontFamily:'Roboto-bold', fontSize: STYLES.SIZES.sizeL}}>Resend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=> submit()
                }
                     style={{
                        backgroundColor: STYLES.COLORS.Priamary,
                        width: 150,
                        height: 50,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                     
                        
                    }}>
                   <Text 
                   onPress={()=>setStep(2)}
                   style={{color:'white', fontFamily:'Roboto-bold', fontSize: STYLES.SIZES.sizeL}}>Contuniue</Text>
                    </TouchableOpacity>
                        </View>}
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
    Login: {
        color: STYLES.COLORS.Priamary,
        fontFamily: 'Roboto-Bold',
        fontSize: STYLES.SIZES.sizeXL
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        // bottom: 40
    },
    loginContainer2: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        bottom: 40,
        left:7
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


})
export default Pass1