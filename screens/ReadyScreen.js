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


export default function ReadyScreen() {
  return (
    <View style={styles.container}>
      <View style={{width: '30%'}}>
        <Text>a</Text>
      </View>
      <View style={{width: '70%'}}>
        <Text>b</Text>
      </View>
    </View>
  )
};

ReadyScreen.navigationOptions = {
  title: 'Ready'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    flex: 1,
    flexDirection: 'row'
  },
});
