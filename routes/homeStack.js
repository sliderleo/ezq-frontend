import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../app/auth/index';
import Login from '../app/auth/login';
import Register from '../app/auth/register';
import ForgotPass from '../app/auth/forgotpass';
const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            headerShown: false //this will hide the header
          },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
            headerShown: false //this will hide the header
          },
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: 'Register',
            headerShown: false //this will hide the header
          },
    },
    ForgotPass: {
        screen: ForgotPass,
        navigationOptions: {
            title: 'ForgotPass',
            headerShown: false //this will hide the header
          },
    },
    
 
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);