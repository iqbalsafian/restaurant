import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import OrdersScreen from '../screens/OrdersScreen';
import ReadyScreen from '../screens/ReadyScreen';
import LeftoversScreen from '../screens/LeftoversScreen';

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

OrdersStack.navigationOptions = {
  title: 'Orders',
  headerTitle: 'Orders',
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

OrdersStack.path = 'orders';

const ReadyStack = createStackNavigator(
  {
    Ready: ReadyScreen,
  },
  config
)

ReadyStack.navigationOptions = {
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

ReadyStack.path = 'ready';

const LeftoversStack = createStackNavigator(
  {
    Leftovers: LeftoversScreen,
  },
  config
);

LeftoversStack.navigationOptions = {
  tabBarLabel: 'Leftovers',
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

LeftoversStack.path = '';

const tabNavigatorConfig = {
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: 'green'
    },
    labelStyle: {
      fontSize: 40,
      color: 'black'
    },
    tabStyle: {
      // width: 300,
      alignContent: 'center',
      justifyContent: 'center',
    },
    style: {
      backgroundColor: 'white',
      marginBottom: -70,
      borderBottomStyle: 'solid',
      borderBottomColor: '#DCDCDC',
      borderBottomWidth: 0.2,
      alignContent: 'center',
      justifyContent: 'center'
    },
    lazy: true,
    optimizationsEnabled: true,
  }
}

const tabNavigator = createMaterialTopTabNavigator({
  OrdersStack,
  ReadyStack,
  LeftoversStack,
  ReadyStack
}, tabNavigatorConfig);

tabNavigator.path = '';

export default tabNavigator;
