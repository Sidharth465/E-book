import { StyleSheet, Text, View, Image, ScrollView,Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { IPconfig } from "../connectivity/IPAdress";

const BooksScreen = ({navigation}) => {
  const [books, setBooks] = useState([]);


  useEffect(() => {
    const getBooksApi = async () => {
      try {
        const url = `${IPconfig}/library`;
        let response = await fetch(url);
        let data = await response.json();
        setBooks(data); // Update the state with the fetched data
      } catch (error) {
        console.log("Error While Fetching BOOKAPI", error);
      }
    };
   getBooksApi();
  
   
  }, [books]);

  

  // console.log(books);
  return (
    <View style ={styles.container}>
    <Pressable onPress={()=>console.warn("pressed")}>
    <FlatList
      numColumns={2}
      data={books}
      keyExtractor={books.id}
      renderItem={({item})=>(
        <Pressable onPress={()=>{navigation.navigate("ReadBook",{
          book:item
        })}} style ={styles.container}>
        <View style = {styles.item}>
            <Image source={{uri:item.url}} style={styles.image}/>
            <Text style={styles.text}>Book: {item.bookname}</Text>
            <Text style={styles.text}>Author: {item.author}</Text>
        </View>
        </Pressable>
      )}

      
      />
    </Pressable>
    </View>
  );
};

export default BooksScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#ffe4c4"
  },
  item:{
    borderRadius:10,
    borderWidth:.5,
    flex:1,
    margin:5,
    alignItems:"center",
    backgroundColor:"#f0ffff"
  },
  image:{
    borderRadius:10,
    width: "100%",
    resizeMode:"contain",
    height: 250,
    marginTop:0.5

  },
  text:{
    fontStyle:"italic",
    fontWeight:"900"
  }
});
