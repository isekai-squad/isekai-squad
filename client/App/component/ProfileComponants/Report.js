import React, { useContext, useEffect } from "react";
import { Animated, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Easing } from "react-native-reanimated";
import { VisitProfileContext } from "../../Context/VisitProfileContext";

function Report() {
  const { setReportPop, reportPop } = useContext(VisitProfileContext);
  const animatedHeight = new Animated.Value(0);

  const toggleReport = () => {
    setReportPop((pop) => !pop);
  };

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: reportPop ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [reportPop]);

  const reportContainerStyle = {
    ...styles.report,
    height: animatedHeight.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
    }),
  };

  return (
    <Animated.View style={reportContainerStyle}>
      <TouchableOpacity style={styles.closeBtn} onPress={toggleReport}>
        <AntDesign name={"close"} size={30} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnTouchable}>
        <Text style={styles.btnText}>Report</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  report: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  btnTouchable: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d5d5d5",

    width: "100%",
    paddingVertical: 15,
    textAlign: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  btnText: {
    fontSize: 15,
    letterSpacing: 2,
    textAlign: "center",
    color: "black",
  },
});

export default Report;
