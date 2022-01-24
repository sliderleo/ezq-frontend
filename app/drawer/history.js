import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight } from 'react-native';
import { Button, TextInput, Appbar,Card, TouchableRipple,List,IconButton, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import global from '../src/global';

function History({ navigation }){
    const toHome = () => navigation.goBack();
    const [userId,setUserId]=useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [myArray, setMyArray] = useState([]);
    useEffect(() => {
        getData();
        getHistory(userId);
    }, [userId]);

    function _renderItem({item,index}){
        return (
            <Card style={styles.cardCon}>
                <View style={styles.itemContainer} key={index}>
                    <View style={styles.infoCon}>
                        <Text>At {item.store_name}</Text>
                        <Text>RM {item.price}</Text>
                    </View>
                    <View style={styles.actionButtonCon}>
                        <Text>{Moment(item.created_at).calendar()}</Text>
                    </View>
                </View>
            </Card>
        )
    }

    getData= async() =>{
        try{
            const userIdGet = await AsyncStorage.getItem('id');
            const tokenGet = await AsyncStorage.getItem('token');
            setUserId(userIdGet);
            setToken(tokenGet);
        }catch(e){
          console.log(e);
          console.log("Fail");
        }
    }

    handleRefresh = () => {
        getHistory(userId);
    };

    async function getHistory(data) {
        try{
            await fetch(global.ip+'/api/receipt/get/'+data,{
            method:'GET',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'Authorization': 'Bearer '+ token,
            },
          }).then(res=>res.json())
          .then(resData=>{
            const data =  resData;
            setMyArray(data);
            setLoading(false);
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
        return(
            <View>
                <Text>Loading......</Text>
            </View>
        )
    }else if(!isLoading){
        return(
            <View style={styles.container}>
                    <Appbar.Header style={styles.header}>
                    <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
                    <Appbar.Content title="History"/>
                    </Appbar.Header>
                    <FlatList style={styles.listContainer}
                    keyExtractor = { (item, index) => index.toString() }
                    data={myArray}
                    extraData={myArray}
                    renderItem={ _renderItem}
                    refreshing={refresh}
                    onRefresh={handleRefresh}
                    />
            </View>
        )
    }
}

export default History;
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        backgroundColor:'#1e3d59'
    },
    listContainer: {
        backgroundColor: 'white',
        padding: 5,
    },
    listText: {
        fontSize: 30,
        padding:10,
        
    },
    cartInfo:{
        padding:15
    },
    itemContainer:{
        flexDirection:'row',
        borderRadius:5,
        borderColor:'gray'
    },
    infoCon:{
        padding:15
    },
    actionButtonCon:{
        flex:1,
        marginStart:100,
        justifyContent:'center',
        padding:10,
        alignItems:'stretch',
        flexDirection:'row',
        textAlign:'center',
        color:'white',
    },
    textStyle:{
        alignItems:'center',
        textAlignVertical:'center',
    },
    cardCon:{
        borderRadius:10,
        marginBottom:10,
        padding:5,
        alignItems:'center',
        justifyContent: 'center',
        textAlign:'center',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        textAlignVertical:'center'
    }
  });
  