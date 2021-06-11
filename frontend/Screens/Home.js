import React,{useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView, Button } from 'react-native';
import Parts from '../components/parts'
import  AsyncStorage  from '@react-native-async-storage/async-storage';
//import { AsyncStorage } from 'react-native';
//import { MMKV } from 'react-native-mmkv';

function Home(props) {
 // const MMKV = new MMKVStorage.Loader().initialize();
  const [email,setEmail] = useState("loading")
  const [cost,setCost] = useState(0);
  const Boiler = async ()=>{
    const token = await AsyncStorage.getItem('token');
    fetch('http://a0aacac6c41a.ngrok.io/',{
      headers:new Headers({
        Authorization:"Bearer "+token
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      setEmail(data.email)
    })
  }
  const SavetoDatabase=async()=>{

    const CPUprice= await AsyncStorage.getItem('CPU');
    const RAMprice= await AsyncStorage.getItem('RAM');
    const Coolerprice= await AsyncStorage.getItem('Cooler');
    const Motherboardprice= await AsyncStorage.getItem('Motherboard');
    const GPUprice= await AsyncStorage.getItem('GPU');
    const PSUprice= await AsyncStorage.getItem('Power Supply Unit');
    const Caseprice= await AsyncStorage.getItem('Case');
    const RGBLightsprice= await AsyncStorage.getItem('RGB Lights');
    const SSDprice= await AsyncStorage.getItem('Solid State Drive');
    const HDDprice= await AsyncStorage.getItem('Hard Disk Drive');
  }
  
  useEffect(()=>{
    Boiler();
  },[])

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {/*PC Build home page */ }
            <View style={{flexDirection:'row'}}>
            <Text style={styles.heading}>Welcome Home, {email}</Text>
            <Button onPress={() => { SavetoDatabase(); }} title="Save"  > </Button>
            </View>
            
            <View style={styles.homePageWrapper}>
                <Text style={styles.heading}>Choose your PC build parts below:</Text>
                <ScrollView >
                   
                    <Parts text={'CPU'}/>
                    <Parts text={'RAM'}/>
                    <Parts text={'Cooler'}/>
                    <Parts text={'Motherboard'}/>
                    <Parts text={'GPU'}/>
                    <Parts text={'Power Supply Unit'}/>
                    <Parts text={'Case'}/>
                    <Parts text={'RGB Lights'}/>
                    <Parts text={'Solid State Drive'}/>
                    <Parts text={'Hard Disk Drive'}/>
                    

                </ScrollView>

                
            </View>
            <Text> Total Cost  {cost}</Text>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
      
     
    },
    homePageWrapper: {
      height:'90%',
    },
    heading:{
  
      marginBottom:0,
      padding:5,
      fontSize:15,
     
    },
    ScrollView:{
      marginTop:0,
      padding:0
    }
  });