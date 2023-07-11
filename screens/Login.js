import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import Loader from '../android/app/src/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
    const [Password,setPassword]=useState('');
    const [email,setEmail]=useState('')
    const navigation=useNavigation();
    const loginUser=()=>{
        firestore().collection('Users').where("email","==",email).get().then(res=>{
   if(res.docs!=[])
   {
    console.log(JSON.stringify(res.docs[0].data()));
    goToNext(res.docs[0].data().name,res.docs[0].data().email,res.docs[0].data().userId)
}
   else
   {
    Alert.alert('user not found')
   }
        }).catch(error=>{
            Alert.alert('user not found')
            console.log(error);
        })
    }
    const goToNext=async(name,email,userId)=>{
  await AsyncStorage.setItem("NAME",name);
  await AsyncStorage.setItem("EMAIL",email);
  await AsyncStorage.setItem("USERID",userId);
  navigation.navigate('Main');
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <TextInput style={[styles.input, { marginTop:70},]} placeholder='Email' value={email} onChangeText={txt=>setEmail(txt)} ></TextInput>
     <TextInput style={[styles.input, { marginTop:20},]} placeholder='Password' value={Password} onChangeText={txt=>setPassword(txt)}></TextInput>
     <TouchableOpacity onPress={()=>{
        loginUser();
     }}>
        <View style={styles.btn}>
         <Text style={{color:'white',fontSize:20}}>Login</Text>
        </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>{
        navigation.navigate('SignUp');
     }}>
        <Text style={styles.OrLogin}>SignUp</Text>
     </TouchableOpacity>
     {/* <Loader></Loader> */}
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'white',
},
title:{
    fontSize:30,
    color:'black',
    alignSelf:'center',
    marginTop:50,
    fontWeight:'600',
},
input:{
    width:'90%',
    height:50,
    borderRadius:10,
    borderWidth:1,
    alignSelf:'center',
    paddingLeft:30,
},
btn:{
    width:'90%',
    height:50,
    borderRadius:10,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
    backgroundColor:'purple'
},
OrLogin:{
    alignSelf:'center',
    marginTop:50,
    fontSize:20,
    textDecorationLine:'underline',
    fontWeight:'600',
    color:'black'

}
})