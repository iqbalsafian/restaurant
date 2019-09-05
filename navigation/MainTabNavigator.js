import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ReadyScreen from '../screens/ReadyScreen';

const config = Platform.select({
  web: {
    headerMode: 'screen',
    headerLayoutPreset: 'center'
  },
  default: {},
});

const OrdersStack = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  config
)

OrdersScreen.navigationOptions = {
  tabBarLabel: 'Orders',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

OrdersStack.path = '';

const ReadyStack = createStackNavigator(
  {
    Ready: ReadyScreen,
  },
  config
)

ReadyScreen.navigationOptions = {
  tabBarLabel: 'Ready',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

ReadyStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const tabNavigatorConfig = {
  tabBarOptions: {
    labelStyle: {
      fontSize: 40,
      color: 'black'
    },
    tabStyle: {
      // width: 100,
    },
    style: {
      backgroundColor: 'white',
      marginBottom: -70
    },
  }
}

const tabNavigator = createMaterialTopTabNavigator({
  OrdersStack,
  ReadyStack,
  // LinksStack
}, tabNavigatorConfig);

tabNavigator.path = '';

export default tabNavigator;
