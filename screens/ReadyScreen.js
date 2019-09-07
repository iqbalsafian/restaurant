import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card, Caption } from 'react-native-paper';
import { INITIAL_STATE } from '../redux/reducers/ordersReducer';

export default function ReadyScreen() {
  const { orders } = INITIAL_STATE;
  const [currentOrderId, setCurrentOrderId] = useState(INITIAL_STATE.orders[0].id);
  const [currentOrder, setCurrentOrder] = useState(INITIAL_STATE.orders[0]);

  return (
    <View style={styles.container}>
      <View style={{width: '20%'}}>
        <View style={styles.leftTab}>
          <Text style={{padding: 10, fontSize: 20, textAlignVertical:'center', textAlign:'center'}}>READY ORDERS</Text>
          {
            orders &&
            orders
              .filter(order=>order.status==='new')
              .map(order=>{
                return (
                  <Card style={{backgroundColor: (order.id === currentOrderId) ? '#DCDCDC' : ''}} key={order.id}>
                    <Card.Content>
                      <TouchableOpacity
                        onPress={
                          ()=>{
                            setCurrentOrderId(order.id)
                            setCurrentOrder(orders.find(order_=>order_.id===order.id))
                          }
                        }
                      >
                        <Caption style={styles.defaultText}>{order.id}</Caption>
                      </TouchableOpacity>
                    </Card.Content>
                  </Card>
                )
              })
          }
        </View>
      </View>
      <View style={{width: '80%'}}></View>
    </View>
  )
};

ReadyScreen.navigationOptions = {
  header: null
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    // fontSize: 40
  },
  defaultText: {
    fontSize: 20,
  },
  orderDetailsHeader: {
    fontWeight: 'bold'
  },
  leftTab: {
    padding: 10
  },
}
