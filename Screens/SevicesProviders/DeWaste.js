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

const DeWaste = () => {
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
              <Text style={styles.tabText}>De Waste (U) LTD</Text>
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
              We also hire people.{"\n"} {"\n"}Management
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
              <Text style={{ alignSelf: "flex-end" }}>0755316666</Text>
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
              <Text style={{ alignSelf: "flex-end" }}>0755316666</Text>
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

export default DeWaste;

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
