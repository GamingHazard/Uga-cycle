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

const Swift = () => {
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
              <Text style={styles.tabText}>SWIFT Waste Masters LTD</Text>
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
              We only provide services 3 days a week.{"\n"} {"\n"}Management
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
              <Text style={{ alignSelf: "flex-end" }}>(+256) 414-530-999</Text>
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
              <Text style={{ alignSelf: "flex-end" }}>075889293</Text>
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
                swift.help@gmail.co.ug
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Swift;

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
