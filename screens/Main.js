import { StyleSheet, Text, View, Image } from 'react-native';
import React ,{useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Setting from '../src/Tabs/Setting';
import Users from '../src/Tabs/Users';
const Main = () => {
  const [selectedTab,setSelectedTab]=useState(0);
  return (
    <View style={styles.container}>
      {selectedTab==0? <Users></Users> : <Setting></Setting>}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tab}
        onPress={()=>{
          setSelectedTab(0);
        }}
        >
          <Image source={require('../src/images/Users.png')} 
          style={[styles.tabIcon,{tintColor:selectedTab==0?'white':'black'}]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}
        onPress={()=>{
          setSelectedTab(1);
        }}
        >
          <Image source={require('../src/images/settings.png')} 
          style={[styles.tabIcon,{tintColor:selectedTab==1?'white':'black'}]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
});
