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
import { IPconfig } from "../../connectivity/IPAdress";


const AddBook = ({ navigation }) => {

  
  //Hook
  const [bookname, setBookname] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [currentToken, setCurrentToken] = useState()
  const [userId,setUserId] =useState("")

 
// getToken();

// Function to get the token from AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken")
    console.log("here is the Homescreen", token)//3 value
    setCurrentToken(token);
   
  } catch (error) {
    console.log("error In getting and setting token", error)
  }
}


// Function to send the token to the backend
const sendTokenToBackend = async () => {
 
  try {
    console.log("current token for sendToken",currentToken)
    const url = `${IPconfig}/userdetails`;
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token":currentToken,
      },
     
    });
    const data = await result.json();
    const userId = data.userId;
    console.log("User data from Data Base", data)
    console.log("UserId from Data Base", userId)
    setUserId(userId);

  } catch (error) {
    console.log("Error running getToken", error)

  }
}


// console.log("setUserId mai hai data ",userId)

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
          bookname,
          url,
          author,
          // userId
        };
        const URL =`${IPconfig}/details`
        await fetch(URL, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookDetails),
        }).then((response) => {
          console.log("RESPONSE FROM BACKEND--->>", response.json())
          if (response.status === 200) {
            Toast.show({ type: 'success', text1: 'Added Successfully' })
            setBookname(),setAuthor(),setUrl()

          }
          else if (response.status === 400) {
            Toast.show({ type: 'error', text1: 'Error in adding Book Details', text2: "Book ALready Exist" })

          }
        })

      } catch (error) {
        console.log("Unable to post Details to Backend", error)
      }
    }
  };
  //function to  handle logout
 

   // Use useEffect to call getToken and sendTokenToBackend when the component mounts
  useEffect(() => {
    getToken(); // Get the token first
  }, [])
  useEffect(()=>{
    if(currentToken){
      sendTokenToBackend();
    }
  },[currentToken])
 



  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.upperLogo}>
        <Image
          style={{ width: 400, height: 200, alignSelf: "center" }}
          source={{
            uri: "https://img.freepik.com/free-vector/open-book-pages-logo_126523-2795.jpg?w=996&t=st=1695961132~exp=1695961732~hmac=132858ae6b7421d031c6f100315f18c4ccb229198e9bca982dd51137791788e6",
          }}
        />
      </View>

      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.details}>
            <TextInput
            value={bookname}
              onChangeText={(text) => {
                setBookname(text.trimEnd().toLowerCase());
              }}
              style={styles.inputs}
              placeholder="Enter Book name"
            />
            <TextInput
            value={url}
              onChangeText={(text) => {
                setUrl(text.trim());
              }}
              style={styles.inputs}
              placeholder="Enter URL of book Img"
            />
            <TextInput
              value={author}
              onChangeText={(text) => {
                setAuthor(text.trimEnd().toLowerCase());
              }}
              style={styles.inputs}
              placeholder="Enter Author Name"
            />
          </View>
          <View style={styles.Button}>
            <Button title="Add Book" onPress={handleSubmit}></Button>

          </View>
        </KeyboardAvoidingView>
      </ScrollView>
     

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a9a9a9",
  },
  Drawar: {
    flex: 1,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
  upperLogo: {
    alignSelf: "center",

    width: 400,
  },
  details: {
    justifyContent: "center",

    margin: 5,
    // flex:1,
    gap: 20,
    padding: 20,
    backgroundColor: "skyblue",
  },
  inputs: {
    borderWidth: 0.5,
    padding: 5,
    fontSize: 20,
    backgroundColor: "white",
    borderRadius:50,
    paddingHorizontal:10
  },
  Button: {
    marginTop: 100,
    width: 150,
    alignSelf: "center",

  },
  
});

export default AddBook;
