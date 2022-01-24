import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View, Modal, Image, TouchableOpacity } from 'react-native';
import { Button} from 'react-native-paper';
const AlertView =({title, message})=> {
    const [alertVisible, setAlertVisible]=useState(true);

    return(
        <View style={styles.centeredView}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={alertVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{title}</Text>
                        <Image source={{uri: 'https://thumbs.gfycat.com/ShyCautiousAfricanpiedkingfisher-size_restricted.gif'}} style={{width: 150, height: 150}} />
                        <Text>{message}</Text>
                        <View style={styles.btnCon}>
                            <Button mode="contained" color='#1e3d59' onPress={()=>{setAlertVisible(!alertVisible)}}>OK</Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    )


}

export default AlertView;

const styles = StyleSheet.create({
    centeredView:{
        justifyContent:'center',
        alignItems: 'center',
        alignContent:'center',
        flex: 1
    },
    modalView:{
        width:'80%',
        margin:8,
        backgroundColor:'white',
        borderRadius:10,
        padding:15,
        alignItems:'center',
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:3.85,
        elevation:5,
    },
    textStyles:{
        color:'black',
        textAlign:'center',
        fontSize:20,
        marginTop:20,
    },
    okStyle:{
        color:'white',
        textAlign:'center',
        fontSize:20,

    },
    modalText:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:3.85,
        elevation:5,
    },
    btnCon:{
        margin:10,
        width:'70%'
    }
})