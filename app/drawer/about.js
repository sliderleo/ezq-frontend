import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function About(){
    return(
        <View style={styles.text}>
            <Text>About Us</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        padding: 24,
    },
  });
  