import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { STYLES } from "../../../../GlobalCss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import HomeRenderPosts from "./HomeRenderPosts";

const fetchLimitProjects = async (activeTab) => {
  try {
    const { data } = await axios.get(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/Projects/take/WithLimit/${activeTab}?limit=3`
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
const fetchExpertise = async () => {
  try {
    const { data } = await axios.get(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Expertise/speciality/all`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
const RecentProjects = () => {
  const { data: expertise } = useQuery({
    queryKey: ["expertise"],
    queryFn: () => fetchExpertise(),
  });
  const [activeTab, setActiveTab] = useState(expertise ? expertise[0].id : "1");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const { data: projects, refetch: refetchProject } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchLimitProjects(activeTab),
  });

  useEffect(() => {
    refetchProject(activeTab);
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            fontWeight: STYLES.FONTS.Large,
            fontSize: STYLES.SIZES.sizeL,
          }}
        >
          Recent Projects
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              color: STYLES.COLORS.Priamary,
              fontWeight: STYLES.FONTS.Large,
              fontSize: STYLES.SIZES.sizeM,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {expertise &&
            expertise.length > 0 &&
            expertise.map((ele) => (
              <TouchableOpacity
                key={ele.id}
                onPress={() => handleTabPress(ele.id)}
                style={{
                  borderColor: STYLES.COLORS.Priamary,
                  backgroundColor:
                    activeTab === ele.id ? STYLES.COLORS.Priamary : "white",
                  padding: 6,
                  borderRadius: 50,
                  borderWidth: 2,
                  margin: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: STYLES.FONTS.Large,
                    color:
                      activeTab === ele.id ? "white" : STYLES.COLORS.Priamary,
                  }}
                >
                  {ele.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <HomeRenderPosts key={project.id} item={project} />
        ))
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontWeight: STYLES.FONTS.Large,
            fontSize: 18,
            marginTop: 20,
          }}
        >
          No projects available at the moment.
        </Text>
      )}
    </View>
  );
};

export default RecentProjects;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    // marginVertical: 10,
    paddingHorizontal: 10,
  },
});
