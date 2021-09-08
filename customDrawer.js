import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View,Image, ImageBackground } from 'react-native';
import { Assets } from "react-navigation-stack";
const image = {}
function Sidebar({...props}){
  return(
    <View style={{flex: 1}}>
        <View style={styles.drawerBanner}>
        <ImageBackground
            source={require('./assets/bg.jpg')}
            style={{ flex: 1, height: null, width: null }}>
            <Text style={styles.title}>Welcome</Text>
          </ImageBackground>
          
        </View>
    <DrawerContentScrollView style={styles.scrollContent} {...props}>
    {props.state.routeNames.map((route, idx) => {
          if (route === 'HideThis' || route === 'AndThis') return null;
          const focused = idx === props.state.index;
          return (
            <TouchableNativeFeedback style={styles.touchable}
              key={route}
              onPress={() => props.navigation.navigate(route)}>
              <View style={{
                   paddingTop:5,
                   paddingBottom:5,
                   height:40,
                   backgroundColor:focused ? '#1e3d59' : '#f5f0e1',
                   marginBottom:20,
                   borderRadius:18
              }}>
                <Text style={{
                    color:focused ? 'white' : 'black',
                    fontSize:20, 
                    textAlign:'center',
                    textAlignVertical:'center'
                }}>
                  {route}
                </Text>
              </View>
            </TouchableNativeFeedback>
          );
        })}
    </DrawerContentScrollView>
    </View>
  )
}
export default Sidebar;

const styles = StyleSheet.create({
    top:{
        backgroundColor:'red'
    }, 
    scrollContent:{
        marginStart:10,
        marginEnd:10,
    },
    title:{
      marginTop:50,
      fontFamily: 'yellowTail',
      color:'white',
      fontSize: 60,
      textAlign:'center',
    
    },
    textStyle:{
        color:"white",
        fontSize:20, 
        textAlign:'center',
        textAlignVertical:'center'
    },
    touchable:{
        borderRadius:18
    },
    drawerBanner:{
        backgroundColor:"red",
        height:250
    }
});
// color: focused ? '#333' : 'red', 