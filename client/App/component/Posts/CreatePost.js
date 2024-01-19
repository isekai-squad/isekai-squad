import {
  Avatar,
  AvatarFallbackText,
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Image,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  VStack,
} from "@gluestack-ui/themed";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import File from "react-native-vector-icons/MaterialCommunityIcons";
import { MultiSelect, Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { storage } from "../../../FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { AvatarImage } from "@gluestack-ui/themed";
import Swiper from "react-native-swiper";

const CreatePost = () => {
  const [selected, setSelected] = useState([]);
  const [value, setValue] = useState(null);
  const [fileResponse, setFileResponse] = useState([]);
  const [Images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [user, setUser] = useState("");
  const [percent, setPercent] = useState(0);
  const [specialities, setSpecialities] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [files, setFiles] = useState([]);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.name}</Text>
        <Avatar size="sm">
          <AvatarFallbackText>SS</AvatarFallbackText>
          <AvatarImage
            alt="404"
            source={{
              uri: item.image,
            }}
          />
        </Avatar>
      </View>
    );
  };

  const getSpecialities = async () => {
    await axios
      .get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Expertise/speciality/all`
      )
      .then((res) => setSpecialities(res.data))
      .catch((err) => console.log(err));
  };

  const getTechnologies = async (id) => {
    await axios
      .get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Expertise/speciality/techno/${id}`
      )
      .then((res) => setTechnologies(res.data))
      .catch((err) => console.log(err));
  };

  const navigation = useNavigation();
  const fireBasePostImage = async (image) => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
      const storageRef = ref(storage, `Projects/${title}`);
      const imageRef = ref(storageRef, filename);
      const uploadTask = uploadBytesResumable(imageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (err) => console.log(err),
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) =>
            setImages((prev) => [...prev, url])
          );
        }
      );
    });
  };

  const handleDocumentSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
      });
      result.assets.map((file) => {
        setFiles((prev) => [...prev, file]);
        setFileResponse((prev) => [...prev, file.uri]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      result.assets.map(async (image) => await fireBasePostImage(image));
    }
  };

  const addPost = async () => {
    if (role === "STUDENT") {
      await axios
        .post(
          `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/Projects/${user.id}`,
          { title, description, content: fileResponse, images: Images }
        )
        .then((res) => console.log("added successfully"))
        .catch((err) => console.log(err));
    } else if (role === "COMPANY") {
      await axios
        .post(
          `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/Posts/${user.id}`,
          {
            title,
            content: description,
            images: Images,
          }
        )
        .then((res) => console.log("added successfully"))
        .then(() => {
          setTitle("");
          setDescription("");
          setImages([]);
          setFileResponse([]);
          setTechnologies([])
          setSpecialities([])
        })
        .catch((err) => console.log(err));
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await SecureStore.getItemAsync("Token");
      const decodeResult = jwtDecode(res);
      console.log(decodeResult);
      setUser(decodeResult);
      setRole(user.role);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // console.log(user)
    getCurrentUser();
    getSpecialities();
  }, [role]);
  // console.log(technologies)
  return (
    <ScrollView>
      <View style={{ paddingVertical: 40, backgroundColor: "white" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Icon name="close" size={24} onPress={() => navigation.goBack()} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Create Post</Text>
          <TouchableOpacity>
            <Button
              borderRadius={50}
              variant="outline"
              borderColor="#674188"
              onPress={() => addPost()}
            >
              <ButtonText color="#674188">Publish</ButtonText>
            </Button>
          </TouchableOpacity>
        </Box>
          <View style={{ alignItems: "center", paddingVertical: 30 }}>
            <Center
              bgColor="#fafafa"
              h={300}
              w={300}
              borderRadius={15}
              borderWidth={0.5}
              borderColor="#ede6f0"
            >
              <Icon
                name="image-outline"
                size={50}
                color="#dbcde2"
                onPress={handleImageSelection}
              />

              <Text
                style={{
                  color: "#dbcde2",
                  paddingVertical: 10,
                  fontWeight: 600,
                }}
              >
                Add Article Cover Image
              </Text>
            </Center>
          </View>
          {Images.length === 0 ? "" :
                <HStack space="md" alignItems="center" flexWrap="wrap" paddingHorizontal={50} paddingVertical={40} >
              {Images.map((image) => (
                <Image
                  size="xl"
                  source={{ uri: image }}
                  borderRadius={10}
                  resizeMode="stretch"
                  />
                  ))}
                  </HStack>
               }
        <Box style={{ paddingHorizontal: 20, padding: 20 }}>
          <VStack space="lg">
            <Text style={{ fontSize: 22, fontWeight: 600 }}>Title</Text>
            <Input
              variant="outline"
              borderRadius={15}
              borderWidth={0}
              bgColor="#f5f5f5"
              h={45}
            >
              <InputField
                placeholder="Article Title"
                onChangeText={(text) => setTitle(text)}
                value={title}
              />
            </Input>
            {role === "STUDENT" ? (
              <>
                <Text style={{ fontSize: 22, fontWeight: 600 }}>
                  Project Files
                </Text>
                <Box style={{ alignItems: "center" }}>
                  <Center
                    bgColor="#fafafa"
                    h={200}
                    w={200}
                    borderRadius={15}
                    borderWidth={0.5}
                    borderColor="#ede6f0"
                  >
                    <File
                      name="file-download"
                      size={50}
                      color="#dbcde2"
                      onPress={handleDocumentSelection}
                    />
                    <Text
                      style={{
                        color: "#dbcde2",
                        paddingVertical: 10,
                        fontWeight: 600,
                      }}
                    >
                      Add Article Cover Image
                    </Text>
                  </Center>
                  {files === 0
                    ? ""
                    : files.map((file) => (
                        <View style={styles.item}>
                          <Text style={styles.selectedTextStyle}>
                            {file.name}
                          </Text>
                          <AntDesign
                            name="file1"
                            size={24}
                            color="#674188"
                            style={{ marginLeft: 10 }}
                          />
                        </View>
                      ))}
                </Box>
              </>
            ) : (
              ""
            )}
            <Text style={{ fontSize: 22, fontWeight: 600 }}>Content</Text>
            <Textarea
              variant="outline"
              borderRadius={15}
              borderWidth={0}
              bgColor="#fafafa"
              h={400}
            >
              <TextareaInput
                placeholder="Write your artice here"
                onChangeText={(text) => setDescription(text)}
                value={description}
              />
            </Textarea>
            {role === "STUDENT" ? (
              <>
                <Text style={{ fontSize: 22, fontWeight: 600 }}>
                  Select Area Of Expertise
                </Text>
                <View style={styles.container}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={specialities}
                    search
                    itemTextStyle={{ color: "#674188" }}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder="Select Expertise"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={async (item) => {
                      setValue(item.name);
                      getTechnologies(item.id);
                    }}
                  />
                </View>
                <Text style={{ fontSize: 22, fontWeight: 600 }}>
                  Select Technologies
                </Text>
                <View style={styles.container}>
                  <MultiSelect
                    style={styles.dropdown}
                    itemContainerStyle={{ color: "#674188" }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={technologies}
                    labelField="name"
                    valueField="id"
                    placeholder="Select Technology"
                    value={selected}
                    search
                    searchPlaceholder="Search..."
                    onChange={(item) => {
                      setSelected(item);
                    }}
                    renderItem={renderItem}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity
                        onPress={() => unSelect && unSelect(item)}
                      >
                        <View style={styles.selectedStyle}>
                          <Text style={styles.textSelectedStyle}>
                            {item.name}
                          </Text>
                          <Avatar size="sm">
                            <AvatarFallbackText>SS</AvatarFallbackText>
                            <AvatarImage
                              alt="404"
                              source={{
                                uri: item.image,
                              }}
                            />
                          </Avatar>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </>
            ) : (
              ""
            )}
          </VStack>
        </Box>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    //   width: '80%',
    backgroundColor: "#fafafa",
    borderRadius: 12,
    padding: 12,
    color: "#674188",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#674188",
  },
  selectedTextStyle: {
    fontSize: 14,
    color : '#674188'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    width: "80%",
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#f5f5f5",
    shadowColor: "#674188",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    color: "#674188",
    marginRight: 5,
    fontSize: 16,
  },
});

export default CreatePost;
