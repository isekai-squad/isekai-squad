import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { STYLES } from "../../../../GlobalCss";
import ChangeImages from "./Components/ChangeImages";
function EditProfile({ profileData }) {
  const [name, setName] = useState(profileData.name);
  const [username, setUsername] = useState(profileData.userName);
  const [bio, setBio] = useState(profileData.bio);
  const [phone, setPhone] = useState(profileData.number);
  const [mainSkills, setMainSkills] = useState("");

  const handleSave = () => {
    console.log("Profile Image:", profileImage);
    console.log("Cover Image:", coverImage);
    console.log("Name:", name);
    console.log("Username:", username);
    console.log("Bio:", bio);
    console.log("Phone:", phone);
    console.log("Main Skills:", mainSkills);
  };

  return (
    <ScrollView style={styles.container}>

    <ChangeImages profileData={profileData}/>

      <View style={styles.fieldContainer}>
        <Ionicons name="person" size={25} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Ionicons name="at" size={25} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Ionicons name="clipboard-outline" size={25} style={styles.icon} />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </View>

      <View style={styles.fieldContainer}>
        <Ionicons name="call-outline" size={25} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={[styles.fieldContainer, { flexDirection: "column" }]}>
        <View style={styles.fieldContainer}>
          <Ionicons name="hammer-outline" size={25} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Main Skills"
            value={mainSkills}
            onChangeText={setMainSkills}
          />
        </View>

        <View style={styles.interestingContainer}>
          {profileData.Technologies.map((technologie, i) => (
            <TouchableOpacity key={i} style={styles.interestingTag}>
              <Image
                source={{ uri: technologie.image }}
                style={styles.tagImage}
              />

              <Text style={styles.tagText}>{technologie.name}</Text>
              <Ionicons name="close-circle-sharp" size={18} color={"black"} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    zIndex: 20,
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
  },
  changeProfileText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#8244CB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  profileImage: {
    height: 100,
    width: 100,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    borderColor: "#eee",
    borderWidth: 3,
    borderRadius: 100,
    // overflow: "hidden",
  },
  interestingContainer: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#eee",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    flexWrap: "wrap",
  },
  interestingTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 20,
    borderColor: "#b4aaaa",
    borderWidth: 1,
    padding: 3,
    paddingHorizontal: 10,
  },
  tagImage: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  tagText: {
    color: "#555",
    fontSize: 13,
  },
});

export default EditProfile;
