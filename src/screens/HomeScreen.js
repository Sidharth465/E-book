import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  DrawerLayoutAndroid,
  Image,
  StyleSheet,
  View,
  Pressable,
  Alert,
  SafeAreaView,
  TextInput,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import Toast from "react-native-toast-message";
import { IPconfig } from "../connectivity/IPAdress";
import { TouchableOpacity } from "react-native-gesture-handler";
import GoogleSignIn from "../connectivity/GoogleSignIn";

const HomeScreen = ({ navigation }) => {
  //Hook
  const [bookname, setBookname] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [currentToken, setCurrentToken] = useState();
  const [userId, setUserId] = useState("");

  // getToken();
 const {userdata} = GoogleSignIn()
  console.log("UserData from login", userdata)

  // Function to get the token from AsyncStorage
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      // console.log("here is the Homescreen", token); //3 value
      setCurrentToken(token);
    } catch (error) {
      console.log("error In getting and setting token", error);
    }
  };

  // Function to send the token to the backend
  const sendTokenToBackend = async () => {
    try {
      // console.log("current token for sendToken", currentToken);
      const url = `${IPconfig}/userdetails`;
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: currentToken,
        },
      });
      const data = await result.json();
      const userId = data.userId;
      console.log("User data from Data Base", data);
      console.log("UserId from Data Base", userId);
      setUserId(userId);
    } catch (error) {
      console.log("Error running getToken", error);
    }
  };

  // console.log("setUserId mai hai data ", userId);

  // Function to handle Book submission
  const handleSubmit = async () => {
    if (bookname.length == 0 || url.length == 0 || author.length == 0) {
      Toast.show({
        type: "error",
        text1: "Please fill complete details",
      });
    } else {
      try {
        const bookDetails = {
          userId,
          userId,
          bookname,
          url,
          author,
          // userId
        };
        const URL = `${IPconfig}/details`;
        await fetch(URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookDetails),
        }).then((response) => {
          console.log("RESPONSE FROM BACKEND--->>", response.json());
          if (response.status === 200) {
            Toast.show({ type: "success", text1: "Added Successfully" });
          } else if (response.status === 400) {
            Toast.show({
              type: "error",
              text1: "Error in adding Book Details",
              text2: "Book ALready Exist",
            });
          }
        });
      } catch (error) {
        console.log("Unable to post Details to Backend", error);
      }
    }
  };
  //function to  handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.clear()
    navigation.navigate("Login");
    console.log("succesfully Logout");
  };

  // Use useEffect to call getToken and sendTokenToBackend when the component mounts
  useEffect(() => {
    getToken(); // Get the token first
  }, []);
  useEffect(() => {
    if (currentToken) {
      sendTokenToBackend();
    }
  }, [currentToken]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperLogo}>
        <Image
          style={{ width: "100%", height: 400, alignSelf: "center" }}
          source={{
            uri: "https://img.freepik.com/free-vector/open-book-pages-logo_126523-2795.jpg?w=996&t=st=1695961132~exp=1695961732~hmac=132858ae6b7421d031c6f100315f18c4ccb229198e9bca982dd51137791788e6",
          }}
        />
      </View>

      <View style={{flex:1,justifyContent:"center",padding:50}}>
      <TouchableOpacity
      onPress={()=>{navigation.navigate("Book")}}
          style={{
            marginBottom: 50,
            padding: 20,
            backgroundColor: "#AD40AF",
            width: "100%",
            borderRadius: 10,
            alignItems:"center"
          }}
        >
          <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
            {" "}
            Go to Library
          </Text>
        </TouchableOpacity>
      </View>
        
    <View>
      <Text> {userdata.name}</Text>
    </View>

      <View style={styles.LogoutButton}>
        <Button
          title="Logout"
          color={"#ffa500"}
          onPress={() => {
            handleLogout();
          }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  upperLogo: {
    alignSelf: "center",
    width: "100%",
  },

  LogoutButton: {
    marginTop: 20,
    width: 150,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default HomeScreen;
