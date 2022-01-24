import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight, FlatList } from 'react-native';
import { Button, TextInput, Appbar,Card, TouchableRipple,Title, Paragraph } from 'react-native-paper';
import Carousel, { Pagination }  from 'react-native-snap-carousel';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import global from '../src/global';
import AdView from '../src/AdView';

const { width, height } = Dimensions.get('window');
const Stack = createStackNavigator();
const bannerArray = {activeIndex:0,banner:[]};
const storeArray = {activeIndex:0,store:[]};

async function removeItemValue() {
    try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('id');
        console.log("Done");
        return true;
    }
    catch(exception) {
        return false;
    }
}

function renderStore({item,index}){
    return (
        <Card style={styles.card}>
            <Card.Cover source={{uri:global.ip+"/image/store/"+item.store_img}} />
            <Card.Actions>
            <Card.Title title={item.name}/>
            </Card.Actions>
        </Card>
    )
}


function _renderItem({item,index}){
    return (
      <View >
        <Image style={styles.bannerImg} source={{uri:global.ip+"/image/banner/"+item.banner_img}}/>
      </View>
    )
}


function Menu({navigation}){
    const onPress = () => navigation.navigate('HideThis');
    const openDrawer = () => navigation.openDrawer();
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [adPic,setAdPic] = useState('20220119111452.png');
    const [alertVisible, setAlertVisible] = useState(false);
    async function getBanner(){
        try{
            await fetch(global.ip+'/api/banners',{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
              },
            }).then(res=>res.json())
            .then(resData=>{
                [...bannerArray.banner]=resData;
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

    async function getStore(){
        try{
            await fetch(global.ip+'/api/store',{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
              },
            }).then(res=>res.json())
            .then(resData=>{
                [...storeArray.store]=resData;
                setLoading2(false);
            })
            .catch((error) => {
                console.error(error);
                console.log("Fail");
            });
        }catch(e){
            console.log(e);
        }
    }

    async function getAd(){
        try{
            await fetch(global.ip+'/api/ad',{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
              },
            }).then(res=>res.json())
            .then(resData=>{
                setAdPic(resData[0].ads_img);
                setAlertVisible(true);
            })
            .catch((error) => {
                console.error(error);
                console.log("Fail");
            });
        }catch(e){
            console.log(e);
        }
    }


    //useEffect had to be include in the main function in order for it to work
    useEffect(() => {
        getBanner();
        getStore();
        getAd();
    }, []);

    if(isLoading || isLoading2){
        return(
            <View>
                <Text>Loading......</Text>
            </View>
        )
    }else if(!isLoading && !isLoading2){
        return(
            <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                <Appbar.Action icon="menu" onPress={openDrawer}/>
                <Appbar.Content title="Main Menu"/>
                </Appbar.Header>

                <View style={styles.carouselImg}>
                    <Carousel
                    initialNumToRender={5}
                    layout={"default"}
                    data={bannerArray.banner}
                    sliderWidth={width}
                    itemWidth={width}
                    autoplay={true}
                    loop={true}
                    hasParallaxImages={true}
                    renderItem={_renderItem}/>
                </View>
        
                <View style={styles.functionsBar}>
                    <TouchableRipple 
                    onPress={onPress}
                    style={styles.card}
                    >
                        <Card style={styles.cardButton}>
                            <Card.Content>
                                <Image style={styles.img} source={require('../../assets/cart.png')} style={{ width: 55, height: 55 }}/>
                                <Text style={styles.cardText}>Shop Now</Text>
                            </Card.Content>
                        </Card>
                    </TouchableRipple>
                </View>
                <Title style={styles.title}>Recently Joined Store</Title>
                <FlatList style={styles.listContainer}
                    keyExtractor = { (item, index) => index.toString() }
                    data={storeArray.store}
                    renderItem={renderStore}
                    initialNumToRender={5}
                    />
                {alertVisible &&
                    <AdView 
                    image={adPic}>
                    </AdView>
                    }  
            </View>
        
            );
    }else{
        return(
            <View>
                <Text>Error</Text>
            </View>
        )
    }

   
    
}


export default Menu;
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
        height:105,
        width:105,
        justifyContent: 'center',
        alignItems:'center',
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
    bannerImg:{
        borderRadius: 5,
        height: 120,
        alignItems:'center',
        justifyContent: 'center',
        marginLeft: 25,
        marginRight: 25,
    },
    listContainer: {
        padding: 10,
        borderRadius:5,
    },
    title:{
        paddingLeft:10
    },
    card:{
        
        marginBottom:15,
    },
    img:{
        textAlign:'center',
        alignItems:'center',
        justifyContent: 'center',
        textAlignVertical:'center',
       marginStart: 15,
    }
  });
  