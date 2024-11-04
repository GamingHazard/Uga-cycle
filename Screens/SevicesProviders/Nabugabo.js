import FontAwesome from "@expo/vector-icons/FontAwesome";
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

const Nabugabo = () => {
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
              <Text style={styles.tabText}>Nabugabo Updeal Joint Venture</Text>
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
              Our services are only within kampala regions.{"\n"} {"\n"}
              Management
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
              <Text style={{ alignSelf: "flex-end" }}>(+256) 0704094068</Text>
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
              <Text style={{ alignSelf: "flex-end" }}>0700983346</Text>
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
                nabugabo.help@gmail.co.ug
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Nabugabo;

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
