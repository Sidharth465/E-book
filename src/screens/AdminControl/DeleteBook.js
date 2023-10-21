import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { IPconfig } from "../../connectivity/IPAdress";
import Toast from "react-native-toast-message";

const DeleteBook = () => {
  const [bookname,setBookname] = useState("")
 const [imgUrl ,setImgUrl] = useState("");

    const getBook = async()=>{
      console.log("sending bookname",bookname)
      const uri = `${IPconfig}/searchbook`
      const response = await fetch(uri,{
        method:"Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({bookname})
      });
      data = await response.json();
      console.log("book url fetched",data.bookUrl);
      setImgUrl(data.bookUrl);
    }


    const deleteRequest = async()=>{
      const uri = `${IPconfig}/delete`
      const response = await fetch(uri,{
        method:"Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({bookname})
      });
      data = await response.json();
      console.log(data);
      if(response.status === 201){
        Toast.show({
          type:"success",
          text1: `${bookname}`,
          text2:"Book deleted Successfully"

        })
      }
      else if(response.status === 404){
        Toast.show({
          type:"Error",
          text1:"Error!" ,
          text2:`${bookname} is not Found `

        })
      }
      
   
    else {
      Toast.show({
        type:"Error",
        text1:"Opps Something Went wrong" ,
        

      })


    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#a9a9a9" }}>
      <View
        style={{
          borderWidth: 0.5,
          height: 250,
          marginTop: 50,
          marginHorizontal: 50,
        }}
      >
       {imgUrl? <Image
          style={{ height: 250, width: "100%", resizeMode: "cover" }}
          source={{ uri: `${imgUrl}` }}
        />:<View style ={{flex:1,justifyContent:"center",backgroundColor:"#fff"}}><Text style={{alignSelf:"center",fontSize:20}}>Preview Not Available! </Text></View>}
      </View>

      <View
        style={{
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 30,
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
        deleteRequest();
      }}
        style={{
          backgroundColor:"#b22222",
          borderWidth: 1,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
          marginHorizontal: 100,
          borderRadius: 50,
        }}
      >
        <Text style={{ fontSize: 20 ,color:"#fff",fontWeight:"500"}}> Delete </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DeleteBook;

const styles = StyleSheet.create({});
