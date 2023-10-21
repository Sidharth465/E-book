import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const ReadBook = ({route}) => {
    const { book } = route.params;
  return (
    <View style = {{flex:1}}> 
   <Image  style = {{flex:1,resizeMode:"cover"}} source={{uri:book.url}}></Image>
     
    </View>
  )
}

export default ReadBook

const styles = StyleSheet.create({})