import React,{useEffect,useState} from 'react';
import { View ,Text,Button,Modal,StyleSheet,Pressable} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const Buildlist=props=>  {
console.log("Asv:" ,JSON.stringify(props));
//const navigation = useNavigation();
const [buildname,setbuildname]=useState('');
const [modalVisible,setmodalVisible]=useState(false);
return(
    <View> 
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setmodalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Build Name</Text>
              <TextInput placeholder="enter buildname" 
                    style={{ 
                        width:'100%',
                        padding:10,
                        borderWidth:2,
                        borderColor:'black',
                        backgroundColor:"white",
                        marginBottom:10 }} 
                        onChangeText={text => setbuildname(text)}
              > </TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={ async () => {
                    console.log("build:" + buildname);    
                    setmodalVisible(false);
                    await AsyncStorage.setItem('buildname',buildname);
                    // console.log(navigation);
                    props.navigation.replace('Home',{"buildname": buildname});
                    // const buildname=AsyncStorage.getItem('buildname');
                    //console.log("set"+buildname);         
                }}
              >
                <Text style={styles.textStyle}>Create new Build</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
            <Text>This is a main page</Text>
            <Button onPress={()=>{
                        console.log("Go to this build")
                        setmodalVisible(true);
                    }} title="Go to Build"/>
            <ScrollView>
                    <Text>Name of the build</Text>
                    
            </ScrollView>
            
    </View>

  
);

}



const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      width:'80%',
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {  
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });




export default Buildlist;