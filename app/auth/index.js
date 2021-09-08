import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

function HomeApp ({ navigation }){
const onPress = () => navigation.navigate('Login');
const onPress2 = () => navigation.navigate('Register');

    return (
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
        <View style={{ height: height / 3, justifyContent: 'center' }} >

        <TouchableHighlight style={styles.radius} onPress={onPress}>
          <Button style={styles.button}  mode="contained" color="#1e3d59">
            Login
          </Button>
        </TouchableHighlight>
        
        <TouchableHighlight  style={styles.radius} onPress={onPress2}>
          <Button style={styles.button}  mode="contained" color="#f5f0e1">
            Register
          </Button>
        </TouchableHighlight>

        </View>
      </View>
    );
}
export default HomeApp;

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
    margin: 10,
  },
  mainText:{
    fontFamily: 'yellowTail',
    color:'white',
    fontSize: 80,
    textAlign:'center',
    paddingBottom:100
  },
});