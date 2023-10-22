import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-toast-message";
import { IPconfig } from "../connectivity/IPAdress";

import * as WebBrowser from "expo-web-browser";
import GoogleSignIn from '../connectivity/GoogleSignIn'//1
WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {

  const navigation = useNavigation();

  const [usernameoremail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo,setUserInfo] =useState("");

  // console.log(username)
  //debugging
  const {signInWithGoogle ,token,getUserInfo,userData} = GoogleSignIn()
  const handleGoogleLogin = async () => {
    console.log("running google signin")
  
    try {
       await signInWithGoogle();
       const userToken = token;
       if(userToken)
       await AsyncStorage.setItem("GToken",userToken);
       const userInfo = await getUserInfo();
       setUserInfo(userInfo)
       console.log("userInfo",userInfo)
       console.log("User Token", userToken) // showing null

      
      // Continue with any logic you need after successful Google Sign-In
    } catch (error) {
      // Handle errors
      console.error("Google Sign-In Error:", error);
    }
   
    
  };
  

  const handleLogin = async () => {
    if(usernameoremail.length ==0 || password.length==0){
      Toast.show({
        type: "error",
        text1: "Incomplete Details!",
        text2: "Please fill complete details",
      });
      return ;

    }
    try {
      const user = {
        usernameoremail,
        password,
      };
      const url = `${IPconfig}/login`;
      const result = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (result.status === 200) {
        const data = await result.json();
        const usertoken = data.token;
        AsyncStorage.setItem("authToken", usertoken);
        if (usertoken) {
          console.log("Token found while Login: -->", usertoken);
          navigation.replace("UserRoot");
        } else {
          console.error("Token is missing or undefined in the response.");
        }
      } else if (result.status === 202) {
        const data = await result.json();
        const admintoken = data.token;
        AsyncStorage.setItem("authAdminToken", admintoken);
        if (admintoken) {
          console.log("Token found while Login: -->", admintoken);
          navigation.replace("AdminRoot");
        }
      } else if (result.status === 401) {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "User doesn't exist or Incomplete details.",
          autoHide: true,
          visibilityTime: 3000,
          topOffset: 50,
          onShow: () => {
            console.log("Toast visible for login failed");
          },
        });
      } else if (result.status === 400) {
        Toast.show({
          type: "error",
          text1: "Incomplete Details!",
          text2: "Please fill complete details",
        });
      } else {
        
      }
    } catch (error) {
      console.log("Error while fetching login Details:", error.message);
    }
  };

 

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("authToken");
        const adminToken = await AsyncStorage.getItem("authAdminToken");
        const GToken = await AsyncStorage.getItem("GToken");
            if(GToken) navigation.replace("UserRoot",{
              userInfo :userInfo
            })
        if (userToken) navigation.replace("UserRoot");
        if (adminToken) navigation.replace("AdminRoot");
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, [loading]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 0 }}>
        <Image
          style={{ width: 400, height: 200 }}
          source={{
            uri: "https://img.freepik.com/free-vector/open-book-pages-logo_126523-2795.jpg?w=996&t=st=1695961132~exp=1695961732~hmac=132858ae6b7421d031c6f100315f18c4ccb229198e9bca982dd51137791788e6",
          }}
        />
      </View>
      <KeyboardAvoidingView style={{ flex: 1, marginTop: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 20,
              color: "#fca503",
              fontStyle: "italic",
            }}
          >
            Login{" "}
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 3,
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            <FontAwesome
              style={{ marginLeft: 8, color: "grey" }}
              name="user"
              size={24}
              color="grey"
            />
            <TextInput
              value={usernameoremail}
              onChangeText={(text) => setUsernameOrEmail(text)}
              style={{
                color: "grey",
                marginVertical: 10,
                width: 300,
                fontSize: usernameoremail ? 18 : 18,
              }}
              placeholder=" Email/username"
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 3,
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8, color: "grey" }}
              name="lock"
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "grey",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 18 : 18,
              }}
              placeholder=" Password "
            />
          </View>
          {/* choosing options */}
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007FFF", fontWeight: 500 }}>
            {" "}
            Forget Password
          </Text>
        </View>
        <View style={{ marginTop: 80 }} />
        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
            Don't have an Account?
            <Text
              style={{ color: "#007FFF", fontWeight: "bold", fontSize: 20 }}
            >
              {" "}
              Sign Up
            </Text>
          </Text>
        </Pressable>
        <TouchableOpacity
            style={{
              backgroundColor: "#4285F4",
              width: "100%",
              padding: 10,
              paddingRight: 70,
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 25,
              marginBottom: 10,
              marginTop: 15,
              marginLeft: 3,
            }}
            onPress={() => handleGoogleLogin()}
          >
            <AntDesign name="google" size={30} color="#fff" />
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
              Sign In with Google
            </Text>
          </TouchableOpacity>
       
        
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default LoginScreen;
