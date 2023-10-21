import { StyleSheet, Text, View, DrawerButton } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../screens/registrerScreen";
import AddBook from "../screens/AdminControl/AddBook";
import DeleteBook from "../screens/AdminControl/DeleteBook";
import UpdateBook from "../screens/AdminControl/UpdateBook";
import ReadBook from "../screens/ReadBook";
import UserRoot from "../components/UserRoot";
import AdminRoot from "../components/AdminRoot";



const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          styles={{ alignItems: "center" }}
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserRoot"
          component={UserRoot}
          options={{
            headerShown: false,
            headerTitle: "readbook Education Library",
            // headerBackButtonMenuEnabled:true
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#03a9f4" },
            headerTintColor: "white",
          }}
        />
       
        <Stack.Screen
          name="AdminRoot"
          component={AdminRoot}
          options={{
            headerShown: false,
            // headerBackButtonMenuEnabled:true
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#03a9f4" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="AddBook"
          component={AddBook}
          options={{
            headerShown: true,
            headerBackButtonMenuEnabled: true,
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#03a9f4" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="DeleteBook"
          component={DeleteBook}
          options={{
            headerShown: true,
            headerBackButtonMenuEnabled: true,
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#03a9f4" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="UpdateBook"
          component={UpdateBook}
          options={{
            headerShown: true,
            headerBackButtonMenuEnabled: true,
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#03a9f4" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="ReadBook"
          component={ReadBook}
          options={{
            headerShown: true,
            headerBackButtonMenuEnabled: true,
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#03a9f4" },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
