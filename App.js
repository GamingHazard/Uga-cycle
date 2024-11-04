import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { AuthProvider } from "./context/AuthContext";
import Nav, { AuthStack } from "./components/NavigationComponent";
import KCCA from "./Screens/SevicesProviders/KCCA";
export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Nav />
        {/* <KCCA /> */}
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
});
