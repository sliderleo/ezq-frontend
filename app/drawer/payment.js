import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, Linking  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar,Paragraph,Button  } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import global from '../src/global';
import StripeApp from '../src/StripeApp';
import {StripeProvider} from "@stripe/stripe-react-native"
function Payment({route,navigation}){
    const toCart = () => navigation.goBack();
    const toMainMenu = () => navigation.navigate('Menu');
    const toWeb = () =>{
        Linking.openURL('http://192.168.1.105:8000/message')
    }
    const { price } = route.params;
    const [userId,setUserId]=useState(null);
    const [storeId,setStoreId]=useState(null);
    const [storeName,setStoreName]=useState(null);

    useEffect(() => {
        getData();
    }, []);

    getData= async() =>{
        try{
            const userId = await AsyncStorage.getItem('id');
            const storeNGet = await AsyncStorage.getItem('storeName');
            const storeIDGet = await AsyncStorage.getItem('storeId');
            let storeNametry=storeNGet+" (Easy Queue)"
            setStoreName(storeNametry);
            setStoreId(storeIDGet);
            setUserId(userId);
        }catch(e){
            console.log(e);
            console.log("Fail");
        }
      }

    return(
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="keyboard-backspace" onPress={toCart}/>
                <Appbar.Content title="Payment Method"/>
                <Appbar.Action icon="face-agent" onPress={toWeb}/>
                <Appbar.Action icon="close" onPress={toMainMenu}/>
            </Appbar.Header>
            <WebView
                source={{
                uri: 'http://192.168.1.105:8000/payment'+'/'+price+'/'+storeName+'/'+userId+'/'+storeId
                }}
            />
        </View>
    )
}

export default Payment;
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        backgroundColor:'#1e3d59'
    },
    logo: {
        width: 190,
        height: 190,
    },
    logo_con:{
        textAlign:'center',
        alignItems:'center',
        paddingTop:20,
        paddingBottom:20,
    },
    social_btn_con:{
        margin:10
    },
    social_btn:{
        marginBottom:5
    },
    word_con:{
        margin:20
    },cardButton:{
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
    },
  });
  