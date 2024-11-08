import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AuthContext } from "../context/AuthContext";
const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [identifierError, setIdentifierError] = useState("");

  const { login, UserToken } = useContext(AuthContext);

  const validateIdentifier = (identifier) => {
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (emailRegex.test(identifier) || phoneRegex.test(identifier)) {
      setIdentifierError("");
    } else {
      setIdentifierError("Please enter a valid email address or phone number");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    validateIdentifier(identifier);

    if (!identifierError && identifier && password) {
      setLoading(true);
      try {
        await login(identifier, password);
      } catch (error) {
        Alert.alert(
          "Login failed",
          error.response?.data?.message ||
            "check your internet connection and try againg"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign in to your account</Text>

        <View
          style={[
            styles.inputContainer,
            { borderColor: identifierError ? "red" : "lightgrey" },
          ]}
        >
          <MaterialCommunityIcons name="account" size={24} color="grey" />
          <TextInput
            style={styles.input}
            placeholder="Email address or Phone number"
            onChangeText={setIdentifier}
            onBlur={() => validateIdentifier(identifier)}
            autoCapitalize="none"
            value={identifier}
          />
        </View>
        {identifierError ? (
          <Text style={styles.errorText}>{identifierError}</Text>
        ) : null}

        <View
          style={{
            width: "100%",
            height: 60,
            padding: 15,
            borderWidth: 0.5,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            borderColor: "lightgrey",
            backgroundColor: "#fbfbda",
          }}
        >
          <Fontisto name="locked" size={24} color="grey" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ResetPassword", { token: UserToken })
          }
        >
          <Text
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.forgotPassword}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.continueWithContainer}>
          <View style={styles.separator} />
          <Text style={styles.orContinueText}>Or Continue with</Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.authButtonsContainer}>
          <TouchableOpacity style={styles.authButton}>
            <AntDesign name="apple1" size={24} color="black" />
            <Text style={styles.authButtonText}>Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton}>
            <AntDesign name="google" size={24} color="black" />
            <Text style={styles.authButtonText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Not a member?</Text>
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.createAccountText}
        >
          Create an account
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#547c5c",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#547c5c",
    elevation: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    width: "90%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 15,
    color: "#fbfbda",
  },
  inputContainer: {
    width: "100%",
    height: 60,
    padding: 15,
    borderWidth: 0.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fbfbda",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
  },
  forgotPassword: {
    marginVertical: 20,
    color: "blue",
  },
  loginButton: {
    width: 200,
    height: 50,
    borderRadius: 30,
    backgroundColor: "black",
    marginVertical: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  continueWithContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-evenly",
    marginVertical: 15,
    alignItems: "center",
  },
  separator: {
    height: 0.5,
    width: 80,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    marginHorizontal: 15,
  },
  orContinueText: {
    marginVertical: 15,
    color: "grey",
  },
  authButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  authButton: {
    width: 120,
    height: 50,
    borderRadius: 10,
    backgroundColor: "whitesmoke",
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  authButtonText: {
    marginLeft: 10,
    fontSize: 18,
  },
  footer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    padding: 15,
    flexDirection: "row",
    marginVertical: 20,
  },
  createAccountText: {
    color: "blue",
  },
});

export default LoginScreen;
