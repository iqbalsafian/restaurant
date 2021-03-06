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
import { NavigationEvents } from "react-navigation";
import { Card, Caption, Button } from 'react-native-paper';
import { INITIAL_STATE } from '../redux/reducers/ordersReducer';

export default function ReadyScreen() {
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(()=>updateState({}), []);

  let { orders } = INITIAL_STATE;
  let isOrderAvailable = orders.find(order=>(order.status==='ready'||order.status==='completed'));
  let [currentOrderId, setCurrentOrderId] = useState(
    isOrderAvailable ?
    orders.find(order=>(order.status==='ready'||order.status==='completed')).id : 0
  );
  let [currentOrder, setCurrentOrder] = useState(
    isOrderAvailable ?
    orders.find(order=>(order.status==='ready'||order.status==='completed')) : {}
  );

  const setOrderStatus = (status) => {
    let currentOrderIndex = orders.findIndex(order=>order.id===currentOrderId);
    orders[currentOrderIndex].status = status
  }

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={payload=>forceUpdate()}></NavigationEvents>
      <View style={{width: '20%'}}>
        <View style={styles.leftTab}>
          <Text style={styles.leftHeader}>READY ORDERS</Text>
          <ScrollView contentContainerStyle={styles.innerContainer}>
            {
              (!orders || !orders.filter(order=>order.status==='ready').length)
              ? <View style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><Text>There's no ready orders</Text></View>
              :
              (
                orders
                  .filter(order=>order.status==='ready')
                  .map(order=>{
                    return (
                      <Card style={{backgroundColor: (order.id === currentOrderId) ? '#DCDCDC' : ''}} key={order.id}>
                        <Card.Content>
                          {
                            (order.id === currentOrderId) ?
                            <Text style={styles.defaultText}>{order.id}</Text>
                            :
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
                          }
                        </Card.Content>
                      </Card>
                    )
                  })
                )
            }
          </ScrollView>
        </View>
        <View>
          <Text style={styles.leftHeader}>PICKED-UP</Text>
          {
            orders &&
            orders
              .filter(order=>order.status==='completed')
              .map(order=>{
                return (
                  <Card style={{backgroundColor: ''}} key={order.id}>
                    <Card.Content>
                      <Text style={styles.defaultText}>{order.id}</Text>
                    </Card.Content>
                  </Card>
                )
              })
          }
        </View>
      </View>
      {
        isOrderAvailable ?
        <View style={{width: '80%', borderLeftWidth: 0.7, borderStyle: 'solid', borderLeftColor: '#d6d7da'}}>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Card style={{width: '70%'}}>
              <Card.Content>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{width: '20%'}}>
                    <Caption>Order #</Caption>
                    <Text style={styles.orderDetailsHeader}>{currentOrderId}</Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Caption>Ready In </Caption>
                    <Text style={styles.orderDetailsHeader}>10 Mins</Text>
                  </View>
                  <View style={{width: '60%', alignContent: 'flex-end', alignItems:'flex-end'}}>
                    <Button style={{width: 300, height: 50}}>Raise Issue</Button>
                  </View>
                </View>
              </Card.Content>
              <Card.Content>
              {
                currentOrder.lists.map((list, index)=>{
                  return (
                    <View style={{flex: 1, flexDirection: 'row'}} key={index}>
                      <View style={{width: '20%'}}>
                        <Text style={styles.orderDetailsHeader}>{index+1}</Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <Text style={styles.orderDetailsHeader}>{list.title}</Text>
                        <Caption>{list.remarks}</Caption>
                      </View>
                      <View style={{width: '20%'}}>
                        <Text style={styles.orderDetailsHeader}>${list.price}</Text>
                      </View>
                    </View>
                  )
                })
              }
              </Card.Content>
            </Card>
          </View>
          <View style={{padding: 3,bottom: 0, alignItems: 'center', position: 'absolute', justifyContent:'center', width: '100%'}}>
            {
              currentOrder.status === 'ready' ?
              <Button style={styles.button}
                dark={false}
                onPress={//()=>{}
                  ()=>{
                    setOrderStatus('completed')
                    forceUpdate()
                  }
                }
                mode='contained'>
                <Text style={{ width:'100%', alignItems:'center', color: 'white', justifyContent: 'center', flex: 1, textAlign:'center', textAlignVertical: 'center'}}>
                  CONFIRM COMPLETED
                </Text>
              </Button>
              : null
            }
          </View>
        </View> :
        <View style={{
          alignItems: 'center', justifyContent: 'center',
          width: '80%', borderLeftWidth: 0.7, borderStyle: 'solid', borderLeftColor: '#d6d7da'}}>
          <Text style={{textAlign: 'center'}}>No orders</Text>
        </View>
      }

    </View>
  )
};

ReadyScreen.navigationOptions = {
  header: null,
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    // fontSize: 40
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgb(32, 158, 33)',
    borderRadius: 0,
    fontSize: 36,
    color: 'white',
    height: 60,
    justifyContent: 'center',
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    height: 150,
    paddingHorizontal: 0,
    paddingVertical: 16,
  },
  defaultText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  orderDetailsHeader: {
    fontWeight: 'bold'
  },
  leftTab: {
    padding: 10
  },
  leftHeader: {
    padding: 10,
    fontSize: 20,
    textAlignVertical:'center',
    textAlign:'center',
    fontWeight: 'bold'
  }
}
