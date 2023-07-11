import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';
import { useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
let id='';
const Users = () => {
    const navigation=useNavigation();
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        getUser();
    },[]);
    const getUser=async()=>{
         id=await AsyncStorage.getItem("USERID");
        let tempData=[]
   const email=await AsyncStorage.getItem("EMAIL");
   firestore()
   .collection("Users")
   .where("email","!=",email)
   .get()
   .then(res=>{
   if(res.docs!=[])
   {
    res.docs.map(item=>{
        tempData.push(item.data());
    })
   }
   setUsers(tempData);
   });
    }
  return (
    <View style={styles.container}>
     <View style={styles.header}>
<Text style={styles.Title}>RNFIREBSE</Text>
     </View>
     <FlatList data={users}
     renderItem={({item,index})=>{
        return(
            <TouchableOpacity style={styles.userItem}
            onPress={()=>{
                navigation.navigate('Chat',{data:item,id:id})
            }}
            >
            <Image source={require('../images/man.png')} style={styles.userImage}></Image>
            <Text style={{color:'black',marginLeft:20,fontSize:20}}>{item.name}</Text>
            </TouchableOpacity>
        )
     }}
     >
     </FlatList>
    </View>
  )
}

export default Users

const styles = StyleSheet.create({
container:{
    backgroundColor:'white',
    flex:1,
},
header:{
    width:'100%',
    height:60,
    backgroundColor:'white',
    elevation:5,
    justifyContent:'center',
    alignItems:'center'
},
Title:{
    color:'purple',
    fontSize:20,
    fontWeight:'600'
},
userItem:{
width: Dimensions.get('window').width-50,
alignSelf:'center',
marginTop:20,
flexDirection:'row',
height:60,
borderWidth:0.5,
borderRadius:10,
paddingLeft:20,
alignItems:'center'
},
userImage:{
    height:40,
    width:40
}

})