import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [UserToken, setUserToken] = useState(null);
  const [UserInfo, setUserInfo] = useState(null);
  const [SelectedImage, setSelectedImage] = useState(null);
  const [MainModal, setMainModal] = useState(false);
  const [UserID, setUserID] = useState(null);
  const [deleteModal, setdeleteModal] = useState(false);

  // User Regiestration
  const register = async (name, email, phone, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://uga-cycle-backend-1.onrender.com/register",
        {
          name,
          email,
          phone,
          password,
        }
      );

      let UserInfo = response.data;

      if (response.status === 201 || response.status === 200) {
        const { token, id } = UserInfo.user;
        if (token && id) {
          setUserInfo(UserInfo);
          setUserToken(token);
          setUserID(id);

          await AsyncStorage.setItem("userInfo", JSON.stringify(UserInfo));
          await AsyncStorage.setItem("userToken", token);
          await AsyncStorage.setItem("userId", id);
        } else {
          console.log("Token or ID missing in response.");
        }
      } else {
        console.log("Registration failed:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // User Login
  const login = async (identifier, password) => {
    try {
      const response = await axios.post(
        "https://uga-cycle-backend-1.onrender.com/login",
        {
          identifier,
          password,
        }
      );

      let UserInfo = response.data;

      setUserInfo(UserInfo);
      setUserToken(UserInfo.token);
      setUserID(UserInfo.user.id);

      await AsyncStorage.setItem("userInfo", JSON.stringify(UserInfo));
      await AsyncStorage.setItem("userToken", UserInfo.token);
      AsyncStorage.setItem("userId", UserInfo.user.id);

      return UserInfo;
    } catch (error) {
      throw error;
    }
  };

  // User Logout
  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    setUserID(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("userImage");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
        setUserID(userInfo.user.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const ShowEditPage = () => {
    setMainModal(true);
  };

  const HideEditPage = async () => {
    setMainModal(false);
  };

  const ShowDeleteModal = () => {
    setdeleteModal(true);
  };

  const HideDeleteModal = () => {
    setdeleteModal(false);
  };

  const uploadImage = async (mode) => {
    try {
      let result = {};

      if (mode === "gallery") {
        const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert(
            "Permission Required",
            "Permission to access gallery is required!"
          );
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        const permissionResult =
          await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert(
            "Permission Required",
            "Permission to access camera is required!"
          );
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        await saveImageToStorage(imageUri);
      }
    } catch (error) {
      console.log("Error uploading image: ", error);
    }
  };

  const uploadImageToCloudinary = async (imageUri) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg", // Adjust based on your image type
      name: "photo.jpg",
    });
    formData.append("upload_preset", "your_preset");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload error:", errorText);
        throw new Error("Failed to upload image");
      }

      // Parse the response JSON
      const responseData = await response.json();
      console.log("Upload response data:", responseData); // Log the response data
      return responseData.secure_url; // Return the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const saveImageToStorage = async (imageUri) => {
    try {
      const imageUrl = await uploadImageToCloudinary(imageUri);

      await AsyncStorage.setItem("userImage", imageUrl);

      setSelectedImage(imageUrl);
    } catch (error) {
      console.log("Error saving image:", error);
    }
  };

  const removeImage = async () => {
    try {
      setSelectedImage(null);
      await AsyncStorage.removeItem("userImage");
    } catch (error) {
      console.log("Error removing image: ", error);
    }
  };

  React.useEffect(() => {
    const loadImageFromStorage = async () => {
      try {
        const imageUri = await AsyncStorage.getItem("userImage");
        if (imageUri) {
          setSelectedImage(imageUri);
        }
      } catch (error) {
        console.log("Error loading image: ", error);
      }
    };

    loadImageFromStorage();
  }, []);

  // updating users Profile
  const updateUserProfile = async (name, email, phone, imageUri) => {
    try {
      if (!UserToken || !UserID) {
        throw new Error("UserToken or UserID is missing.");
      }

      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;

      // Upload image and get the URL if an imageUri is provided
      if (imageUri) {
        const imageUrl = await uploadImageToCloudinary(imageUri);
        updateData.profilePicture = imageUrl;
      }

      // Send PATCH request to update the user profile
      const updateResponse = await axios.patch(
        `https://uga-cycle-backend-1.onrender.com/updateUser/${UserID}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        }
      );

      // Log the response from the server
      console.log("Update response:", updateResponse.data);

      // Update local storage and state with the latest user info
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify(updateResponse.data)
      );
      setUserInfo(updateResponse.data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const deleteUserAccount = async () => {
    try {
      const deleteResponse = await axios.delete(
        `https://uga-cycle-backend-1.onrender.com/deleteUser/${UserID}`,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        }
      );

      if (deleteResponse.status === 200) {
        logout();
      }
    } catch (error) {
      console.log(
        "Error deleting user account:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        isLoading,
        UserToken,
        UserInfo,
        MainModal,
        ShowEditPage,
        HideEditPage,
        updateUserProfile,
        SelectedImage,
        setSelectedImage,
        uploadImage,
        removeImage,
        ShowDeleteModal,
        HideDeleteModal,
        deleteModal,
        deleteUserAccount,
        UserID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
