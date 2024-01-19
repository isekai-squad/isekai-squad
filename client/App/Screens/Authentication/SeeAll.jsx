import { View, Text,TouchableOpacity, Image,StyleSheet,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font';
import { STYLES } from '../../../GlobalCss';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const SeeAll = () => {
    const [users, setUsers] = useState()
    const [role,setRole]=useState(null)
    const [loading,setLoading]=useState(false)
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Bold": require("../../../assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Light": require("../../../assets/fonts/Roboto-Light.ttf"),
        "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
    });
    const getUsers = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/users`,{role:role})
           setUsers(res.data)
           setLoading(false)
        } catch (err) {  setLoading(false) 
            console.log(err); }
    }

    useEffect(()=>{
      getUsers()
    },[role])
    return (
         <ScrollView>
        <SafeAreaView  style={{ marginHorizontal: 20, marginTop: 20 }}>

            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 40, color: STYLES.COLORS.Priamary }}>
             {!role && 'All Members' }
             {role === 'STUDENT' && 'Students'}
             {role === 'COMPANY' && 'Companies'}
             {role === 'ADVISOR' && 'Advisors'}
             </Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ height: 70 }} >
                <View style={{ flexDirection: "row", gap: 30, alignSelf: 'center', marginTop: 20 }}>
                    <TouchableOpacity 
                    onPress={()=>setRole('STUDENT')}
                    style={ role === 'STUDENT' ? styles.selectedRole :{ alignContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: STYLES.COLORS.Priamary, borderRadius: 10, width: 100 }}>

                        <Text style={role === 'STUDENT' ? { fontFamily: 'Roboto-Medium', fontSize: 16, color: 'white' } :{ fontFamily: 'Roboto-Medium', fontSize: 16, color: STYLES.COLORS.Priamary }}>Students</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                     onPress={()=>setRole('COMPANY')}
                    style={role === 'COMPANY' ? styles.selectedRole : { alignContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: STYLES.COLORS.Priamary, borderRadius: 10, width: 100 }}>

                        <Text style={role === 'COMPANY' ? { fontFamily: 'Roboto-Medium', fontSize: 16, color: 'white' }  :  { fontFamily: 'Roboto-Medium', fontSize: 16, color: STYLES.COLORS.Priamary }}>Companies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                     onPress={()=>setRole('ADVISOR')}
                    style={ role === 'ADVISOR' ? styles.selectedRole :{ alignContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: STYLES.COLORS.Priamary, borderRadius: 10, width: 100 }}>

                        <Text style={ role==='ADVISOR' ? { fontFamily: 'Roboto-Medium', fontSize: 16, color: 'white'} :{ fontFamily: 'Roboto-Medium', fontSize: 16, color: STYLES.COLORS.Priamary }}>Advisors</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  
                     onPress={()=>setRole(null)}
                    style={ !role ? styles.selectedRole :{ alignContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: STYLES.COLORS.Priamary, borderRadius: 10, width: 100 }}>

                        <Text style={ role ? { fontFamily: 'Roboto-Medium', fontSize: 16, color: STYLES.COLORS.Priamary } :{ fontFamily: 'Roboto-Medium', fontSize: 16, color: 'white' }}>All</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <View>
            { loading ? <ActivityIndicator style={{marginTop:50}} size={80} color={STYLES.COLORS.Priamary} /> :
            <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()} 
      renderItem={({ item }) =>    <TouchableOpacity 
      >
       
    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBlockColor: '#d3d3d3', alignContent: 'center', alignItems: 'center', gap: 10, width: '100%', height:80 }}>
      <Image source={{ uri: item.pdp }} style={{ width: 50, height: 50,borderRadius:50 }} />
      <Text>{item.name}</Text>
      <Text style={{ left: 220,position:'absolute', }}>{item.role}</Text>
    </View>
      </TouchableOpacity>} 
    />}
            </View>
        </SafeAreaView>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    selectedRole :{

        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: STYLES.COLORS.Priamary,
        borderRadius: 10,
        width: 100,
        backgroundColor:STYLES.COLORS.Priamary
    }
         
})

export default SeeAll