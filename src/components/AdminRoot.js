import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SettingScreen from "../screens/SettingScreen";
import BooksScreen from "../screens/BooksScreen";
import AdminHomeScreen from "../screens/AdminHomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from '../../api/controller/CustomDrawer';

const Drawer = createDrawerNavigator();
const AdminRoot = ({Navigation}) => {
  return (
    <Drawer.Navigator  drawerContent={props=><CustomDrawer {...props}/>}>
      <Drawer.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="Book"
        component={BooksScreen}
        options={{ title: "Library", headerTitleAlign: "center" }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </Drawer.Navigator>
  )
}

export default AdminRoot

const styles = StyleSheet.create({})