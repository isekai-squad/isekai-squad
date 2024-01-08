import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ChangeImages from "./Components/ChangeImages";
import { ProfileContext } from "../../Context/ProfileContext";
import MainSkills from "./Components/MainSkills";
import ChangeInfo from "./Components/ChangeInfo";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import { STYLES } from "../../../GlobalCss";

function EditProfile() {
  const { setActiveMiddleTab, handleSubmit, loading } =
    useContext(ProfileContext);
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);

  const showAlertFunction = () => {
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  const handleDiscard = () => {
    setActiveMiddleTab("Activity");
    navigation.navigate("Profile");
    hideAlert();
  };

  return (
    <View>
      <ScrollView>
        {loading && (
            <ActivityIndicator
              size="large"
              color={STYLES.COLORS.Priamary}
              style={styles.loadingIndicator}
            />
          )}
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ width: "20%" }}
            onPress={showAlertFunction}
          >
            <FontAwesome5
              name={"long-arrow-alt-left"}
              size={30}
              style={{ top: -10, left: 10 }}
              color={STYLES.COLORS.Priamary}
            />
          </TouchableOpacity>

          <ChangeImages />
          <ChangeInfo />
          <MainSkills />
          <TouchableOpacity disabled={loading} style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Discard Changes"
            message="Are you sure you want to discard changes?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Cancel"
            confirmText="Discard"
            confirmButtonColor={STYLES.COLORS.Priamary}
            onCancelPressed={hideAlert}
            onConfirmPressed={handleDiscard}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    backgroundColor: "white",
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
  loadingIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height:"100%",
    width:"100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1000
  },
});

export default EditProfile;
