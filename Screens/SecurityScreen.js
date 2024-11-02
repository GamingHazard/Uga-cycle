import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ModalView from "../components/Modal";
import { AuthContext } from "../context/AuthContext";

const SecurityScreen = () => {
  const { ShowDeleteModal, HideDeleteModal, deleteModal } =
    useContext(AuthContext);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const Delete = async () => {
    setLoadingDelete(true);
    await deleteUserAccount();
    setLoadingDelete(false);
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
          <View
            style={{
              width: "100%",
              backgroundColor: "whitesmoke",
              padding: 15,
              marginVertical: 10,
              borderRadius: 15,
            }}
          >
            <TextInput placeholder="Enter old password" />
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "whitesmoke",
              padding: 15,
              marginVertical: 10,
              borderRadius: 15,
            }}
          >
            <TextInput placeholder="Enter new password" />
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "whitesmoke",
              padding: 15,
              marginVertical: 10,
              borderRadius: 15,
            }}
          >
            <TextInput placeholder="Confirm new password" />
          </View>
          <TouchableOpacity
            style={{
              width: "40%",
              padding: 10,
              borderRadius: 15,
              backgroundColor: "teal",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Change</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignSelf: "flex-start",
            marginHorizontal: 16,
            marginVertical: 10,
            color: "grey",
          }}
        >
          Permissions
        </Text>
        <View
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "white",
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Permissions granted to the app
          </Text>
          {/* camera */}
          <View
            style={{
              width: "100%",
              padding: 15,
              marginVertical: 10,
              borderRadius: 8,
              backgroundColor: "whitesmoke",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Camera</Text>
            <Text style={{ fontSize: 11, color: "grey" }}>
              The app is allowed to access both the front and rear camera.
            </Text>
          </View>
          {/*GPS  */}
          <View
            style={{
              width: "100%",
              padding: 15,
              marginVertical: 10,
              borderRadius: 8,
              backgroundColor: "whitesmoke",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              GPS Location
            </Text>
            <Text style={{ fontSize: 11, color: "grey" }}>
              This app is allowed to use the GPS location services to access
              your current location.
            </Text>
          </View>

          {/*storage  */}
          <View
            style={{
              width: "100%",
              padding: 15,
              marginVertical: 10,
              borderRadius: 8,
              backgroundColor: "whitesmoke",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Storage</Text>
            <Text style={{ fontSize: 11, color: "grey" }}>
              This app is allowed to access and read your phone's storage.
            </Text>
          </View>
        </View>
        <Text
          style={{
            alignSelf: "flex-start",
            marginHorizontal: 16,
            top: 16,
            color: "grey",
          }}
        >
          Account
        </Text>
        <View
          style={{
            width: "100%",
            borderRadius: 10,

            backgroundColor: "white",
            top: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              borderRadius: 10,
              padding: 10,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold" }}>
              Delete Account
            </Text>
            <TouchableOpacity
              style={{
                width: "40%",
                padding: 10,
                borderRadius: 15,
                backgroundColor: "crimson",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={ShowDeleteModal}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
              <AntDesign name="delete" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 15,
              justifyContent: "center",
              backgroundColor: "whitesmoke",
              borderRadius: 10,
              marginHorizontal: 8,
              marginVertical: 8,
            }}
          >
            <Text style={{ color: "red", fontSize: 16 }}>
              This will permanently delete your account. This process cannot be
              un done so please proceed with caution.
            </Text>
          </View>
        </View>
        <ModalView
          content={
            <View
              style={{
                width: "100%",
                borderRadius: 10,
                padding: 13,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  alignSelf: "flex-start",
                  color: "crimson",
                }}
              >
                Confirm Deletion
              </Text>

              <View
                style={{
                  width: "100%",
                  padding: 15,
                  justifyContent: "center",
                  backgroundColor: "whitesmoke",
                  height: 50,
                  borderRadius: 10,
                }}
              >
                <TextInput placeholder="Enter password to confirm" />
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={HideDeleteModal}
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3061e4",
                    borderRadius: 20,
                    paddingHorizontal: 40,
                  }}
                >
                  <Text style={{ color: "white" }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={Delete}
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "crimson",
                    borderRadius: 20,
                    flexDirection: "row",
                  }}
                >
                  {loadingDelete ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={{ color: "white" }}>Delete Account</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          }
          modalVisible={deleteModal}
        />
        <View style={{ width: "100%", height: 70 }} />
      </ScrollView>
    </View>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingHorizontal: 10 },
});
