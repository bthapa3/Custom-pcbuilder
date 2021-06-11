import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput,Clipboard, Image,TouchableOpacity, Modal,Pressable, Button, TouchableHighlight,ToastAndroid,
    Platform,
    AlertIOS} from 'react-native';
import { WebView } from 'react-native-webview';
const cheerio = require('react-native-cheerio');
const axios=require('axios');
import  AsyncStorage  from '@react-native-async-storage/async-storage';
//import {Clipboard} from '@react-native-community/clipboard';  


const Parts = (props,navigation)=>{

    const [currentURL,setcurrentURL]=useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [webPageVisible,setWebPageVisible]=useState(false);
    const [purchaseLink,setpurchaseLink]=useState('');
    const [price, setprice] = useState('Please add '+ props.text );
    const [currentWebsite,setcurrentWebsite]=useState("None");
    const [canGoBack,setCanGoBack]=useState(false);
    const [canGoForward,setCanGoForward]=useState(false);
     
    function notifyMessage( msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            AlertIOS.alert(msg);
        }
      }
    async function Checkprice(url,website){
        console.log("url"+url);
       
        await axios.get(url)
         .then(async res=>{

            const $ = await cheerio.load(res.data);
            //console.log(res.data);
            if(currentWebsite=='amazon'){
                //scraping the price of item based on the class and id value of website
                const price=await $("#price_inside_buybox").text().replace("$", "");
                //this gets the price of the item from scraping the amazon website
                setprice("Price of chosen item: $"+ price);
                //setcurrentWebsite(itemname);
                await AsyncStorage.setItem(props.text,price);
            }
            else if(currentWebsite=='walmart'){
                const price=await $(".price-characteristic","#price").first().text().replace("$", "");
                console.log("walmart"+ price);
                //this gets the price of the item from scraping the amazon website
                setprice("Price of chosen item: $"+price);
                await AsyncStorage.setItem(props.text,price);
            }
            else if(currentWebsite=='newegg'){
                const price=await $(".price-current").first().text().replace("$", "");
                console.log("newegg"+ price);
                //this gets the price of the item from scraping the amazon website
                setprice("Price of chosen item: $"+price);
                console.log("itemname"+itemname);
                await AsyncStorage.setItem(props.text,price);
            }
            else if(currentWebsite=='microcenter'){
                const price=await $("#pricing").text().replace("$", "");
                console.log("microcenter"+ price);
                //this gets the price of the item from scraping the amazon website
                setprice("Price of chosen item: $"+price);
                await AsyncStorage.setItem(props.text,price);
               
            }
         })
        
    
    }
    return(
        
       
        <View style={styles.partsWrapper}>
            <Modal
                style={styles.webpageWrapper}
                //animationType="slide"
                transparent={true}
                visible={webPageVisible}
                onRequestClose={() => {
                //Alert.alert("Modal has been closed.");
                setWebPageVisible(false);
                }}> 
                {
               }
                <View style={styles.webpageContent}>

                <View style={{flexDirection:'row'}}>
               <Text style={styles.topText}>
                                Select the item you want to purchase:
                            </Text> 
                            
                            <TouchableHighlight style={styles.buttons}>
                            <Button title="Save " onPress={() => {
                                 setpurchaseLink(currentURL);
                                 Checkprice(currentURL);
                                 setWebPageVisible(false);
                                }}
                                 >
                            </Button>
                        </TouchableHighlight>
                           
                    <Pressable onPress={()=>setWebPageVisible(false)}>
                                <Text style={styles.modalClose}>X</Text>
                            </Pressable>
                </View>
                
                <WebView
                   
                    
                    source={{ uri: currentURL }}
                    style={{ marginTop: 20 }}
                    javaScriptEnabled = {true}
                    domStorageEnabled = {true}
                    onNavigationStateChange={navState=>{
                     setcurrentURL(navState.url);
                    }}

                />
                </View> 
            </Modal>


            <Modal
                style={styles.modalWrapper}
                //animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                //Alert.alert("Modal has been closed.");
                setModalVisible(false);
                }}>     

                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                        Please select from stores below.
                    </Text>
                    <Pressable onPress={()=>setModalVisible(false)}>
                        <Text style={styles.modalClose}>X</Text>

                    </Pressable>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight style={styles.buttons}>
                            <Button title="Go to walmart " onPress={() => {
                                setcurrentURL('https://www.walmart.com/')
                                setWebPageVisible(true);
                                setModalVisible(false);
                                setcurrentWebsite('walmart');
                                }}>
                            </Button>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.buttons}>
                            <Button title="Go to NewEgg " onPress={() => {
                                setcurrentURL('https://www.newegg.com/');
                                setWebPageVisible(true);
                                setModalVisible(false)
                                setcurrentWebsite('newegg');
                            }}>
                            </Button>
                        </TouchableHighlight>
                        
                        <TouchableHighlight style={styles.buttons}>
                            <Button title="Go to MicroCenter " onPress={() => {
                                setcurrentURL('https://www.microcenter.com/')  
                                setWebPageVisible(true);
                                setModalVisible(false);
                                setcurrentWebsite('microcenter');
                                }}>
                            </Button>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.buttons}>
                            <Button title="Go to Amazon " onPress={() => {
                                setcurrentURL('https://www.amazon.com/');
                                setWebPageVisible(true);
                                setModalVisible(false);
                                setcurrentWebsite('amazon');
                                }}>
                            </Button>
                        </TouchableHighlight>

                         
                        
                        
                    </View>
                    
                </View>
                
            </Modal>
            
            
            <View style={styles.itemLeft}>
                <Text style={styles.partName}>{props.text}</Text>                
            </View>
            <View style={styles.itemMid}>
                <View style={{flexDirection:'row'}}>
                <TextInput style={styles.inputLinks}
                placeholder='Purchase link for Product'>
                   
                    { currentWebsite} Link present

                    </TextInput>
                    <TouchableOpacity onPress={() => {Clipboard.setString(purchaseLink);notifyMessage('Link Copied');}
                        } style={{alignSelf:'center',backgroundColor:'blue',borderRadius:10}}>
                        <Text style={{color: 'red', fontSize: 14,  textAlign: 'center', marginTop: 5, marginLeft: 10,marginRight:10, marginBottom: 17}}> 
                            Copy Link
                        </Text>
        
                    </TouchableOpacity>

                </View>
                <TextInput > {price}</TextInput>
            </View>
            <View style={styles.iconHolder}>
                <Pressable 
                onPress = {()=>setModalVisible(true)}>
                    <Image 
                    style={styles.plusIcon}
                    source = {require('./plus.png')}
                    />
                </Pressable>    
            </View> 
             
        </View>
      
      
    )
}

