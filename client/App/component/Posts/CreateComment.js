import React, { useRef } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  Center,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
//   import { Icon } from '@gluestack-ui/themed';
import { useTheme } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import Icon from "react-native-vector-icons/Feather";

const CreateComment = ({ post, user }) => {
  const height = useHeaderHeight();

  return (
    <View style={styles.container}>
        
      <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <Avatar size="md">
                <AvatarFallbackText>SS</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://p16-capcut-sign-va.ibyteimg.com/tos-maliva-v-be9c48-us/o8dABIU6JPBd2AJiwAAb6EZjn9NKPQ9iS3iUv~tplv-nhvfeczskr-1:250:0.webp?lk3s=44acef4b&x-expires=1735219775&x-signature=oJRko2PZ4YuOxVZy15vYlkjENcQ%3D",
                  }}
                />
              </Avatar>
              <Box
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Textarea
                  size="xl"
                  h={70}
                  borderRadius={20}
                  style={{ width: 250 }}
                >
                  <TextareaInput placeholder="Add a comment" fontSize={16} />
                </Textarea>
                <TouchableOpacity>
                  <Icon name="send" size={24} color="#674188" />
                </TouchableOpacity>
              </Box>
            </View>
          </TouchableWithoutFeedback>
      </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // padding : 15,
    paddingBottom: 10,
    marginTop: 20,
  },
  container1: {
    flex: 1,
    // padding : 15
  },
  textInput: {
    backgroundColor: "#C3ACD0",
    flex: 1,
    margin: 5,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});

export default CreateComment;
