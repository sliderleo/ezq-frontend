import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar } from 'react-native-paper';

function ScanItem({navigation}){
    const [userToken, setUserToken] = useState(null);
    const [hasPermission,setHasPermission]=useState(null);
    const [scanned,setScanned]=useState(false);
    const[text,setText]=useState('');
    const[storeId,setStoreId]=useState(null);
    const[storeName,setStoreName]=useState(null);
    const[itemName,setItemName]=useState(null);
    const[price,setPrice]=useState(null);
    const toHome = () => navigation.navigate('HideThis');
   

    async function submitAPI(data) {
      try{
          await fetch('http://192.168.0.111:8000/api/items/search/'+storeId+'/'+data,{
          method:'GET',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+ userToken,
          },
        }).then(res=>res.json())
        .then(resData=>{
            if(resData.length>0){
                const itemData = resData[0];
                setItemName(itemData.name);
                setPrice(itemData.price);
            }else{
                setItemName("Not Found!");
                setPrice("Not Found!");
            }
        })
        .catch((error) => {
          console.error(error);
      });
      }catch(e){
        console.log(e);
      }
    }

    getData= async() =>{
      try{
        const tokenGet = await AsyncStorage.getItem('token');
        const storeNGet = await AsyncStorage.getItem('storeName');
        const storeIDGet = await AsyncStorage.getItem('storeId');
        if(tokenGet !== null && storeNGet !== null && storeIDGet !== null){
          setUserToken(tokenGet);
          setStoreName(storeNGet);
          setStoreId(storeIDGet);
        }
      }catch(e){
        console.log(e);
        console.log("Fail");
      }
    }



    const askForCameraPermission = () => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })()
    }

    useEffect(() => {
        getData();
        askForCameraPermission();
        
      }, []);

    const handleBarCodeScanned=({type,data})=>{
        setScanned(true);
        setText(data);
        submitAPI(data);
    }

    function reset(){
        setItemName('');
        setPrice('');
        setScanned(false);
    }

    if(hasPermission === null){
        return(
            <View style={styles.mainContainer}>
                <Appbar.Header style={styles.header}>
                <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
                <Appbar.Content title="Scan Your Item"/>
                </Appbar.Header>
                <Text style={styles.maintext}>Requesting Camera Permission</Text>
            </View>
         );}

    if (hasPermission === false) {
        return (
            <View style={styles.mainContainer}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
                <Appbar.Content title="Scan Your Item"/>
            </Appbar.Header>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        )}
    

    return(
      <View style={styles.mainContainer}>
         <Appbar.Header style={styles.header}>
          <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
          <Appbar.Content title="Scan Your Item"/>
          <Appbar.Action icon="cart"/>
        </Appbar.Header>

        <View style={styles.container}>
        <Text style={styles.maintext}>Name: {storeName}</Text>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <View style={styles.itemNameBox}>
          <Text style={styles.maintext}>Name: {itemName}</Text>
          <Text style={styles.maintext}>Price: {price}</Text>
        </View>
        
        {scanned && <Button style={styles.buttons} mode="contained" onPress={() => reset()} color='#1e3d59'>Scan again?</Button>}
        {scanned && <Button style={styles.buttons} mode="contained" color='#1e3d59'>ADD TO CART</Button>}
      </View>
      </View>
    );
}

export default ScanItem;

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
      margin: 10,
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
    storeBox:{
        margin:8,
        borderRadius:15,
        borderWidth:.2,
        borderColor:'gray',
        shadowRadius:10,
        shadowColor:'black'
    },
    buttons:{
        marginBottom:10
    }
  });