const styles = StyleSheet.create({
    partsWrapper:{
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 15,
    },
    buttonContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
     },
    buttons:{
        //width:'400',
        //height:'100',
        //padding:10,
        marginBottom: 10

    },

    itemLeft:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: '30%'
        //maxWidth: '15%'
    },
    partName:{
        width: '95%',
        height: 'auto',
        borderRadius: 5,
        backgroundColor: '#46CEA5',
        opacity: 0.5,
        textAlign: 'center',
        padding: 2,
        marginRight: 15,
    },
    itemMid:{
        width: '60%'
    },
    inputLinks:{
        //maxWidth: '80%',
        //minWidth: '20%',
        width: '60%'
        
    },
    iconHolder:{
        width:40,
        height: 40,
        maxWidth: '10%'
    },
    plusIcon:{
        width: 40,
        height: 40,
    },

    modalWrapper:{

        //padding: 50,
        //width: '90%'
    },
    modalContent:{
        height:'100%',
        width:'100%',
        marginTop:180,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#BC8F8F',
        justifyContent: 'space-between',
        borderRadius: 5,
    },
    modalText:{
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth: '80%',
        marginBottom: 20
    },
    topText:{
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
        maxWidth: '80%',
        marginBottom: 0
    },
    modalClose:{
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#000',
       fontSize:20,
       marginLeft:20,
        color: '#fff',
        textAlign: 'center',
        
    },
    webpageWrapper:{
        flexDirection:"column",
        height:'100%',
        width:'100%',
        backgroundColor: '#BC8F8F',
        //padding: 50,
        //width: '90%'
    },
    webpageContent:{
        height:'100%',
        width:'100%',
        marginTop:0,
        padding: 10,
        backgroundColor: '#BC8F8F',
        borderRadius: 5,
        flexDirection:'column'
    }
});

export default Parts;