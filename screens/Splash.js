import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000);
  }, []);
const checkLogin=async()=>{
const id =await AsyncStorage.getItem("USERID");
if(id!=null)
{
  navigation.navigate('Main');
}
else
{
  navigation.navigate('Login');
}
}
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center', // Changed 'alignContent' to 'alignItems'
  },
  logo: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
});
