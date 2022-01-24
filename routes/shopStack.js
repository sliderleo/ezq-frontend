import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CheckIn from '../app/drawer/check_in';
import StoreView from '../app/drawer/storeView';
import Cart from '../app/drawer/cart';
import Scan from '../app/drawer/scan';
import Payment from '../app/drawer/payment';
const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown: false
  };

const ShopNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="CheckIn" component={CheckIn} />
        <Stack.Screen name="StoreView" component={StoreView} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    );
  }
export default ShopNavigator;