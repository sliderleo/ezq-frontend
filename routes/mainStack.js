import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Menu from '../app/drawer/menu';
import CheckIn from '../app/drawer/check_in';
import ScanItem from '../app/drawer/scanItem';
import Cart from '../app/drawer/cart';
const screens = {
    Menu: {
        screen: Menu,
        navigationOptions: {
            title: 'Menu',
            headerShown: false //this will hide the header
          },
    },

    CheckIn: {
        screen: CheckIn,
        navigationOptions: {
            title: 'CheckIn',
            headerShown: false //this will hide the header
          },
    },
    ScanItem: {
        screen: ScanItem,
        navigationOptions: {
            title: 'ScanItem',
            headerShown: false //this will hide the header
          },
    },
    Cart: {
        screen: Cart,
        navigationOptions: {
            title: 'Cart',
            headerShown: false //this will hide the header
          },
    },
}
const MainStack = createStackNavigator(screens);

// this stack is fking scuffed
export default createAppContainer(MainStack);