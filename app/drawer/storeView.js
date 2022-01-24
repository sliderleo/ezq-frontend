import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Button, TextInput, Appbar,Card, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import global from '../src/global';
function StoreView({navigation}){
    const toHome = () => navigation.goBack();
    const checkIn = () => navigation.navigate('Scan');
    const[isLoading,setLoading]=useState(true);
    const[storeId,setStoreId]=useState(null);
    const [userToken, setUserToken] = useState(null);
    const[storeName,setStoreName]=useState(null);
    const[address,setAddress]=useState(null);
    const[image,setImage]=useState(null);
    const[contact,setContact]=useState(null);


    useEffect(() => {
        getData();
        getStore(storeId);
    }, []);

    getData= async() =>{
        try{
          let tokenGet = await AsyncStorage.getItem('token');
          let storeNGet = await AsyncStorage.getItem('storeName');
          let storeId = await AsyncStorage.getItem('storeId');
          if(tokenGet !== null && storeNGet !== null && storeId !== null){
            setUserToken(tokenGet);
            setStoreName(storeNGet);
            setStoreId(storeId);
            
          }else{
            console.log("Failed");
          }
        }catch(e){
          console.log(e);
          console.log("Fail");
        }
    }

    async function getStore(data) {
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
                setStoreName(resData[0].name)
                setAddress(resData[0].address);
                let path = global.ip+"/image/store/"+resData[0].store_img
                setImage(path);
                setContact(resData[0].contact);
                setLoading(false);
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

    

    if(isLoading){
        getData();
        getStore(storeId);
        return(
            <View style={styles.mainContainer}>
                <Appbar.Header style={styles.header}>
                <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
                <Appbar.Content title="Checking In To"/>
                </Appbar.Header>
                <Text style={styles.maintext}>Loading.....</Text>
            </View>
        );
    }else{
        return(
            <View style={styles.mainContainer}>
                <Appbar.Header style={styles.header}>
                <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
                <Appbar.Content title="Checking In To"/>
                </Appbar.Header>

                <View style={styles.imageCon}>
                    <Image style={styles.bannerImg} source={{uri:image}}/>
                </View>
                <Card style={styles.cardButton}>
                        <Card.Content>
                            <Text style={styles.cardText}>Name: {storeName}</Text>
                            <Text style={styles.cardText}>Address: {address}</Text>
                            <Text style={styles.cardText}>Contact: {contact}</Text>
                        </Card.Content>
                </Card>
                <View style={styles.buttonCon}>
                    <Button style={styles.buttons} mode="contained" onPress={checkIn} color='#1e3d59'>CHECK IN TO SHOPPING</Button>
                </View>
                    
            </View>
        );
    }
    
}

export default StoreView;

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
    },
    header:{
        backgroundColor:'#1e3d59'
    },
    maintext: {
        fontSize: 16,
        margin: 15,
        textAlign:'center'
    },
    bannerImg:{
        height: 230,
        alignItems:'center',
        justifyContent: 'center',
    },
    buttonCon:{
        margin:15,
    },
    cardText:{
        fontSize:15,
        paddingTop:7,
        fontWeight:'bold',
        marginStart:20
    },
    card:{
        borderRadius:30,
        padding:5,
        opacity:.5,
    },
});
