import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { IPconfig } from "../../connectivity/IPAdress";
import Toast from "react-native-toast-message";

const UpdateBook = () => {
  const [bookname,setBookname] = useState("");
  const [imgUrl,setImgUrl] = useState("")
 const [updateImgUrl ,setUpdateImgUrl] = useState("");
 const [updateAuthor ,setUpdateAuthor] = useState("");
 const [updateBookName ,setUpdateBookName] = useState("");


    const getBook = async()=>{
     try {
      console.log(bookname)
      const uri = `${IPconfig}/searchbook`
      const response = await fetch(uri,{
        method:"Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({bookname})
      });
      data = await response.json();
      console.log(data.bookUrl);
      setImgUrl(data.bookUrl);
     } catch (error) {
      console.log("Error while getting books details ",error);
      
     }
    }
    const bookDetails = {
      bookname,updateBookName,updateImgUrl,updateAuthor
    }


    const UpdatingBook = async()=>{
     try {
      console.log("Book Details",bookDetails)
      const uri = `${IPconfig}/updatebook`
      const response = await fetch(uri,{
        method:"Put",
        headers: { "Content-Type": "application/json" },
        body:  JSON.stringify(bookDetails)
      });
      const data = await response.json();
      console.log(data)
      if(response.status === 200){
        setImgUrl("")
        Toast.show({
          type:"success",
          text1:"Book Updated Successfully"
        })
       

      }
      else if(response.status === 404){
        Toast.show({
          type:"info",
          text1:"Book Not Found",
          text2:"Please fill valid Book Name"
        })
      }
      else{
        Toast.show({
          type:"error",
          text1:"Error!",
          text2:"opps sorry!"
        })
      }
      
      
     } catch (error) {
        console.log("error during updating book",error)
     }

      
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#a9a9a9" }}>
      <View
        style={{
          borderWidth: 0.5,
          height: 200,
          marginTop: 20,
          marginHorizontal: 50,
        }}
      >
       {imgUrl? <Image
          style={{ height: 200,  resizeMode: "cover" }}
          source={{ uri: `${imgUrl}` }}
        />:<View style ={{flex:1,justifyContent:"center",}}><Text style={{alignSelf:"center",fontSize:20,color:"#fff"}}>Preview Not Available! </Text></View>}
      </View>

      <KeyboardAvoidingView style={{borderWidth:0.5,margin:20,borderRadius:10,height:300}}>
      <View
        style={{
          marginTop:50,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TextInput
        onChangeText={(text)=>{setBookname(text.trimEnd().toLowerCase())}}
          cursorColor={"red"}
          style={{
            borderWidth: 1,
            width: "80%",
            textAlign: "center",
            fontSize: 18,
            borderRadius: 50,
          }}
          placeholder="Enter Book"
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TextInput
        
        onChangeText={(text)=>{setUpdateBookName(text.trimEnd().toLowerCase())}}
          cursorColor={"red"}
          style={{
            borderWidth: 1,
            width: "80%",
            textAlign: "center",
            fontSize: 18,
            borderRadius: 50,
          }}
          placeholder="Enter Bookname to be updated"
        />
      </View>

      <View
        style={{
        
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TextInput
        
        onChangeText={(text)=>{setUpdateImgUrl(text.trim())}}
          cursorColor={"red"}
          style={{
            borderWidth: 1,
            width: "80%",
            textAlign: "center",
            fontSize: 18,
            borderRadius: 50,
          }}
          placeholder="Enter imgUrl to be updated"
        />
      </View>

      <View
        style={{
         
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TextInput
        
        onChangeText={(text)=>{setUpdateAuthor(text.trimEnd().toLowerCase())}}
          cursorColor={"red"}
          style={{
            borderWidth: 1,
            width: "80%",
            textAlign: "center",
            fontSize: 18,
            borderRadius: 50,
          }}
          placeholder="Enter Author to be updated"
        />
      </View>
      </KeyboardAvoidingView>

      <TouchableOpacity
      onPress={()=>{getBook()}}
        style={{
          backgroundColor:"#00bfff",
          borderWidth: 1,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
          marginHorizontal: 100,
          borderRadius: 50,
        }}
      >
        <Text style={{ fontSize: 20 ,color:"#fff",fontWeight:"500"}}> Preview </Text>
      </TouchableOpacity>


      <TouchableOpacity
      onPress={()=>{
        UpdatingBook();
      }}
        style={{
          backgroundColor:"darkgreen",
          borderWidth: 1,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
          marginHorizontal: 100,
          borderRadius: 50,
        }}
      >
        <Text style={{ fontSize: 20 ,color:"#fff",fontWeight:"500"}}> Update </Text>
      </TouchableOpacity>

      
    </SafeAreaView>
  );
};

export default UpdateBook;

const styles = StyleSheet.create({});
