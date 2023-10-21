import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import BooksScreen from "../screens/BooksScreen";
import HomeScreen from "../screens/HomeScreen";
import CustomDrawer from '../../api/controller/CustomDrawer';

const Drawer = createDrawerNavigator();

const UserRoot = ({userdata,navigation}) => {
  const data = userdata
  console.log(data)
  return (
    <Drawer.Navigator  drawerContent={props=><CustomDrawer {...props} data={data}/>} >
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitleAlign: "center",
      }}
    />
    <Drawer.Screen
      name="Book"
      component={BooksScreen}
      options={{ title: "Library", headerTitleAlign: "center" }}
    />
  </Drawer.Navigator>
  )
}

export default UserRoot

const styles = StyleSheet.create({})