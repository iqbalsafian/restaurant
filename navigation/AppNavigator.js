import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from './AuthLoadingScreen';
import LoginScreen from './LoginScreen';

const AppStack = createStackNavigator({ Main: MainTabNavigator });
const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    // AuthLoading: AuthLoadingScreen,
    // App: AppStack,
    // Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  })
);
