import {
  Box,
  Button,
  ButtonText,
  Center,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  VStack,
} from "@gluestack-ui/themed";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
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
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { storage } from "../../../FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";

const CreateForumPost = ({ route }) => {
  const [value, setValue] = useState(null);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [percent, setPercent] = useState(0);

  const { category , refetch } = route.params;
  const navigation = useNavigation()

  const fireBaseForum = async (image) => {
    return new Promise( async (resolve, reject) => {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
      const storageRef = ref(storage, `Forum/${category.name}/${post.id}`);
      const imageRef = ref(storageRef , filename)
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

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      result.assets.map(async (image) => await fireBaseForum(image));
    }
  };
  const addPost = async () => {
    await axios
      .post(`http://${process.env.EXPO_PUBLIC_API_URL}:4070/forumPost/1`, {
        title,
        content: description,
        images,
        category: category.id,
      })
      .then((res) => console.log("added successfully"))
      .then(() => refetch())
      .catch((err) => console.log(err));
  };

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
            <Icon name="close" size={24} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Create Post</Text>
          <Button borderRadius={50} bgColor="#674188">
            <ButtonText>Save</ButtonText>
          </Button>
          <Button
            borderRadius={50}
            variant="outline"
            borderColor="#674188"
            onPress={() => {
              addPost()
              navigation.navigate('Posts' , {category})
            }}
          >
            <ButtonText color="#674188">Publish</ButtonText>
          </Button>
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
              style={{ color: "#dbcde2", paddingVertical: 10, fontWeight: 600 }}
            >
              Add Article Cover Image
            </Text>
          </Center>
        </View>
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
              />
            </Input>
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
              />
            </Textarea>
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

export default CreateForumPost;
