import React,{useState} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Button, TextInput, Appbar,Card, TouchableRipple } from 'react-native-paper';
import Carousel, { Pagination }  from 'react-native-snap-carousel';
import {createStackNavigator} from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');
const Stack = createStackNavigator();
const bannerstate = {
    activeIndex:0,
    carouselItems: [
    {
        title:"Banner 1",
        text: "Text 1",
    },
    {
        title:"Banner 2",
        text: "Text 2",
    },
    {
        title:"Banner 3",
        text: "Text 3",
    }
  ]
}

function _renderItem({item,index}){
    return (
      <View style={{
          backgroundColor:'floralwhite',
          borderRadius: 5,
          height: 120,
          alignItems:'center',
          justifyContent: 'center',
          marginLeft: 25,
          marginRight: 25, }}>
        <Text style={{fontSize: 30}}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>

    )
}


function Menu({navigation}){
    const onPress = () => navigation.navigate('HideThis');
    const openDrawer = () => navigation.openDrawer();
    return(
    <View style={styles.container}>
        <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" onPress={openDrawer}/>
        <Appbar.Content title="Main Menu"/>
        <Appbar.Action icon="magnify"/>
        </Appbar.Header>

        <View style={styles.carouselImg}>
            <Carousel
            layout={"default"}
            data={bannerstate.carouselItems}
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
                    <Image style={styles.img} source={require('../../assets/qrcode.png')} style={{ width: 40, height: 40 }}/>
                    <Text style={styles.cardText}>Scan</Text>
                </Card.Content>
            </Card>
        </TouchableRipple>

        <TouchableRipple 
        style={styles.card}
        >
            <Card style={styles.cardButton}>
                <Card.Content>
                    <Image style={styles.img} source={require('../../assets/qrcode.png')} style={{ width: 40, height: 40 }}/>
                    <Text style={styles.cardText}>Scan</Text>
                </Card.Content>
            </Card>
        </TouchableRipple>
        </View>
    </View>

    );
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
    }
  });
  