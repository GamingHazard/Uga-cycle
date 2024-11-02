import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import CreatePost from "../components/CreatePost";
import { AuthContext } from "../context/AuthContext";
import io from "socket.io-client"; // Import socket.io client

const CommunityScreen = () => {
  const { UserID } = useContext(AuthContext);
  const [userId, setUserId] = useState(UserID);
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = io("https://your-server-url"); // Replace with your server URL

    socket.on("postUpdated", (newPost) => {
      setPosts((prevPosts) => {
        // Check if the post already exists
        const index = prevPosts.findIndex((post) => post._id === newPost._id);
        if (index > -1) {
          // Update the existing post
          const updatedPosts = [...prevPosts];
          updatedPosts[index] = newPost;
          return updatedPosts;
        } else {
          // Add new post
          return [newPost, ...prevPosts];
        }
      });
    });

    socket.on("newPost", (newPost) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    });

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.userId);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);

    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://uga-cycle-backend-1.onrender.com/get-posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.log("error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `https://uga-cycle-backend-1.onrender.com/posts/${postId}/${UserID}/like`
      );
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (error) {
      console.log("Error liking the post", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(
        `https://uga-cycle-backend-1.onrender.com/posts/${postId}/${UserID}/unlike`
      );
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const refreshPosts = () => {
    fetchPosts();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#fbfbda", fontSize: 35, fontWeight: "bold" }}>
            Community
          </Text>
        </View>
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
                    size={24}
                    color="red"
                  />
                  <CreatePost refreshPosts={refreshPosts} />
                </View>
              </View>
            </Modal>
          </BlurView>
        )}

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#4c7c54"
            style={styles.loader}
          />
        ) : (
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
                  <View style={styles.likesContainer}>
                    <Text style={styles.likesCount}>
                      {post.likes.length} likes
                    </Text>
                    {post.likes.includes(UserID) ? (
                      <TouchableOpacity onPress={() => handleDislike(post._id)}>
                        <AntDesign name="heart" size={18} color="#4c7c54" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => handleLike(post._id)}>
                        <AntDesign name="hearto" size={18} color="black" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  header: {
    backgroundColor: "#547c5c",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignSelf: "flex-end",
    marginHorizontal: 10,
    top: -20,
  },
  scrollView: {
    backgroundColor: "white",
    flex: 1,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#4c7c54",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    height: 500,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  postsContainer: {
    padding: 10,
  },
  postContainer: {
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  postContent: {
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
  },
  likesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likesCount: {
    fontSize: 14,
    marginRight: 10,
  },
});

export default CommunityScreen;
