import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { AuthContext } from "../context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CreatePost from "../components/CreatePost";

const SaleScreen = () => {
  const { UserID } = useContext(AuthContext);
  let userId = UserID;
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://waste-recycle-app-backend.onrender.com/get-SalePosts"
      );
      setPosts(response.data);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  const refreshPosts = () => {
    fetchPosts();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {modalVisible && (
          <BlurView intensity={30} style={styles.absolute}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.overlay}>
                <View style={styles.modalView}>
                  <AntDesign
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                    name="close"
                    size={30}
                    color="#fbfbda"
                  />
                  <CreatePost refreshPosts={refreshPosts} />
                </View>
              </View>
            </Modal>
          </BlurView>
        )}

        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <View key={post._id} style={styles.postContainer}>
              <View style={styles.postFooter}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                  }}
                />
                <View>
                  <Text style={styles.username}>{post.user.name}</Text>
                  <Text style={styles.timestamp}>{post.createdAt}</Text>
                </View>
              </View>
              <View style={styles.postContent}>
                <Text style={styles.postText}>{post.content}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // Dark semi-transparent overlay
  },
  header: {
    backgroundColor: "whitesmoke",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4c7c54",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignSelf: "flex-end",
    marginHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  overlay: {},
  modalView: {
    backgroundColor: "#4c7c54",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    height: 600,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginHorizontal: 15,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  postFooter: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  profileImage: { width: 30, height: 30, borderRadius: 15, marginRight: 8 },
  username: { fontWeight: "bold" },
  timestamp: { fontSize: 12, color: "gray" },
  postContent: { marginVertical: 10 },
  postText: { fontSize: 16 },
});

export default SaleScreen;
