import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./src/Navigation/StackNavigator";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import 'react-native-gesture-handler';
import 'react-native-get-random-values'


const App = () => {
 
  return (
    <>
      <StackNavigator />
      <Toast />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
