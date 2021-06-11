import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
import { View, StyleSheet , Text, Button, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
//import  AsyncStorage  from '@react-native-async-storage/async-storage';
//import { AsyncStorage } from 'react-native';


const Signup=()=> {

    const navigation = useNavigation();
    //console.log("loggin being called?")
    const [errormsg, setErrormsg] = useState("");
    const [email, getEmail] = useState('Email input by user.');
    const [password, getPassword] = useState('Password input by user')
    const [fullname, getFullname] = useState('full name input by user')
    const InputHandler = (inputTexts) =>{
        getInputText(inputTexts);
        console.log("User Input: ", inputText);
        //getInputText('no user input');
    }
    return (
        <View style = {styles.loginWrapper}>
            <Text style={styles.textFields}>
                This is Signup page.
            </Text>
            <View  style = {styles.formWrapper}>
                <Text style= {styles.textFields}>
                    Please enter your full name.
                </Text>
                <TextInput style={styles.inputFields}
                    placeholder='Enter Full Name'
                    onChangeText={text => getFullname(text)}/>
                <Text style= {styles.textFields}>
                    Please enter your email.
                </Text>
                <TextInput style={styles.inputFields}
                    placeholder='Enter Email.'
                    onChangeText={text => getEmail(text)}/>
                <Text style= {styles.textFields}
                >
                        Please enter your password.
                </Text>
                <TextInput style={styles.inputFields}
                    placeholder='Enter Password.'
                    secureTextEntry={true}
                    onChangeText={text => getPassword(text)}/>
                    
                <TouchableOpacity 
                style={styles.loginButton}
                >
                    <Button 
                    title='Sign Up' 
                    onPress={()=>{


                        /*var url = 'http://localhost:3000/login';
                        axios.post(url, {
                            email:Email,
                            password:Password,
                        })
                        .then(function (response) {
                            console.log("no error till here");
                        })
                        .catch(function (error) {
                            console.log("error encountered"+ error);
                        });*/

                        try {
                            fetch('http://a0aacac6c41a.ngrok.io/signup', {
                                method: 'POST',
                                body: JSON.stringify({ 
                                    email,password,fullname
                                }),
                                headers: { 'Content-Type': 'application/json' },
                            }).then(function(response) {
                                console.log(response.status); // Will show you the status
                                if (!response.ok) {
                                    throw new Error("HTTP status " + response.status);
                                }
                                return response.json();
                            })
                            .then(async data => {
                                try{
                                    console.log("token"+ data.token);
                                    if(data.token!=null){
                                       // MMKV.set('token', data.token);
                                        // await MMKV.setStringAsync("token", data.token);
                                       // await AsyncStorage.setItem('token',data.token);
                                        navigation.replace('Home', { screen: 'Home' });

                                    }
                                    else{
                                        Alert.alert('Signup Failed', 'Please enter valid credentials');
                                    }


                                }
                                catch(err){
                                    console.log("error here"+ err);
                                }
                         
                            });

    
                            console.log("Awaited and tried")
                        } catch (err) {
                            console.error(err);
                            setErrMsg('Something went wrong!');
                        }
                        const book = {
                            email,
                            password
                        };
                    }}
                    />
                </TouchableOpacity>
                <Text style={styles.errorFields}> 
                        {errormsg}
                </Text>    
            </View>
            
               
        </View>
    );
}

const styles = StyleSheet.create({
    loginWrapper:{
        padding:10,
        width:"80%",
        alignSelf:'center'
    },
    formWrapper:{
     
    },
    textFields:{
        padding:10,
        alignSelf:'center',
        fontSize:15,
        
    },
    inputFields:{
      padding:10,
      borderWidth:2,
      borderColor:'black',
      backgroundColor:"white", 
    },
    loginButton:{
        width:'80%',
        alignSelf:'center',
        padding:10,
        marginTop:20
    },
    errorFields:{
      
    }  

})

export default Signup;