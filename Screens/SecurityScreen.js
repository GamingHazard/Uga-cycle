import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext"; // Make sure to import AuthContext
import axios from "axios"; // Don't forget to import axios if you haven't already

const SecurityScreen = () => {
  const { ShowDeleteModal, HideDeleteModal, deleteUserAccount } =
    useContext(AuthContext);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      return Alert.alert("Error", "Please fill in all password fields.");
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "New passwords do not match.");
    }

    setLoading(true);
    try {
      const response = await axios.patch(
        `https://your-backend-url/reset-password/${resetToken || ""}`, // Attach resetToken if available
        { password: newPassword, userToken } // Send userToken if logged in
      );
      Alert.alert("Success", response.data.message);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!oldPassword) {
      return Alert.alert(
        "Error",
        "Please enter your password to confirm deletion."
      );
    }

    setLoadingDelete(true);
    try {
      // Call the deleteUserAccount function from AuthContext
      await deleteUserAccount(oldPassword); // Pass the old password for confirmation

      Alert.alert("Success", "Your account has been deleted successfully.");
      // Optionally, navigate to the login screen or home screen after deletion
      // navigation.navigate("Login");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to delete account."
      );
    } finally {
      setLoadingDelete(false);
      setOldPassword(""); // Clear the password input field
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 10, fontSize: 20, fontWeight: "bold" }}>
        Security & Permissions
      </Text>
      <ScrollView style={{ flex: 1, width: "100%", paddingBottom: 50 }}>
        <Text
          style={{
            alignSelf: "flex-start",
            marginHorizontal: 16,
            marginVertical: 10,
            color: "grey",
          }}
        >
          Password
        </Text>
        <View
          style={{
            width: "100%",
            padding: 15,
            borderRadius: 10,
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              alignSelf: "flex-start",
            }}
          >
            Change password
          </Text>
          {error ? (
            <Text style={{ color: "red", marginVertical: 5 }}>{error}</Text>
          ) : null}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter old password"
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "white" }}>Change</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Delete Account Section */}
        <View style={styles.deleteAccountContainer}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Delete Account
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your password to confirm"
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={handleDeleteAccount}
          >
            {loadingDelete ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "white" }}>Delete Account</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingHorizontal: 10 },
  inputContainer: {
    width: "100%",
    backgroundColor: "whitesmoke",
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
  button: {
    width: "40%",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteAccountContainer: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 20,
  },
});
