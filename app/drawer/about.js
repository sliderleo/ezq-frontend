import * as React from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import {Appbar,Paragraph,Button  } from 'react-native-paper';
import global from '../src/global';

function About({navigation}){
    const toHome = () => navigation.goBack();
    const toWeb = () =>{
        Linking.openURL('http://192.168.1.105:8000/message')
    }
    return(
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
                <Appbar.Content title="About Us"/>
            </Appbar.Header>
            <View style={styles.logo_con}>
            <Image
                style={styles.logo}
                source={{ uri:"https://i.imgur.com/u8wuTdW.png"}}
            />
            </View>  
            <View style={styles.word_con}>
                <Paragraph>Easy Queue (EzQ) is a self-chekout system that act as a platform, anyone can join us! Learn more about us and follow us on our social media! </Paragraph>   
            </View>

            <View style={styles.social_btn_con}>
                <Button style={styles.social_btn} icon="facebook" mode="contained" color='#3b5998' onPress={() => console.log('Pressed')}>
                    Like our page
                </Button>
                <Button style={styles.social_btn} icon="instagram" mode="contained" color='#dd2a7b' onPress={() => console.log('Pressed')}>
                    Follow Us
                </Button>
                <Button style={styles.social_btn} icon="web" mode="contained" color='#1e3d59' onPress={toWeb}>
                    Contact Us on Our Website
                </Button>
            </View>
        </View>
    )
}

export default About;
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
  