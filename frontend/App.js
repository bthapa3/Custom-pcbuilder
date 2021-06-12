import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Parts from './components/parts'
import Login from './Screens/Login'
import Signup from './Screens/Signup'
import Home from './Screens/Home'
import Buildlist from './Screens/Buildlist';

import  AsyncStorage  from '@react-native-async-storage/async-storage';

//should be using this for future versions 
//but this doesnot work with expo cli.
//import  AsyncStorage  from '@react-native-community/async-storage';
//import { AsyncStorage } from 'react-native';


//following line of code is deprecated.
//import  {AsyncStorage}  from 'react-native';

const Stack = createStackNavigator();

const home = ({ navigation }) => {

  const logout =async (navigation)=>{
    AsyncStorage.removeItem("token").then(()=>{
      navigation.replace("Login");
    })
    console.log("token after logout" + await AsyncStorage.getItem('token'));
    
  }

  return (
    /*<View style={styles.container}>
      <StatusBar style="auto" />
      {/*PC Build home page  }
      <View style={styles.homePageWrapper}>
        <Text style={styles.heading}>PC Builder</Text>
        <View style={styles.items}>
          {/*This is where all the PC parts list will go }
          <Parts text={'CPU'}/>
          <Parts text={'RAM'}/>
          <Parts text={'Cooler'}/>
          <Parts text={'Keyboard'}/>
        </View>
      </View>
      <Button
      title="Login"
      onPress={() =>
        navigation.navigate('Login')
      }
      />
    </View>*/
    <View>
     
     <TouchableOpacity style={styles.logoutButton}>
        <Button
        title="Logout"
        onPress={() =>
        logout(navigation)
        }
        />
      </TouchableOpacity>  
      <Home></Home>
     
      
    </View>
    
  );
};
const login = ({ navigation })=>{
  return(
    <View>
      <Login style={styles.pages}/>
      <TouchableOpacity style={styles.navButtons}>
        <Button
          title="Do not have an account? Go to Signup"
          onPress={() =>
          navigation.replace('Signup')}
        />
      </TouchableOpacity>
     
    </View>
    
  )
}
  const signup = ({navigation})=>{
    return (
      <View>      
        <Signup style={styles.pages}/>

        <TouchableOpacity style={styles.navButtons}>
          <Button
            title="Already have an account?Go to Login"
            onPress={() => navigation.replace('Login')}
          />
      </TouchableOpacity>

      
     
    </View>
    )
  }
  const buildlist=({navigation})=>{

    const logout =async (navigation)=>{
      AsyncStorage.removeItem("token").then(()=>{
        navigation.replace("Login");
      })
      console.log("token after logout" + await AsyncStorage.getItem('token'));
      
    }
    return(
      <View>
        <TouchableOpacity style={styles.navButtons}>
          <Button
            title="Logout"
            onPress={() =>logout(navigation)}
          />
        </TouchableOpacity> 
        <Buildlist style={styles.pages} />
       

      </View>

    )

  }
  /* <Button
      style={styles.navButtons} 
      title="Home"
      onPress={() =>
      navigation.navigate('MainPage')}
      /> */


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        
        <Stack.Screen 
        name= "Login"
        component={Login}/>
        
        <Stack.Screen
        name="Signup"
        component = {Signup}/>

        <Stack.Screen
        name="Buildlist"
        component={Buildlist}/>

        <Stack.Screen 
        name= "Home"
        component={Home}/>

        

      </Stack.Navigator>
    </NavigationContainer>
    /*<View style={styles.container}>
      <StatusBar style="auto" />
      //{/*PC Build home page }
      <View style={styles.homePageWrapper}>
        <Text style={styles.heading}>PC Builder</Text>
        <View style={styles.items}>
          {/*This is where all the PC parts list will go}
          <Parts text={'CPU'}/>
          <Parts text={'RAM'}/>
          <Parts text={'Cooler'}/>
          <Parts text={'Keyboard'}/>
        </View>
      </View>
    </View>*/
  );
} 

const styles = StyleSheet.create({
  container: {
    
  },
  homePageWrapper: {
    
  },
  heading: {
   
  },
  navButtons:{
    
  
  },
  logoutButton:{
    
  },
  pages:{
   
  }
});