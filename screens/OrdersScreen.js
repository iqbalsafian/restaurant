import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <View style={{width: '20%'}}>
        <Text style={{padding: 10, fontSize: 30}}>NEW ORDERS</Text>
      </View>
      <View style={{width: '80%', borderLeftWidth: 0.7, borderStyle: 'solid', borderLeftColor: '#d6d7da', minHeight: '100%'}}>
        <View style={{padding: 10}}>
          <Text>b</Text>
        </View>
        <View style={{padding: 3,bottom: 0, alignItems: 'center', position: 'absolute', justifyContent:'center', width: '100%'}}>
          <TouchableOpacity
            style={{width: '100%', backgroundColor: 'cyan', alignItems: 'center'}}
            onPress={()=>{}}><Text>Confirm Order</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

OrdersScreen.navigationOptions = {
  header: null
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    // fontSize: 40
  }
}
