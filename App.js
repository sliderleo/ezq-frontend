import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import Navigator from './routes/homeStack.js';
import ShopNavigator from './routes/shopStack';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as Font from 'expo-font';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Provider } from 'react-redux';
import configureStore from './app/drawer/storeRedux.js';
import About from './app/drawer/about';
import History from './app/drawer/history';
import Profile from './app/drawer/profile';
import Menu from './app/drawer/menu';
import CheckIn from './app/drawer/check_in';
import Sidebar from'./customDrawer';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialTop = createMaterialTopTabNavigator();


const getFonts = () => Font.loadAsync({
  'yellowTail': require('./assets/fonts/Yellowtail-Regular.ttf'),
});

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#2E71DC',
  },
};

const App =() => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getData();
    
  }, []);

  getData= async() =>{
    try{
      const tokenGet = await AsyncStorage.getItem('token');
      const idGet = await AsyncStorage.getItem('id');
      if(tokenGet !== null){
        setUserId(idGet);
        setUserToken(tokenGet);
      }
    }catch(e){
      console.log(e);
    }
    setLoading(false);
  }
 

  if(fontsLoaded && !isLoading){
    return (
      <PaperProvider>
        <NavigationContainer>
        {userToken !== null ? 
        <Provider store={configureStore}>
        <Drawer.Navigator initialRouteName="Home" drawerContent={props=><Sidebar {...props}/>} screenOptions={{gestureEnabled:false}}>
          <Drawer.Screen name="Menu" component={Menu} />
          <Drawer.Screen name="HideThis" component={ShopNavigator} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="History" component={History} />
          <Drawer.Screen name="About" component={About} />
       </Drawer.Navigator> 
       </Provider>
        : <Navigator/>
        }
        </NavigationContainer>
    </PaperProvider>
    );
  }else if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }else{
    return(
      <AppLoading 
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
      onError={console.warn}
    />
    );
  }
}

AppRegistry.registerComponent(appName, () => Main);
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});