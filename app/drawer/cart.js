import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight } from 'react-native';
import { Button, TextInput, Appbar,Card, TouchableRipple } from 'react-native-paper';
import { List,IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {connect} from 'react-redux';
import {addItem, deleteItem, updateItem} from "./actions/item";

function Cart({navigation}){
    const toHome = () => navigation.navigate('Scan');
    const [price,setPrice]=useState(0);
    const [quantity,setQuantity]=useState(0);
    let totalPrice = 0;
    let totalQuantity =0;
    const dispatch = useDispatch();
    const deleteCurrent = (key) => dispatch(deleteItem(key))
    const items = useSelector(state => state.cartReducer.itemList)
    
    function cartInfoUpdate() {
        items.forEach((item) => {
          totalQuantity += 1;
          totalPrice +=item.price;
          setPrice(totalPrice);
          setQuantity(totalQuantity);
        })
    }

    function deleteAction(key,quantityD,priceD){
        deleteCurrent(key);
        setQuantity(quantity-1);
        setPrice(price-priceD);
    }

    // function addQuantity(key,priceA){
    //     setQuantity(quantity+1);
    //     setPrice(price+priceA);
    // }

    // function subQuantity(key,priceS){
    //     setQuantity(quantity-1);
    //     setPrice(price-priceA);
    // }

    useEffect(() => {
        cartInfoUpdate();
      }, []);

    return(
        <View style={styles.container}>
                <Appbar.Header style={styles.header}>
                <Appbar.Action icon="keyboard-backspace" onPress={toHome}/>
                <Appbar.Content title="My Cart"/>
                </Appbar.Header>

                <View style={styles.cartInfo}>
                    <Text>Total Price: RM {price}</Text>
                    <Text>Item In Cart: {quantity}</Text>
                </View>
                <FlatList style={styles.listContainer}
                data={items}
                keyExtractor={(item, index) => item.key.toString()}
                renderItem={
                    (data) =>
                    <View style={styles.itemContainer}>
                        <View style={styles.infoCon}>
                            <Text>{data.item.name}</Text>
                            <Text>{"RM "+data.item.price.toString()}</Text>
                        </View>

                        <View style={styles.actionButtonCon}>
                            {/* <IconButton icon="plus" onPress={() =>addQuantity(data.item.key,data.item.quantity,data.item.price)}/>
                            <Text style={styles.textStyle}>{data.item.quantity}</Text>
                            <IconButton icon="minus" /> */}
                            <IconButton icon="delete" onPress={() =>deleteAction(data.item.key,data.item.quantity,data.item.price) }/>
                        </View>
                   </View>
                }
                />
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
        delete:(key) => dispatch(deleteItem(key))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        backgroundColor:'#1e3d59'
    },
    listContainer: {
        backgroundColor: 'white',
        padding: 16
    },
    listText: {
        fontSize: 30,
        padding:10,
        
    },
    cartInfo:{
        padding:10
    },
    itemContainer:{
        flexDirection:'row',
        borderRadius:5,
    },
    infoCon:{
        padding:15
    },
    actionButtonCon:{
        flex:1,
        marginStart:150,
        justifyContent:'center',
        padding:10,
        alignItems:'stretch',
        flexDirection:'row',
        textAlign:'center',
        color:'white'
    },
    textStyle:{
        alignItems:'center',
        textAlignVertical:'center',
    }
});
