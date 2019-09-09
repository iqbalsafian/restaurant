import * as WebBrowser from 'expo-web-browser';
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
import { NavigationActions } from 'react-navigation';
import { Button, Card, Caption } from 'react-native-paper';
import { INITIAL_STATE } from '../redux/reducers/ordersReducer';

function OrdersScreen(props) {
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(()=>updateState({}), []);

  let { orders } = INITIAL_STATE;
  let isOrderAvailable = orders.find(order=>(order.status==='new'||order.status==='in-progress'));
  let [currentOrderId, setCurrentOrderId] = useState(
    isOrderAvailable ?
    orders.find(order=>(order.status==='new'||order.status==='in-progress')).id : 0
  );
  let [currentOrder, setCurrentOrder] = useState(
    isOrderAvailable ?
    orders.find(order=>(order.status==='new'||order.status==='in-progress')) : {}
  );

  const setOrderStatus = (status) => {
    let currentOrderIndex = orders.findIndex(order=>order.id===currentOrderId);
    orders[currentOrderIndex].status = status
  }

  return (
    <View style={styles.container}>
      <View style={{width: '20%'}}>
        <View style={{width: '100%'}}>
          <Text style={styles.leftHeader}>NEW ORDERS</Text>
          <ScrollView contentContainerStyle={styles.innerContainer}>
            {
              (!orders || !orders.filter(order=>order.status==='new').length)
              ? <View style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><Text>There's no new orders</Text></View>
              :
              (
                orders
                .filter(order=>order.status === 'new')
                .map(order => {
                  return (
                    <Card style={{backgroundColor: (order.id === currentOrderId) ? '#DCDCDC' : ''}} key={order.id}>
                      <Card.Content>
                        {
                          order.id === currentOrderId ?
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
        <View style={{width: '100%'}}>
          <Text style={styles.leftHeader}>IN PROGRESS</Text>
          <ScrollView contentContainerStyle={styles.innerContainer}>
            {
              (!orders || !orders.filter(order=>order.status==='in-progress').length)
              ? <View style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><Text>There's no in-progress orders</Text></View>
              :
              (
                orders
                .filter(order=>order.status === 'in-progress')
                .map(order => {
                  return (
                    <View key={order.id}>
                      <Card style={{backgroundColor: (order.id === currentOrderId) ? '#DCDCDC' : ''}}>
                        <Card.Content>
                          {
                            order.id === currentOrderId ?
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
                                <Text style={styles.defaultText}>{order.id}</Text>
                              </TouchableOpacity>
                          }
                        </Card.Content>
                      </Card>
                    </View>
                  )
                })
              )
            }
          </ScrollView>
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
            </Card>
            <View style={{width: '70%', top: 20}}>
              {
                currentOrder.lists.map((list, index)=>{
                  return (
                    <View style={{flex: 1, flexDirection: 'row', width: '100%'}} key={index}>
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
            </View>
          </View>
          <View style={{padding: 3,bottom: 0, alignItems: 'center', position: 'absolute', justifyContent:'center', width: '100%'}}>
            <Button style={styles.button}
              dark={false}
              onPress={
                ()=>{
                  (currentOrder.status==='new') ? setOrderStatus('in-progress') : setOrderStatus('ready')
                  forceUpdate()
                }
              }>
              <Text style={{color:'white'}}>{(currentOrder.status==='new') ? 'CONFIRM ORDER' : 'SET TO READY'}</Text>
            </Button>
          </View>
        </View>
        : <View
            style={{
              width: '80%',
              borderLeftWidth: 0.7,
              borderStyle: 'solid',
              borderLeftColor: '#d6d7da',
              height: 200,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text styles={{textAlign: 'center'}}>No orders</Text>
          </View>
      }
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
  leftHeader: {
    padding: 10,
    fontSize: 20,
    textAlignVertical:'center',
    textAlign:'center',
    fontWeight: 'bold'
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
}

export default OrdersScreen;
