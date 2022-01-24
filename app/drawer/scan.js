import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, IconButton } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar } from 'react-native-paper';
import {connect} from 'react-redux';
import {deleteItem, addItem} from "./actions/item";
import { useDispatch } from 'react-redux';
import { add } from 'react-native-reanimated';
import AlertView from '../src/AlertView';
import global from '../src/global';


function Scan({navigation}){
    const [userToken, setUserToken] = useState(null);
    const [hasPermission,setHasPermission]=useState('granted');
    const [scanned,setScanned]=useState(false);
    const [text,setText]=useState('');
    const [storeId,setStoreId]=useState(null);
    const [storeName,setStoreName]=useState(null);
    const [itemName,setItemName]=useState(null);
    const [price,setPrice]=useState(null);
    const [quantity,setQuantity] = useState(1);
    const backtext = " item(s) into the cart!"
    const [alertVisible, setAlertVisible] = useState(false);
    const toHome = () => navigation.goBack();
    const toCart = () => navigation.navigate('Cart');
    const dispatch = useDispatch();
    
    function submitFood(){
      setAlertVisible(true);
      for (let index = 0; index < quantity; index++) {
       dispatch(addItem(itemName,price,text));
      }
      var timeout = setTimeout(
        () => {setQuantity(1);
          setAlertVisible(false);}
    , 2000);
      
    }

    async function submitAPI(data) {
      try{
          await fetch(global.ip+'/api/items/search/'+storeId+'/'+data,{
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
        setQuantity(1);
    }

   function add(){
     let newQ = quantity+1;
     setQuantity(newQ);
   }

   function minus(){
     if(quantity>1){
      let newQ = quantity-1;
      setQuantity(newQ);
     }
    
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
            <Appbar.Content title={storeName}/>
            <Appbar.Action icon="cart" onPress={toCart}/>
        </Appbar.Header>

        <View style={styles.container}>
        <View style={styles.spacer}/>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <View style={styles.itemNameBox}>
          <Text style={styles.maintext}>Name: {itemName}</Text>
          <Text style={styles.maintext}>Price: {price}</Text>
        </View>
        
        {scanned &&<View style={styles.scannedCon}>
        <Button style={styles.buttons} mode="contained" onPress={() => reset()} color='#1e3d59'>Scan again?</Button>
          <View style={styles.quantityCon}>
            <IconButton icon="minus" onPress={() => minus()}/>
            <Text style={styles.textStyle}>{quantity}</Text>
            <IconButton icon="plus" onPress={() => add()}/>
          </View>
          <Button style={styles.buttons} mode="contained" onPress={submitFood}  color='#1e3d59'>ADD TO CART</Button>
        </View> }
        
        {alertVisible &&
           <AlertView 
           title= ""
           message={"Added "+quantity+backtext}>
           </AlertView>
        }  
      </View>
      </View>
    );
}

const mapStateToProps = (state) =>{
  return{
      items: state.cartReducer.itemList
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      add:(itemName) => dispatch(addItem(itemName))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Scan);

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
      margin: 15,
      textAlign:'center'
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      margin:0,
      padding:0,
      paddingTop:10,
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
    },
    quantityCon:{
      flexDirection:'row',
      alignContent:'center',
      textAlignVertical:'center',
      justifyContent:'center'
    },
    scannedCon:{
      flex:1,
      marginTop:15
    },
    textStyle:{
      alignItems:'center',
      textAlignVertical:'center',
    },
    spacer:{
      height:25
    }
  });