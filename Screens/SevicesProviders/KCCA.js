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

const KCCA = () => {
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
              <Text style={styles.tabText}>
                Kampala Capital City Authourity
              </Text>
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
          {/* <View
            style={{
              width: "100%",
              padding: 15,
              flexDirection: "row",
              marginVertical: 10,
            }}
          >
            <CheckBox value={isChecked} onChange={setisChecked} />
            <Text onPress={() => setisChecked(!isChecked)}>
              Notify me on pick up days
            </Text>
          </View> */}
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
              KCCA being a government based waste management service provider
              means no charges will be collected from any individual unless they
              subscribe for personal services.{"\n"} {"\n"}Management
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
              <Text style={{ alignSelf: "flex-end" }}>
                0800299000 (toll free)
              </Text>
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
              <Text style={{ alignSelf: "flex-end" }}>0800299000</Text>
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
                kcca.help@gmail.co.ug
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default KCCA;

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
