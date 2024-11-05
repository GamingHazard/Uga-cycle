import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Aquila = () => {
  // State variables for input fields
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registrationType, setRegistrationType] = useState(null);
  const [pickupSchedule, setPickupSchedule] = useState(null);
  const [region, setRegion] = useState(null);
  const [district, setDistrict] = useState(null);

  // Assume this user ID comes from your authentication context or is fetched from your backend
  const userId = "USER_ID_HERE"; // Replace this with the actual user ID logic

  // Function to handle form submission
  const handleRegistration = async () => {
    // Validate inputs
    if (
      !fullName ||
      !phoneNumber ||
      !registrationType ||
      !pickupSchedule ||
      !region ||
      !district
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare data to send, including user ID
    const registrationData = {
      userId, // Include the user ID here
      fullName,
      phoneNumber,
      registrationType,
      pickupSchedule,
      region,
      district,
    };

    try {
      // Send POST request to your backend API
      const response = await axios.post(
        "YOUR_BACKEND_API_URL", // Replace with your backend URL
        registrationData
      );
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ margin: 10, borderRadius: 15 }}>
        <ImageBackground
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
        <View style={styles.formContainer}>
          <Text>Service Registration</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your full names..."
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your phone number +256"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <RNPickerSelect
            placeholder={{ label: "Register as", value: null }}
            onValueChange={setRegistrationType}
            items={[
              { label: "Individual", value: "me" },
              { label: "Business", value: "them" },
              { label: "Organization", value: "we" },
            ]}
            style={pickerStyle}
          />
          <RNPickerSelect
            placeholder={{ label: "Pickup Schedule", value: null }}
            onValueChange={setPickupSchedule}
            items={[
              { label: "Weed Days", value: "option1" },
              { label: "Weekends", value: "option2" },
            ]}
            style={pickerStyle}
          />
          <RNPickerSelect
            placeholder={{ label: "Region", value: null }}
            onValueChange={setRegion}
            items={[
              { label: "Central", value: "central" },
              { label: "East", value: "east" },
              { label: "West", value: "west" },
            ]}
            style={pickerStyle}
          />
          <RNPickerSelect
            placeholder={{ label: "District", value: null }}
            onValueChange={setDistrict}
            items={[
              { label: "Central", value: "central" },
              { label: "East", value: "east" },
              { label: "West", value: "west" },
            ]}
            style={pickerStyle}
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegistration}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Register</Text>
          </TouchableOpacity>

          {/* Notes and Support sections can remain unchanged */}
        </View>
      </ScrollView>
    </View>
  );
};

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
  formContainer: {
    width: "100%",
    marginVertical: 15,
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
  },
  inputContainer: {
    width: "100%",
    padding: 15,
    justifyContent: "center",
    backgroundColor: "whitesmoke",
    height: 50,
    borderRadius: 10,
    marginVertical: 5,
  },
  registerButton: {
    width: "40%",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "teal",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
});

// Picker style for RNPickerSelect
const pickerStyle = {
  inputAndroid: {
    backgroundColor: "whitesmoke",
    marginVertical: 10,
    borderRadius: 16,
    width: "100%",
  },
};

export default Aquila;
