import axios from 'axios';
import { Alert } from 'react-native';
import React,{useEffect,useState} from 'react';
import { View, StyleSheet , Text, Button, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';


/*function Root() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  }
  
  function App() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Signup" component={Signup} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }*/

  

const Login=(props)=> {

   
    //const navigation = useNavigation();
    const [email, getEmail] = useState('');
    const [errormsg, setErrormsg] = useState("");
    const [password, getPassword] = useState('')
    const [successLogin, getLoginResult] = useState(false);
    const InputHandler = (inputTexts) =>{
        getInputText(inputTexts);
        console.log("User Input: ", inputText);
        //getInputText('no user input');
    }
    return (
        <View style = {styles.loginWrapper}>
            <Text style= {styles.textFields}>
                This is log in page.
            </Text>

            <View  style = {styles.formWrapper}>
                <Text style= {styles.textFields}>
                    Please enter your email.
                </Text>
                <TextInput style={styles.inputFields}
                    placeholder='Enter Email.'
                    onChangeText={text => getEmail(text)}/>
                <Text style= {styles.textFields}>
                    Please enter your password.
                </Text>
                <TextInput style={styles.inputFields}
                    secureTextEntry={true}
                    placeholder='Enter Password.'
                    onChangeText={text => getPassword(text)}/>
                    
                <TouchableOpacity 
                style={styles.loginButton}
                >
                    <Button 
                    title='Log In' 
                    onPress={()=>{

                        try {
                            fetch('http://a0aacac6c41a.ngrok.io/login', {
                                method: 'POST',
                                body: JSON.stringify({ 
                                    email,password
                                }),
                                headers: { 'Content-Type': 'application/json' },
                            }).then(function(response){
                               // console.log(response); // Will show you the status
                                //console.log(response.session);
                                return response.json();
                            }).then(async data=>{

                                console.log(data.token);
                                try{
                                    await AsyncStorage.setItem('token',data.token);
                                    //await MMKV.setStringAsync("token", data.token);
                                    //MMKV.set( data.token,'token')
                                    if(data.token!=null){
                                        //console.log( "token" +  MMKV.getString('token'));
                                        props.navigation.replace('Buildlist', { screen: 'BuildList' });
                                    }
                                    else{
                                        setErrormsg('Your credentials are incorrect! Please retry.');
                                    }
                                
                                }
                                catch(e){
                                    Alert.alert('Login Failed', 'Invalid Email or password');
                                    console.log("there is error"+e );
                                }
                                //console.log("dataaaa:: ", data.login);
                               /* if( (data.login) === ('success')){
                                    console.log(data.login);
                                    navigation.navigate('Home', { screen: 'Home' });
                                    console.log("Login is done");
        
                                };*/
                            });
 
                            //return (<View> <Text> Logged in </Text></View>)
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
        alignSelf:'center',
       width:"80%",
    },
    formWrapper:{
        
    },
    textFields:{
       padding:10,
       alignSelf:'center',
       fontSize:15,
      
       borderColor:'black',
       
    },
    inputFields:{
      padding:10,
      borderWidth:2,
      borderColor:'black',
      backgroundColor:"white", 
    },
    loginButton:{
      padding:15,
      width:'80%',
      alignSelf:'center',
    },
    errorFields:{
      
       
    }
})

export default Login;