import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar } from 'react-native-paper';

function Profile({navigation}){
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const toHome = () => navigation.navigate('Menu');
    getData= async() =>{
        try{
          const tokenGet = await AsyncStorage.getItem('token');
          const idGet = await AsyncStorage.getItem('id');
          if(tokenGet !== null && idGet !== null){
            setToken(tokenGet);
            setId(idGet);
            console.log(tokenGet+"-------"+idGet);
          }else{
              console.log("Fail");
          }
        }catch(e){
          console.log(e);
          console.log("Fail");
        }
      }  
    useEffect(() => {
        getData(); 
      }, []);

      

    return(
        <View style={styles.container}>
        <Appbar.Header style={styles.header}>
            <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
            <Appbar.Content title="Profile"/>
        </Appbar.Header>

        </View>
    )
}



export default Profile;
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        backgroundColor:'#1e3d59'
    },
    carouselImg:{
        paddingTop:5,
        alignItems:'center'
    },
    functionsBar:{
        padding:5,
        alignItems:'center',
        marginTop:10,
        flexDirection:'row',
        justifyContent: 'center',
        borderRadius:100
    },
    cardButton:{
        height:100,
        width:100,
        justifyContent: 'center',
        alignItems:'center'
    },
    cardText:{
        textAlign:'center',
        fontSize:15,
        paddingTop:7,
        fontWeight:'bold'
    },
    card:{
        borderRadius:30,
        padding:5,
        opacity:.5,
    }
  });