import React, { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { VisitProfileContext } from "../../Context/VisitProfileContext";
import { Modalize } from "react-native-modalize";
function Report() {
  const { modalRef, setActiveMiddleTab } = useContext(VisitProfileContext);
  const CloseModal = () => modalRef?.current?.close();
  const AboutUser = () => {
    modalRef?.current?.close();
    setActiveMiddleTab("About");
  };

  return (
    <Modalize
      ref={modalRef}
      modalHeight={500}
      snapPoint={300}
      closeSnapPointStraightEnabled={false}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
    >
      <View
        style={{
          paddingTop: 50,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.btnTouchable}>
          <Text style={{ ...styles.btnText, color: "red" }}>Block</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTouchable}>
          <Text style={{ ...styles.btnText, color: "red" }}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTouchable}>
          <Text style={{ ...styles.btnText, color: "red" }}>Restrict</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTouchable}>
          <Text style={styles.btnText}>Share To...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTouchable} onPress={AboutUser}>
          <Text style={styles.btnText}>About This Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={CloseModal} style={{ paddingTop: 20 }}>
          <Text style={{ ...styles.btnText, color: "red" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  btnTouchable: {
    width: "100%",
    paddingVertical: 15,
  },
  btnText: {
    fontSize: 18,
    letterSpacing: 2,
    textAlign: "center",
    color: "black",
  },
});

export default Report;
