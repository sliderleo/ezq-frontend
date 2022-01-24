import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Alert,Button } from 'react-native';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import {Appbar,Paragraph  } from 'react-native-paper';
import global from '../src/global';

function StripeApp (){
    const [email,setEmail]=useState();
    const [cardDetails,setCardDetails]=useState();
    const {confirmPayment, loading} = useConfirmPayment();

    const fetchPaymentIntentClientSecret = async () => {
        var responseClone;
        const response = await fetch(global.ip+'/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currency: 'usd',
          }),
        }).then(function (response) {
            responseClone = response.clone();
            return response.json();
        })
        .then(function (data) {
            // Do something with data
        },function(rejectionReason){
            console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
            responseClone.text()
            .then(function (bodyText){
                console.log('Received the following instead of valid JSON:', bodyText); // 6
            });
        });
        // const {clientSecret, error} = await response.json();
        // return { clientSecret, error };
    }

    const handlePaypress = async()=>{
        if(!cardDetails?.complete || !email){
            return;
        }
        const billingDetails ={
            email:email,
        }
        const clientSecret = await fetchPaymentIntentClientSecret();
        // Confirm the payment with the card details
        const {paymentIntent, error} = await confirmPayment(clientSecret, {
            type: 'Card',
            billingDetails: billingDetails,
        });
    
        if (error) {
            console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
            console.log('Success', paymentIntent);
        }
    };
        
    return(
        <View style={styles.container}>
           <TextInput
            autoCapitalize='none'
            placeholder='E-mail'
            keyboardType='email-address'
            onChange={value=>setEmail(value.nativeEvent.text)}
            style={styles.input}
           />
           <CardField
           postalCodeEnabled={true}
           placeholder={{
               number:"4242 4242 4242 4242"
           }}
           cardStyle={styles.card}
           style={styles.cardCon}
           onCardChange={cardDetails=>{
               setCardDetails(cardDetails);
           }}
           />

           <Button onPress={handlePaypress} title='Pay' disabled={loading}/>
        </View>
    )
}

export default StripeApp;
const styles = StyleSheet.create({
   container:{
       flex:1,
       justifyContent:'center',
       margin:20
   },
   input:{
       backgroundColor:"#efefefef",
       borderRadius:8,
       fontSize:20,
       height:50,
       padding:10
   },
   card:{
        backgroundColor:"#efefefef",
   },
   cardCon:{
        height:50,
        marginVertical:30,
        
   }

  });
  