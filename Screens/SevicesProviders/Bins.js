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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CheckBox from "@react-native-community/checkbox";

const Bins = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isChecked, setisChecked] = useState(false);
  return (
    <View style={styles.container}>
      {/*   tab with background image */}
      <TouchableOpacity style={{ margin: 10, borderRadius: 15 }}>
        <ImageBackground
          source={{
            uri: "https://www.scrapmonster.com/uploads/company_logo/2023/9/1694684332.webp",
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
              <Text style={styles.tabText}>Bins Kampala</Text>
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
              We do not offer services beyond Kampala.{"\n"} {"\n"}Management
            </Text>
          </View>
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
              <Text style={{ alignSelf: "flex-end" }}>0772594470</Text>
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
              <Text style={{ alignSelf: "flex-end" }}>0772594470</Text>
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
              <Text style={{ alignSelf: "flex-end" }}>
                bin.help@gmail.co.ug
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Bins;

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
