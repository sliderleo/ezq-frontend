import React,{useState} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Button, TextInput, Appbar,Card, TouchableRipple } from 'react-native-paper';

function StoreView({navigation}){
    const toHome = () => navigation.navigate('CheckIn');
    const checkIn = () => navigation.navigate('Scan');

    return(
        <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
                <Appbar.Content title="Checked In To"/>
                </Appbar.Header>

                <Button style={styles.buttons} mode="contained" onPress={checkIn} color='#1e3d59'>PROCEED TO SHOPPING</Button>
        </View>
    );
}

export default StoreView;

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        backgroundColor:'#1e3d59'
    },
});
