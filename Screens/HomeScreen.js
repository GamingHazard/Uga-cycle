import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: 70,
          backgroundColor: "white",
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
        ></View>
        <AntDesign
          style={{ marginHorizontal: 10 }}
          name="menufold"
          size={24}
          color="black"
        />
      </View>

      <TouchableOpacity>
        <LinearGradient
          colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.2)"]}
          style={styles.gradientContainer}
          start={{ x: 0.5, y: 1 }} // Starting from bottom
          end={{ x: 0.5, y: 0 }} // Ending at the top
        >
          <View
            style={{
              width: "100%",
              height: 100,
              // backgroundColor: "white",
              flex: 1,
            }}
          />
          <View
            style={{
              width: "100%",
              height: "auto",
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "lightgrey",
            }}
          >
            <Text
              style={{
                fontSize: 26,
                color: "white",
                fontWeight: "bold",
                textAlignVertical: "top",
              }}
            >
              Waste Market
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 26,
          color: "black",
          marginVertical: 20,
          marginHorizontal: 10,
        }}
      >
        News Updates
      </Text>
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

    backgroundColor: "lightgreen",
    alignItems: "center",
  },
});

export default HomeScreen;
