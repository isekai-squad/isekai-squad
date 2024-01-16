import React, { useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfileContext } from "../../../Context/ProfileContext";

const ChangeInfo = () => {
  const {
    nameRef,
    usernameRef,
    bioRef,
    phoneRef,
    ProfileData,
    linkedInRef,
    githHubRef,
  } = useContext(ProfileContext);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.fieldContainer}>
          <Ionicons name="person" size={25} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={ProfileData.name}
            onChangeText={(text) => (nameRef.current.value = text)}
            ref={nameRef}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Ionicons name="at" size={25} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={ProfileData.userName}
            onChangeText={(text) => (usernameRef.current.value = text)}
            ref={usernameRef}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Ionicons name="clipboard-outline" size={25} style={styles.icon} />
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Bio"
            onChangeText={(text) => (bioRef.current.value = text)}
            ref={bioRef}
            multiline
          />
        </View>

        <View style={styles.fieldContainer}>
          <Ionicons name="call-outline" size={25} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            onChangeText={(text) => (phoneRef.current.value = text)}
            ref={phoneRef}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Ionicons name="logo-linkedin" size={25} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={"Your LinedIn Link"||ProfileData.Linkedin }
            onChangeText={(text) => (linkedInRef.current.value = text)}
            ref={linkedInRef}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Ionicons name="logo-github" size={25} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={"Your GitHub Link"||ProfileData.GitHub}
            onChangeText={(text) => (githHubRef.current.value = text)}
            ref={githHubRef}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
    color: "#8244CB",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mainSkillsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#8244CB",
    paddingVertical: 12,
    borderRadius: 8,
  },
  mainSkillsIconContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 8,
    marginRight: 10,
  },
  mainSkillsIcon: {
    color: "#8244CB",
  },
  mainSkillsText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangeInfo;
