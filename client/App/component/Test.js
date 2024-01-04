import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image,ScrollView,TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.png';

export const Test = () => {
  return (
    
    <SafeAreaView>
        <ScrollView>

      <View style={styles.container}>
        <Image source={Logo} style={styles.image} />
        <View style={styles.textContainer}>

        <Text style={styles.Text1}>Showcase Your Projects</Text>
        <Text style={styles.Text2}>Create Opportunities</Text>
        </View>
      </View>
     <View style={styles.container3}>
        <Text style={styles.withIsekai}>With {<Text style={{color: '#8244CB', fontWeight:'bold'}}>Isekai</Text>} , you can forge your own future</Text>
        <Text style={styles.ourGoal}>Our goal in this application is to make you find the perfect environments where you can unleash the potential of your {<Text style={{color: '#8244CB', fontWeight:'bold'}}>ideas</Text>}</Text>
     </View>
     <View style={styles.container4}>
        <Text style={{fontSize:20 , fontWeight:'bold'}}>Companies</Text>
        <View style={styles.container5}>
           <Text style={{width:290}}>djjqsdoijqoidqsjioqdsih qdsohoidqsiohsqdoihsqdoh qsdoihqsoidoihqsdsint delectus! Eum veniam autem sit molestias laudantium est illo nesciunt.</Text>
           <TouchableOpacity>

           <View style={{backgroundColor:'#8244CB', width:80,height:40,borderRadius: 10, top:72 , right:40,
           justifyContent: 'center',
           alignItems: 'center',
           
        }} >

            <Text style={{color:'white' , fontSize:10}}>Get Started</Text>
           </View>
            </TouchableOpacity>
        </View>
        
     </View>
     <View style={styles.container4}>
        <Text style={{fontSize:20 , fontWeight:'bold'}}>Students</Text>
        <View style={styles.container5}>
           <Text style={{width:290}}>djjqsdoijqoidqsjioqdsih qdsohoidqsiohsqdoihsqdoh qsdoihqsoidoihqsdsint delectus! Eum veniam autem sit molestias laudantium est illo nesciunt.</Text>
           <TouchableOpacity>

           <View style={{backgroundColor:'#8244CB', width:80,height:40,borderRadius: 10, top:72 , right:40,
           justifyContent: 'center',
           alignItems: 'center',
           
        }} >

            <Text style={{color:'white' , fontSize:10}}>Get Started</Text>
           </View>
            </TouchableOpacity>
        </View>
        
     </View>
     
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({


  container: {
    position: 'relative',
    top: 0,
    padding: 20,
  },
  Text1: {
    fontSize: 16,
    fontWeight: '100',

  },
  Text2: {
    fontSize: 16,
    position: 'relative',
    left: 40,
    top: 6,

  },
  image: {
    width: 100,
    height: 100,
    position: 'relative',
    left: 200,

  },
  textContainer : {
    position: 'absoloute',
    bottom : 60,
  },
  container3: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  withIsekai: {fontSize:20 , width:200 , position:'relative', bottom: 30},
  ourGoal: {fontSize:18,
    fontWeight: '400',
     width:320, 
         textAlign: 'center',
         position:'relative',
         top: 6,
         },
    container4 : {
      position:'relative',
      top : 40,
      padding: 10,

    },
    container5 : {
        backgroundColor: '#F1EEEA',
        padding:8,
        width: 350,
        height: 180,
        left: 0,
        top:10,
        borderRadius: 10,
        flexDirection: 'row'

    }


});
