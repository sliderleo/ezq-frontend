import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar } from 'react-native-paper';
import global from '../src/global';
import { StackActions, NavigationActions } from 'react-navigation';
import {useNavigation} from '@react-navigation/native';
function CheckIn({navigation}){
    const [userToken, setUserToken] = useState(null);
    const [hasPermission,setHasPermission]=useState(null);
    const [scanned,setScanned]=useState(false);
    const[text,setText]=useState('');
    const[storeId,setStoreId]=useState(null);
    const[storeName,setStoreName]=useState(null);
    const toHome = () => navigation.goBack();
    const checkIn =()=>{
      submitAPI();
      navigation.navigate('StoreView')};
    
    
    async function submitAPI(data) {
      try{
          await fetch(global.ip+'/api/store/search/'+data,{
          method:'GET',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+ userToken,
          },
        }).then(res=>res.json())
        .then(resData=>{
          if(resData.length>0){
            const storeData = resData[0];
            setStoreName(storeData.name);
            saveStore();
          }else{
            setStoreName("Not Found!");
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

    saveStore = async() =>{
        try{
          await AsyncStorage.setItem('storeName',storeName);
          await AsyncStorage.setItem('storeId',storeId);
        }catch(e){
          console.log(e);
        }
    
    }

    getToken= async() =>{
      try{
        const tokenGet = await AsyncStorage.getItem('token');
        if(tokenGet !== null){
          setUserToken(tokenGet);
        }
      }catch(e){
        console.log(e);
        console.log("fail");
      }
    }

    const askForCameraPermission = () => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })()
    }

    useEffect(() => {
      getToken();
      askForCameraPermission();
      }, []);

    const handleBarCodeScanned=({type,data})=>{
        setScanned(true);
        setStoreId(data);
        submitAPI(data);
        //console.log('Type: '+type+'\nData: '+data);
    }

    if(hasPermission === null){
        return(
          <View style={styles.mainContainer}>
            <Appbar.Header style={styles.header}>
              <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
              <Appbar.Content title="Check In Store"/>
            </Appbar.Header>

            <Text style={styles.maintext}>Requesting Camera Permission</Text>
          </View>
         );}

    if (hasPermission === false) {
        return (
          <View style={styles.mainContainer}>
            <Appbar.Header style={styles.header}>
              <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
              <Appbar.Content title="Check In Store"/>
            </Appbar.Header>

            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>
        );}
    

    return(
      <View style={styles.mainContainer}>
         <Appbar.Header style={styles.header}>
        <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
        <Appbar.Content title="Check In Store"/>
        </Appbar.Header>

        <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <View style={styles.itemNameBox}>
          <Text style={styles.maintext}>Name: {storeName}</Text>
        </View>
        <Text style={styles.subtext}>Please scan again if the store name didn't appear !</Text>
        
        <View style={styles.buttonCon}>
          {scanned && <Button style={styles.buttons} mode="contained" onPress={()=>setScanned(false)} color='#1e3d59'>Scan again?</Button>}
          {scanned && <Button style={styles.buttons} mode="contained" onPress={checkIn} color='#32CD32'>CHECK IN</Button>}
        </View>
      </View>
      </View>
    );
}

export default CheckIn;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainContainer: {
      flex: 1,
      
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    subtext: {
      fontSize: 13,
      margin:5
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      margin:0,
      padding:0,
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 25,
      backgroundColor: '#1e3d59',
    },
    itemNameBox:{
      margin:8,
      borderRadius:15,
      borderWidth:.2,
      borderColor:'gray',
      shadowRadius:10,
      shadowColor:'black'
    },
    checkIn:{
      fontSize:30,
      marginBottom:20
    },
    header:{
        backgroundColor:'#1e3d59'
    },
    buttons:{
      marginBottom:10
    },
    buttonsG:{
      marginBottom:10,
      color:'lime'
    },
    buttonCon:{
      margin:15,
    },
  });