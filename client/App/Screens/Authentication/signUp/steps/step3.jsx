    import React from 'react'
    import  { useState,useContext } from 'react'
    import FontAwesome from 'react-native-vector-icons/FontAwesome'
    import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
    import Fontisto from 'react-native-vector-icons/Fontisto'
    import Ionicons from 'react-native-vector-icons/Ionicons'
    import CountryPicker from 'react-native-country-picker-modal'

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
        Vibration,
        useWindowDimensions

    } from 'react-native'
    import { useFonts } from 'expo-font'
    import { STYLES } from '../../../../../GlobalCss'
    import { axios } from 'axios'
    function Step3({setStep}) {
        const [shown,setShown]=useState(true)
        const [shown2,setShown2]=useState(true)
        const [country,setCountry]=useState(null)
        const [visible, setVisible] = useState(false)

        const onSelect = (country) => {
            setCountry(country)
            console.log(country.name,country.flag);
        }
        const switchVisible = () => setVisible(!visible)
        const {width} = useWindowDimensions()

    return (
        <View style={{width}}>
            <View style={{marginLeft:40, marginTop:100,top:80}} >
                            <Text style={Styles.SignUp}>SignUp</Text>
                            <Text style={{ fontFamily: "Roboto-Light", fontSize: STYLES.SIZES.sizeL, fontWeight: '100' }}>SignUp And Join Us</Text>


                            <View style={{ gap: 40,      justifyContent: 'center',
                            alignItems: 'center', }}>


    <View   style={Styles.loginContainer}>
    <FontAwesome5 style={Styles.loginIcon} name="map-marked-alt" size={20} color={"#8244CB"} />
        <View
       
            style={Styles.loginInput}
           
        >{!country ?<Text onPress={()=>setVisible(true)}   style={{alignItems:'flex-start',right:74}}>
             Select A country
            </Text> : <Text style={{alignItems:'flex-start',right:74}}>
              {country.name}
            </Text> }
            </View>
    </View>
    <View style={Styles.loginContainer}>
<FontAwesome5 style={Styles.loginIcon} name="map-marker-alt" size={20} color={"#8244CB"} />
    <TextInput
        style={Styles.loginInput}
        placeholder="Your Adress"
    />
</View>

<TouchableOpacity
                        
                        onPress={()=>setStep(4)}
                            style={{
                                backgroundColor: STYLES.COLORS.Priamary,
                                width: 150,
                                height: 50,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            top:40,
                            right:18
                                
                            }}visible={false}>
                        <Text style={{color:'white', fontFamily:'Roboto-bold', fontSize: STYLES.SIZES.sizeL}}>Next Step <Feather size={20} name='arrow-right'/></Text>
                            </TouchableOpacity>
    
                                   
                            </View>

                                   <View style={{ opacity:0,top:90, fontColor:'red'}}>
                                    <CountryPicker  {...{
                                        withFilter:true,
                                        withFlag:true,
          withCountryNameButton:{title:'country'},
          withAlphaFilter:true,
          withEmoji:true,
          preferredCountries: ['US', 'GB'],
          modalProps: { visible:visible },
          onSelect,
          onClose: () => setVisible(false),
          onOpen: () => setVisible(true),
}
} visible={false} />
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
            justifyContent: 'center',
            alignItems: 'center',   
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
    export default Step3