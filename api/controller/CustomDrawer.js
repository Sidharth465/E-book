import { Image, ImageBackground, StyleSheet, Text, View ,Button, Pressable} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
const userdata = props


    
  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:"#8200d6"}}>
        <ImageBackground source={require('../../src/Image/menu-bg.jpeg')}>
        <Image source={require('../../src/Image/user-profile.jpg')} style={{height:80,width:80,borderRadius:40,marginBottom:10}}/>
        <Text style={{color:"#fff",fontSize:18,marginLeft:5}}>{userdata.name ? userdata.name :"user"}</Text>
        <View style={{flexDirection:"row",marginLeft:5}}>
        <Text style={{color:"#fff",marginRight:10}}>500 coins</Text>
        <FontAwesome5 name="coins" size={14} color={"#fff"}/>
        </View>
        </ImageBackground>
        <View style={{flex:1,backgroundColor:"#fff",}}>
        <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      
    
        {/* <Pressable 
       onPress={()=>{handleLogout()}}
         style={{ borderWidth:.5,alignItems:"center",backgroundColor:"#ffa500",margin:5,borderRadius:10}}>
            <Text style={{fontSize:18,padding:5,color:"#fff",textAlign:"center"}} >Logout</Text>
        </Pressable> */}

    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
