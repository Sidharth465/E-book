import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Toast from "react-native-toast-message";
import { IPconfig } from "../connectivity/IPAdress";
import { TouchableOpacity } from "react-native";

const SignupScreen = ({navigation}) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const navigation = useNavigation();

  const handleSignup = async () => {
    console.log("username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    if(username.length ==0 || password.length==0 || email.length ==0){
      Toast.show({
        type: "error",
        text1: "Incomplete Details!",
        text2: "Please fill complete details",
      });
      return ;
    }

    try {
      setLoading(true);
      setError("");

      const user = {
        username,
        email,
        password,
      };

      const url = `${IPconfig}/register`
      const response = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then(console.log({ username, email, password })
      
      ).catch((err)=>{
        console.log("ERROR FETCHING POST REGISTRATION DETAILS",err)
      });
      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Registration successful",
          text2: "You have been registered Successfully",
        });
        setEmail(""),setPassword(""),setUserName("")
      }
      if (response.status === 400) {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: "User already exists",
        });
      }
      if (response.status === 500) {
        Toast.show({
          type: "info",
          text1: "Please fill Registration details",
        });
      }

      console.log(response.status);
    
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View >
        <Image
          style={{ width: 300, height: 200, marginTop: 0, borderWidth:1 }}
          source={{
            uri: "https://img.freepik.com/free-vector/open-book-pages-logo_126523-2795.jpg?w=996&t=st=1695961132~exp=1695961732~hmac=132858ae6b7421d031c6f100315f18c4ccb229198e9bca982dd51137791788e6",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#fca503",
              fontStyle: "italic",
            }}
          >
            Register 
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 3,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Ionicons
              name="ios-person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={username}
              onChangeText={(text) => setUserName(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: username ? 16 : 16,
              }}
              placeholder="Enter your Username"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 3,
              borderRadius: 5,
              marginTop: 20,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Enter your Email"
            />
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 3,
              borderRadius: 5,
              marginTop: 20,
            }}
          >
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Enter your Password"
            />
          </View>
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

          <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            Forgot Password
          </Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <TouchableOpacity
          onPress={handleSignup}
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
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 20 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Already have an account?{" "}
            <Text
              style={{ color: "#007FFF", fontWeight: "bold", fontSize: 20 }}
            >
              Sign In
            </Text>
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

export default SignupScreen;

