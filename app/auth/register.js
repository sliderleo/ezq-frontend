import React,{useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableHighlight, ScrollView} from 'react-native';
import { Button, TextInput  } from 'react-native-paper';
import global from '../src/global';

function Register(){
  const submit = () => submitAPI();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nric, setNric] = useState("");
  const [contact, setContact] = useState("");

  const [isValidUsername, setValidUsername] = useState(false);
  const [isValidPass, setValidPassword] = useState(false);
  const [isValidConPass, setValidConPassword] = useState(false);
  const [isValidName, setValidName] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidNric, setValidNric] = useState(false);
  const [isValidContact, setValidContact] = useState(false);
  
  async function submitAPI() {
    try{
        await fetch(global.ip+'/api/register',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({"username":username, "password":password, "password_confirmation":password_confirmation, "name":name, "email":email, "nric":nric, "contact":contact})
      }).then(res=>res.json())
      .then(resData=>{
        
      })
      .catch((error) => {
        console.error(error);
    });
    }catch(e){
      console.log(e);
    }
  }

  const emailChange = (val) => {
    const regx = /^([A-Za-z0-9_\-\]+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(regx.test(val)) {
       setEmail(val);
       setValidEmail(false);
    } else {
      setEmail(val);
      setValidEmail(true);
    }
  }

  const usernameChange = (val) => {
    if(!val.trim()|| val.length<3) {
        setUsername(val);
        setValidUsername(true);
    } else {
      setUsername(val);
      setValidUsername(false);
    }
  }

  const nameChange = (val) => {
    if(!val.trim()|| val.length<3) {
       setName(val);
       setValidName(true);
    } else {
      setName(val);
      setValidName(false);
    }
  }

const passwordChange = (val) => {
  if(!val.trim()|| val.length<8) {
    setPassword(val);
    setValidPassword(true);
  }else{
    setPassword(val);
    setValidPassword(false);
  }
   
}

const conPasswordChange = (val) => {
  if(password !== password_confirmation) {
    setConPassword(val);
    setValidConPassword(false);
  }else{
    setConPassword(val);
    setValidConPassword(true);
  }
   
}
const contactChange = (val) => {
  const regx = /^[0-9]*$/;
  if(val.length <= 11 && regx.test(val) && val.trim()) {
   setContact(val);
   setValidContact(false);
  }else{
    setContact(val);
    setValidContact(false);
  }
   
}
const nricChange = (val) => {
  const regx = /^[0-9]*$/;
  if(val.length == 12 && regx.test(val)) {
    setNric(val);
    setValidNric(false);
  }else{
    setNric(val);
    setValidNric(true);
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

      <View style={{height:"65%"}}>
      <ScrollView style={styles.inputModal} >
        <Text style={styles.modalText}>REGISTER</Text>
        <TextInput
        style={styles.input}
        mode="outlined"
        label="Username"
        placeholder="Username"
        value={username}
        onChangeText={value=> usernameChange(value)}
        />
        {isValidUsername ? 
          <Text style={styles.error}>Username must more than 4 characters!</Text>
         : null}
        <View style={styles.spacer}></View>
        <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={value=> passwordChange(value)}
        />
        {isValidPass ? 
          <Text style={styles.error}>Password must more than 8 characters!</Text>
         : null}
        <View style={styles.spacer}></View>
        <TextInput
        style={styles.input}
        mode="outlined"
        label="Confirm Password"
        placeholder="Confirm Password"
        secureTextEntry
        value={password_confirmation}
        onChangeText={value=> conPasswordChange(value)}
        />
        {isValidConPass ? 
          <Text style={styles.error}>Password does not match!</Text>
         : null}
        <View style={styles.spacer}></View>
        <TextInput
        style={styles.input}
        mode="outlined"
        label="Name"
        placeholder="Your name"
        value={name}
        onChangeText={value=> nameChange(value)}
        />    
        {isValidName ? 
          <Text style={styles.error}>Name must more than 4 characters!</Text>
         : null}
        <View style={styles.spacer}></View>
        <TextInput
        style={styles.input}
        autoCapitalize="none"
        mode="outlined"
        label="Email"
        placeholder="example@email.com"
        onChangeText={value=> emailChange(value)}
        />
         {isValidEmail ? 
          <Text style={styles.error}>Follow this format exmpl@email.com</Text>
         : null}
        <View style={styles.spacer}></View>
        <TextInput
        style={styles.input}
        mode="outlined"
        label="NRIC"
        placeholder="NRIC"
        keyboardType="number-pad"
        value={nric}
        onChangeText={value=> nricChange(value,'nric')}
        />
         {isValidNric ? 
          <Text style={styles.error}>NRIC must have 12 numbers without dash</Text>
         : null}
        <View style={styles.spacer}></View>
        <TextInput
        style={styles.input}
        mode="outlined"
        label="Contact"
        placeholder="Contact Number"
        keyboardType="number-pad"
        value={contact}
        onChangeText={value=> contactChange(value,'contact')}
        />
        {isValidContact ? 
          <Text style={styles.error}>Contact format is 01XXXXXXXXX</Text>
         : null}
        <View style={styles.spacer}></View>
        <View style={styles.spacer}></View>
      </ScrollView></View>
      
      <View style={{ justifyContent: 'center'}} >
      <TouchableHighlight style={styles.radius} onPress={submit}>
        <Button style={styles.button}  mode="contained" color="#1e3d59">
          Register
        </Button>
      </TouchableHighlight>
      
      <TouchableHighlight  style={styles.radius} >
        <Button style={styles.button}  mode="contained" color="red">
          Cancel
        </Button>
      </TouchableHighlight>

      </View>
    </View>
    
      );
    }

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
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
    borderRadius:10,
    backgroundColor:"white",
    opacity:0.95,
    padding:10,
    margin: 5,
    marginHorizontal:10,
    height:80
  },
  input:{
    width:"auto",
  },
  drop:{
    width:"10%",
  },
  mainText:{
    fontFamily: 'yellowTail',
    color:'white',
    fontSize: 70,
    textAlign:'center',
  },
  modalText:{
    fontWeight:'bold',
    fontSize:20,
    color:'black',
    textAlign:'center',
  },
  error:{
    color:'red',
    fontSize:15,
    textAlign:'center'
  }

  });