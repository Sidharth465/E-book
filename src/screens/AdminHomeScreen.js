import { StyleSheet, Text, View , Button,Image,Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from "@react-native-async-storage/async-storage";


const AdminHomeScreen = ({navigation}) => {

  const handleLogout = async () => {

    await AsyncStorage.removeItem("authAdminToken")
    await AsyncStorage.clear();
    navigation.navigate("Login")
    console.log("succesfully Logout")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#a9a9a9", }}>
      <View style={{marginBottom:50,alignItems:"center"}} >
        <Text style={{fontSize:25,color:"#fff",fontWeight:"900"}}>  Welcome to E-Book Store</Text>
      </View>




      <View  style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
        <Pressable 
        onPress={()=>navigation.navigate("AddBook")}
        style={{ borderWidth: 1, borderRadius: 20, height: 200, width: 170, margin: 10,justifyContent:"center", alignItems: "center" }}>
       <Image style={{height:198,width:"100%",resizeMode:"cover",borderRadius:20,position:"absolute"}} source={{uri:"https://img.freepik.com/premium-vector/book-icon-flat-illustration-book-vector-icon-isolated-white-background_98396-6313.jpg?w=740"}}></Image>
          <Text style={{ fontSize: 20, fontWeight: "bold",marginTop:150 }} >Add Book</Text>
        </Pressable>



        <Pressable  
        onPress={()=>{navigation.navigate("DeleteBook")}}
        style={{ borderWidth: 1, borderRadius: 20, height: 200, width: 170, margin: 10, justifyContent: "center", alignItems: "center" }}>
        <Image style={{height:198,width:"100%",resizeMode:"cover",borderRadius:20,position:"absolute"}} source={{uri:"https://img.freepik.com/free-photo/trash-bin-front-side-white-background_187299-40223.jpg?w=740&t=st=1696761558~exp=1696762158~hmac=ab41c53a84d086f2e440909f7e0aa6d0b0902573d36faf85f7accc5c0288624f"}}></Image>
          <Text style={{ fontSize: 20, fontWeight: "bold",marginTop:150 }} >Delete Book</Text>
        </Pressable>


        <Pressable onPress={()=>{navigation.navigate("UpdateBook")}} style={{ borderWidth: 1, borderRadius: 20, height: 200, width: 170, margin: 10, justifyContent: "center", alignItems: "center" }}>
        <Image style={{height:198,width:"100%",resizeMode:"cover",borderRadius:20,position:"absolute"}} source={{uri:"https://img.freepik.com/free-photo/notebook-icon-front-side-with-white-background_187299-39912.jpg?w=740&t=st=1696761668~exp=1696762268~hmac=a4bb955cde947b96c43eab6a74e2cc5a8a0c3d4d0ea6d214fa44656a1a622bd7"}}></Image>
          <Text style={{ fontSize: 20, fontWeight: "bold",marginTop:150 }} >Update Book</Text>
        </Pressable>


        <Pressable 
        onPress={()=>navigation.navigate("Book")}
        style={{ borderWidth: 1, borderRadius: 20, height: 200, width: 170, margin: 10, justifyContent: "center", alignItems: "center" }}>
        <Image style={{height:198,width:"100%",resizeMode:"cover",borderRadius:20,position:"absolute"}} source={{uri:"https://img.freepik.com/free-vector/books-stack-realistic_1284-4735.jpg?w=740&t=st=1696760799~exp=1696761399~hmac=bd986a93f7c935e4ee4ad5f03a02c08e7365ce0ae7643ebc4293e8b4d7ae1141"}}></Image>
          <Text style={{ fontSize: 20, fontWeight: "bold",marginTop:150 }} >ReadBook</Text>
        </Pressable>

      </View>
      <View style={styles.LogoutButton}>
        <Button title="Logout" color={"#ffa500"} onPress={()=>{handleLogout()}}></Button>

      </View>
    </SafeAreaView>
  )
}

export default AdminHomeScreen

const styles = StyleSheet.create({
  LogoutButton: {
    marginTop: 20,
    width: 150,
    alignSelf: "center",
    marginBottom: 10


  },
})