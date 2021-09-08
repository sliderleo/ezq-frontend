import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ForgotPass(){
    return(
        <View style={styles.text}>
            <Text>Forgot Password Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        padding: 24,
    },
  });