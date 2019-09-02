import React from 'react';
import {
  ActivityIndicator,
  AsynStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { AsyncStorage } from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const jwtToken = await AsyncStorage.getItem('userToken') ? AsyncStorage.getItem('userToken') : null;
    this.props.navigation.navigate(jwtToken ? 'App': 'Auth');
  }

  render() {
    console.log('jwttoken' + jwtToken);
    return(
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}
