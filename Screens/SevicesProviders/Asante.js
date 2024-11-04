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

const Asante = () => {
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
              <Text style={styles.tabText}>Asante Waste Management</Text>
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
            <Text>We do not offer services on weekends</Text>
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
              <Text style={{ alignSelf: "flex-end" }}>+256 414691868</Text>
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
              <Text style={{ alignSelf: "flex-end" }}>075127268</Text>
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
                asante.help@gmail.co.ug
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Asante;

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
