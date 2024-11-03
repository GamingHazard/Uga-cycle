import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={{
          width: "100%",
          height: 70,
          backgroundColor: "#547c5c",
          elevation: 10,
          padding: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/icon3.png")}
          style={{ width: 60, height: 60 }}
        />
        <View
          style={{
            padding: 10,
            justifyContent: "center",
            alignContent: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              left: -25,
            }}
          >
            Uga-Cycle
          </Text>
        </View>
      </View>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        {/* Waste Market tab with background image */}
        <TouchableOpacity style={{ margin: 10, borderRadius: 15 }}>
          <ImageBackground
            source={require("../assets/profile.jpg")} // Replace with your image path
            style={styles.backgroundImage}
            imageStyle={{ borderRadius: 15 }} // Apply border radius to the image
          >
            <LinearGradient
              colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.2)"]}
              style={styles.gradientContainer}
              start={{ x: 0.5, y: 1 }} // Starting from bottom
              end={{ x: 0.5, y: 0 }} // Ending at the top
            >
              <View style={styles.tabContentContainer}>
                <Text style={styles.tabText}>Waste Market</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>

        {/* Schedule Tab */}
        <TouchableOpacity style={{ margin: 10, borderRadius: 15 }}>
          <LinearGradient
            colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.2)"]}
            style={styles.gradientContainer}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
          >
            <View style={styles.tabContentContainer}>
              <Text style={styles.tabText}>Garbage Schedule</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Tips Tab */}
        <TouchableOpacity style={{ margin: 10, borderRadius: 15 }}>
          <LinearGradient
            colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.2)"]}
            style={styles.gradientContainer}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
          >
            <View style={styles.tabContentContainer}>
              <Text style={styles.tabText}>Tips</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.newsTitle}>News Updates</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  gradientContainer: {
    width: "100%",
    height: 260,
    padding: 10,
    // backgroundColor: "#547c5c",
    alignItems: "center",
    borderRadius: 10,
  },
  backgroundImage: {
    width: "100%",
    height: 260,
  },
  tabContentContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end", // Align content to the bottom
    paddingBottom: 20, // Add padding to avoid text touching the bottom edge
  },
  tabText: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },
  newsTitle: {
    fontWeight: "bold",
    fontSize: 26,
    color: "black",
    marginVertical: 20,
    marginHorizontal: 10,
  },
});

export default HomeScreen;
