import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Avatar  } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar } from 'react-native-paper';
import global from '../src/global';

function Profile({navigation}){
    const [id, setId] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [name, setName] = useState(null);
    const [nric, SetNric] = useState(null);
    const [email, setEmail] = useState(null);
    const [contact, setContact] = useState(null);
    const [status, setStatus] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const toHome = () => navigation.goBack();
    getData= async() =>{
        try{
            const tokenGet = await AsyncStorage.getItem('token');
            const idGet = await AsyncStorage.getItem('id');
            if(tokenGet !== null && idGet !== null){
                setUserToken(tokenGet);
                setId(idGet);
              }else{
                console.log("Failed");
              }
        }catch(e){
            console.log(e);
            console.log("Fail");
        }
    }
    
    async function getInfo(data) {
        try{
            await fetch(global.ip+'/api/user/profile/'+data,{
            method:'GET',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'Authorization': 'Bearer '+ userToken,
            },
          }).then(res=>res.json())
          .then(resData=>{
            if(resData.length>0){
              setName(resData[0].name);
              setEmail(resData[0].email);
              SetNric(resData[0].nric);
              setContact(resData[0].contact);
              setStatus(resData[0].status);
              setLoading(false);
            }else{
                
            }
          })
          .catch((error) => {
            console.error(error);
            console.log("Fail");
        });
        }catch(e){
          console.log(e);
        }
    }

    useEffect(() => {
        getData(); 
        getInfo(id);
      }, []);

    if(isLoading){
        getInfo(id);
        return(
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
                    <Appbar.Content title="Profile"/>
                </Appbar.Header>
                <Text>Loading......</Text>     
            </View>
        )
    }else if(!isLoading){
        return(
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                    <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
                    <Appbar.Content title="Profile"/>
                </Appbar.Header>
                <View style={styles.profileIcon}>
                    <Avatar.Icon size={150} icon="account"/>
                </View>
                <Card style={styles.cardCon}>
                    <Text style={[styles.cardText, {fontWeight:'200', fontSize:36}]}>{name}</Text>
                    <Text style={[styles.cardText, {color:'#AEB5BC', fontSize:14}]}>Customer</Text>
                    <Text style={[styles.cardText, {color:'limegreen', fontSize:14}]}>{status===1 ? 'Active': 'Banned'}</Text>  
                </Card> 
                <Card style={styles.cardCon}>
                    <View style={styles.infoCon}>
                        <Avatar.Icon style={styles.infoAvatar} size={25} icon="phone"/>
                        <Text style={[styles.cardText, {color:'black', fontSize:18}]}>{contact}</Text>
                    </View>
                    <View style={styles.infoCon}>
                        <Avatar.Icon style={styles.infoAvatar} size={25} icon="card-account-details"/>
                        <Text style={[styles.cardText, {color:'black', fontSize:18}]}>{nric}</Text>
                    </View>
                    <View style={styles.infoCon}>
                        <Avatar.Icon style={styles.infoAvatar} size={25} icon="email"/>
                        <Text style={[styles.cardText, {color:'black', fontSize:18}]}>{email}</Text>
                    </View>
                </Card>
            </View>
        )
    }  

    
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
        fontWeight:'bold',
        alignItems:'center',
        justifyContent: 'center',
        textAlignVertical:'center'
    },
    card:{
        borderRadius:30,
        padding:5,
        opacity:.5,
    },
    profileIcon:{
        textAlign:'center',
        alignItems:'center',
        paddingTop:20,
        paddingBottom:20,
    },
    infoCon:{
        flexDirection: 'row',
        textAlign:'center',
        alignItems:'center',
        justifyContent: 'center',
        textAlignVertical:'center'
    },
    infoAvatar:{
        marginTop:10,
        marginRight: 20,
        alignItems:'center',
        justifyContent: 'center',
        textAlignVertical:'center'
    },
    infoText:{
        alignItems:'center',
        justifyContent: 'center',
        textAlignVertical:'center'
    },
    cardCon:{
        borderRadius:10,
        margin:10,
        padding:15,
        alignItems:'center',
        justifyContent: 'center',
        textAlign:'center'
    }
  });