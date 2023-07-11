import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal } from 'react-native/Libraries/Modal/Modal'
const Loader = () => {
  return (
    <Modal visible transparent>
   <View style={styles.modalView}>
   
   <View style={styles.maniView}>
   <ActivityIndicator size={'large'}></ActivityIndicator>
   </View>
    </View>
    </Modal>
    
  )
}

export default Loader

const styles = StyleSheet.create({
    modalView:{
   width:Dimensions.get('window').width,
   height:Dimensions.get('window').height,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:'rgba(0,0,0.6)',
    },
    maniView:{
    width:100,
    height:100,
    borderRadius:50,
    justifyContent:'center',
    alignContent:'center'
    }
})