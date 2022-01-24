import React,{Component, useState,useContext} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableHighlight} from 'react-native';
import { Button, TextInput  } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import global from '../src/global';

const { width, height } = Dimensions.get('window');

function Login({ navigation }){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidUser, setValidUser] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const textInputChange = (val) => {
    if(!val.trim()|| val.length<3) {
        setUsername(val);
        setValidUser(true);
    } else {
      setUsername(val);
      setValidUser(false);
    }
}

const handlePasswordChange = (val) => {
  if(!val.trim()|| val.length<8) {
    setPassword(val);
    setValidPassword(true);
  }else{
    setPassword(val);
    setValidPassword(false);
  }
}

const onPress =() =>{loginAPI()}

async function loginAPI() {
  try{
      await fetch(global.ip+'/api/login',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({"username":username, "password":password})
    }).then(res=>res.json())
    .then(resData=>{
      if(!resData.token){
        alert(resData.message);
      }else{
        console.log(resData);
        setToken(resData.token);
        setId(JSON.stringify(resData.user.id));
      }
    })
    .catch((error) => {
      console.error(error);
  });
  }catch(e){
    console.log(e);
  }

  try{
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    await AsyncStorage.setItem('token',token);
    await AsyncStorage.setItem('id',id);
    navigation.navigate("Menu");
  }catch(e){
    console.log(e);
  }
  
}

    return(
      <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
      }}
    >
      <View style={{ ...StyleSheet.absoluteFill }}>
        <Image
          source={require('../../assets/bg.jpg')}
          style={{ flex: 1, height: null, width: null }}
        />
      </View>
      <Text style={styles.mainText}>Ez Queue</Text>
      <View style={styles.inputModal}>
        <Text style={styles.modalText}>LOGIN</Text>
        <TextInput
        style={styles.input}
        mode="outlined"
        label="Username"
        placeholder="Username"
        onChangeText={(val) => textInputChange(val)}
        />
         {isValidUser ? 
         <Animatable.View animation="lightSpeedIn" duration={500}>
           <Text style={styles.error}>Username must more than 4 characters!</Text>
         </Animatable.View>
               
                : null}
        <View style={styles.spacer}></View>
        <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        placeholder="Password"
        secureTextEntry
        onChangeText={(val) => handlePasswordChange(val)}
        right={<TextInput.Icon name="eye" />}
        />
        {isValidPassword ? 
        <Animatable.View animation="lightSpeedIn" duration={500}>
           <Text style={styles.error}>Password must more than 8 characters!</Text>
        </Animatable.View>
        : null}
      </View>
      <View style={{ height: height / 3, justifyContent: 'center'}} >
      <TouchableHighlight style={styles.radius} onPress={onPress}>
        <Button style={styles.button}  mode="contained" color="#1e3d59">
          LOGIN
        </Button>
      </TouchableHighlight>
      
      <TouchableHighlight  style={styles.radius} >
        <Button style={styles.button}  mode="contained" color="red">
          Forgot Password
        </Button>
      </TouchableHighlight>

      </View>
    </View>
    );
}
export default Login;
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderRadius:20
  },
  radius:{
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5
  },
  spacer:{
    marginBottom: 10,
  },
  inputModal:{
    borderRadius:20,
    backgroundColor:"white",
    flexDirection: 'column',
    opacity:0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    height:"auto",
    paddingTop:"5%",
    paddingBottom:"5%",
    margin: 5
  },
  input:{
    width:"95%",
  },
  mainText:{
    fontFamily: 'yellowTail',
    color:'white',
    fontSize: 80,
    textAlign:'center',
    paddingBottom:50
  },
  modalText:{
    fontWeight:'bold',
    fontSize:20
  },
  error:{
    color:'red',
    fontSize:15
  }

  });