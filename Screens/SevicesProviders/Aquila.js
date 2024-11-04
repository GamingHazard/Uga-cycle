import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import CheckBox from "@react-native-community/checkbox";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Aquila = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isChecked, setisChecked] = useState(false);
  return (
    <View style={styles.container}>
      {/*   tab with background image */}
      <TouchableOpacity style={{ margin: 10, borderRadius: 15 }}>
        <ImageBackground
          source={{
            uri: "data:image/jpeg;base64,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",
          }}
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
              <Text style={styles.tabText}>Aquila Recycling Plant</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>

      <ScrollView style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            width: "100%",

            marginVertical: 15,

            alignItems: "center",
            backgroundColor: "white",

            padding: 16,
          }}
        >
          <Text>Service Regiestration</Text>
          <View
            style={{
              width: "100%",
              padding: 15,
              justifyContent: "center",
              backgroundColor: "whitesmoke",
              height: 50,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <TextInput placeholder="Enter your full names..." />
          </View>
          <View
            style={{
              width: "100%",
              padding: 15,
              justifyContent: "center",
              backgroundColor: "whitesmoke",
              height: 50,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <TextInput placeholder="Enter your phone number +256" />
          </View>
          <RNPickerSelect
            placeholder={{ label: "Register as", value: null }}
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "Individual", value: "me" },
              { label: "Business", value: "them" },
              { label: "Organization", value: "we" },
            ]}
            style={{
              inputAndroid: {
                backgroundColor: "whitesmoke",
                marginVertical: 10,

                borderRadius: 16,
                width: "100%",
              },
            }}
          />
          <RNPickerSelect
            placeholder={{ label: "Pickup Schedule", value: null }}
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "Weed Days", value: "option1" },
              { label: "Weekends", value: "option2" },

              // { label: "Organization", value: "we" },
            ]}
            style={{
              inputAndroid: {
                backgroundColor: "whitesmoke",
                marginVertical: 10,

                borderRadius: 16,
                width: "100%",
              },
            }}
          />
          <RNPickerSelect
            placeholder={{ label: "Region", value: null }}
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "Central", value: "me" },
              { label: "East", value: "them" },
              { label: "West", value: "we" },
            ]}
            style={{
              inputAndroid: {
                backgroundColor: "whitesmoke",
                marginVertical: 10,

                borderRadius: 16,
                width: "100%",
              },
            }}
          />
          <RNPickerSelect
            placeholder={{ label: "District", value: null }}
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "Central", value: "me" },
              { label: "East", value: "them" },
              { label: "West", value: "we" },
            ]}
            style={{
              inputAndroid: {
                backgroundColor: "whitesmoke",
                marginVertical: 10,

                borderRadius: 16,
                width: "100%",
              },
            }}
          />

          <TouchableOpacity
            style={{
              width: "40%",
              padding: 10,
              borderRadius: 15,
              backgroundColor: "teal",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Register</Text>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              padding: 15,

              marginVertical: 16,
              backgroundColor: "whitesmoke",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Note</Text>
            <Text>
              We provide both recycling and waste collection services.{"\n"}{" "}
              {"\n"}Management
            </Text>
          </View>
          {/* support  */}
          <View
            style={{
              width: "100%",
              padding: 15,

              marginVertical: 16,
              backgroundColor: "whitesmoke",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Support and CustomerCare
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 10,
                backgroundColor: "white",
                padding: 15,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <FontAwesome
                style={{ marginHorizontal: 10, flex: 1 }}
                name="phone"
                size={24}
                color="black"
              />
              <Text style={{ alignSelf: "flex-end" }}>0759949494</Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 4,
                backgroundColor: "white",
                padding: 15,
              }}
            >
              <FontAwesome
                style={{ marginHorizontal: 10, flex: 1 }}
                name="whatsapp"
                size={24}
                color="black"
              />
              <Text style={{ alignSelf: "flex-end" }}>0759949494</Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 4,
                backgroundColor: "white",
                padding: 15,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <FontAwesome
                style={{ marginHorizontal: 10, flex: 1 }}
                name="envelope"
                size={24}
                color="black"
              />
              <Text style={{ alignSelf: "flex-end" }}>dw.help@gmail.co.ug</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Aquila;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "whitesmoke" },
  gradientContainer: {
    width: "100%",
    height: 260,

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
});
