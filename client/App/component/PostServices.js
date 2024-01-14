import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  Box,
  Center,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  VStack,
  onChangeText,
  value,
  placeholder,
} from "@gluestack-ui/themed";
import File from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { STYLES } from "../../GlobalCss";
import Foundation from "react-native-vector-icons/Foundation";

const CreatePost = () => {
  const [selected, setSelected] = useState([]);
  const [Titel, setTitel] = useState(null);
  const [description, setdescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setimage] = useState(null);
  const [loading, setLoading] = useState(false);
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="tagso" size={20} />
      </View>
    );
  };

  const uploadPdp = async () => {
    try {
      if (!image) {
      }
      let r = (Math.random() + 1).toString(36).substring(7);

      setLoading(true);
      const imageRef = ref(storage, `postImage/${r}`);
      const response = await fetch(image);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);

      setimage(downloadURL);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };
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
      await setimage(source.uri);
    }
  };

  const handlePost = async () => {
    try {
      const data = {
        title: Titel,
        description: description,
        image: image,
        Price: Number(price),
      };

      const response = await axios.post(
        `http://172.20.0.88:4070/Services/1`,
        data
      );
      console.log("successful:", response.data);
    } catch (error) {
      console.error("Error during :", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Box style={{ paddingHorizontal: 20, padding: 20 }}>
        <VStack space="lg">
          <Text style={{ fontSize: 22, fontWeight: 600 }}>Title :</Text>
          <Input
            variant="outline"
            borderRadius={15}
            borderWidth={0}
            bgColor="#f5f5f5"
            h={45}
          >
            <InputField
              placeholder="Title"
              onChangeText={(text) => setTitel(text)}
            />
          </Input>

          <Text style={{ fontSize: 22, fontWeight: 600 }}>Description :</Text>
          <Textarea
            variant="outline"
            borderRadius={15}
            borderWidth={0}
            bgColor="#fafafa"
            h={150}
          >
            <TextareaInput
              onChangeText={(text) => setdescription(text)}
              placeholder="Write your Descption here"
            />
          </Textarea>
          <View></View>
          <Text style={{ fontSize: 22, fontWeight: 600 }}>Add Image :</Text>
          <TouchableOpacity onPress={pickImage}>
            <Box style={{ alignItems: "center" }}>
              <Center
                bgColor="#fafafa"
                h={210}
                w={210}
                borderRadius={75}
                borderWidth={11}
                borderColor="#ede6f0"
              >
                {!image ? (
                  <File name="file-download" size={50} color="#dbcde2" />
                ) : (
                  <Image
                    style={{ width: 210, height: 210, borderRadius: 65 }}
                    source={{
                      uri: image,
                    }}
                  />
                )}
              </Center>
            </Box>
            <TouchableOpacity
              onPress={uploadPdp}
              style={{
                size: 7,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.updet}>
                <Foundation name="upload" size={30} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: 600 }}>Price :</Text>
          <Input
            style={styles.input}
            keyboardType="numeric"
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
          >
            <InputField
              placeholder="Price"
              onChangeText={(text) => setPrice(text)}
              value={price}
            />
          </Input>
          <TouchableOpacity
            style={{
              backgroundColor: "#8244CB",
              padding: 10,
              borderRadius: 15,
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={handlePost}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Post</Text>
          </TouchableOpacity>
        </VStack>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderRadius: 15,
    borderWidth: 0,
    bgColor: "#ee82ee",
    height: 45,
    marginBottom: 15,
  },
  textarea: {
    borderRadius: 15,
    borderWidth: 0,
    bgColor: "#fafafa",
    height: 150,
    marginBottom: 15,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: STYLES.COLORS.Primary,
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  postButton: {
    backgroundColor: "#8244CB",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "Roboto-Bold",
    fontSize: STYLES.SIZES.sizeL,
  },
  updet: {
    textAlign: "left",
  },
});

export default CreatePost;
