import React from "react";
import { StyleSheet, View, Text , TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/AntDesign'
import Arrows from 'react-native-vector-icons/Entypo'
import { useTheme } from "@react-navigation/native";

const Post = () => {
    const colors = useTheme()
    return (
        <ScrollView>

        <View
        as={SafeAreaView}
        style = {
            [ Styles.container]
        }
        >
            <View
            style = {[Styles.card , Styles.elevation]}
            >

            <View
            style= {Styles.headerContainer}
            >
                <View
                style = {
                    Styles.headerLeft
                }
                >
                    <Text>Category</Text>
                    <Text> Username</Text>
                    <Text> ° </Text>
                    <Text> 4h ago</Text>
                </View>
            </View>
            <TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 13, color : "#664087"}}>Title</Text>
            </TouchableOpacity> 
            <Text
            numberOfLines={10}
            >Lorem ipsum dolor sit amet. Ut delectus delectus cum voluptatem vitae sed ratione repellendus! Vel aliquam pariatur in consequatur dolorum est sapiente facilis aut facilis minus ex galisum obcaecati. Ut molestias cumque eum neque laborum et iste quos in corrupti atque ut fugiat fugiat? Est fugiat repellat aut ullam ipsa eos velit totam ut neque eveniet.

                In odit cupiditate qui commodi dolores et distinctio minima non deleniti assumenda. In odit consequatur 33 omnis ipsam qui esse laborum et repellendus aperiam ut maxime velit.

                Et voluptatem consequatur et impedit quidem non atque consequatur est nulla veniam. Sit facere earum sed reprehenderit doloremque et omnis quasi ut perferendis unde est deleniti quaerat.</Text>
               
               <Image source={{uri :"https://i.pinimg.com/474x/84/32/ca/8432cab0a27eac3318b9ecb566e1df76.jpg"}} style={{width : 330 , height : 220 , marginTop: 10}} />
                <View
                style = {
                    Styles.bottomContainer
                }
                >
                    <View
                    style = {
                        [Styles.centerAlign, {marginTop : 7}]
                    }
                    >
                        <TouchableOpacity>
                        <Arrows
                        name = "arrow-bold-up"
                        color = "#664087"
                        size = {36}
                        />
                        </TouchableOpacity>
                        <Text>5</Text>
                        <TouchableOpacity>
                            <Arrows
                            name = "arrow-bold-down"
                            color = "#664087"
                            size = {36}
                            />
                        </TouchableOpacity>
                         </View>
                    <TouchableOpacity
                    style = {Styles.commentSection}
                    activeOpacity = {0.7}
                    >
                        <Icon
                        name="message1"
                        size = {24}
                        color = "#664087"
                        />
                        <Text style ={{marginLeft: 10}}>5</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
</ScrollView>
    )
}
const Styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 15,
        paddingVertical: 7,
        marginBottom: 7,
        // elevation: 1,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
        fontSize: 13
      },
      headerLeft: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      headerRight: {},
      bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
      },
      centerAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      commentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginRight: 12,
        marginTop: 6
      },
     shadowProp : {
        shadowColor: '#171717',
        elevational : 20
     },  card: {
        backgroundColor: '#EEE',
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
      }, elevation: {
        elevation: 10,
        shadowColor: '#171717',
      },
})
    export default Post