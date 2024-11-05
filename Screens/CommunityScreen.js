import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const CommunityScreen = ({ navigation }) => {
  // Add navigation prop
  const { UserID } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [content, setContent] = useState("");

  const handleChange = (text) => setContent(text);

  const handlePostSubmit = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Please enter content before submitting.");
      return;
    }

    const postData = {
      userId: UserID,
      content: content.trim(),
    };

    try {
      setLoading2(true);
      const response = await axios.post(
        "https://uga-cycle-backend-1.onrender.com/create-post",
        postData
      );

      if (response.status === 200) {
        setContent("");
        refreshPosts(); // Refresh posts after submission
      } else {
        Alert.alert("Error", "Failed to submit post. Please try again.");
      }
    } catch (error) {
      console.log("Error creating post", error);
    } finally {
      setLoading2(false);
    }
  };

  const fetchPosts = async (showLoading = true) => {
    if (showLoading)
      try {
        const response = await axios.get(
          "https://uga-cycle-backend-1.onrender.com/get-posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.log("error fetching posts", error);
      } finally {
        if (showLoading) setLoading(false);
      }
  };

  useEffect(() => {
    fetchPosts(true);

    const interval = setInterval(() => {
      fetchPosts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

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

  const navigateToNotifications = () => {
    navigation.navigate("Notifications"); // Navigate to Notifications screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.headerText}>Community</Text>
        </View>
        <TouchableOpacity onPress={navigateToNotifications}>
          <AntDesign name="bells" size={24} color="white" />{" "}
          {/* Notification Icon */}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
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
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={{ flex: 1 }}
          value={content}
          onChangeText={handleChange}
          placeholder="What's on your mind?"
          multiline
        />
        {loading2 ? (
          <ActivityIndicator size="small" color="#547c5c" />
        ) : (
          <FontAwesome
            onPress={handlePostSubmit}
            style={{ marginHorizontal: 16 }}
            name="send"
            size={24}
            color="#547c5c"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "lightgrey" },
  header: {
    backgroundColor: "#547c5c",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { width: 50, height: 50, marginRight: 10 },
  headerText: {
    color: "#fbfbda",
    fontSize: 25,
    fontWeight: "bold",
    left: -20,
  },
  scrollView: { flex: 1 },
  postsContainer: { padding: 10 },
  postContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  postFooter: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  profileImage: { width: 30, height: 30, borderRadius: 15, marginRight: 8 },
  username: { fontWeight: "bold" },
  timestamp: { fontSize: 12, color: "gray" },
  postContent: { marginVertical: 10 },
  postText: { fontSize: 16 },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  likesCount: { fontSize: 14, marginRight: 8 },
  inputContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "whitesmoke",
    flexDirection: "row",
  },
});

export default CommunityScreen;
