import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { Alert } from 'react-native';
const SignUp = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('')
    const [mobile,setMobile]=useState('')
    const [Password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const navigation=useNavigation();
    const registerUser = () => {
        if(validate())
        {
            console.log();
            const userId=uuid.v4();
            firestore()
            .collection('Users')
            .doc(userId)
            .set({
              name: name,
              email:email,
              mobile:mobile,
              Password:Password,
              userId:userId
            })
            .then(() => {
              console.log('User added!');
              navigation.navigate('Login');
            });
        }
       else
       {
        Alert.alert('Please Enter Correct Data');
       }
      };
      const validate=()=>{
        let isValid=true;
        if(name=="")
        {
            isValid=false;
        }
        if(email=='')
        {
            isValid=false;
        }
        if(mobile=='')
        {
            isValid=false;
        }
        if(Password=='')
        {
            isValid=false;
        }
        if(confirmPassword=='')
        {
            isValid=false;
        }
        if(Password!=confirmPassword)
        {
            isValid=false;
        }
        return isValid;
      }
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <TextInput
  style={[styles.input, { marginTop: 50 }]}
  placeholder='Enter name'
  value={name}
  onChangeText={txt => setName(txt)}
></TextInput>
<TextInput
  style={[styles.input, { marginTop: 20 }]}
  placeholder='Email'
  value={email}
  onChangeText={txt => setEmail(txt)}
></TextInput>
<TextInput
  style={[styles.input, { marginTop: 20 }]}
  placeholder='Phone'
  keyboardType='numeric'
  value={mobile}
  onChangeText={txt => setMobile(txt)}
></TextInput>
<TextInput
  style={[styles.input, { marginTop: 20 }]}
  placeholder='Password'
  value={Password}
  onChangeText={txt => setPassword(txt)}
></TextInput>
<TextInput
  style={[styles.input, { marginTop: 20 }]}
  placeholder='Confirm Password'
  value={confirmPassword}
  onChangeText={txt => setConfirmPassword(txt)}
></TextInput>
     <TouchableOpacity onPress={()=>{
        registerUser();
     }}>
        <View style={styles.btn}>
         <Text style={{color:'white',fontSize:20}}>Sign Up</Text>
        </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>{
        navigation.navigate('Login');
     }}>
        <Text style={styles.OrLogin}>or Login</Text>
     </TouchableOpacity>
    </View>
  )
}

export default SignUp

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